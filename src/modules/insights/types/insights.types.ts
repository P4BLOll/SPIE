export interface CycleMetrics {
  diaDoCiclo: number | null;
  faseAtual: string;
  duracaoCiclo: number;
  duracaoMenstruacao: number;
  progressoCiclo: number;
  proximaMenstruacao: string | null;
  diasAtraso: number | null;
  ovulacaoEstimada: string | null;
  periodoFertil: { inicio: string; fim: string } | null;
  totalDiasRegistrados: number;
  sintomasFrequentes: Array<{
    sintoma: string;
    contagem: number;
    fasePredominante: string;
  }>;
  humorPredominante: string | null;
  humoresFrequentes: Array<{ humor: string; contagem: number }>;
  secrecaoPredominante: string | null;
  regularidadeStatus: 'regular' | 'irregular' | 'inicial';
}

export interface SmartInsightResult {
  resumoFase: string;
  padraoObservado: string;
  dicaBemEstar: string;
  notaAcompanhamento: string | null;
}

export interface StoredInsightCache {
  dataVersionConsumida: number;
  geradoEm: string;
  expiraEm: string;
  insight: SmartInsightResult;
  metricas: CycleMetrics;
  origem: 'ia' | 'fallback';
}
