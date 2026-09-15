import { CycleMetrics, SafetyRulesOutput, SmartInsightResult } from '../types/insights.types';

export const fallbackInsightsService = {
  gerarInsight(metricas: CycleMetrics, seguranca: SafetyRulesOutput): SmartInsightResult {
    // 1. Resumo da Fase
    let resumoFase = 'Keep logging your information in the calendar to track your cycle phases.';
    if (metricas.diaDoCiclo && metricas.faseAtual !== 'Sem dados' && metricas.faseAtual !== 'No data') {
      resumoFase = `You are on day ${metricas.diaDoCiclo} of your ${metricas.duracaoCiclo}-day cycle (${metricas.faseAtual.toLowerCase()}).`;
    }

    // 2. Padrão Observado
    let padraoObservado = 'We are still mapping your body patterns. Log symptoms and mood regularly.';
    const principalSintoma = metricas.sintomasFrequentes[0];

    if (principalSintoma && metricas.humorPredominante) {
      padraoObservado = `Your most logged symptom so far is ${principalSintoma.sintoma.toLowerCase()} (${principalSintoma.contagem}x), predominantly during ${principalSintoma.fasePredominante.toLowerCase()}, with predominant mood ${metricas.humorPredominante.toLowerCase()}.`;
    } else if (principalSintoma) {
      padraoObservado = `The most frequent symptom in your logs is ${principalSintoma.sintoma.toLowerCase()}, reported ${principalSintoma.contagem} ${principalSintoma.contagem === 1 ? 'time' : 'times'}.`;
    } else if (metricas.humorPredominante) {
      padraoObservado = `The most common mood in your recent logs was ${metricas.humorPredominante.toLowerCase()}.`;
    }

    // 3. Dica de Bem-Estar
    let dicaBemEstar = 'Drink water regularly and keep daily logs to refine your predictions.';
    switch (metricas.faseAtual) {
      case 'Menstruation':
      case 'Menstruação':
        dicaBemEstar = 'Prioritize restful moments, stay well hydrated, and use gentle pelvic warmth if feeling discomfort.';
        break;
      case 'Follicular phase':
      case 'Fase folicular':
        dicaBemEstar = 'This phase often comes with higher energy. A great time to maintain physical activity and balanced nutrition.';
        break;
      case 'Fertile window':
      case 'Período fértil':
      case 'Ovulation':
      case 'Ovulação':
        dicaBemEstar = 'Stay well hydrated and attentive to your body natural signals during these days.';
        break;
      case 'Luteal phase':
      case 'Fase lútea':
        dicaBemEstar = 'Prioritize light meals, calming teas, and good sleep habits to help ease potential bloating or tension.';
        break;
      default:
        dicaBemEstar = 'Daily self-care and tracking your routine helps you better understand your body rhythm.';
        break;
    }

    // 4. Nota de Acompanhamento Médico
    let notaAcompanhamento: string | null = null;
    if (seguranca.sugerirConsultaMedica) {
      if (metricas.diasAtraso && metricas.diasAtraso >= 7) {
        notaAcompanhamento = `We noticed your period is ${metricas.diasAtraso} days past the expected date. If this variation persists or is unusual for you, consider consulting a healthcare professional.`;
      } else {
        notaAcompanhamento = 'You have logged discomforts frequently over recent days. If these symptoms are intense or persistent, consider discussing them with your gynecologist.';
      }
    }

    return {
      resumoFase,
      padraoObservado,
      dicaBemEstar,
      notaAcompanhamento,
    };
  },
};
