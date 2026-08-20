import React, {
  useEffect,
  useMemo,
  useRef,
} from 'react';

import {
  View,
  Text,
  ScrollView,
  Animated,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { Background } from '@/components/Background';

import { useCycle } from '@/context/CycleContext';

import {
  cycleColors,
  TAB_BAR_BASE_HEIGHT,
} from '@/styles/calendar.styles';

import { insightsStyles } from '@/styles/insights.styles';

// =====================================
// CORES DO HUMOR
// =====================================

const humorColors = {
  soft: '#D99A88',
  main: '#A95743',
  dark: '#7F3D30',
};

// =====================================
// TIPOS
// =====================================

type SintomaRegistro =
  | string
  | {
      tipo?: string;
      observacao?: string;
      id?: string;
      intensidade?: string | null;
    };

type SecrecaoRegistro =
  | string
  | {
      tipo?: string;
      observacao?: string;
    };

type RegistroDia = {
  sintomas?: SintomaRegistro[];
  secrecao?: SecrecaoRegistro;
  humor?: string;
};

type Registros = Record<string, RegistroDia>;

// =====================================
// NOMES DOS SINTOMAS
// =====================================

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

// =====================================
// NORMALIZAR SINTOMA
// =====================================

function obterIdSintoma(
  sintoma: SintomaRegistro
): string {
  if (typeof sintoma === 'string') {
    return sintoma;
  }

  return sintoma.tipo ?? sintoma.id ?? '';
}

function obterNomeSintoma(
  sintoma: SintomaRegistro
): string {
  const id = obterIdSintoma(sintoma);

  return nomesSintomas[id] ?? id;
}

// =====================================
// NORMALIZAR SECREÇÃO
// =====================================

function obterNomeSecrecao(
  secrecao: SecrecaoRegistro
): string {
  if (typeof secrecao === 'string') {
    return secrecao;
  }

  return (
    secrecao.tipo ??
    secrecao.observacao ??
    ''
  );
}

// =====================================
// TELA
// =====================================

export default function InsightsScreen() {
  const {
    ultimaMenstruacao,
    duracaoMenstruacao,
    duracaoCiclo,
    registros,
  } = useCycle();

  const registrosTyped = (registros ?? {}) as Registros;

  const insets = useSafeAreaInsets();

  const espacoParaTabBar =
    TAB_BAR_BASE_HEIGHT +
    insets.bottom +
    24;

  // =====================================
  // ANIMAÇÃO
  // =====================================

  const fade = useRef(
    new Animated.Value(0)
  ).current;

  const slide = useRef(
    new Animated.Value(25)
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // =====================================
  // DIA DO CICLO
  // =====================================

  const diaDoCiclo = useMemo(() => {
    if (!ultimaMenstruacao) {
      return null;
    }

    const inicio = new Date(
      ultimaMenstruacao
    );

    const hoje = new Date();

    inicio.setHours(0, 0, 0, 0);
    hoje.setHours(0, 0, 0, 0);

    const diferenca = Math.floor(
      (hoje.getTime() -
        inicio.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diferenca < 0) {
      return null;
    }

    return (
      (diferenca % duracaoCiclo) + 1
    );
  }, [
    ultimaMenstruacao,
    duracaoCiclo,
  ]);

  // =====================================
  // PROGRESSO DO CICLO
  // =====================================

  const progresso = useMemo(() => {
    if (!diaDoCiclo) {
      return 0;
    }

    return Math.min(
      (diaDoCiclo / duracaoCiclo) * 100,
      100
    );
  }, [
    diaDoCiclo,
    duracaoCiclo,
  ]);

  // =====================================
  // DATA DA PRÓXIMA MENSTRUAÇÃO
  // =====================================

  const proximaMenstruacaoData =
    useMemo(() => {
      if (!ultimaMenstruacao) {
        return null;
      }

      const data = new Date(
        ultimaMenstruacao
      );

      data.setHours(0, 0, 0, 0);

      data.setDate(
        data.getDate() + duracaoCiclo
      );

      return data;
    }, [
      ultimaMenstruacao,
      duracaoCiclo,
    ]);

  const proximaMenstruacao = useMemo(() => {
    if (!proximaMenstruacaoData) {
      return null;
    }

    return proximaMenstruacaoData.toLocaleDateString(
      'pt-BR'
    );
  }, [proximaMenstruacaoData]);

  // =====================================
  // OVULAÇÃO
  // =====================================

  const diaEstimadoOvulacao = useMemo(() => {
    return Math.max(
      1,
      duracaoCiclo - 14
    );
  }, [duracaoCiclo]);

  const ovulacaoData = useMemo(() => {
    if (!ultimaMenstruacao) {
      return null;
    }

    const data = new Date(
      ultimaMenstruacao
    );

    data.setHours(0, 0, 0, 0);

    data.setDate(
      data.getDate() +
        (diaEstimadoOvulacao - 1)
    );

    return data;
  }, [
    ultimaMenstruacao,
    diaEstimadoOvulacao,
  ]);

  const ovulacao = useMemo(() => {
    if (!ovulacaoData) {
      return null;
    }

    return ovulacaoData.toLocaleDateString(
      'pt-BR'
    );
  }, [ovulacaoData]);

  // =====================================
  // PERÍODO FÉRTIL
  // =====================================

  const periodoFertil = useMemo(() => {
    if (!ultimaMenstruacao) {
      return null;
    }

    const inicio = new Date(
      ultimaMenstruacao
    );

    inicio.setHours(0, 0, 0, 0);

    inicio.setDate(
      inicio.getDate() +
        Math.max(
          0,
          diaEstimadoOvulacao - 5 - 1
        )
    );

    const fim = new Date(
      ultimaMenstruacao
    );

    fim.setHours(0, 0, 0, 0);

    fim.setDate(
      fim.getDate() +
        (diaEstimadoOvulacao - 1)
    );

    return {
      inicio,
      fim,
    };
  }, [
    ultimaMenstruacao,
    diaEstimadoOvulacao,
  ]);

  // =====================================
  // ATRASO
  // =====================================

  const atraso = useMemo(() => {
    if (!proximaMenstruacaoData) {
      return null;
    }

    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0);

    const prevista = new Date(
      proximaMenstruacaoData
    );

    prevista.setHours(0, 0, 0, 0);

    const diferenca = Math.floor(
      (hoje.getTime() -
        prevista.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    return diferenca > 0
      ? diferenca
      : null;
  }, [proximaMenstruacaoData]);

  // =====================================
  // FASE ATUAL
  // =====================================

  const faseAtual = useMemo(() => {
    if (!diaDoCiclo) {
      return 'Sem dados';
    }

    if (
      diaDoCiclo <=
      duracaoMenstruacao
    ) {
      return 'Menstruação';
    }

    if (
      diaDoCiclo ===
      diaEstimadoOvulacao
    ) {
      return 'Ovulação';
    }

    if (
      diaDoCiclo >=
        Math.max(
          duracaoMenstruacao + 1,
          diaEstimadoOvulacao - 5
        ) &&
      diaDoCiclo <
        diaEstimadoOvulacao
    ) {
      return 'Período fértil';
    }

    if (
      diaDoCiclo <
      diaEstimadoOvulacao
    ) {
      return 'Fase folicular';
    }

    return 'Fase lútea';
  }, [
    diaDoCiclo,
    duracaoMenstruacao,
    diaEstimadoOvulacao,
  ]);

  // =====================================
  // TODOS OS DIAS REGISTRADOS
  // =====================================

  const diasComRegistro = useMemo(() => {
    return Object.keys(
      registrosTyped
    ).filter((data) => {
      const registro =
        registrosTyped[data];

      return (
        (registro?.sintomas?.length ?? 0) >
          0 ||
        !!registro?.secrecao ||
        !!registro?.humor
      );
    });
  }, [registrosTyped]);

  const totalRegistros =
    diasComRegistro.length;

  // =====================================
  // SINTOMAS
  // =====================================

  const sintomasEstatisticas =
    useMemo(() => {
      const contagem: Record<
        string,
        number
      > = {};

      Object.values(
        registrosTyped
      ).forEach((registro) => {
        registro?.sintomas?.forEach(
          (sintoma) => {
            const nome =
              obterNomeSintoma(
                sintoma
              );

            if (
              !nome ||
              nome === 'Nenhum sintoma'
            ) {
              return;
            }

            contagem[nome] =
              (contagem[nome] ?? 0) + 1;
          }
        );
      });

      return Object.entries(
        contagem
      ).sort(
        (a, b) => b[1] - a[1]
      );
    }, [registrosTyped]);

  const sintomasMaisFrequentes =
    sintomasEstatisticas.slice(0, 5);

  const totalSintomas =
    sintomasEstatisticas.reduce(
      (total, [, quantidade]) =>
        total + quantidade,
      0
    );

  // =====================================
  // HUMORES
  // =====================================

  const humorEstatisticas =
    useMemo(() => {
      const contagem: Record<
        string,
        number
      > = {};

      Object.values(
        registrosTyped
      ).forEach((registro) => {
        if (!registro?.humor) {
          return;
        }

        contagem[registro.humor] =
          (contagem[registro.humor] ?? 0) +
          1;
      });

      return Object.entries(
        contagem
      ).sort(
        (a, b) => b[1] - a[1]
      );
    }, [registrosTyped]);

  const humorMaisFrequente =
    humorEstatisticas[0] ?? null;

  const totalHumores =
    humorEstatisticas.reduce(
      (total, [, quantidade]) =>
        total + quantidade,
      0
    );

  // =====================================
  // SECREÇÕES
  // =====================================

  const secrecaoEstatisticas =
    useMemo(() => {
      const contagem: Record<
        string,
        number
      > = {};

      Object.values(
        registrosTyped
      ).forEach((registro) => {
        if (!registro?.secrecao) {
          return;
        }

        const nome =
          obterNomeSecrecao(
            registro.secrecao
          );

        if (!nome) {
          return;
        }

        contagem[nome] =
          (contagem[nome] ?? 0) + 1;
      });

      return Object.entries(
        contagem
      ).sort(
        (a, b) => b[1] - a[1]
      );
    }, [registrosTyped]);

  const secrecaoMaisFrequente =
    secrecaoEstatisticas[0] ?? null;

  const totalSecrecoes =
    secrecaoEstatisticas.reduce(
      (total, [, quantidade]) =>
        total + quantidade,
      0
    );

  // =====================================
  // ÚLTIMO HUMOR
  // =====================================

  const ultimoHumor = useMemo(() => {
    const datas = Object.keys(
      registrosTyped
    )
      .filter(
        (data) =>
          !!registrosTyped[data]?.humor
      )
      .sort()
      .reverse();

    if (!datas.length) {
      return null;
    }

    return {
      data: datas[0],
      humor:
        registrosTyped[datas[0]]
          ?.humor ?? null,
    };
  }, [registrosTyped]);

  // =====================================
  // ÚLTIMO SINTOMA
  // =====================================

  const ultimoSintoma = useMemo(() => {
    const datas = Object.keys(
      registrosTyped
    )
      .filter(
        (data) =>
          (
            registrosTyped[data]
              ?.sintomas?.length ?? 0
          ) > 0
      )
      .sort()
      .reverse();

    if (!datas.length) {
      return null;
    }

    const sintomas =
      registrosTyped[datas[0]]
        ?.sintomas ?? [];

    return {
      data: datas[0],
      sintomas: sintomas
        .map((sintoma) =>
          obterNomeSintoma(
            sintoma
          )
        )
        .filter(Boolean),
    };
  }, [registrosTyped]);

  // =====================================
  // ÚLTIMA SECREÇÃO
  // =====================================

  const ultimaSecrecao = useMemo(() => {
    const datas = Object.keys(
      registrosTyped
    )
      .filter(
        (data) =>
          !!registrosTyped[data]
            ?.secrecao
      )
      .sort()
      .reverse();

    if (!datas.length) {
      return null;
    }

    const secrecao =
      registrosTyped[datas[0]]
        ?.secrecao;

    return {
      data: datas[0],
      secrecao: secrecao
        ? obterNomeSecrecao(
            secrecao
          )
        : null,
    };
  }, [registrosTyped]);

  // =====================================
  // REGULARIDADE
  // =====================================

  const regularidade = useMemo(() => {
    if (!ultimaMenstruacao) {
      return 'Sem dados';
    }

    return 'Inicial';
  }, [ultimaMenstruacao]);

  // =====================================
  // PRECISÃO
  // =====================================

  const precisao = useMemo(() => {
    if (!ultimaMenstruacao) {
      return 'Sem dados';
    }

    if (totalRegistros >= 10) {
      return 'Boa';
    }

    if (totalRegistros >= 5) {
      return 'Moderada';
    }

    return 'Inicial';
  }, [
    ultimaMenstruacao,
    totalRegistros,
  ]);

  // =====================================
  // TEXTO DA FASE
  // =====================================

  const descricaoFase = useMemo(() => {
    switch (faseAtual) {
      case 'Menstruação':
        return `Seu corpo está no período menstrual. A duração configurada para sua menstruação é de ${duracaoMenstruacao} ${
          duracaoMenstruacao === 1
            ? 'dia'
            : 'dias'
        }. Observe seu fluxo, sintomas e como você está se sentindo.`;

      case 'Período fértil':
        return `Você está em uma fase de maior fertilidade estimada. A ovulação está prevista aproximadamente para o dia ${diaEstimadoOvulacao} do ciclo.`;

      case 'Ovulação':
        return `A ovulação está estimada para hoje, considerando seu ciclo personalizado de ${duracaoCiclo} dias.`;

      case 'Fase folicular':
        return 'Fase de preparação do organismo para a ovulação.';

      case 'Fase lútea':
        return 'Fase posterior à ovulação, que antecede a próxima menstruação.';

      default:
        return 'Continue registrando informações para conhecer melhor seu ciclo.';
    }
  }, [
    faseAtual,
    duracaoMenstruacao,
    duracaoCiclo,
    diaEstimadoOvulacao,
  ]);

  // =====================================
  // SEM CICLO
  // =====================================

  if (!ultimaMenstruacao) {
    return (
      <Background>
        <SafeAreaView
          style={insightsStyles.screen}
          edges={[
            'top',
            'left',
            'right',
          ]}
        >
          <View
            style={
              insightsStyles.topHeader
            }
          >
            <Text
              style={
                insightsStyles.title
              }
            >
              Insights
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={{
              paddingBottom:
                espacoParaTabBar,
              flexGrow: 1,
            }}
          >
            <Animated.View
              style={[
                insightsStyles.container,
                {
                  opacity: fade,
                  transform: [
                    {
                      translateY: slide,
                    },
                  ],
                },
              ]}
            >
              <Text
                style={
                  insightsStyles.subtitle
                }
              >
                Conheça melhor seu ciclo
                menstrual
              </Text>

              <View
                style={
                  insightsStyles.mainCard
                }
              >
                <View
                  style={
                    insightsStyles.mainHeader
                  }
                >
                  <Ionicons
                    name="heart"
                    color={
                      cycleColors.rose
                    }
                    size={28}
                  />

                  <Text
                    style={
                      insightsStyles.mainTitle
                    }
                  >
                    Seu ciclo
                  </Text>
                </View>

                <View
                  style={{
                    alignItems:
                      'center',
                    paddingVertical: 24,
                  }}
                >
                  <Ionicons
                    name="calendar-outline"
                    size={48}
                    color={
                      cycleColors.gold
                    }
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight:
                        '600',
                      textAlign:
                        'center',
                      marginTop: 16,
                      color:
                        '#FFFFFF',
                    }}
                  >
                    Nenhum ciclo
                    registrado
                  </Text>

                  <Text
                    style={{
                      fontSize: 14,
                      textAlign:
                        'center',
                      marginTop: 10,
                      lineHeight: 21,
                      color:
                        '#B8B8B8',
                    }}
                  >
                    Adicione a data
                    de início da
                    sua menstruação
                    no Calendário
                    para começar a
                    visualizar seus
                    insights.
                  </Text>
                </View>
              </View>

              {totalRegistros > 0 && (
                <View
                  style={
                    insightsStyles.eventsCard
                  }
                >
                  <Text
                    style={
                      insightsStyles.sectionTitle
                    }
                  >
                    Registros
                    realizados
                  </Text>

                  <View
                    style={
                      insightsStyles.eventRow
                    }
                  >
                    <Ionicons
                      name="analytics"
                      size={22}
                      color={
                        cycleColors.teal
                      }
                    />

                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text
                        style={
                          insightsStyles.eventTitle
                        }
                      >
                        {totalRegistros}{' '}
                        {totalRegistros ===
                        1
                          ? 'dia registrado'
                          : 'dias registrados'}
                      </Text>

                      <Text
                        style={
                          insightsStyles.eventDate
                        }
                      >
                        Continue
                        registrando seu
                        ciclo para gerar
                        estatísticas.
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              <View
                style={
                  insightsStyles.historyCard
                }
              >
                <Text
                  style={
                    insightsStyles.sectionTitle
                  }
                >
                  Histórico dos
                  ciclos
                </Text>

                <Text
                  style={{
                    color:
                      '#B8B8B8',
                    fontSize: 14,
                    lineHeight: 21,
                  }}
                >
                  Seu histórico
                  aparecerá aqui
                  conforme você
                  registrar seus
                  ciclos no
                  Calendário.
                </Text>
              </View>

              <View
                style={
                  insightsStyles.symptomsCard
                }
              >
                <Text
                  style={
                    insightsStyles.sectionTitle
                  }
                >
                  Sintomas
                </Text>

                {sintomasMaisFrequentes.length >
                0 ? (
                  sintomasMaisFrequentes.map(
                    (item) => (
                      <View
                        key={item[0]}
                        style={
                          insightsStyles.eventRow
                        }
                      >
                        <Ionicons
                          name="pulse"
                          size={22}
                          color={
                            cycleColors.rose
                          }
                        />

                        <View
                          style={{
                            flex: 1,
                          }}
                        >
                          <Text
                            style={
                              insightsStyles.eventTitle
                            }
                          >
                            {item[0]}
                          </Text>

                          <Text
                            style={
                              insightsStyles.eventDate
                            }
                          >
                            Registrado{' '}
                            {item[1]}{' '}
                            {item[1] ===
                            1
                              ? 'vez'
                              : 'vezes'}
                          </Text>
                        </View>
                      </View>
                    )
                  )
                ) : (
                  <Text
                    style={{
                      color:
                        '#B8B8B8',
                      fontSize: 14,
                      lineHeight: 21,
                    }}
                  >
                    Registre seus
                    sintomas durante
                    o ciclo para
                    visualizar
                    padrões.
                  </Text>
                )}
              </View>

              <View
                style={
                  insightsStyles.moodCard
                }
              >
                <Text
                  style={
                    insightsStyles.sectionTitle
                  }
                >
                  Humor registrado
                </Text>

                {humorMaisFrequente ? (
                  <Text
                    style={{
                      color:
                        '#B8B8B8',
                      fontSize: 14,
                      lineHeight: 21,
                    }}
                  >
                    Seu humor mais
                    registrado até
                    agora é{' '}
                    <Text
                      style={{
                        color:
                          humorColors.main,
                        fontWeight:
                          '700',
                      }}
                    >
                      {
                        humorMaisFrequente[0]
                      }
                    </Text>
                    .
                  </Text>
                ) : (
                  <Text
                    style={{
                      color:
                        '#B8B8B8',
                      fontSize: 14,
                      lineHeight: 21,
                    }}
                  >
                    Seus registros
                    de humor
                    aparecerão aqui
                    conforme você
                    utilizar o
                    Calendário.
                  </Text>
                )}
              </View>

              <View
                style={
                  insightsStyles.dailyTipCard
                }
              >
                <Text
                  style={
                    insightsStyles.sectionTitle
                  }
                >
                  Dica
                </Text>

                <Text
                  style={
                    insightsStyles.dailyTipText
                  }
                >
                  Comece registrando
                  a data de início da
                  sua menstruação no
                  Calendário. Quanto
                  mais informações
                  você registrar, mais
                  personalizados
                  poderão ser seus
                  insights.
                </Text>
              </View>
            </Animated.View>
          </ScrollView>
        </SafeAreaView>
      </Background>
    );
  }

  // =====================================
  // COM CICLO
  // =====================================

  return (
    <Background>
      <SafeAreaView
        style={insightsStyles.screen}
        edges={[
          'top',
          'left',
          'right',
        ]}
      >
        <View
          style={
            insightsStyles.topHeader
          }
        >
          <Text
            style={
              insightsStyles.title
            }
          >
            Insights
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={{
            paddingBottom:
              espacoParaTabBar,
          }}
        >
          <Animated.View
            style={[
              insightsStyles.container,
              {
                opacity: fade,
                transform: [
                  {
                    translateY: slide,
                  },
                ],
              },
            ]}
          >
            <Text
              style={
                insightsStyles.subtitle
              }
            >
              Conheça melhor seu ciclo
              menstrual
            </Text>

            {/* =====================================
                CICLO ATUAL
            ===================================== */}

            <View
              style={
                insightsStyles.mainCard
              }
            >
              <View
                style={
                  insightsStyles.mainHeader
                }
              >
                <Ionicons
                  name="heart"
                  color={
                    cycleColors.rose
                  }
                  size={28}
                />

                <Text
                  style={
                    insightsStyles.mainTitle
                  }
                >
                  Seu ciclo
                </Text>
              </View>

              <Text
                style={
                  insightsStyles.dayText
                }
              >
                Dia {diaDoCiclo}
              </Text>

              <View
                style={
                  insightsStyles.progressBackground
                }
              >
                <View
                  style={[
                    insightsStyles.progressFill,
                    {
                      width: `${progresso}%`,
                    },
                  ]}
                />
              </View>

              <Text
                style={
                  insightsStyles.progressText
                }
              >
                {Math.round(
                  progresso
                )}
                % concluído
              </Text>

              <View
                style={{
                  flexDirection:
                    'row',
                  justifyContent:
                    'space-around',
                  marginTop: 18,
                }}
              >
                <View
                  style={{
                    alignItems:
                      'center',
                  }}
                >
                  <Text
                    style={{
                      color:
                        cycleColors.textMuted,
                      fontSize: 11,
                      textTransform:
                        'uppercase',
                      fontWeight:
                        '700',
                    }}
                  >
                    CICLO
                  </Text>

                  <Text
                    style={{
                      color:
                        cycleColors.text,
                      fontSize: 16,
                      fontWeight:
                        '700',
                      marginTop: 4,
                    }}
                  >
                    {duracaoCiclo}{' '}
                    dias
                  </Text>
                </View>

                <View
                  style={{
                    alignItems:
                      'center',
                  }}
                >
                  <Text
                    style={{
                      color:
                        cycleColors.textMuted,
                      fontSize: 11,
                      textTransform:
                        'uppercase',
                      fontWeight:
                        '700',
                    }}
                  >
                    MENSTRUAÇÃO
                  </Text>

                  <Text
                    style={{
                      color:
                        cycleColors.text,
                      fontSize: 16,
                      fontWeight:
                        '700',
                      marginTop: 4,
                    }}
                  >
                    {
                      duracaoMenstruacao
                    }{' '}
                    {duracaoMenstruacao ===
                    1
                      ? 'dia'
                      : 'dias'}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: 18,
                  alignItems:
                    'center',
                }}
              >
                <Text
                  style={{
                    color:
                      cycleColors.textMuted,
                    fontSize: 12,
                    textTransform:
                      'uppercase',
                    letterSpacing: 1,
                    fontWeight:
                      '700',
                  }}
                >
                  FASE ATUAL
                </Text>

                <Text
                  style={{
                    color:
                      cycleColors.text,
                    fontSize: 18,
                    fontWeight:
                      '700',
                    marginTop: 5,
                  }}
                >
                  {faseAtual}
                </Text>

                <Text
                  style={{
                    color:
                      cycleColors.textMuted,
                    fontSize: 13,
                    lineHeight: 20,
                    textAlign:
                      'center',
                    marginTop: 6,
                  }}
                >
                  {descricaoFase}
                </Text>
              </View>
            </View>

            {/* =====================================
                RESUMO DOS REGISTROS
            ===================================== */}

            <View
              style={
                insightsStyles.eventsCard
              }
            >
              <Text
                style={
                  insightsStyles.sectionTitle
                }
              >
                Seus registros
              </Text>

              <View
                style={
                  insightsStyles.eventRow
                }
              >
                <Ionicons
                  name="calendar-outline"
                  size={22}
                  color={
                    cycleColors.gold
                  }
                />

                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={
                      insightsStyles.eventTitle
                    }
                  >
                    {totalRegistros}{' '}
                    {totalRegistros ===
                    1
                      ? 'dia registrado'
                      : 'dias registrados'}
                  </Text>

                  <Text
                    style={
                      insightsStyles.eventDate
                    }
                  >
                    Dias em que você
                    adicionou alguma
                    informação ao
                    Calendário.
                  </Text>
                </View>
              </View>

              <View
                style={
                  insightsStyles.divider
                }
              />

              <View
                style={
                  insightsStyles.eventRow
                }
              >
                <Ionicons
                  name="pulse"
                  size={22}
                  color={
                    cycleColors.rose
                  }
                />

                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={
                      insightsStyles.eventTitle
                    }
                  >
                    {totalSintomas}{' '}
                    {totalSintomas ===
                    1
                      ? 'sintoma'
                      : 'sintomas'}{' '}
                    registrados
                  </Text>

                  <Text
                    style={
                      insightsStyles.eventDate
                    }
                  >
                    Dados registrados
                    no Calendário.
                  </Text>
                </View>
              </View>

              <View
                style={
                  insightsStyles.divider
                }
              />

              <View
                style={
                  insightsStyles.eventRow
                }
              >
                <Ionicons
                  name="heart"
                  size={22}
                  color={
                    humorColors.main
                  }
                />

                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={
                      insightsStyles.eventTitle
                    }
                  >
                    {totalHumores}{' '}
                    {totalHumores ===
                    1
                      ? 'registro de humor'
                      : 'registros de humor'}
                  </Text>

                  <Text
                    style={
                      insightsStyles.eventDate
                    }
                  >
                    Registros emocionais
                    adicionados ao
                    Calendário.
                  </Text>
                </View>
              </View>

              <View
                style={
                  insightsStyles.divider
                }
              />

              <View
                style={
                  insightsStyles.eventRow
                }
              >
                <Ionicons
                  name="flask"
                  size={22}
                  color={
                    cycleColors.lavender
                  }
                />

                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={
                      insightsStyles.eventTitle
                    }
                  >
                    {totalSecrecoes}{' '}
                    {totalSecrecoes ===
                    1
                      ? 'registro de secreção'
                      : 'registros de secreção'}
                  </Text>

                  <Text
                    style={
                      insightsStyles.eventDate
                    }
                  >
                    Registros de secreção
                    durante o ciclo.
                  </Text>
                </View>
              </View>
            </View>

            {/* =====================================
                PRÓXIMOS EVENTOS
            ===================================== */}

            <View
              style={
                insightsStyles.eventsCard
              }
            >
              <Text
                style={
                  insightsStyles.sectionTitle
                }
              >
                Próximos eventos
              </Text>

              <View
                style={
                  insightsStyles.eventRow
                }
              >
                <Ionicons
                  name="flower"
                  size={22}
                  color={
                    cycleColors.gold
                  }
                />

                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={
                      insightsStyles.eventTitle
                    }
                  >
                    Ovulação estimada
                  </Text>

                  <Text
                    style={
                      insightsStyles.eventDate
                    }
                  >
                    {ovulacao}
                  </Text>

                  <Text
                    style={{
                      color:
                        cycleColors.textMuted,
                      fontSize: 11,
                      marginTop: 3,
                    }}
                  >
                    Aproximadamente
                    dia{' '}
                    {
                      diaEstimadoOvulacao
                    }{' '}
                    do ciclo
                  </Text>
                </View>
              </View>

              <View
                style={
                  insightsStyles.divider
                }
              />

              <View
                style={
                  insightsStyles.eventRow
                }
              >
                <Ionicons
                  name="water"
                  size={22}
                  color={
                    cycleColors.rose
                  }
                />

                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={
                      insightsStyles.eventTitle
                    }
                  >
                    Próxima
                    menstruação
                  </Text>

                  <Text
                    style={
                      insightsStyles.eventDate
                    }
                  >
                    {proximaMenstruacao}
                  </Text>

                  {atraso && (
                    <Text
                      style={{
                        color:
                          cycleColors.rose,
                        fontSize: 12,
                        marginTop: 4,
                        fontWeight:
                          '600',
                      }}
                    >
                      {atraso}{' '}
                      {atraso ===
                      1
                        ? 'dia'
                        : 'dias'}{' '}
                      além da
                      previsão
                    </Text>
                  )}
                </View>
              </View>

              {periodoFertil && (
                <>
                  <View
                    style={
                      insightsStyles.divider
                    }
                  />

                  <View
                    style={
                      insightsStyles.eventRow
                    }
                  >
                    <Ionicons
                      name="flower-outline"
                      size={22}
                      color={
                        cycleColors.lavender
                      }
                    />

                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text
                        style={
                          insightsStyles.eventTitle
                        }
                      >
                        Período fértil
                        estimado
                      </Text>

                      <Text
                        style={
                          insightsStyles.eventDate
                        }
                      >
                        {periodoFertil.inicio.toLocaleDateString(
                          'pt-BR'
                        )}{' '}
                        até{' '}
                        {periodoFertil.fim.toLocaleDateString(
                          'pt-BR'
                        )}
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </View>

            {/* =====================================
                SINTOMAS
            ===================================== */}

            <View
              style={
                insightsStyles.symptomsCard
              }
            >
              <Text
                style={
                  insightsStyles.sectionTitle
                }
              >
                Sintomas mais frequentes
              </Text>

              {sintomasMaisFrequentes.length >
              0 ? (
                sintomasMaisFrequentes.map(
                  (
                    [
                      sintoma,
                      quantidade,
                    ],
                    index
                  ) => (
                    <View
                      key={sintoma}
                      style={{
                        flexDirection:
                          'row',
                        alignItems:
                          'center',
                        paddingVertical: 9,
                      }}
                    >
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 15,
                          backgroundColor:
                            cycleColors.roseSoft,
                          alignItems:
                            'center',
                          justifyContent:
                            'center',
                        }}
                      >
                        <Text
                          style={{
                            color:
                              cycleColors.rose,
                            fontWeight:
                              '800',
                            fontSize: 13,
                          }}
                        >
                          {index + 1}
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          marginLeft: 12,
                        }}
                      >
                        <Text
                          style={
                            insightsStyles.eventTitle
                          }
                        >
                          {sintoma}
                        </Text>

                        <Text
                          style={
                            insightsStyles.eventDate
                          }
                        >
                          Registrado{' '}
                          {
                            quantidade
                          }{' '}
                          {quantidade ===
                          1
                            ? 'vez'
                            : 'vezes'}
                        </Text>
                      </View>

                      <Text
                        style={{
                          color:
                            cycleColors.rose,
                          fontWeight:
                            '700',
                        }}
                      >
                        {
                          quantidade
                        }
                      </Text>
                    </View>
                  )
                )
              ) : (
                <Text
                  style={{
                    color:
                      '#B8B8B8',
                    fontSize: 14,
                    lineHeight: 21,
                  }}
                >
                  Nenhum sintoma
                  registrado ainda.
                  Registre sintomas
                  no Calendário para
                  gerar estatísticas
                  personalizadas.
                </Text>
              )}
            </View>

            {/* =====================================
                HUMOR
            ===================================== */}

            <View
              style={
                insightsStyles.moodCard
              }
            >
              <Text
                style={
                  insightsStyles.sectionTitle
                }
              >
                Humor registrado
              </Text>

              {humorMaisFrequente ? (
                <>
                  <View
                    style={{
                      flexDirection:
                        'row',
                      alignItems:
                        'center',
                      marginBottom: 14,
                    }}
                  >
                    <View
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 23,
                        backgroundColor:
                          humorColors.soft,
                        alignItems:
                          'center',
                        justifyContent:
                          'center',
                      }}
                    >
                      <Ionicons
                        name="heart"
                        size={24}
                        color={
                          humorColors.main
                        }
                      />
                    </View>

                    <View
                      style={{
                        flex: 1,
                        marginLeft: 12,
                      }}
                    >
                      <Text
                        style={
                          insightsStyles.eventTitle
                        }
                      >
                        Humor mais
                        frequente
                      </Text>

                      <Text
                        style={{
                          color:
                            humorColors.main,
                          fontSize: 16,
                          fontWeight:
                            '700',
                          marginTop: 3,
                        }}
                      >
                        {
                          humorMaisFrequente[0]
                        }
                      </Text>
                    </View>

                    <Text
                      style={{
                        color:
                          humorColors.main,
                        fontWeight:
                          '700',
                      }}
                    >
                      {
                        humorMaisFrequente[1]
                      }
                      x
                    </Text>
                  </View>

                  {humorEstatisticas
                    .slice(0, 5)
                    .map(
                      ([
                        humor,
                        quantidade,
                      ]) => (
                        <View
                          key={humor}
                          style={{
                            flexDirection:
                              'row',
                            justifyContent:
                              'space-between',
                            alignItems:
                              'center',
                            paddingVertical: 7,
                          }}
                        >
                          <Text
                            style={{
                              color:
                                cycleColors.text,
                              fontSize: 14,
                            }}
                          >
                            {humor}
                          </Text>

                          <Text
                            style={{
                              color:
                                humorColors.main,
                              fontWeight:
                                '700',
                            }}
                          >
                            {
                              quantidade
                            }{' '}
                            {quantidade ===
                            1
                              ? 'registro'
                              : 'registros'}
                          </Text>
                        </View>
                      )
                    )}
                </>
              ) : (
                <Text
                  style={{
                    color:
                      '#B8B8B8',
                    fontSize: 14,
                    lineHeight: 21,
                  }}
                >
                  Nenhum registro de
                  humor disponível
                  ainda. Registre como
                  você está se sentindo
                  no Calendário.
                </Text>
              )}
            </View>

            {/* =====================================
                SECREÇÃO
            ===================================== */}

            <View
              style={
                insightsStyles.historyCard
              }
            >
              <Text
                style={
                  insightsStyles.sectionTitle
                }
              >
                Secreção registrada
              </Text>

              {secrecaoEstatisticas.length >
              0 ? (
                <>
                  <View
                    style={{
                      flexDirection:
                        'row',
                      alignItems:
                        'center',
                      marginBottom: 14,
                    }}
                  >
                    <View
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 21,
                        backgroundColor:
                          cycleColors.lavenderSoft,
                        alignItems:
                          'center',
                        justifyContent:
                          'center',
                      }}
                    >
                      <Ionicons
                        name="flask"
                        size={21}
                        color={
                          cycleColors.lavender
                        }
                      />
                    </View>

                    <View
                      style={{
                        flex: 1,
                        marginLeft: 12,
                      }}
                    >
                      <Text
                        style={
                          insightsStyles.eventTitle
                        }
                      >
                        Mais registrada
                      </Text>

                      <Text
                        style={{
                          color:
                            cycleColors.text,
                          fontSize: 15,
                          fontWeight:
                            '700',
                          marginTop: 3,
                        }}
                      >
                        {
                          secrecaoMaisFrequente?.[0]
                        }
                      </Text>
                    </View>

                    <Text
                      style={{
                        color:
                          cycleColors.lavender,
                        fontWeight:
                          '700',
                      }}
                    >
                      {
                        secrecaoMaisFrequente?.[1]
                      }
                      x
                    </Text>
                  </View>

                  {secrecaoEstatisticas
                    .slice(0, 5)
                    .map(
                      ([
                        secrecao,
                        quantidade,
                      ]) => (
                        <View
                          key={
                            secrecao
                          }
                          style={{
                            flexDirection:
                              'row',
                            justifyContent:
                              'space-between',
                            alignItems:
                              'center',
                            paddingVertical: 7,
                          }}
                        >
                          <Text
                            style={{
                              color:
                                cycleColors.text,
                              fontSize: 14,
                            }}
                          >
                            {secrecao}
                          </Text>

                          <Text
                            style={{
                              color:
                                cycleColors.lavender,
                              fontWeight:
                                '700',
                            }}
                          >
                            {
                              quantidade
                            }{' '}
                            {quantidade ===
                            1
                              ? 'registro'
                              : 'registros'}
                          </Text>
                        </View>
                      )
                    )}
                </>
              ) : (
                <Text
                  style={{
                    color:
                      '#B8B8B8',
                    fontSize: 14,
                    lineHeight: 21,
                  }}
                >
                  Nenhum registro de
                  secreção ainda.
                  Utilize o Calendário
                  para registrar suas
                  informações.
                </Text>
              )}
            </View>

            {/* =====================================
                ÚLTIMOS REGISTROS
            ===================================== */}

            <View
              style={
                insightsStyles.eventsCard
              }
            >
              <Text
                style={
                  insightsStyles.sectionTitle
                }
              >
                Últimos registros
              </Text>

              {ultimoHumor && (
                <View
                  style={
                    insightsStyles.eventRow
                  }
                >
                  <Ionicons
                    name="heart"
                    size={22}
                    color={
                      humorColors.main
                    }
                  />

                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <Text
                      style={
                        insightsStyles.eventTitle
                      }
                    >
                      Humor
                    </Text>

                    <Text
                      style={
                        insightsStyles.eventDate
                      }
                    >
                      {
                        ultimoHumor.humor
                      }
                    </Text>
                  </View>

                  <Text
                    style={{
                      color:
                        cycleColors.textMuted,
                      fontSize: 11,
                    }}
                  >
                    {new Date(
                      ultimoHumor.data
                    ).toLocaleDateString(
                      'pt-BR'
                    )}
                  </Text>
                </View>
              )}

              {ultimoSintoma && (
                <>
                  <View
                    style={
                      insightsStyles.divider
                    }
                  />

                  <View
                    style={
                      insightsStyles.eventRow
                    }
                  >
                    <Ionicons
                      name="pulse"
                      size={22}
                      color={
                        cycleColors.rose
                      }
                    />

                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text
                        style={
                          insightsStyles.eventTitle
                        }
                      >
                        Sintomas
                      </Text>

                      <Text
                        style={
                          insightsStyles.eventDate
                        }
                      >
                        {ultimoSintoma.sintomas.join(
                          ', '
                        )}
                      </Text>
                    </View>

                    <Text
                      style={{
                        color:
                          cycleColors.textMuted,
                        fontSize: 11,
                      }}
                    >
                      {new Date(
                        ultimoSintoma.data
                      ).toLocaleDateString(
                        'pt-BR'
                      )}
                    </Text>
                  </View>
                </>
              )}

              {ultimaSecrecao && (
                <>
                  <View
                    style={
                      insightsStyles.divider
                    }
                  />

                  <View
                    style={
                      insightsStyles.eventRow
                    }
                  >
                    <Ionicons
                      name="flask"
                      size={22}
                      color={
                        cycleColors.lavender
                      }
                    />

                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text
                        style={
                          insightsStyles.eventTitle
                        }
                      >
                        Secreção
                      </Text>

                      <Text
                        style={
                          insightsStyles.eventDate
                        }
                      >
                        {
                          ultimaSecrecao.secrecao
                        }
                      </Text>
                    </View>

                    <Text
                      style={{
                        color:
                          cycleColors.textMuted,
                        fontSize: 11,
                      }}
                    >
                      {new Date(
                        ultimaSecrecao.data
                      ).toLocaleDateString(
                        'pt-BR'
                      )}
                    </Text>
                  </View>
                </>
              )}

              {!ultimoHumor &&
                !ultimoSintoma &&
                !ultimaSecrecao && (
                  <Text
                    style={{
                      color:
                        '#B8B8B8',
                      fontSize: 14,
                      lineHeight: 21,
                    }}
                  >
                    Ainda não existem
                    registros adicionais.
                  </Text>
                )}
            </View>

            {/* =====================================
                INSIGHTS PERSONALIZADOS
            ===================================== */}

            <View
              style={
                insightsStyles.insightCard
              }
            >
              <Text
                style={
                  insightsStyles.sectionTitle
                }
              >
                Insights personalizados
              </Text>

              <View
                style={
                  insightsStyles.tipRow
                }
              >
                <Ionicons
                  name="analytics"
                  size={22}
                  color={
                    cycleColors.teal
                  }
                />

                <Text
                  style={
                    insightsStyles.tipText
                  }
                >
                  Você já possui{' '}
                  {totalRegistros}{' '}
                  {totalRegistros ===
                  1
                    ? 'dia'
                    : 'dias'}{' '}
                  com informações
                  registradas no
                  Calendário.
                </Text>
              </View>

              {sintomasMaisFrequentes.length >
                0 && (
                <View
                  style={
                    insightsStyles.tipRow
                  }
                >
                  <Ionicons
                    name="pulse"
                    size={22}
                    color={
                      cycleColors.rose
                    }
                  />

                  <Text
                    style={
                      insightsStyles.tipText
                    }
                  >
                    O sintoma mais
                    frequente até agora
                    é{' '}
                    <Text
                      style={{
                        fontWeight:
                          '700',
                      }}
                    >
                      {
                        sintomasMaisFrequentes[0][0]
                      }
                    </Text>
                    .
                  </Text>
                </View>
              )}

              {humorMaisFrequente && (
                <View
                  style={
                    insightsStyles.tipRow
                  }
                >
                  <Ionicons
                    name="heart"
                    size={22}
                    color={
                      humorColors.main
                    }
                  />

                  <Text
                    style={
                      insightsStyles.tipText
                    }
                  >
                    O humor mais
                    registrado até agora
                    é{' '}
                    <Text
                      style={{
                        fontWeight:
                          '700',
                      }}
                    >
                      {
                        humorMaisFrequente[0]
                      }
                    </Text>
                    .
                  </Text>
                </View>
              )}

              {secrecaoMaisFrequente && (
                <View
                  style={
                    insightsStyles.tipRow
                  }
                >
                  <Ionicons
                    name="flask"
                    size={22}
                    color={
                      cycleColors.lavender
                    }
                  />

                  <Text
                    style={
                      insightsStyles.tipText
                    }
                  >
                    A secreção mais
                    registrada até agora
                    é{' '}
                    <Text
                      style={{
                        fontWeight:
                          '700',
                      }}
                    >
                      {
                        secrecaoMaisFrequente[0]
                      }
                    </Text>
                    .
                  </Text>
                </View>
              )}

              {atraso && (
                <View
                  style={
                    insightsStyles.tipRow
                  }
                >
                  <Ionicons
                    name="time"
                    size={22}
                    color={
                      cycleColors.rose
                    }
                  />

                  <Text
                    style={
                      insightsStyles.tipText
                    }
                  >
                    A previsão atual
                    está {atraso}{' '}
                    {atraso === 1
                      ? 'dia'
                      : 'dias'}{' '}
                    além da data
                    estimada.
                  </Text>
                </View>
              )}

              {!totalRegistros &&
                !sintomasMaisFrequentes.length &&
                !humorMaisFrequente &&
                !secrecaoMaisFrequente && (
                  <Text
                    style={
                      insightsStyles.tipText
                    }
                  >
                    Continue registrando
                    informações no
                    Calendário para
                    receber insights
                    personalizados.
                  </Text>
                )}
            </View>

            {/* =====================================
                DICA DO DIA
            ===================================== */}

            <View
              style={
                insightsStyles.dailyTipCard
              }
            >
              <Text
                style={
                  insightsStyles.sectionTitle
                }
              >
                Dica do dia
              </Text>

              <Text
                style={
                  insightsStyles.dailyTipText
                }
              >
                Continue registrando
                menstruação, sintomas,
                secreção e humor no
                Calendário. Quanto mais
                dados forem registrados
                ao longo dos ciclos,
                melhores serão as
                estatísticas e previsões
                personalizadas.
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}