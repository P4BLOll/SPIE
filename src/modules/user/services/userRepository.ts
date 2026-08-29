import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/services/firebaseConfig';
import { UserProfile } from '../types/user.types';

/**
 * Repositório responsável pela leitura e atualização do perfil do usuário no Firestore.
 */
export const userRepository = {
  getUserDocRef(uid: string) {
    return doc(db, 'users', uid);
  },

  async getUserProfile(uid?: string): Promise<UserProfile | null> {
    const targetUid = uid || auth.currentUser?.uid;
    if (!targetUid) return null;

    const snap = await getDoc(this.getUserDocRef(targetUid));
    return snap.exists() ? (snap.data() as UserProfile) : null;
  },

  async updateUserProfile(data: Partial<UserProfile>, uid?: string): Promise<void> {
    const targetUid = uid || auth.currentUser?.uid;
    if (!targetUid) throw new Error('Usuário não autenticado');

    await updateDoc(this.getUserDocRef(targetUid), data);
  },
};
