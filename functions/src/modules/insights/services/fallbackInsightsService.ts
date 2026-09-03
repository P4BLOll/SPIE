import { CycleMetrics, SafetyRulesOutput, SmartInsightResult } from '../types/insights.types';

export const fallbackInsightsService = {
  gerarInsight(metricas: CycleMetrics, seguranca: SafetyRulesOutput): SmartInsightResult {
    // 1. Resumo da Fase
    let resumoFase = 'Continue registrando suas informações no calendário para acompanhar as fases do seu ciclo.';
    if (metricas.diaDoCiclo && metricas.faseAtual !== 'Sem dados') {
      resumoFase = `Você está no dia ${metricas.diaDoCiclo} do seu ciclo de ${metricas.duracaoCiclo} dias, correspondente à ${metricas.faseAtual.toLowerCase()}.`;
    }

    // 2. Padrão Observado
    let padraoObservado = 'Ainda estamos mapeando os padrões do seu corpo. Registre sintomas e humor regularmente.';
    const principalSintoma = metricas.sintomasFrequentes[0];

    if (principalSintoma && metricas.humorPredominante) {
      padraoObservado = `Seu sintoma mais registrado até o momento é ${principalSintoma.sintoma.toLowerCase()} (${principalSintoma.contagem}x), predominantemente na ${principalSintoma.fasePredominante.toLowerCase()}, com humor predominante de ${metricas.humorPredominante.toLowerCase()}.`;
    } else if (principalSintoma) {
      padraoObservado = `O sintoma mais frequente nos seus registros é ${principalSintoma.sintoma.toLowerCase()}, relatado ${principalSintoma.contagem} ${principalSintoma.contagem === 1 ? 'vez' : 'vezes'}.`;
    } else if (metricas.humorPredominante) {
      padraoObservado = `O humor mais comum registrado nos seus dias recentes foi ${metricas.humorPredominante.toLowerCase()}.`;
    }

    // 3. Dica de Bem-Estar
    let dicaBemEstar = 'Beba água regularmente e mantenha registros diários para refinar suas previsões.';
    switch (metricas.faseAtual) {
      case 'Menstruação':
        dicaBemEstar = 'Priorize momentos de descanso, mantenha boa hidratação e utilize compressas mornas na região pélvica se sentir desconforto.';
        break;
      case 'Fase folicular':
        dicaBemEstar = 'Este período costuma ser acompanhado de boa disposição. É uma ótima fase para manter uma rotina de atividades físicas e alimentação equilibrada.';
        break;
      case 'Período fértil':
      case 'Ovulação':
        dicaBemEstar = 'Mantenha-se bem hidratada e atenta aos sinais naturais do seu corpo durante estes dias.';
        break;
      case 'Fase lútea':
        dicaBemEstar = 'Priorize alimentos frescos, chás relaxantes e uma boa rotina de sono para auxiliar no alívio de eventuais inchaços ou tensões.';
        break;
      default:
        dicaBemEstar = 'O autocuidado diário e a observação da sua rotina ajudam você a conhecer melhor o seu ritmo.';
        break;
    }

    // 4. Nota de Acompanhamento Médico
    let notaAcompanhamento: string | null = null;
    if (seguranca.sugerirConsultaMedica) {
      if (metricas.diasAtraso && metricas.diasAtraso >= 7) {
        notaAcompanhamento = `Notamos um atraso de ${metricas.diasAtraso} dias em relação à data estimada. Se essa variação persistir ou for incomum no seu histórico, considere conversar com um profissional de saúde.`;
      } else {
        notaAcompanhamento = 'Você registrou desconfortos com certa frequência nos últimos dias. Se esses sintomas forem intensos ou persistentes, considere levar esse histórico em uma consulta com seu ginecologista.';
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
