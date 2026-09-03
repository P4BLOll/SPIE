import { CycleMetrics, SafetyRulesOutput } from '../types/insights.types';

export const clinicalSafetyRules = {
  avaliarSeguranca(metricas: CycleMetrics): SafetyRulesOutput {
    let sugerirConsultaMedica = false;
    let motivoAtencao: string | null = null;
    let focoBemEstar = 'rotina_e_autoconhecimento';

    // 1. Atraso menstrual significativo (> 7 dias)
    if (metricas.diasAtraso && metricas.diasAtraso >= 7) {
      sugerirConsultaMedica = true;
      motivoAtencao = 'atraso_menstrual_prolongado';
      focoBemEstar = 'acompanhamento_e_observacao';
      return { sugerirConsultaMedica, motivoAtencao, focoBemEstar };
    }

    // 2. Sintoma de cólica ou dor de cabeça com frequência desproporcional
    const sintomaDor = metricas.sintomasFrequentes.find(
      (s) => (s.sintoma === 'Cólica' || s.sintoma === 'Dor de cabeça') && s.contagem >= 6
    );

    if (sintomaDor) {
      sugerirConsultaMedica = true;
      motivoAtencao = `recorrencia_elevada_de_${sintomaDor.sintoma.toLowerCase().replace(' ', '_')}`;
      focoBemEstar = 'conforto_e_avaliacao_profissional';
      return { sugerirConsultaMedica, motivoAtencao, focoBemEstar };
    }

    // 3. Foco de bem-estar contextualizado por fase
    switch (metricas.faseAtual) {
      case 'Menstruação':
        focoBemEstar = 'repouso_hidratacao_e_conforto_termico';
        break;
      case 'Fase folicular':
        focoBemEstar = 'disposicao_fisica_e_nutricao_equilibrada';
        break;
      case 'Período fértil':
      case 'Ovulação':
        focoBemEstar = 'energia_vital_e_hidratacao';
        break;
      case 'Fase lútea':
        focoBemEstar = 'alivio_de_tensao_sono_e_reducao_de_inchaco';
        break;
      default:
        focoBemEstar = 'registro_continuo_e_autocuidado';
        break;
    }

    return {
      sugerirConsultaMedica,
      motivoAtencao,
      focoBemEstar,
    };
  },
};
