/**
 * Constantes e UUIDs do protocolo Bluetooth Low Energy da Pulseira SPIE ESP32.
 */
export const BLE_CONFIG = {
  DEVICE_NAME: 'SPIE_PULSEIRA',
  DEVICE_NAMES: [
    'ESP32S3_Simulador',
    'SPIE_Hardware',
    'SPIE_PULSEIRA',
    'SPIE',
    'ESP32',
  ],
  SERVICE_UUID: '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
  CHARACTERISTIC_UUID: 'beb5483e-36e1-4688-b7f5-ea07361b26a8',
  COMMAND_SOS_TRIGGERED: '1',
  SCAN_TIMEOUT_MS: 15000,
  RECONNECT_INTERVAL_MS: 5000,
} as const;
