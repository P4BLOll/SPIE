import { DadosCalendario } from '@/modules/cycle/types/cycle.types';
import { CycleMetrics, SmartInsightResult, StoredInsightCache } from '../types/insights.types';

const nomesSintomas: Record<string, string> = {
  none: 'Nenhum sintoma',
  head: 'Dor de cabeça',
  back: 'Dor nas costas',
  breast: 'Sensibilidade nos seios',
  cramp: 'Cólica',
  bloating: 'Inchaço',
  mood: 'Alteração de humor',
  tired: 'Cansaço',
  nausea: 'Náusea',
};

function formatarDataISO(data: Date): string {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function parseDataSemHorario(dataStr: string): Date {
  if (!dataStr) return new Date();
  const dateOnly = dataStr.includes('T') ? dataStr.split('T')[0] : dataStr;
  const partes = dateOnly.split('-').map((part) => parseInt(part, 10));
  if (partes.length === 3 && !isNaN(partes[0]) && !isNaN(partes[1]) && !isNaN(partes[2])) {
    return new Date(partes[0], partes[1] - 1, partes[2], 0, 0, 0, 0);
  }
  const d = new Date(dataStr);
  d.setHours(0, 0, 0, 0);
  return d;
}

function calcularFasePorDia(diaDoCiclo: number, duracaoMenstruacao: number, duracaoCiclo: number): string {
  const diaOvulacao = Math.max(1, duracaoCiclo - 14);
  const inicioFertil = Math.max(duracaoMenstruacao + 1, diaOvulacao - 5);

  if (diaDoCiclo <= duracaoMenstruacao) return 'Menstruação';
  if (diaDoCiclo === diaOvulacao) return 'Ovulação';
  if (diaDoCiclo >= inicioFertil && diaDoCiclo < diaOvulacao) return 'Período fértil';
  if (diaDoCiclo < diaOvulacao) return 'Fase folicular';
  return 'Fase lútea';
}

export const localInsightsEngine = {
  gerarInsightLocal(dados: DadosCalendario): StoredInsightCache {
    const duracaoCiclo = dados.duracaoCiclo || 28;
    const duracaoMenstruacao = dados.duracaoMenstruacao || 5;
    const registros = dados.registros || {};
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    let diaDoCiclo: number | null = null;
    let progressoCiclo = 0;
    let proximaMenstruacao: string | null = null;
    let diasAtraso: number | null = null;
    let ovulacaoEstimada: string | null = null;
    let periodoFertil: { inicio: string; fim: string } | null = null;
    let faseAtual = 'Sem dados';

    if (dados.ultimaMenstruacao) {
      const dataInicio = parseDataSemHorario(dados.ultimaMenstruacao);
      const diffMs = hoje.getTime() - dataInicio.getTime();
      const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDias >= 0) {
        diaDoCiclo = (diffDias % duracaoCiclo) + 1;
        progressoCiclo = Math.min(Math.round((diaDoCiclo / duracaoCiclo) * 100), 100);
        faseAtual = calcularFasePorDia(diaDoCiclo, duracaoMenstruacao, duracaoCiclo);

        const proxData = new Date(dataInicio);
        const ciclosCompletos = Math.floor(diffDias / duracaoCiclo) + 1;
        proxData.setDate(proxData.getDate() + ciclosCompletos * duracaoCiclo);
        proximaMenstruacao = formatarDataISO(proxData);

        const previsaoAtual = new Date(dataInicio);
        previsaoAtual.setDate(previsaoAtual.getDate() + duracaoCiclo);
        const atrasoDiff = Math.floor((hoje.getTime() - previsaoAtual.getTime()) / (1000 * 60 * 60 * 24));
        if (atrasoDiff > 0 && diffDias >= duracaoCiclo) {
          diasAtraso = atrasoDiff;
        }

        const diaOvulacao = Math.max(1, duracaoCiclo - 14);
        const ovulData = new Date(dataInicio);
        const inicioCicloAtualDias = Math.floor(diffDias / duracaoCiclo) * duracaoCiclo;
        ovulData.setDate(ovulData.getDate() + inicioCicloAtualDias + (diaOvulacao - 1));
        ovulacaoEstimada = formatarDataISO(ovulData);

        const inicioFertilData = new Date(ovulData);
        inicioFertilData.setDate(inicioFertilData.getDate() - 5);
        periodoFertil = {
          inicio: formatarDataISO(inicioFertilData),
          fim: formatarDataISO(ovulData),
        };
      }
    }

    const sintomaFrequencia: Record<string, { contagem: number; fases: Record<string, number> }> = {};
    const humorFrequencia: Record<string, number> = {};
    let totalDiasRegistrados = 0;

    for (const [dataStr, reg] of Object.entries(registros)) {
      const temDados = (reg.sintomas && reg.sintomas.length > 0) || !!reg.humor || !!reg.secrecao;
      if (!temDados) continue;
      totalDiasRegistrados++;

      let faseDoRegistro = 'Geral';
      if (dados.ultimaMenstruacao) {
        const dReg = parseDataSemHorario(dataStr);
        const dIni = parseDataSemHorario(dados.ultimaMenstruacao);
        const diffReg = Math.floor((dReg.getTime() - dIni.getTime()) / (1000 * 60 * 60 * 24));
        if (diffReg >= 0) {
          const diaReg = (diffReg % duracaoCiclo) + 1;
          faseDoRegistro = calcularFasePorDia(diaReg, duracaoMenstruacao, duracaoCiclo);
        }
      }

      if (reg.sintomas && Array.isArray(reg.sintomas)) {
        for (const s of reg.sintomas) {
          const id = typeof s === 'string' ? s : s.id;
          const nome = nomesSintomas[id] ?? id;
          if (!nome || nome === 'Nenhum sintoma') continue;

          if (!sintomaFrequencia[nome]) {
            sintomaFrequencia[nome] = { contagem: 0, fases: {} };
          }
          sintomaFrequencia[nome].contagem++;
          sintomaFrequencia[nome].fases[faseDoRegistro] =
            (sintomaFrequencia[nome].fases[faseDoRegistro] || 0) + 1;
        }
      }

      if (reg.humor) {
        humorFrequencia[reg.humor] = (humorFrequencia[reg.humor] || 0) + 1;
      }
    }

    const sintomasFrequentes = Object.entries(sintomaFrequencia)
      .map(([sintoma, info]) => {
        let fasePredominante = 'Geral';
        let maxFase = 0;
        for (const [fase, count] of Object.entries(info.fases)) {
          if (count > maxFase) {
            maxFase = count;
            fasePredominante = fase;
          }
        }
        return { sintoma, contagem: info.contagem, fasePredominante };
      })
      .sort((a, b) => b.contagem - a.contagem)
      .slice(0, 5);

    const humoresFrequentes = Object.entries(humorFrequencia)
      .map(([humor, contagem]) => ({ humor, contagem }))
      .sort((a, b) => b.contagem - a.contagem);

    const humorPredominante = humoresFrequentes[0]?.humor ?? null;

    const metricas: CycleMetrics = {
      diaDoCiclo,
      faseAtual,
      duracaoCiclo,
      duracaoMenstruacao,
      progressoCiclo,
      proximaMenstruacao,
      diasAtraso,
      ovulacaoEstimada,
      periodoFertil,
      totalDiasRegistrados,
      sintomasFrequentes,
      humorPredominante,
      humoresFrequentes,
      secrecaoPredominante: null,
      regularidadeStatus: totalDiasRegistrados >= 10 ? 'regular' : 'inicial',
    };

    // Gerar texto do insight determinístico
    let resumoFase = 'Continue registrando suas informações para acompanhar suas fases.';
    if (diaDoCiclo && faseAtual !== 'Sem dados') {
      resumoFase = `Você está no dia ${diaDoCiclo} do seu ciclo de ${duracaoCiclo} dias (${faseAtual.toLowerCase()}).`;
    }

    let padraoObservado = 'Mapeando padrões com base nos seus registros diários.';
    const principalSintoma = sintomasFrequentes[0];
    if (principalSintoma && humorPredominante) {
      padraoObservado = `Sintoma mais registrado: ${principalSintoma.sintoma.toLowerCase()} (${principalSintoma.contagem}x), com humor predominante de ${humorPredominante.toLowerCase()}.`;
    } else if (principalSintoma) {
      padraoObservado = `Sintoma mais frequente: ${principalSintoma.sintoma.toLowerCase()} (${principalSintoma.contagem} registros).`;
    } else if (humorPredominante) {
      padraoObservado = `Humor mais presente nos registros recentes: ${humorPredominante.toLowerCase()}.`;
    }

    let dicaBemEstar = 'Mantenha a hidratação e um bom descanso para apoiar seu bem-estar.';
    switch (faseAtual) {
      case 'Menstruação':
        dicaBemEstar = 'Priorize repouso, hidratação constante e calor local suave na região pélvica.';
        break;
      case 'Fase folicular':
        dicaBemEstar = 'Fase de renovação de energia. Ótimo momento para manter atividades físicas prazerosas.';
        break;
      case 'Período fértil':
      case 'Ovulação':
        dicaBemEstar = 'Período de vitalidade. Mantenha boa nutrição e atenção aos sinais do seu corpo.';
        break;
      case 'Fase lútea':
        dicaBemEstar = 'Alimentos leves e chás relaxantes auxiliam no conforto desta fase que antecede a menstruação.';
        break;
    }

    let notaAcompanhamento: string | null = null;
    if (diasAtraso && diasAtraso >= 7) {
      notaAcompanhamento = `Atraso de ${diasAtraso} dias em relação à previsão. Se persistir, consulte seu ginecologista.`;
    }

    const insight: SmartInsightResult = {
      resumoFase,
      padraoObservado,
      dicaBemEstar,
      notaAcompanhamento,
    };

    return {
      dataVersionConsumida: dados.dataVersion ?? 1,
      geradoEm: new Date().toISOString(),
      expiraEm: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      insight,
      metricas,
      origem: 'fallback',
    };
  },
};
