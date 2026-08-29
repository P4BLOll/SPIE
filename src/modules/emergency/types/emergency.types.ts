export interface EmergencyContact {
  id?: string;
  nome: string;
  telefone: string;
  parentesco?: string;
  prioridade?: number;
  principal?: boolean;
  createdAt?: unknown;
}

export type AlertStatus = 'active' | 'resolved' | 'cancelled' | 'pending';

export interface AlertLocation {
  latitude: number;
  longitude: number;
  accuracy?: number | null;
  speed?: number | null;
  timestamp?: number;
  batteryLevel?: number | null;
}

export interface AlertHistoryItem {
  id: string;
  userId?: string;
  status: AlertStatus;
  tipo: string;
  device?: string;
  dispositivo?: string;
  localizacao?: AlertLocation;
  liveTrackingId?: string;
  createdAt: unknown;
  resolvidoEm?: unknown;
}

export interface LiveTrackingSession {
  alertId: string;
  userId: string;
  active: boolean;
  currentLocation: AlertLocation;
  startedAt: unknown;
  updatedAt: unknown;
  closedAt?: unknown;
}
