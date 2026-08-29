import { BleManager, Device, State, Subscription } from 'react-native-ble-plx';
import { Platform, PermissionsAndroid } from 'react-native';
import { Buffer } from 'buffer';
import { BLE_CONFIG } from '../ble/bleConstants';
import { DeviceInfo } from '../types/device.types';

function isSpieDevice(name?: string | null): boolean {
  if (!name) return false;
  const validNames = BLE_CONFIG.DEVICE_NAMES;
  return validNames.some((v) => name.toLowerCase().includes(v.toLowerCase()));
}

class BleDeviceService {
  private manager: BleManager | null = null;

  getBleManager(): BleManager | null {
    if (!this.manager) {
      try {
        this.manager = new BleManager();
      } catch (err) {
        console.warn('[BleDeviceService] Falha ao instanciar BleManager de forma segura:', err);
        return null;
      }
    }
    return this.manager;
  }

  /**
   * Solicita as permissões Bluetooth necessárias de acordo com a versão do Android.
   */
  async requestPermissions(): Promise<boolean> {
    if (Platform.OS !== 'android') return true;

    try {
      if (Platform.Version >= 31) {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        return (
          granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch {
      return false;
    }
  }

  /**
   * Inicia varredura por dispositivos BLE disponíveis com o nome da pulseira SPIE / ESP32.
   */
  async startScan(onDeviceFound: (device: DeviceInfo) => void, onError?: (error: Error) => void): Promise<void> {
    const mgr = this.getBleManager();
    if (!mgr) {
      onError?.(new Error('Bluetooth não disponível neste aparelho.'));
      return;
    }

    const hasPerm = await this.requestPermissions();
    if (!hasPerm) {
      onError?.(new Error('Permissão Bluetooth negada'));
      return;
    }

    try {
      const state = await mgr.state();
      if (state !== State.PoweredOn) {
        onError?.(new Error('Bluetooth desligado'));
        return;
      }

      mgr.stopDeviceScan();

      mgr.startDeviceScan(null, null, (error, device) => {
        if (error) {
          onError?.(error);
          return;
        }
        if (device && device.name && isSpieDevice(device.name)) {
          onDeviceFound({
            id: device.id,
            name: device.name,
            rssi: device.rssi,
          });
        }
      });
    } catch (scanErr: any) {
      console.warn('[BleDeviceService] Erro ao iniciar varredura BLE:', scanErr);
      onError?.(scanErr);
    }
  }

  /**
   * Para a varredura ativa de dispositivos.
   */
  stopScan(): void {
    try {
      this.getBleManager()?.stopDeviceScan();
    } catch {}
  }

  /**
   * Conecta a um dispositivo BLE e descobre todos os serviços e características GATT.
   */
  async connectToDevice(deviceId: string): Promise<Device> {
    const mgr = this.getBleManager();
    if (!mgr) throw new Error('BleManager não inicializado.');
    this.stopScan();

    const device = await mgr.connectToDevice(deviceId, { autoConnect: true });
    await device.discoverAllServicesAndCharacteristics();
    return device;
  }

  /**
   * Configura o listener de notificações na característica de alerta da pulseira.
   */
  monitorEmergencyCharacteristic(
    device: Device,
    onValueReceived: (value: string) => void,
    onDisconnected?: () => void
  ): Subscription {
    const mgr = this.getBleManager();
    if (!mgr) {
      return { remove: () => {} };
    }

    // Monitora desconexão inesperada do dispositivo
    const disconnectSub = mgr.onDeviceDisconnected(device.id, () => {
      onDisconnected?.();
    });

    const charSub = mgr.monitorCharacteristicForDevice(
      device.id,
      BLE_CONFIG.SERVICE_UUID,
      BLE_CONFIG.CHARACTERISTIC_UUID,
      (error, characteristic) => {
        if (error) {
          console.warn('[BLE] Erro ao monitorar característica:', error);
          onDisconnected?.();
          return;
        }
        if (characteristic?.value) {
          try {
            const decoded = Buffer.from(characteristic.value, 'base64').toString('ascii').trim();
            onValueReceived(decoded);
          } catch (e) {
            console.warn('[BLE] Erro ao decodificar sinal:', e);
          }
        }
      }
    );

    return {
      remove: () => {
        try {
          disconnectSub.remove();
          charSub.remove();
        } catch {}
      },
    };
  }

  /**
   * Desconecta explicitamente de um dispositivo BLE.
   */
  async disconnect(deviceId: string): Promise<void> {
    try {
      await this.getBleManager()?.cancelDeviceConnection(deviceId);
    } catch {
      // Ignora erro se já estiver desconectado
    }
  }

  /**
   * Destrói a instância do BleManager ao finalizar o aplicativo.
   */
  destroy(): void {
    if (this.manager) {
      try {
        this.manager.destroy();
      } catch {}
      this.manager = null;
    }
  }
}

export const bleDeviceService = new BleDeviceService();
