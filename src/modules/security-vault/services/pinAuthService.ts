import AsyncStorage from '@react-native-async-storage/async-storage';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '@/services/firebaseConfig';

export const PIN_STORAGE_KEY = 'secret_pin';
export const PIN_CUSTOMIZED_KEY = 'secret_pin_customized';
export const DEFAULT_PIN = '1234';

/**
 * Serviço responsável pela validação, redefinição e armazenamento local do PIN da Área Secreta.
 */
export const pinAuthService = {
  isValidPinFormat(pin: string): boolean {
    return pin.length === 4 && /^\d{4}$/.test(pin);
  },

  async getSavedPin(): Promise<string> {
    try {
      const pin = await AsyncStorage.getItem(PIN_STORAGE_KEY);
      if (!pin) {
        // Se ainda não foi criado nenhum PIN, define a senha padrão '1234'
        await AsyncStorage.setItem(PIN_STORAGE_KEY, DEFAULT_PIN);
        return DEFAULT_PIN;
      }
      return pin;
    } catch {
      return DEFAULT_PIN;
    }
  },

  async isDefaultPin(): Promise<boolean> {
    try {
      const customizado = await AsyncStorage.getItem(PIN_CUSTOMIZED_KEY);
      if (customizado === 'true') {
        return false;
      }
      const pin = await this.getSavedPin();
      return pin === DEFAULT_PIN;
    } catch {
      return false;
    }
  },

  async savePin(pin: string): Promise<boolean> {
    if (!this.isValidPinFormat(pin)) return false;
    try {
      await AsyncStorage.setItem(PIN_STORAGE_KEY, pin);
      await AsyncStorage.setItem(PIN_CUSTOMIZED_KEY, 'true');
      return true;
    } catch {
      return false;
    }
  },

  async verifyPin(pin: string): Promise<boolean> {
    if (!this.isValidPinFormat(pin)) return false;
    const saved = await this.getSavedPin();
    return saved === pin;
  },

  async changePin(currentPin: string, newPin: string): Promise<boolean> {
    const isCurrentValid = await this.verifyPin(currentPin);
    if (!isCurrentValid) return false;
    return await this.savePin(newPin);
  },

  /**
   * Permite redefinir o PIN caso o usuário tenha esquecido,
   * comprovando sua identidade com a senha de login da sua conta Firebase.
   */
  async redefinirPinComSenhaDaConta(
    senhaConta: string,
    novoPin: string
  ): Promise<{ sucesso: boolean; mensagem?: string }> {
    if (!this.isValidPinFormat(novoPin)) {
      return { sucesso: false, mensagem: 'O novo PIN deve ter exatamente 4 números.' };
    }

    const user = auth.currentUser;
    if (!user || !user.email) {
      return { sucesso: false, mensagem: 'Sessão expirada. Faça login novamente na conta.' };
    }

    try {
      const credencial = EmailAuthProvider.credential(user.email, senhaConta);
      await reauthenticateWithCredential(user, credencial);
      const salvo = await this.savePin(novoPin);
      if (salvo) {
        return { sucesso: true };
      }
      return { sucesso: false, mensagem: 'Não foi possível salvar o novo PIN.' };
    } catch (error: any) {
      console.warn('[pinAuthService] Erro ao reautenticar com senha da conta:', error);
      if (
        error?.code === 'auth/wrong-password' ||
        error?.code === 'auth/invalid-credential' ||
        error?.code === 'auth/invalid-login-credentials'
      ) {
        return { sucesso: false, mensagem: 'A senha da sua conta está incorreta.' };
      }
      if (error?.code === 'auth/too-many-requests') {
        return { sucesso: false, mensagem: 'Muitas tentativas sem sucesso. Tente novamente mais tarde.' };
      }
      return { sucesso: false, mensagem: 'Não foi possível validar a senha da sua conta.' };
    }
  },
};
