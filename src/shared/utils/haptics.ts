import { Platform, Vibration } from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * Utilitário central de feedback háptico (vibração tátil suave)
 * com fallback seguro para a API de vibração nativa.
 */
export const haptics = {
  /**
   * Feedback tátil muito suave, ideal para seleção de dias no calendário,
   * alternância de chips (sintomas, humor, secreção) e toques em listas.
   */
  selection() {
    try {
      Haptics.selectionAsync().catch(() => {
        if (Platform.OS === 'android') {
          Vibration.vibrate(15);
        }
      });
    } catch {
      if (Platform.OS === 'android') {
        Vibration.vibrate(15);
      }
    }
  },

  /**
   * Impacto leve: botões secundários, navegação rápida.
   */
  impactLight() {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {
        Vibration.vibrate(20);
      });
    } catch {
      Vibration.vibrate(20);
    }
  },

  /**
   * Impacto médio: botões principais, salvar registros, adicionar contato.
   */
  impactMedium() {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {
        Vibration.vibrate(35);
      });
    } catch {
      Vibration.vibrate(35);
    }
  },

  /**
   * Impacto forte: ações críticas, início de contagem do SOS.
   */
  impactHeavy() {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {
        Vibration.vibrate(60);
      });
    } catch {
      Vibration.vibrate(60);
    }
  },

  /**
   * Notificação de sucesso: registro salvo, PIN criado, SOS cancelado com segurança.
   */
  success() {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {
        Vibration.vibrate([0, 20, 50, 25]);
      });
    } catch {
      Vibration.vibrate([0, 20, 50, 25]);
    }
  },

  /**
   * Notificação de aviso: alerta de campos obrigatórios ou atraso de ciclo.
   */
  warning() {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {
        Vibration.vibrate([0, 30, 60, 30]);
      });
    } catch {
      Vibration.vibrate([0, 30, 60, 30]);
    }
  },

  /**
   * Notificação de erro: falha de autenticação, erro no envio de alerta.
   */
  error() {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {
        Vibration.vibrate([0, 40, 80, 50]);
      });
    } catch {
      Vibration.vibrate([0, 40, 80, 50]);
    }
  },
};
