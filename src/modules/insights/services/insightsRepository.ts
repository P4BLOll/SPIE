import { doc, getDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, functions } from '@/services/firebaseConfig';
import { StoredInsightCache } from '../types/insights.types';

export const insightsRepository = {
  getInsightDocRef(uid: string) {
    return doc(db, 'users', uid, 'insights', 'current');
  },

  async carregarInsightCache(uid: string): Promise<StoredInsightCache | null> {
    try {
      const ref = this.getInsightDocRef(uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return snap.data() as StoredInsightCache;
      }
      return null;
    } catch (error) {
      console.warn('[insightsRepository] Erro ao carregar cache de insights:', error);
      return null;
    }
  },

  async requisitarInsightsIA(forcarRecalculo = false): Promise<StoredInsightCache | null> {
    try {
      const getSmartInsightsCallable = httpsCallable<
        { forcarRecalculo: boolean },
        StoredInsightCache
      >(functions, 'getSmartInsights');

      const response = await getSmartInsightsCallable({ forcarRecalculo });
      return response.data ?? null;
    } catch (error: any) {
      if (error?.code === 'functions/not-found' || error?.message?.includes('not-found')) {
        console.info('[insightsRepository] Cloud Function getSmartInsights ainda não foi deployada na nuvem. Utilizando análise local.');
      } else {
        console.warn('[insightsRepository] Erro ao chamar Cloud Function getSmartInsights:', error?.message ?? error);
      }
      return null;
    }
  },
};
