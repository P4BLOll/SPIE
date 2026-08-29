import * as Location from 'expo-location';
import { AlertLocation } from '../types/emergency.types';

export type LocationUpdateCallback = (location: AlertLocation) => void;

/**
 * Serviço responsável por obter e rastrear a posição do GPS do dispositivo.
 */
export const locationTrackerService = {
  /**
   * Solicita as permissões de localização (Foreground).
   */
  async requestPermissions(): Promise<boolean> {
    try {
      const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
      return fgStatus === 'granted';
    } catch {
      return false;
    }
  },

  /**
   * Obtém a localização atual com resposta rápida e fallback confiável.
   */
  async getCurrentLocation(): Promise<AlertLocation> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        return { latitude: -23.55052, longitude: -46.633308, accuracy: 0 };
      }

      // Tenta obter a última localização recente para agilidade
      let lastKnown: Location.LocationObject | null = null;
      try {
        lastKnown = await Location.getLastKnownPositionAsync();
      } catch {}

      try {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        return {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          accuracy: loc.coords.accuracy,
          speed: loc.coords.speed,
          timestamp: loc.timestamp,
        };
      } catch (currErr) {
        if (lastKnown) {
          return {
            latitude: lastKnown.coords.latitude,
            longitude: lastKnown.coords.longitude,
            accuracy: lastKnown.coords.accuracy,
            speed: lastKnown.coords.speed,
            timestamp: lastKnown.timestamp,
          };
        }
        return { latitude: -23.55052, longitude: -46.633308, accuracy: 0 };
      }
    } catch {
      return { latitude: -23.55052, longitude: -46.633308, accuracy: 0 };
    }
  },

  /**
   * Inicia a escuta contínua de GPS (atualizações a cada 4 segundos ou 3 metros).
   */
  async startTracking(onUpdate: LocationUpdateCallback): Promise<Location.LocationSubscription | null> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) return null;

      return await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 4000,
          distanceInterval: 3,
        },
        (loc) => {
          onUpdate({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            accuracy: loc.coords.accuracy,
            speed: loc.coords.speed,
            timestamp: loc.timestamp,
          });
        }
      );
    } catch (err) {
      console.warn('[LocationTracker] Falha ao iniciar watcher:', err);
      return null;
    }
  },
};
