import { useState, useEffect, useCallback, useRef } from 'react';
import { auth } from '@/services/firebaseConfig';
import { DadosCalendario } from '@/modules/cycle/types/cycle.types';
import { StoredInsightCache } from '../types/insights.types';
import { insightsRepository } from '../services/insightsRepository';
import { localInsightsEngine } from '../services/localInsightsEngine';

export function useSmartInsights(dadosCiclo?: DadosCalendario | null) {
  const [dados, setDados] = useState<StoredInsightCache | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [atualizando, setAtualizando] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);

  const ultimaRequisicaoRef = useRef<number>(0);

  const carregarInsights = useCallback(
    async (forcarRecalculo = false) => {
      const user = auth.currentUser;
      if (!user) {
        if (dadosCiclo && dadosCiclo.ultimaMenstruacao) {
          setDados(localInsightsEngine.gerarInsightLocal(dadosCiclo));
        } else {
          setDados(null);
        }
        setCarregando(false);
        return;
      }

      // Debounce simples de 3 segundos
      const agora = Date.now();
      if (forcarRecalculo && agora - ultimaRequisicaoRef.current < 3000) {
        return;
      }
      ultimaRequisicaoRef.current = agora;

      try {
        if (forcarRecalculo) {
          setAtualizando(true);
        } else {
          setCarregando(true);
        }
        setErro(null);

        // 1. Tentar ler do cache Firestore (resposta em ~50ms)
        if (!forcarRecalculo) {
          const cache = await insightsRepository.carregarInsightCache(user.uid);
          if (cache) {
            setDados(cache);
            setCarregando(false);

            const cacheValido = new Date(cache.expiraEm).getTime() > Date.now();
            if (cacheValido) {
              return;
            }
          }
        }

        // 2. Tenta requisitar da Cloud Function (com IA no backend)
        const novoInsight = await insightsRepository.requisitarInsightsIA(forcarRecalculo);
        if (novoInsight) {
          setDados(novoInsight);
          return;
        }

        // 3. Fallback Local Imediato (se a Cloud Function ainda não foi deployada ou sem rede)
        if (dadosCiclo && dadosCiclo.ultimaMenstruacao) {
          const fallbackLocal = localInsightsEngine.gerarInsightLocal(dadosCiclo);
          setDados(fallbackLocal);
        } else if (!dados) {
          const cacheEmergencia = await insightsRepository.carregarInsightCache(user.uid);
          if (cacheEmergencia) {
            setDados(cacheEmergencia);
          }
        }
      } catch (e: any) {
        console.warn('[useSmartInsights] Aplicando fallback local devido a erro:', e?.message ?? e);
        if (dadosCiclo && dadosCiclo.ultimaMenstruacao) {
          setDados(localInsightsEngine.gerarInsightLocal(dadosCiclo));
        }
      } finally {
        setCarregando(false);
        setAtualizando(false);
      }
    },
    [dadosCiclo, dados]
  );

  useEffect(() => {
    carregarInsights(false);
  }, [dadosCiclo?.ultimaMenstruacao, dadosCiclo?.duracaoCiclo, dadosCiclo?.duracaoMenstruacao]);

  return {
    dados,
    metricas: dados?.metricas ?? null,
    insight: dados?.insight ?? null,
    origem: dados?.origem ?? null,
    carregando,
    atualizando,
    erro,
    recarregar: () => carregarInsights(true),
  };
}
