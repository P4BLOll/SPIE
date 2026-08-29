import AsyncStorage from '@react-native-async-storage/async-storage';

const PIN_STORAGE_KEY = 'secret_pin';

/**
 * Serviço responsável pela validação e armazenamento local do PIN da Área Secreta.
 */
export const pinAuthService = {
  isValidPinFormat(pin: string): boolean {
    return pin.length === 4 && /^\d{4}$/.test(pin);
  },

  async getSavedPin(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(PIN_STORAGE_KEY);
    } catch {
      return null;
    }
  },

  async savePin(pin: string): Promise<boolean> {
    if (!this.isValidPinFormat(pin)) return false;
    try {
      await AsyncStorage.setItem(PIN_STORAGE_KEY, pin);
      return true;
    } catch {
      return false;
    }
  },

  async verifyPin(pin: string): Promise<boolean> {
    if (!this.isValidPinFormat(pin)) return false;
    const saved = await this.getSavedPin();
    return saved !== null && saved === pin;
  },

  async changePin(currentPin: string, newPin: string): Promise<boolean> {
    const isCurrentValid = await this.verifyPin(currentPin);
    if (!isCurrentValid) return false;
    return await this.savePin(newPin);
  },
};
