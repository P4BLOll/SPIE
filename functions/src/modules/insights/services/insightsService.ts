import { getFirestore } from 'firebase-admin/firestore';
import * as logger from 'firebase-functions/logger';
import {
  RawCycleData,
  StoredInsightCache,
  GeminiInsightPayload,
  SmartInsightResult,
} from '../types/insights.types';
import { cycleAnalyticsEngine } from './cycleAnalyticsEngine';
import { clinicalSafetyRules } from './clinicalSafetyRules';
import { geminiClient } from './geminiClient';
import { outputValidator } from './outputValidator';
import { fallbackInsightsService } from './fallbackInsightsService';

const TTL_CACHE_MS = 24 * 60 * 60 * 1000; // 24 horas

export const insightsService = {
  async obterOuGerarInsights(uid: string, forcarRecalculo = false): Promise<StoredInsightCache | null> {
    const db = getFirestore();
    const calendarRef = db.doc(`users/${uid}/calendar/data`);
    const insightsRef = db.doc(`users/${uid}/insights/current`);

    const calendarSnap = await calendarRef.get();
    if (!calendarSnap.exists) {
      logger.info(`[InsightsService] Usuário ${uid} ainda não possui registros de calendário.`);
      return null;
    }

    const calendarData = calendarSnap.data() as RawCycleData;
    const versaoDadosAtual = calendarData.dataVersion ?? 1;

    // Verificar cache existente se não foi forçado recálculo
    if (!forcarRecalculo) {
      const insightSnap = await insightsRef.get();
      if (insightSnap.exists) {
        const cache = insightSnap.data() as StoredInsightCache;
        const cacheNaoExpirado = new Date(cache.expiraEm).getTime() > Date.now();
        const mesmaVersao = cache.dataVersionConsumida === versaoDadosAtual;

        if (cacheNaoExpirado && mesmaVersao) {
          logger.info(`[InsightsService] Cache válido utilizado para o usuário ${uid}.`);
          return cache;
        }
      }
    }

    logger.info(`[InsightsService] Processando novos insights para o usuário ${uid} (versão: ${versaoDadosAtual}).`);

    // 1. Cálculos determinísticos (0ms, sem erro matemático)
    const metricas = cycleAnalyticsEngine.processarMetricas(calendarData);

    // 2. Motor determinístico de regras de segurança
    const seguranca = clinicalSafetyRules.avaliarSeguranca(metricas);

    // 3. Compactação do payload anônimo para o Gemini
    const payloadIA: GeminiInsightPayload = {
      contexto: {
        faseAtual: metricas.faseAtual,
        diaDoCiclo: metricas.diaDoCiclo,
        duracaoCiclo: metricas.duracaoCiclo,
        regularidadeStatus: metricas.regularidadeStatus,
      },
      sintomasObservados: metricas.sintomasFrequentes.map((s) => ({
        sintoma: s.sintoma,
        contagem: s.contagem,
        fase: s.fasePredominante,
      })),
      humorObservado: metricas.humorPredominante,
      diretrizesSeguranca: {
        sugerirAtencaoMedica: seguranca.sugerirConsultaMedica,
        focoBemEstar: seguranca.focoBemEstar,
      },
    };

    // 4. Chamada da IA com tentativa e validação
    let insightFinal: SmartInsightResult;
    let origem: 'ia' | 'fallback' = 'fallback';

    const respostaIA = await geminiClient.gerarInsight(payloadIA);

    if (respostaIA) {
      const validacao = outputValidator.validar(respostaIA);
      if (validacao.valido) {
        insightFinal = validacao.resultado;
        origem = 'ia';
        logger.info(`[InsightsService] Insight gerado com sucesso via Gemini para ${uid}.`);
      } else {
        logger.warn(`[InsightsService] Saída da IA rejeitada por validação (${validacao.erro}). Aplicando fallback.`);
        insightFinal = fallbackInsightsService.gerarInsight(metricas, seguranca);
      }
    } else {
      logger.info(`[InsightsService] Utilizando fallback determinístico para ${uid}.`);
      insightFinal = fallbackInsightsService.gerarInsight(metricas, seguranca);
    }

    // 5. Estruturar documento de cache
    const agora = new Date();
    const expiraEm = new Date(agora.getTime() + TTL_CACHE_MS);

    const cacheParaSalvar: StoredInsightCache = {
      dataVersionConsumida: versaoDadosAtual,
      geradoEm: agora.toISOString(),
      expiraEm: expiraEm.toISOString(),
      insight: insightFinal,
      metricas,
      origem,
    };

    // Salvar no Firestore
    await insightsRef.set(cacheParaSalvar);

    return cacheParaSalvar;
  },
};
