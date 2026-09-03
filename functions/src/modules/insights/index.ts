import { onCall, HttpsError } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { insightsService } from './services/insightsService';

export const getSmartInsights = onCall(
  {
    region: 'southamerica-east1',
  },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Usuário não autenticado para consultar insights.');
    }

    const uid = request.auth.uid;
    const forcarRecalculo = Boolean(request.data?.forcarRecalculo);

    try {
      const resultado = await insightsService.obterOuGerarInsights(uid, forcarRecalculo);
      return resultado;
    } catch (error: any) {
      logger.error(`[getSmartInsights] Erro ao processar insights para o usuário ${uid}:`, error);
      throw new HttpsError('internal', 'Ocorreu um erro interno ao gerar os insights.');
    }
  }
);
