import { NativeModules, PermissionsAndroid, Platform, Linking } from 'react-native';
import * as SMS from 'expo-sms';

/**
 * Serviço responsável pelo envio nativo e silencioso de SMS via chip SIM do aparelho (Android)
 * e acionamento direto de chamadas telefônicas de emergência.
 */
export const directSmsService = {
  /**
   * Limpa e padroniza o número de telefone para envio de SMS ou ligação.
   * Converte automaticamente números com DDD (ex: 11999999999 ou (11) 99999-9999) para formato compatível.
   */
  cleanPhoneNumber(phone: string): string {
    if (!phone) return '';
    const digits = phone.replace(/[^\d]/g, '');
    if (!digits) return '';

    // Se o usuário digitou apenas o DDD + número (10 ou 11 dígitos, ex: 11999999999 ou 1188887777)
    if (digits.length === 10 || digits.length === 11) {
      return `+55${digits}`;
    }

    // Se já contém 12 ou 13 dígitos começando com 55 (ex: 5511999999999)
    if ((digits.length === 12 || digits.length === 13) && digits.startsWith('55')) {
      return `+${digits}`;
    }

    // Se começou com + explicitamente
    if (phone.trim().startsWith('+')) {
      return `+${digits}`;
    }

    return digits;
  },

  /**
   * Solicita permissão para envio de SMS e chamadas telefônicas no Android.
   */
  async requestPermission(): Promise<boolean> {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      ]);

      return (
        granted[PermissionsAndroid.PERMISSIONS.SEND_SMS] === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn('[DirectSmsService] Erro ao requisitar permissões de telefonia:', err);
      return false;
    }
  },

  /**
   * Envia SMS diretamente para um número de telefone com fallback automático.
   */
  async sendSms(phoneNumber: string, message: string): Promise<boolean> {
    const cleanPhone = this.cleanPhoneNumber(phoneNumber);
    if (!cleanPhone) {
      console.warn('[DirectSmsService] Número de telefone inválido:', phoneNumber);
      return false;
    }

    try {
      const directModule = NativeModules.DirectSmsModule;
      if (Platform.OS === 'android' && directModule && typeof directModule.sendDirectSms === 'function') {
        await directModule.sendDirectSms(cleanPhone, message);
        console.log(`[DirectSmsService] SMS silencioso enviado com sucesso para ${cleanPhone}`);
        return true;
      }
    } catch (directErr) {
      console.warn(`[DirectSmsService] Falha no DirectSmsModule para ${cleanPhone}, acionando fallback Expo SMS:`, directErr);
    }

    // Fallback via Expo SMS
    try {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        const { result } = await SMS.sendSMSAsync([cleanPhone], message);
        return result === 'sent';
      }
    } catch (fallbackErr) {
      console.error(`[DirectSmsService] Falha no envio via Expo SMS para ${cleanPhone}:`, fallbackErr);
    }

    return false;
  },

  /**
   * Envia a mensagem de socorro para múltiplos contatos.
   */
  async sendToMultipleNumbers(phoneNumbers: string[], message: string): Promise<number> {
    await this.requestPermission();
    let sentCount = 0;

    const cleanNumbers = phoneNumbers
      .map((p) => this.cleanPhoneNumber(p))
      .filter((p) => p.length >= 8);

    if (cleanNumbers.length === 0) {
      console.warn('[DirectSmsService] Nenhum telefone válido para disparo de mensagens.');
      return 0;
    }

    // Tenta envio direto para cada número individualmente
    for (const num of cleanNumbers) {
      const ok = await this.sendSms(num, message);
      if (ok) sentCount++;
    }

    // Se nenhum foi enviado diretamente pelo chip (ex: em emulador ou sem DirectSmsModule),
    // abre o Expo SMS com todos os destinatários agrupados
    if (sentCount === 0) {
      try {
        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
          await SMS.sendSMSAsync(cleanNumbers, message);
          sentCount = cleanNumbers.length;
        }
      } catch (err) {
        console.warn('[DirectSmsService] Falha ao disparar grupo SMS:', err);
      }
    }

    return sentCount;
  },

  /**
   * Envia uma rajada de múltiplas mensagens em sequência para chamar a atenção máxima do destinatário.
   */
  async sendBurstMessages(phoneNumbers: string[], messages: string[], delayMs = 1800): Promise<void> {
    for (let i = 0; i < messages.length; i++) {
      await this.sendToMultipleNumbers(phoneNumbers, messages[i]);
      if (i < messages.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  },

  /**
   * Inicia chamada telefônica IMEDIATA (ACTION_CALL) para o contato de emergência principal,
   * garantindo limpeza completa de caracteres para a operadora.
   */
  async makeEmergencyCall(phoneNumber: string): Promise<boolean> {
    const cleanPhone = this.cleanPhoneNumber(phoneNumber);
    if (!cleanPhone) {
      console.warn('[DirectSmsService] Telefone inválido para chamada:', phoneNumber);
      return false;
    }

    // 1. Tenta acionamento nativo direto (ACTION_CALL via DirectSmsModule)
    try {
      if (Platform.OS === 'android') {
        const hasCallPerm = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CALL_PHONE);
        if (!hasCallPerm) {
          const req = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CALL_PHONE, {
            title: 'Permissão de Chamada de Emergência',
            message: 'O SPIE precisa de permissão para ligar diretamente para seu contato de emergência.',
            buttonPositive: 'Permitir',
          });
          if (req !== PermissionsAndroid.RESULTS.GRANTED) {
            console.warn('[DirectSmsService] Permissão CALL_PHONE negada pelo usuário.');
          }
        }

        const directModule = NativeModules.DirectSmsModule;
        if (directModule && typeof directModule.startDirectCall === 'function') {
          await directModule.startDirectCall(cleanPhone);
          console.log(`[DirectSmsService] Chamada direta ACTION_CALL iniciada para ${cleanPhone}`);
          return true;
        }
      }
    } catch (directCallErr) {
      console.warn('[DirectSmsService] Falha ao disparar ACTION_CALL direto, usando fallback:', directCallErr);
    }

    // 2. Fallback via Linking tel:
    try {
      const url = `tel:${cleanPhone}`;
      const supported = await Linking.canOpenURL(url).catch(() => false);
      if (supported) {
        await Linking.openURL(url);
        console.log(`[DirectSmsService] Chamada fallback tel: aberta para ${cleanPhone}`);
        return true;
      }
      // Tenta abrir diretamente caso o sistema restrinja canOpenURL mas suporte a ação
      await Linking.openURL(url);
      return true;
    } catch (err) {
      console.error(`[DirectSmsService] Erro ao abrir fallback tel: para ${cleanPhone}:`, err);
    }

    return false;
  },
};
