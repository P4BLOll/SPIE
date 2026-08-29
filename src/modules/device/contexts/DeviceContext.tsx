import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Device, Subscription } from 'react-native-ble-plx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BLEConnectionStatus, DeviceInfo } from '../types/device.types';
import { bleDeviceService } from '../services/bleDeviceService';
import { BLE_CONFIG } from '../ble/bleConstants';

interface DeviceContextData {
  device: Device | null;
  status: BLEConnectionStatus;
  isScanning: boolean;
  pulseiraConfigurada: boolean;
  discoveredDevices: DeviceInfo[];
  startScan: () => Promise<void>;
  stopScan: () => void;
  connect: (deviceId?: string) => Promise<boolean>;
  disconnect: () => Promise<void>;
  registerSosListener: (listener: () => void) => () => void;
}

const DeviceContext = createContext<DeviceContextData>({} as DeviceContextData);

const LAST_DEVICE_KEY = '@spie_last_ble_device_id';

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [device, setDevice] = useState<Device | null>(null);
  const [status, setStatus] = useState<BLEConnectionStatus>('disconnected');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [pulseiraConfigurada, setPulseiraConfigurada] = useState<boolean>(false);
  const [discoveredDevices, setDiscoveredDevices] = useState<DeviceInfo[]>([]);

  const charSubscriptionRef = useRef<Subscription | null>(null);
  const sosListenersRef = useRef<Set<() => void>>(new Set());

  /**
   * Permite que módulos externos (ex: EmergencyContext) escutem o acionamento físico da pulseira.
   */
  const registerSosListener = useCallback((listener: () => void) => {
    sosListenersRef.current.add(listener);
    return () => {
      sosListenersRef.current.delete(listener);
    };
  }, []);

  const notifySosListeners = useCallback(() => {
    sosListenersRef.current.forEach((fn) => {
      try {
        fn();
      } catch (err) {
        console.warn('[DeviceContext] Erro ao notificar listener SOS:', err);
      }
    });
  }, []);

  /**
   * Configura o monitoramento da característica BLE após conectar.
   */
  const setupMonitoring = useCallback(
    (connectedDev: Device) => {
      charSubscriptionRef.current?.remove();

      charSubscriptionRef.current = bleDeviceService.monitorEmergencyCharacteristic(
        connectedDev,
        (val) => {
          if (val === BLE_CONFIG.COMMAND_SOS_TRIGGERED) {
            notifySosListeners();
          }
        },
        () => {
          // Callback de desconexão inesperada
          setDevice(null);
          setStatus('disconnected');
        }
      );
    },
    [notifySosListeners]
  );

  /**
   * Conecta a um dispositivo BLE específico ou busca pulseiras próximas automaticamente.
   */
  const connect = useCallback(
    async (deviceId?: string): Promise<boolean> => {
      setStatus('connecting');
      try {
        let targetId = deviceId || (await AsyncStorage.getItem(LAST_DEVICE_KEY));

        if (targetId) {
          try {
            const connectedDev = await bleDeviceService.connectToDevice(targetId);
            setDevice(connectedDev);
            setStatus('connected');
            setPulseiraConfigurada(true);
            await AsyncStorage.setItem(LAST_DEVICE_KEY, targetId);
            setupMonitoring(connectedDev);
            return true;
          } catch (connErr) {
            console.log('[DeviceContext] Falha ao reconectar no ID anterior, iniciando busca...', connErr);
          }
        }

        // Se não tem ID ou falhou, faz um scan e conecta ao primeiro encontrado
        return new Promise<boolean>((resolve) => {
          setIsScanning(true);
          let conectado = false;

          bleDeviceService.startScan(
            async (found) => {
              if (conectado) return;
              conectado = true;
              bleDeviceService.stopScan();
              setIsScanning(false);

              try {
                const connectedDev = await bleDeviceService.connectToDevice(found.id);
                setDevice(connectedDev);
                setStatus('connected');
                setPulseiraConfigurada(true);
                await AsyncStorage.setItem(LAST_DEVICE_KEY, found.id);
                setupMonitoring(connectedDev);
                resolve(true);
              } catch (err) {
                console.warn('[DeviceContext] Erro ao conectar no dispositivo encontrado:', err);
                setStatus('error');
                resolve(false);
              }
            },
            (error) => {
              setIsScanning(false);
              setStatus('error');
              resolve(false);
            }
          );

          // Timeout da busca automática
          setTimeout(() => {
            if (!conectado) {
              bleDeviceService.stopScan();
              setIsScanning(false);
              if (!device) {
                setStatus('disconnected');
              }
              resolve(false);
            }
          }, BLE_CONFIG.SCAN_TIMEOUT_MS);
        });
      } catch (err) {
        console.warn('[DeviceContext] Falha geral ao conectar:', err);
        setStatus('error');
        return false;
      }
    },
    [setupMonitoring, device]
  );

  /**
   * Inicia varredura por pulseiras SPIE próximas.
   */
  const startScan = useCallback(async () => {
    setIsScanning(true);
    setDiscoveredDevices([]);

    await bleDeviceService.startScan(
      (found) => {
        setDiscoveredDevices((prev) => {
          if (prev.some((d) => d.id === found.id)) return prev;
          return [...prev, found];
        });
      },
      () => {
        setIsScanning(false);
      }
    );

    // Finaliza varredura após o timeout
    setTimeout(() => {
      setIsScanning(false);
      bleDeviceService.stopScan();
    }, BLE_CONFIG.SCAN_TIMEOUT_MS);
  }, []);

  const stopScan = useCallback(() => {
    setIsScanning(false);
    bleDeviceService.stopScan();
  }, []);

  const disconnect = useCallback(async () => {
    if (device) {
      charSubscriptionRef.current?.remove();
      charSubscriptionRef.current = null;
      await bleDeviceService.disconnect(device.id);
      setDevice(null);
      setStatus('disconnected');
    }
  }, [device]);

  useEffect(() => {
    return () => {
      charSubscriptionRef.current?.remove();
    };
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        device,
        status,
        isScanning,
        pulseiraConfigurada,
        discoveredDevices,
        startScan,
        stopScan,
        connect,
        disconnect,
        registerSosListener,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice deve ser usado dentro de DeviceProvider');
  }
  return context;
};
