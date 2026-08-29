import { Device } from 'react-native-ble-plx';

export type BLEConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface DeviceInfo {
  id: string;
  name: string;
  rssi?: number | null;
}

export interface DeviceState {
  connectedDevice: Device | null;
  status: BLEConnectionStatus;
  isScanning: boolean;
  batteryLevel: number | null;
  pulseiraConfigurada: boolean;
}
