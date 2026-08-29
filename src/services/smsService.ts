import { NativeModules, PermissionsAndroid, Platform } from 'react-native';

const { DirectSmsModule } = NativeModules;

/**
 * Solicita permissão para envio de SMS em segundo plano no Android.
 */
export async function requestSmsPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
          title: 'Permissão de Envio de SMS de Emergência',
          message: 'O SPIE precisa de permissão de SMS para enviar pedidos de socorro diretamente para sua rede de apoio sem abrir a tela.',
          buttonPositive: 'Permitir',
          buttonNegative: 'Cancelar',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('[SMS NATIVO] Erro ao requisitar permissão de SMS:', err);
      return false;
    }
  }
  return true;
}

/**
 * Envia um SMS nativo silencioso diretamente pelo chip SIM do aparelho.
 */
export async function sendDirectSms(phoneNumber: string, message: string): Promise<boolean> {
  try {
    if (Platform.OS === 'android' && DirectSmsModule?.sendDirectSms) {
      await DirectSmsModule.sendDirectSms(phoneNumber, message);
      console.log(`💬 [SMS NATIVO] SMS de socorro enviado com sucesso pelo chip para ${phoneNumber}!`);
      return true;
    } else {
      console.warn('[SMS NATIVO] Módulo nativo DirectSmsModule não disponível no ambiente atual.');
      return false;
    }
  } catch (error) {
    console.error(`[SMS NATIVO] Falha ao enviar SMS para ${phoneNumber}:`, error);
    return false;
  }
}
