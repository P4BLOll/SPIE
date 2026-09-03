import {
  RawCycleData,
  CycleMetrics,
  RegistroDiaBackend,
  SintomaItem,
  SecrecaoItem,
} from '../types/insights.types';

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

function extrairNomeSintoma(sintoma: string | SintomaItem): string {
  if (typeof sintoma === 'string') {
    return nomesSintomas[sintoma] ?? sintoma;
  }
  const id = sintoma.tipo ?? sintoma.id ?? '';
  return nomesSintomas[id] ?? id;
}

function extrairNomeSecrecao(secrecao: string | SecrecaoItem): string {
  if (typeof secrecao === 'string') return secrecao;
  return secrecao.tipo ?? secrecao.observacao ?? '';
}

export function calcularFasePorDia(
  diaDoCiclo: number,
  duracaoMenstruacao: number,
  duracaoCiclo: number
): string {
  const diaOvulacao = Math.max(1, duracaoCiclo - 14);
  const inicioFertil = Math.max(duracaoMenstruacao + 1, diaOvulacao - 5);

  if (diaDoCiclo <= duracaoMenstruacao) {
    return 'Menstruação';
  }
  if (diaDoCiclo === diaOvulacao) {
    return 'Ovulação';
  }
  if (diaDoCiclo >= inicioFertil && diaDoCiclo < diaOvulacao) {
    return 'Período fértil';
  }
  if (diaDoCiclo < diaOvulacao) {
    return 'Fase folicular';
  }
  return 'Fase lútea';
}

export const cycleAnalyticsEngine = {
  processarMetricas(dados: RawCycleData): CycleMetrics {
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

        // Próxima menstruação
        const proxData = new Date(dataInicio);
        const ciclosCompletos = Math.floor(diffDias / duracaoCiclo) + 1;
        proxData.setDate(proxData.getDate() + (ciclosCompletos * duracaoCiclo));
        proximaMenstruacao = formatarDataISO(proxData);

        // Atraso
        const previsaoAtual = new Date(dataInicio);
        previsaoAtual.setDate(previsaoAtual.getDate() + duracaoCiclo);
        const atrasoDiff = Math.floor((hoje.getTime() - previsaoAtual.getTime()) / (1000 * 60 * 60 * 24));
        if (atrasoDiff > 0 && diffDias >= duracaoCiclo) {
          diasAtraso = atrasoDiff;
        }

        // Ovulação estimada do ciclo corrente
        const diaOvulacao = Math.max(1, duracaoCiclo - 14);
        const ovulData = new Date(dataInicio);
        const inicioCicloAtualDias = Math.floor(diffDias / duracaoCiclo) * duracaoCiclo;
        ovulData.setDate(ovulData.getDate() + inicioCicloAtualDias + (diaOvulacao - 1));
        ovulacaoEstimada = formatarDataISO(ovulData);

        // Período fértil
        const inicioFertilData = new Date(ovulData);
        inicioFertilData.setDate(inicioFertilData.getDate() - 5);
        periodoFertil = {
          inicio: formatarDataISO(inicioFertilData),
          fim: formatarDataISO(ovulData),
        };
      }
    }

    // Processar sintomas e correlações com fases
    const sintomaFrequencia: Record<string, { contagem: number; fases: Record<string, number> }> = {};
    const humorFrequencia: Record<string, number> = {};
    const secrecaoFrequencia: Record<string, number> = {};
    let totalDiasRegistrados = 0;

    for (const [dataStr, reg] of Object.entries(registros) as [string, RegistroDiaBackend][]) {
      const temDados = (reg.sintomas && reg.sintomas.length > 0) || !!reg.humor || !!reg.secrecao;
      if (!temDados) continue;
      totalDiasRegistrados++;

      let faseDoRegistro = 'Outra';
      if (dados.ultimaMenstruacao) {
        const dReg = parseDataSemHorario(dataStr);
        const dIni = parseDataSemHorario(dados.ultimaMenstruacao);
        const diffReg = Math.floor((dReg.getTime() - dIni.getTime()) / (1000 * 60 * 60 * 24));
        if (diffReg >= 0) {
          const diaReg = (diffReg % duracaoCiclo) + 1;
          faseDoRegistro = calcularFasePorDia(diaReg, duracaoMenstruacao, duracaoCiclo);
        }
      }

      // Sintomas
      if (reg.sintomas && Array.isArray(reg.sintomas)) {
        for (const s of reg.sintomas) {
          const nome = extrairNomeSintoma(s);
          if (!nome || nome === 'Nenhum sintoma') continue;

          if (!sintomaFrequencia[nome]) {
            sintomaFrequencia[nome] = { contagem: 0, fases: {} };
          }
          sintomaFrequencia[nome].contagem++;
          sintomaFrequencia[nome].fases[faseDoRegistro] =
            (sintomaFrequencia[nome].fases[faseDoRegistro] || 0) + 1;
        }
      }

      // Humor
      if (reg.humor && typeof reg.humor === 'string') {
        humorFrequencia[reg.humor] = (humorFrequencia[reg.humor] || 0) + 1;
      }

      // Secreção
      if (reg.secrecao) {
        const secNome = extrairNomeSecrecao(reg.secrecao);
        if (secNome) {
          secrecaoFrequencia[secNome] = (secrecaoFrequencia[secNome] || 0) + 1;
        }
      }
    }

    // Ordenar sintomas mais frequentes e identificar fase predominante
    const sintomasFrequentes = Object.entries(sintomaFrequencia)
      .map(([sintoma, info]) => {
        let fasePredominante = 'geral';
        let maxFaseCont = 0;
        for (const [fase, count] of Object.entries(info.fases)) {
          if (count > maxFaseCont) {
            maxFaseCont = count;
            fasePredominante = fase;
          }
        }
        return {
          sintoma,
          contagem: info.contagem,
          fasePredominante,
        };
      })
      .sort((a, b) => b.contagem - a.contagem)
      .slice(0, 5);

    // Humores
    const humoresFrequentes = Object.entries(humorFrequencia)
      .map(([humor, contagem]) => ({ humor, contagem }))
      .sort((a, b) => b.contagem - a.contagem);

    const humorPredominante = humoresFrequentes[0]?.humor ?? null;

    // Secreções
    const secrecoesOrdenadas = Object.entries(secrecaoFrequencia).sort((a, b) => b[1] - a[1]);
    const secrecaoPredominante = secrecoesOrdenadas[0]?.[0] ?? null;

    // Regularidade
    let regularidadeStatus: 'regular' | 'irregular' | 'inicial' = 'inicial';
    if (totalDiasRegistrados >= 10) {
      regularidadeStatus = duracaoCiclo >= 21 && duracaoCiclo <= 35 ? 'regular' : 'irregular';
    }

    return {
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
      secrecaoPredominante,
      regularidadeStatus,
    };
  },
};
