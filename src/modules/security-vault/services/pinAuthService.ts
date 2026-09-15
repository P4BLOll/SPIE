import AsyncStorage from '@react-native-async-storage/async-storage';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/services/firebaseConfig';

export const PIN_STORAGE_KEY = 'secret_pin';
export const PIN_CUSTOMIZED_KEY = 'secret_pin_customized';
export const DEFAULT_PIN = '1234';

export function getPinStorageKey(userId?: string | null): string {
  const uid = userId || auth.currentUser?.uid;
  return uid ? `@spie_secret_pin_${uid}` : PIN_STORAGE_KEY;
}

export function getPinCustomizedKey(userId?: string | null): string {
  const uid = userId || auth.currentUser?.uid;
  return uid ? `@spie_secret_pin_customized_${uid}` : PIN_CUSTOMIZED_KEY;
}

/**
 * Service responsible for PIN validation, reset, and isolated storage for the Secret Vault.
 */
export const pinAuthService = {
  isValidPinFormat(pin: string): boolean {
    return pin.length === 4 && /^\d{4}$/.test(pin);
  },

  async getSavedPin(userId?: string | null): Promise<string | null> {
    const uid = userId || auth.currentUser?.uid;
    const storageKey = getPinStorageKey(uid);

    try {
      // 1. Try user-scoped local storage
      const localPin = await AsyncStorage.getItem(storageKey);
      if (localPin) {
        return localPin;
      }

      // 2. If not found locally and user is logged in, try fetching from Firestore
      if (uid) {
        try {
          const userDoc = await getDoc(doc(db, 'users', uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (typeof data?.secretPin === 'string' && data.secretPin.trim().length === 4) {
              const cloudPin = data.secretPin.trim();
              await AsyncStorage.setItem(storageKey, cloudPin);
              if (data.secretPinCustomized) {
                await AsyncStorage.setItem(getPinCustomizedKey(uid), 'true');
              }
              return cloudPin;
            }
          }
        } catch (firestoreError) {
          console.warn('[pinAuthService] Firestore offline or error loading PIN:', firestoreError);
        }
      }

      return null;
    } catch {
      return null;
    }
  },

  async isDefaultPin(userId?: string | null): Promise<boolean> {
    try {
      const uid = userId || auth.currentUser?.uid;
      const customized = await AsyncStorage.getItem(getPinCustomizedKey(uid));
      if (customized === 'true') {
        return false;
      }
      const pin = await this.getSavedPin(uid);
      return pin === null || pin === DEFAULT_PIN;
    } catch {
      return false;
    }
  },

  async savePin(pin: string, userId?: string | null): Promise<boolean> {
    if (!this.isValidPinFormat(pin)) return false;
    const uid = userId || auth.currentUser?.uid;
    const storageKey = getPinStorageKey(uid);
    const customizedKey = getPinCustomizedKey(uid);

    try {
      await AsyncStorage.setItem(storageKey, pin);
      await AsyncStorage.setItem(customizedKey, 'true');

      // Sync with Firestore if authenticated
      if (uid) {
        try {
          await updateDoc(doc(db, 'users', uid), {
            secretPin: pin,
            secretPinCustomized: true,
            secretPinUpdatedAt: new Date().toISOString(),
          });
        } catch (firestoreError) {
          console.warn('[pinAuthService] Warning saving PIN to Firestore:', firestoreError);
        }
      }

      return true;
    } catch {
      return false;
    }
  },

  async verifyPin(pin: string, userId?: string | null): Promise<boolean> {
    if (!this.isValidPinFormat(pin)) return false;
    const saved = await this.getSavedPin(userId);
    if (!saved) {
      return pin === DEFAULT_PIN;
    }
    return saved === pin;
  },

  async changePin(currentPin: string, newPin: string, userId?: string | null): Promise<boolean> {
    const isCurrentValid = await this.verifyPin(currentPin, userId);
    if (!isCurrentValid) return false;
    return await this.savePin(newPin, userId);
  },

  /**
   * Resets the Secret PIN using the user's Firebase account login password.
   */
  async redefinirPinComSenhaDaConta(
    senhaConta: string,
    novoPin: string,
    userId?: string | null
  ): Promise<{ sucesso: boolean; mensagem?: string }> {
    if (!this.isValidPinFormat(novoPin)) {
      return { sucesso: false, mensagem: 'The new PIN must have exactly 4 digits.' };
    }

    const user = auth.currentUser;
    if (!user || !user.email) {
      return { sucesso: false, mensagem: 'Session expired. Please log in again.' };
    }

    try {
      const credencial = EmailAuthProvider.credential(user.email, senhaConta);
      await reauthenticateWithCredential(user, credencial);
      const salvo = await this.savePin(novoPin, userId || user.uid);
      if (salvo) {
        return { sucesso: true };
      }
      return { sucesso: false, mensagem: 'Could not save the new PIN.' };
    } catch (error: any) {
      console.warn('[pinAuthService] Error reauthenticating with account password:', error);
      if (
        error?.code === 'auth/wrong-password' ||
        error?.code === 'auth/invalid-credential' ||
        error?.code === 'auth/invalid-login-credentials'
      ) {
        return { sucesso: false, mensagem: 'Your account password is incorrect.' };
      }
      if (error?.code === 'auth/too-many-requests') {
        return { sucesso: false, mensagem: 'Too many attempts. Please try again later.' };
      }
      return { sucesso: false, mensagem: 'Unable to verify your account password.' };
    }
  },
};
