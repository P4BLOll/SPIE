import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Platform, PermissionsAndroid, Vibration } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import { Buffer as ExpoBuffer } from 'buffer';

interface BLEContextData {
  status: string;
  alertaAtivo: boolean;
  deviceConectado: Device | null;
  conectarDispositivo: () => Promise<void>;
  desativarAlertaManual: () => void;
}

const BLEContext = createContext<BLEContextData | undefined>(undefined);
const manager = new BleManager();

const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

const PADRAO_ALARME_VIBRACAO = [500, 1000, 500, 1000, 500, 1000];

export function BLEProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState('Desconectado');
  const [alertaAtivo, setAlertaAtivo] = useState(false);
  const [deviceConectado, setDeviceConectado] = useState<Device | null>(null);

  const requisitarPermissoes = async () => {
    if (Platform.OS === 'android') {
      const concedida = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);
      return concedida['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const conectarDispositivo = async () => {
    const temPermissao = await requisitarPermissoes();
    if (!temPermissao) {
      setStatus('Permissão negada');
      return;
    }

    setStatus('Buscando pulseira...');
    manager.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        console.log('Erro no escaneamento:', error);
        setStatus('Erro no rastreamento');
        return;
      }

      if (device?.name === 'ESP32S3_Simulador' || device?.name === 'SPIE_Hardware') {
        manager.stopDeviceScan();
        setStatus('Conectando...');
        
        try {
          const conectado = await device.connect();
          const descoberto = await conectado.discoverAllServicesAndCharacteristics();
          setDeviceConectado(descoberto);
          setStatus('Pulseira Conectada');
          
          manager.onDeviceDisconnected(descoberto.id, () => {
            setStatus('Desconectado');
            setDeviceConectado(null);
            Vibration.cancel();
          });

          ouvirSinal(descoberto.id);
        } catch (err) {
          setStatus('Falha na conexão');
          console.log('Erro ao conectar no dispositivo:', err);
        }
      }
    });
  };

  const ouvirSinal = (deviceId: string) => {
    manager.monitorCharacteristicForDevice(
      deviceId,
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      (error, characteristic) => {
        if (error) {
          console.log('Erro no monitoramento de sinal:', error);
          setStatus('Conexão perdida');
          setDeviceConectado(null);
          Vibration.cancel();
          return;
        }

        if (characteristic?.value) {
          const dadoDecodificado = ExpoBuffer.from(characteristic.value, 'base64').toString('ascii');
          
          if (dadoDecodificado === '1') {
            setAlertaAtivo(true);
            Vibration.vibrate(PADRAO_ALARME_VIBRACAO, true);
          }
        }
      }
    );
  };

  const desativarAlertaManual = () => {
    setAlertaAtivo(false);
    Vibration.cancel();
  };

  useEffect(() => {
    return () => {
      if (deviceConectado) {
        deviceConectado.cancelConnection();
      }
      Vibration.cancel();
    };
  }, [deviceConectado]);

  return (
    <BLEContext.Provider value={{ status, alertaAtivo, deviceConectado, conectarDispositivo, desativarAlertaManual }}>
      {children}
    </BLEContext.Provider>
  );
}

export function useBLE() {
  const context = useContext(BLEContext);
  if (!context) {
    throw new Error('useBLE deve ser usado dentro de um BLEProvider');
  }
  return context;
}