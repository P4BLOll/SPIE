export interface SintomaItem {
  id?: string;
  tipo?: string;
  intensidade?: string | null;
}

export interface SecrecaoItem {
  tipo?: string;
  observacao?: string;
}

export interface RegistroDiaBackend {
  sintomas?: Array<string | SintomaItem>;
  secrecao?: string | SecrecaoItem;
  humor?: string;
}

export interface RawCycleData {
  ultimaMenstruacao: string | null;
  duracaoMenstruacao: number;
  duracaoCiclo: number;
  registros: Record<string, RegistroDiaBackend>;
  dataVersion?: number;
  atualizadoEm?: any;
}

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

export interface SafetyRulesOutput {
  sugerirConsultaMedica: boolean;
  motivoAtencao: string | null;
  focoBemEstar: string;
}

export interface GeminiInsightPayload {
  contexto: {
    faseAtual: string;
    diaDoCiclo: number | null;
    duracaoCiclo: number;
    regularidadeStatus: string;
  };
  sintomasObservados: Array<{
    sintoma: string;
    contagem: number;
    fase: string;
  }>;
  humorObservado: string | null;
  diretrizesSeguranca: {
    sugerirAtencaoMedica: boolean;
    focoBemEstar: string;
  };
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
