import { doc, getDoc, setDoc, increment } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { DadosCalendario } from '../types/cycle.types';

/**
 * Repositório responsável pela persistência dos dados do ciclo menstrual no Firestore.
 */
export const cycleRepository = {
  getCalendarDocRef(uid: string) {
    return doc(db, 'users', uid, 'calendar', 'data');
  },

  async loadCalendarData(uid: string): Promise<Partial<DadosCalendario> | null> {
    const ref = this.getCalendarDocRef(uid);
    const snap = await getDoc(ref);
    return snap.exists() ? (snap.data() as Partial<DadosCalendario>) : null;
  },

  async saveCalendarData(uid: string, data: Partial<DadosCalendario>): Promise<void> {
    const ref = this.getCalendarDocRef(uid);
    await setDoc(
      ref,
      {
        ...data,
        dataVersion: increment(1),
        atualizadoEm: new Date(),
      },
      { merge: true }
    );
  },
};

