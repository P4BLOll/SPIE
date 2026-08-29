import React, { createContext, useContext, ReactNode } from 'react';
import { Device } from 'react-native-ble-plx';
import { useDevice } from '@/modules/device/hooks/useDevice';
import { useEmergency } from '@/modules/emergency/hooks/useEmergency';

/**
 * Interface compatível com o legado do BLEContext.
 */
interface BLEContextData {
  status: string;
  alertaAtivo: boolean;
  deviceConectado: Device | null;
  conectarDispositivo: () => Promise<void>;
  desativarAlertaManual: () => void;
}

const BLEContext = createContext<BLEContextData | undefined>(undefined);

/**
 * BLEProvider Adapter: unifica os estados do DeviceContext e EmergencyContext
 * para compatibilidade total com telas legadas.
 */
export function BLEProvider({ children }: { children: ReactNode }) {
  const { device, status: bleStatus, isScanning, connect } = useDevice();
  const { alertaAtivo, desativarAlerta } = useEmergency();

  const statusLabel =
    bleStatus === 'connected'
      ? 'Pulseira Conectada'
      : isScanning
      ? 'Buscando pulseira...'
      : bleStatus === 'connecting'
      ? 'Conectando...'
      : 'Desconectado';

  const conectarDispositivo = async () => {
    await connect();
  };

  const desativarAlertaManual = () => {
    desativarAlerta();
  };

  return (
    <BLEContext.Provider
      value={{
        status: statusLabel,
        alertaAtivo,
        deviceConectado: device,
        conectarDispositivo,
        desativarAlertaManual,
      }}
    >
      {children}
    </BLEContext.Provider>
  );
}

export function useBLE() {
  const context = useContext(BLEContext);
  if (!context) {
    throw new Error('useBLE deve ser usado dentro de BLEProvider');
  }
  return context;
}