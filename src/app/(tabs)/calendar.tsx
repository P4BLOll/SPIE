import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
  Modal,
  Animated,
} from 'react-native';

import {
  Calendar,
  LocaleConfig,
} from 'react-native-calendars';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useCycle } from '@/context/CycleContext';
import { Background } from '@/components/Background';

import {
  calendarStyles,
  cycleColors,
  TAB_BAR_BASE_HEIGHT,
} from '@/styles/calendar.styles';

// =====================================
// CORES DO HUMOR
// =====================================

const humorColors = {
  soft: cycleColors.roseSoft,
  main: cycleColors.rose,
  dark: cycleColors.lavender,
};

// =====================================
// TEXTOS PARA EXIBIÇÃO
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

function nomeDoSintoma(id: string) {
  return nomesSintomas[id] ?? id;
}

function textoSecrecao(secrecao: unknown): string {
  if (typeof secrecao === 'string') {
    return secrecao;
  }

  if (secrecao && typeof secrecao === 'object') {
    const registro = secrecao as {
      tipo?: unknown;
      observacao?: unknown;
    };

    if (typeof registro.tipo === 'string') {
      return registro.tipo;
    }

    if (typeof registro.observacao === 'string') {
      return registro.observacao;
    }
  }

  return '';
}

// =====================================
// CONFIGURAÇÃO DO CALENDÁRIO EM PORTUGUÊS
// =====================================

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],

  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],

  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ],

  dayNamesShort: [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sáb',
  ],

  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'pt-br';

// =====================================
// ROTAS
// =====================================

const ROTA_PERFIL = '../profile';

const ROTA_EDITAR_CALENDARIO =
  '/calendar/register-period';

const ROTA_SINTOMAS =
  '/calendar/symptoms';

const ROTA_SECRECAO =
  '/calendar/register-secretion';

// =====================================
// BOTÃO ANIMADO
// =====================================

function AnimatedPressable({
  style,
  onPress,
  children,
}: {
  style?: any;
  onPress?: () => void;
  children: React.ReactNode;
}) {
  const scale = useRef(
    new Animated.Value(1)
  ).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.94,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          style,
          {
            transform: [{ scale }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

// =====================================
// FORMATAR DATA
// =====================================

function formatarData(data: string) {
  const [ano, mes, dia] = data.split('-');

  return `${dia}/${mes}/${ano}`;
}

// =====================================
// CRIAR DATA LOCAL
// =====================================

function criarDataLocal(data: string) {
  const [ano, mes, dia] = data
    .split('-')
    .map(Number);

  return new Date(
    ano,
    mes - 1,
    dia
  );
}

// =====================================
// FORMATAR DATA PARA YYYY-MM-DD
// =====================================

function formatarDataISO(data: Date) {
  const ano = data.getFullYear();

  const mes = String(
    data.getMonth() + 1
  ).padStart(2, '0');

  const dia = String(
    data.getDate()
  ).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

// =====================================
// CALCULAR DIFERENÇA ENTRE DATAS
// =====================================

function diferencaEmDias(
  inicio: Date,
  fim: Date
) {
  return Math.floor(
    (
      fim.getTime() -
      inicio.getTime()
    ) /
      (1000 * 60 * 60 * 24)
  );
}

// =====================================
// TELA
// =====================================

export default function CalendarScreen() {
  const {
    ultimaMenstruacao,
    setUltimaMenstruacao,
    registros,
    setRegistros,
    duracaoCiclo,
    duracaoMenstruacao,
  } = useCycle();

  const insets =
    useSafeAreaInsets();

  const espacoParaTabBar =
    TAB_BAR_BASE_HEIGHT +
    insets.bottom +
    24;

  // =====================================
  // CONFIGURAÇÕES DO CICLO
  // =====================================

  const cicloConfigurado =
    Number(duracaoCiclo) > 0
      ? Number(duracaoCiclo)
      : 28;

  const menstruacaoConfigurada =
    Number(duracaoMenstruacao) > 0
      ? Number(duracaoMenstruacao)
      : 5;

  // =====================================
  // DATA ATUAL
  // =====================================

  const hoje = new Date();

  const hojeString =
    formatarDataISO(hoje);

  const diaAtual =
    hoje.getDate();

  const mesAtual =
    hoje.toLocaleDateString(
      'pt-BR',
      {
        month: 'long',
      }
    );

  const mesAtualFormatado =
    mesAtual.charAt(0).toUpperCase() +
    mesAtual.slice(1);

  // =====================================
  // ESTADOS
  // =====================================

  const [
    diaSelecionado,
    setDiaSelecionado,
  ] = useState<string | null>(null);

  const [
    modalHumor,
    setModalHumor,
  ] = useState(false);

  // =====================================
  // ANIMAÇÕES
  // =====================================

  const headerFade = useRef(
    new Animated.Value(0)
  ).current;

  const headerSlide = useRef(
    new Animated.Value(-8)
  ).current;

  const contentFade = useRef(
    new Animated.Value(0)
  ).current;

  const contentSlide = useRef(
    new Animated.Value(16)
  ).current;

  const actionAnims = useRef(
    [0, 1, 2, 3].map(
      () => new Animated.Value(0)
    )
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),

      Animated.timing(headerSlide, {
        toValue: 0,
        duration: 420,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.parallel([
      Animated.timing(contentFade, {
        toValue: 1,
        duration: 480,
        delay: 120,
        useNativeDriver: true,
      }),

      Animated.timing(contentSlide, {
        toValue: 0,
        duration: 480,
        delay: 120,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.stagger(
      90,
      actionAnims.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  // =====================================
  // DIA DO CICLO
  // =====================================

  const diaDoCiclo = useMemo(() => {
    if (!ultimaMenstruacao) {
      return null;
    }

    const inicio =
      criarDataLocal(
        ultimaMenstruacao
      );

    const hojeData =
      criarDataLocal(
        hojeString
      );

    const diferenca =
      diferencaEmDias(
        inicio,
        hojeData
      );

    if (diferenca < 0) {
      return null;
    }

    return (
      (diferenca % cicloConfigurado) + 1
    );
  }, [
    ultimaMenstruacao,
    hojeString,
    cicloConfigurado,
  ]);

  // =====================================
  // PRÓXIMA MENSTRUAÇÃO
  // =====================================

  const proximaMenstruacao =
    useMemo(() => {
      if (!ultimaMenstruacao) {
        return null;
      }

      const data =
        criarDataLocal(
          ultimaMenstruacao
        );

      data.setDate(
        data.getDate() +
          cicloConfigurado
      );

      return data.toLocaleDateString(
        'pt-BR'
      );
    }, [
      ultimaMenstruacao,
      cicloConfigurado,
    ]);

  // =====================================
  // ATRASO
  // =====================================

  const atraso = useMemo(() => {
    if (!ultimaMenstruacao) {
      return null;
    }

    const inicio =
      criarDataLocal(
        ultimaMenstruacao
      );

    const hojeData =
      criarDataLocal(
        hojeString
      );

    const diferenca =
      diferencaEmDias(
        inicio,
        hojeData
      );

    if (diferenca < cicloConfigurado) {
      return null;
    }

    const ciclosCompletos =
      Math.floor(
        diferenca /
          cicloConfigurado
      );

    const prevista =
      new Date(inicio);

    prevista.setDate(
      prevista.getDate() +
        ciclosCompletos *
          cicloConfigurado
    );

    const diasAtraso =
      diferencaEmDias(
        prevista,
        hojeData
      );

    return diasAtraso > 0
      ? diasAtraso
      : null;
  }, [
    ultimaMenstruacao,
    hojeString,
    cicloConfigurado,
  ]);

  // =====================================
  // CLASSIFICAÇÃO DOS DIAS
  // =====================================

  const classificacaoDias =
    useMemo(() => {
      const classificacao: Record<
        string,
        {
          menstruacao?: boolean;
          fertil?: boolean;
          ovulacao?: boolean;
        }
      > = {};

      if (!ultimaMenstruacao) {
        return classificacao;
      }

      const inicio =
        criarDataLocal(
          ultimaMenstruacao
        );

      for (
        let ciclo = -1;
        ciclo < 12;
        ciclo++
      ) {
        const inicioCiclo =
          new Date(inicio);

        inicioCiclo.setDate(
          inicioCiclo.getDate() +
            cicloConfigurado *
              ciclo
        );

        // =====================================
        // MENSTRUAÇÃO
        // =====================================

        for (
          let i = 0;
          i < menstruacaoConfigurada;
          i++
        ) {
          const dia =
            new Date(
              inicioCiclo
            );

          dia.setDate(
            dia.getDate() + i
          );

          const chave =
            formatarDataISO(dia);

          classificacao[chave] = {
            ...classificacao[chave],
            menstruacao: true,
          };
        }

        // =====================================
        // OVULAÇÃO
        // =====================================

        const ovulacao =
          new Date(
            inicioCiclo
          );

        const diaOvulacao =
          Math.max(
            1,
            cicloConfigurado - 14
          );

        ovulacao.setDate(
          ovulacao.getDate() +
            diaOvulacao
        );

        // =====================================
        // PERÍODO FÉRTIL
        // =====================================

        for (
          let i = -2;
          i <= 2;
          i++
        ) {
          const fertil =
            new Date(
              ovulacao
            );

          fertil.setDate(
            fertil.getDate() + i
          );

          const chave =
            formatarDataISO(
              fertil
            );

          classificacao[chave] = {
            ...classificacao[chave],
            fertil: true,
          };
        }

        // =====================================
        // DIA DA OVULAÇÃO
        // =====================================

        const chaveOvulacao =
          formatarDataISO(
            ovulacao
          );

        classificacao[
          chaveOvulacao
        ] = {
          ...classificacao[
            chaveOvulacao
          ],
          ovulacao: true,
        };
      }

      return classificacao;
    }, [
      ultimaMenstruacao,
      cicloConfigurado,
      menstruacaoConfigurada,
    ]);

  // =====================================
  // MARCAÇÕES DO CALENDÁRIO
  // =====================================

  const markedDates =
    useMemo(() => {
      const marks: Record<
        string,
        any
      > = {};

      Object.keys(
        classificacaoDias
      ).forEach((chave) => {
        const {
          menstruacao,
          ovulacao,
          fertil,
        } =
          classificacaoDias[
            chave
          ];

        let backgroundColor:
          | string
          | null = null;

        let textColor = '#FFFFFF';

        if (menstruacao) {
          backgroundColor =
            cycleColors.rose;
        } else if (ovulacao) {
          backgroundColor =
            cycleColors.gold;

          textColor =
            cycleColors.surfaceAlt;
        } else if (fertil) {
          backgroundColor =
            cycleColors.lavender;
        }

        if (backgroundColor) {
          marks[chave] = {
            customStyles: {
              container: {
                backgroundColor,
                borderRadius: 20,
              },

              text: {
                color: textColor,
                fontWeight: 'bold',
              },
            },
          };
        }
      });

      // =====================================
      // REGISTROS
      // =====================================

      Object.keys(
        registros
      ).forEach((chave) => {
        const registro =
          registros[chave];

        const temDados =
          (
            registro?.sintomas
              ?.length ?? 0
          ) > 0 ||
          !!registro?.secrecao ||
          !!registro?.humor;

        if (!temDados) {
          return;
        }

        marks[chave] = {
          ...marks[chave],

          customStyles: {
            container: {
              ...marks[chave]
                ?.customStyles
                ?.container,

              borderBottomWidth: 3,

              borderBottomColor:
                cycleColors.teal,
            },

            text: {
              color:
                marks[chave]
                  ?.customStyles
                  ?.text
                  ?.color ??
                cycleColors.text,

              fontWeight: 'bold',
            },
          },
        };
      });

      // =====================================
      // HOJE
      // =====================================

      const marcaHoje =
        marks[hojeString];

      marks[hojeString] = {
        ...marcaHoje,

        customStyles: {
          ...marcaHoje?.customStyles,

          container: {
            ...marcaHoje
              ?.customStyles
              ?.container,

            borderWidth: 2,
            borderColor:
              cycleColors.teal,
            borderRadius: 20,
          },

          text: {
            ...marcaHoje
              ?.customStyles
              ?.text,

            color:
              marcaHoje
                ?.customStyles
                ?.text
                ?.color ??
              cycleColors.teal,

            fontWeight: 'bold',
          },
        },
      };

      return marks;
    }, [
      classificacaoDias,
      registros,
      hojeString,
    ]);

  // =====================================
  // REGISTRAR MENSTRUAÇÃO
  // =====================================

  function registrarMenstruacao(
    data: string
  ) {
    Alert.alert(
      'Registrar menstruação',

      `Deseja registrar ${formatarData(
        data
      )} como início da menstruação?`,

      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Registrar',

          onPress: () => {
            setUltimaMenstruacao(
              data
            );

            setDiaSelecionado(
              null
            );
          },
        },
      ]
    );
  }

  // =====================================
  // REGISTRAR HUMOR
  // =====================================

  function registrarHumor(
    humor: string
  ) {
    const data =
      diaSelecionado ??
      hojeString;

    setRegistros((atual) => ({
      ...atual,

      [data]: {
        ...atual[data],
        humor,
      },
    }));

    setModalHumor(false);
    setDiaSelecionado(null);
  }

  // =====================================
  // ABRIR HUMOR
  // =====================================

  function abrirRegistroHumor(
    data?: string
  ) {
    const dataRegistro =
      data ?? hojeString;

    setDiaSelecionado(
      dataRegistro
    );

    setModalHumor(true);
  }

  // =====================================
  // ABRIR SINTOMAS
  // =====================================

  function abrirRegistroSintomas(
    data?: string
  ) {
    const dataRegistro =
      data ?? hojeString;

    setDiaSelecionado(null);

    router.push({
      pathname: ROTA_SINTOMAS,
      params: {
        data: dataRegistro,
      },
    });
  }

  // =====================================
  // ABRIR SECREÇÃO
  // =====================================

  function abrirRegistroSecrecao(
    data?: string
  ) {
    const dataRegistro =
      data ?? hojeString;

    setDiaSelecionado(null);

    router.push({
      pathname: ROTA_SECRECAO,
      params: {
        data: dataRegistro,
      },
    });
  }

  // =====================================
  // INFORMAÇÕES DO DIA SELECIONADO
  // =====================================

  const infoDiaSelecionado =
    diaSelecionado
      ? classificacaoDias[
          diaSelecionado
        ]
      : null;

  const registroDiaSelecionado =
    diaSelecionado
      ? registros[
          diaSelecionado
        ]
      : null;

  const temAlgumRegistro =
    !!infoDiaSelecionado
      ?.menstruacao ||
    (
      registroDiaSelecionado
        ?.sintomas
        ?.length ?? 0
    ) > 0 ||
    !!registroDiaSelecionado
      ?.secrecao ||
    !!registroDiaSelecionado
      ?.humor;

  // =====================================
  // HUMORES
  // =====================================

  const humores = [
    {
      nome: 'Muito feliz',
      icon: 'happy',
    },
    {
      nome: 'Bem',
      icon: 'happy-outline',
    },
    {
      nome: 'Normal',
      icon: 'remove-circle-outline',
    },
    {
      nome: 'Triste',
      icon: 'sad-outline',
    },
    {
      nome: 'Muito triste',
      icon: 'sad',
    },
    {
      nome: 'Irritada',
      icon: 'flame-outline',
    },
    {
      nome: 'Ansiosa',
      icon: 'pulse-outline',
    },
    {
      nome: 'Cansada',
      icon: 'moon-outline',
    },
  ];

  // =====================================
  // AÇÕES DIÁRIAS
  // =====================================

  const acoesDiarias = [
    {
      label: 'Menstruação',
      icon: 'water',
      bg: cycleColors.roseSoft,
      iconBg: cycleColors.rose,
      iconColor: '#FFFFFF',
      onPress: () =>
        router.push(
          ROTA_EDITAR_CALENDARIO
        ),
    },

    {
      label: 'Sintomas',
      icon: 'happy',
      bg: cycleColors.goldSoft,
      iconBg: cycleColors.gold,
      iconColor:
        cycleColors.surfaceAlt,
      onPress: () =>
        abrirRegistroSintomas(),
    },

    {
      label: 'Humor',
      icon: 'heart',
      bg: cycleColors.roseSoft,
      iconBg: cycleColors.rose,
      iconColor: '#FFFFFF',
      onPress: () =>
        abrirRegistroHumor(),
    },

    {
      label: 'Secreção',
      icon: 'flask',
      bg: cycleColors.lavenderSoft,
      iconBg: cycleColors.lavender,
      iconColor: '#FFFFFF',
      onPress: () =>
        abrirRegistroSecrecao(),
    },
  ];

  // =====================================
  // RETURN
  // =====================================

  return (
    <Background>
      <View style={calendarStyles.root}>

        {/* =====================================
            TOPO
        ===================================== */}

        <Animated.View
          style={[
            calendarStyles.fixedHeader,
            {
              opacity: headerFade,
              transform: [
                {
                  translateY:
                    headerSlide,
                },
              ],
            },
          ]}
        >
          <AnimatedPressable
            style={
              calendarStyles.topBarIcon
            }
            onPress={() =>
              router.push(
                ROTA_EDITAR_CALENDARIO
              )
            }
          >
            <Ionicons
              name="calendar-outline"
              size={24}
              color={cycleColors.text}
            />
          </AnimatedPressable>

          <View
            style={
              calendarStyles.dateRow
            }
          >
            <Text
              style={
                calendarStyles.dateDay
              }
            >
              {diaAtual}
            </Text>

            <Text
              style={
                calendarStyles.dateMonth
              }
            >
              de {mesAtualFormatado}
            </Text>
          </View>

          <AnimatedPressable
            style={
              calendarStyles.topBarIcon
            }
            onPress={() =>
              router.push(
                ROTA_PERFIL
              )
            }
          >
            <Ionicons
              name="person-circle-outline"
              size={30}
              color={cycleColors.text}
            />
          </AnimatedPressable>
        </Animated.View>

        {/* =====================================
            CONTEÚDO
        ===================================== */}

        <ScrollView
          style={
            calendarStyles.scrollArea
          }
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={[
            calendarStyles.container,
            {
              paddingBottom:
                espacoParaTabBar,
            },
          ]}
        >
          <Animated.View
            style={{
              opacity: contentFade,
              transform: [
                {
                  translateY:
                    contentSlide,
                },
              ],
            }}
          >

            {/* =====================================
                AVISO
            ===================================== */}

            {!ultimaMenstruacao && (
              <View
                style={
                  calendarStyles.noRecordBanner
                }
              >
                <Ionicons
                  name="water-outline"
                  size={20}
                  color={
                    cycleColors.rose
                  }
                />

                <Text
                  style={
                    calendarStyles.noRecordText
                  }
                >
                  Nenhum registro de
                  menstruação salvo
                  ainda. Toque em um
                  dia no calendário
                  para começar.
                </Text>
              </View>
            )}

            {/* =====================================
                CALENDÁRIO
            ===================================== */}

            <View
              style={
                calendarStyles.calendarCard
              }
            >
              <Calendar
                style={
                  calendarStyles.calendar
                }
                markedDates={
                  markedDates
                }
                markingType="custom"
                firstDay={1}
                hideExtraDays={false}
                enableSwipeMonths
                theme={{
                  calendarBackground:
                    cycleColors.surface,

                  backgroundColor:
                    cycleColors.surface,

                  textSectionTitleColor:
                    cycleColors.textMuted,

                  dayTextColor:
                    cycleColors.text,

                  monthTextColor:
                    cycleColors.text,

                  todayTextColor:
                    cycleColors.teal,

                  arrowColor:
                    cycleColors.gold,

                  textDisabledColor:
                    '#4A3D50',

                  textMonthFontSize: 18,
                  textMonthFontWeight:
                    '700',

                  textDayFontSize: 15,
                  textDayFontWeight:
                    '600',
                }}
                onDayPress={(day) =>
                  setDiaSelecionado(
                    day.dateString
                  )
                }
              />
            </View>

            {/* =====================================
                LEGENDA
            ===================================== */}

            <View
              style={
                calendarStyles.legend
              }
            >
              <View
                style={
                  calendarStyles.legendItem
                }
              >
                <View
                  style={[
                    calendarStyles.legendDot,
                    {
                      backgroundColor:
                        cycleColors.rose,
                    },
                  ]}
                />

                <Text
                  style={
                    calendarStyles.legendText
                  }
                >
                  Menstruação
                </Text>
              </View>

              <View
                style={
                  calendarStyles.legendItem
                }
              >
                <View
                  style={[
                    calendarStyles.legendDot,
                    {
                      backgroundColor:
                        cycleColors.lavender,
                    },
                  ]}
                />

                <Text
                  style={
                    calendarStyles.legendText
                  }
                >
                  Período fértil
                </Text>
              </View>

              <View
                style={
                  calendarStyles.legendItem
                }
              >
                <View
                  style={[
                    calendarStyles.legendDot,
                    {
                      backgroundColor:
                        cycleColors.gold,
                    },
                  ]}
                />

                <Text
                  style={
                    calendarStyles.legendText
                  }
                >
                  Ovulação
                </Text>
              </View>

              <View
                style={
                  calendarStyles.legendItem
                }
              >
                <View
                  style={[
                    calendarStyles.legendDot,
                    {
                      backgroundColor:
                        cycleColors.teal,
                    },
                  ]}
                />

                <Text
                  style={
                    calendarStyles.legendText
                  }
                >
                  Hoje
                </Text>
              </View>
            </View>

            {/* =====================================
                AÇÕES DIÁRIAS
            ===================================== */}

            <View
              style={
                calendarStyles.dailySection
              }
            >
              <Text
                style={
                  calendarStyles.dailyEyebrow
                }
              >
                HOJE
              </Text>

              <Text
                style={
                  calendarStyles.dailyTitle
                }
              >
                O que você quer
                registrar?
              </Text>

              <View
                style={[
                  calendarStyles.dailyActions,
                  {
                    flexWrap: 'wrap',
                    gap: 10,
                  },
                ]}
              >
                {acoesDiarias.map(
                  (acao, index) => (
                    <Animated.View
                      key={
                        acao.label
                      }
                      style={{
                        width: '48%',
                        opacity:
                          actionAnims[
                            index
                          ],

                        transform: [
                          {
                            translateY:
                              actionAnims[
                                index
                              ].interpolate(
                                {
                                  inputRange: [
                                    0,
                                    1,
                                  ],

                                  outputRange: [
                                    16,
                                    0,
                                  ],
                                }
                              ),
                          },
                        ],
                      }}
                    >
                      <AnimatedPressable
                        style={[
                          calendarStyles.dailyActionCard,
                          {
                            backgroundColor:
                              acao.bg,
                          },
                        ]}
                        onPress={
                          acao.onPress
                        }
                      >
                        <View
                          style={[
                            calendarStyles.dailyActionIcon,
                            {
                              backgroundColor:
                                acao.iconBg,
                            },
                          ]}
                        >
                          <Ionicons
                            name={
                              acao.icon as any
                            }
                            size={22}
                            color={
                              acao.iconColor
                            }
                          />
                        </View>

                        <Text
                          style={
                            calendarStyles.dailyActionText
                          }
                        >
                          {
                            acao.label
                          }
                        </Text>
                      </AnimatedPressable>
                    </Animated.View>
                  )
                )}
              </View>
            </View>

            {/* =====================================
                INFORMAÇÕES DO CICLO
            ===================================== */}

            {ultimaMenstruacao && (
              <View
                style={
                  calendarStyles.infoCard
                }
              >
                <Text
                  style={
                    calendarStyles.infoTitle
                  }
                >
                  Informações do ciclo
                </Text>

                <View
                  style={
                    calendarStyles.infoRow
                  }
                >
                  <Ionicons
                    name="ellipse"
                    size={20}
                    color={
                      cycleColors.gold
                    }
                  />

                  <Text
                    style={
                      calendarStyles.info
                    }
                  >
                    Dia do ciclo:
                  </Text>

                  <Text
                    style={
                      calendarStyles.value
                    }
                  >
                    {diaDoCiclo
                      ? `Dia ${diaDoCiclo}`
                      : '--'}
                  </Text>
                </View>

                <View
                  style={
                    calendarStyles.infoRow
                  }
                >
                  <Ionicons
                    name="water-outline"
                    size={20}
                    color={
                      cycleColors.rose
                    }
                  />

                  <Text
                    style={
                      calendarStyles.info
                    }
                  >
                    Última menstruação:
                  </Text>

                  <Text
                    style={
                      calendarStyles.value
                    }
                  >
                    {formatarData(
                      ultimaMenstruacao
                    )}
                  </Text>
                </View>

                <View
                  style={
                    calendarStyles.infoRow
                  }
                >
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color={
                      cycleColors.teal
                    }
                  />

                  <Text
                    style={
                      calendarStyles.info
                    }
                  >
                    Próxima:
                  </Text>

                  <Text
                    style={
                      calendarStyles.value
                    }
                  >
                    {proximaMenstruacao}
                  </Text>
                </View>

                <View
                  style={
                    calendarStyles.infoRow
                  }
                >
                  <Ionicons
                    name="water"
                    size={20}
                    color={
                      cycleColors.rose
                    }
                  />

                  <Text
                    style={
                      calendarStyles.info
                    }
                  >
                    Duração:
                  </Text>

                  <Text
                    style={
                      calendarStyles.value
                    }
                  >
                    {menstruacaoConfigurada}{' '}
                    dias
                  </Text>
                </View>

                <View
                  style={
                    calendarStyles.infoRow
                  }
                >
                  <Ionicons
                    name="repeat-outline"
                    size={20}
                    color={
                      cycleColors.gold
                    }
                  />

                  <Text
                    style={
                      calendarStyles.info
                    }
                  >
                    Ciclo:
                  </Text>

                  <Text
                    style={
                      calendarStyles.value
                    }
                  >
                    {cicloConfigurado}{' '}
                    dias
                  </Text>
                </View>

                {atraso && (
                  <Text
                    style={
                      calendarStyles.delay
                    }
                  >
                    Seu ciclo está{' '}
                    {atraso} dias além da
                    previsão.
                  </Text>
                )}
              </View>
            )}
          </Animated.View>
        </ScrollView>
      </View>

      {/* =====================================
          MODAL DE HUMOR
      ===================================== */}

      <Modal
        visible={modalHumor}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setModalHumor(false)
        }
      >
        <Pressable
          style={
            calendarStyles.modalOverlay
          }
          onPress={() =>
            setModalHumor(false)
          }
        >
          <Pressable
            style={
              calendarStyles.modalCard
            }
            onPress={() => {}}
          >
            <View
              style={
                calendarStyles.modalHandle
              }
            />

            <Text
              style={
                calendarStyles.modalTitle
              }
            >
              Como você está se sentindo?
            </Text>

            <Text
              style={
                calendarStyles.modalSubtitle
              }
            >
              Registre seu humor
            </Text>

            <View
              style={{
                gap: 10,
                marginTop: 20,
              }}
            >
              {humores.map(
                (humor) => (
                  <TouchableOpacity
                    key={
                      humor.nome
                    }
                    style={{
                      flexDirection:
                        'row',
                      alignItems:
                        'center',
                      paddingVertical:
                        14,
                      paddingHorizontal:
                        16,
                      borderRadius:
                        14,
                      backgroundColor:
                        cycleColors.surfaceAlt,
                    }}
                    onPress={() =>
                      registrarHumor(
                        humor.nome
                      )
                    }
                  >
                    <Ionicons
                      name={
                        humor.icon as any
                      }
                      size={24}
                      color={
                        humorColors.main
                      }
                    />

                    <Text
                      style={{
                        marginLeft: 12,
                        color:
                          cycleColors.text,
                        fontSize: 15,
                        fontWeight:
                          '600',
                      }}
                    >
                      {humor.nome}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>

            <TouchableOpacity
              style={
                calendarStyles.modalCloseButton
              }
              onPress={() =>
                setModalHumor(false)
              }
            >
              <Text
                style={
                  calendarStyles.modalCloseButtonText
              }
              >
                Cancelar
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* =====================================
          MODAL DE DETALHES DO DIA
      ===================================== */}

      <Modal
        visible={
          !!diaSelecionado &&
          !modalHumor
        }
        transparent
        animationType="slide"
        onRequestClose={() =>
          setDiaSelecionado(null)
        }
      >
        <Pressable
          style={
            calendarStyles.modalOverlay
          }
          onPress={() =>
            setDiaSelecionado(null)
          }
        >
          <Pressable
            style={
              calendarStyles.modalCard
            }
            onPress={() => {}}
          >
            <View
              style={
                calendarStyles.modalHandle
              }
            />

            <Text
              style={
                calendarStyles.modalTitle
              }
            >
              {diaSelecionado &&
                criarDataLocal(
                  diaSelecionado
                ).toLocaleDateString(
                  'pt-BR',
                  {
                    weekday:
                      'long',
                    day: 'numeric',
                    month: 'long',
                  }
                )}
            </Text>

            <Text
              style={
                calendarStyles.modalSubtitle
              }
            >
              Detalhes do dia
            </Text>

            {/* =====================================
                FASE DO CICLO
            ===================================== */}

            {(
              infoDiaSelecionado
                ?.menstruacao ||
              infoDiaSelecionado
                ?.ovulacao ||
              infoDiaSelecionado
                ?.fertil
            ) && (
              <View
                style={
                  calendarStyles.modalTagsRow
                }
              >
                {infoDiaSelecionado
                  ?.menstruacao && (
                  <View
                    style={[
                      calendarStyles.modalTag,
                      {
                        backgroundColor:
                          cycleColors.roseSoft,
                      },
                    ]}
                  >
                    <Ionicons
                      name="water"
                      size={14}
                      color={
                        cycleColors.rose
                      }
                    />

                    <Text
                      style={
                        calendarStyles.modalTagText
                      }
                    >
                      Menstruação
                    </Text>
                  </View>
                )}

                {infoDiaSelecionado
                  ?.ovulacao && (
                  <View
                    style={[
                      calendarStyles.modalTag,
                      {
                        backgroundColor:
                          cycleColors.goldSoft,
                      },
                    ]}
                  >
                    <Ionicons
                      name="sunny"
                      size={14}
                      color={
                        cycleColors.gold
                      }
                    />

                    <Text
                      style={
                        calendarStyles.modalTagText
                      }
                    >
                      Ovulação
                    </Text>
                  </View>
                )}

                {infoDiaSelecionado
                  ?.fertil &&
                  !infoDiaSelecionado
                    ?.ovulacao && (
                  <View
                    style={[
                      calendarStyles.modalTag,
                      {
                        backgroundColor:
                          cycleColors.lavenderSoft,
                      },
                    ]}
                  >
                    <Ionicons
                      name="flower"
                      size={14}
                      color={
                        cycleColors.lavender
                      }
                    />

                    <Text
                      style={
                        calendarStyles.modalTagText
                      }
                    >
                      Período fértil
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* =====================================
                SINTOMAS
            ===================================== */}

            {(
              registroDiaSelecionado
                ?.sintomas
                ?.length ?? 0
            ) > 0 && (
              <>
                <Text
                  style={
                    calendarStyles.modalSectionLabel
                  }
                >
                  SINTOMAS
                </Text>

                <View
                  style={
                    calendarStyles.modalChipsRow
                  }
                >
                  {registroDiaSelecionado
                    .sintomas!
                    .map((sintoma) => (
                      <View
                        key={`sintoma-${nomeDoSintoma(sintoma.id)}`}
                        style={
                          calendarStyles.modalChip
                        }
                      >
                        <Text
                          style={
                            calendarStyles.modalChipText
                        }
                        >
                          {nomeDoSintoma(sintoma.id)}
                        </Text>
                      </View>
                    ))}
                </View>
              </>
            )}

            {/* =====================================
                SECREÇÃO
            ===================================== */}

            {registroDiaSelecionado
              ?.secrecao && (
              <>
                <Text
                  style={
                    calendarStyles.modalSectionLabel
                  }
                >
                  SECREÇÃO
                </Text>

                <View
                  style={
                    calendarStyles.modalChipsRow
                  }
                >
                  <View
                    style={
                      calendarStyles.modalChip
                    }
                  >
                    <Text
                      style={
                        calendarStyles.modalChipText
                    }
                    >
                      {textoSecrecao(
                        registroDiaSelecionado.secrecao
                      )}
                    </Text>
                  </View>
                </View>
              </>
            )}

            {/* =====================================
                HUMOR
            ===================================== */}

            {registroDiaSelecionado
              ?.humor && (
              <>
                <Text
                  style={
                    calendarStyles.modalSectionLabel
                  }
                >
                  HUMOR
                </Text>

                <View
                  style={
                    calendarStyles.modalChipsRow
                  }
                >
                  <View
                    style={[
                      calendarStyles.modalChip,
                      {
                        backgroundColor:
                          humorColors.soft,
                      },
                    ]}
                  >
                    <Ionicons
                      name="heart"
                      size={14}
                      color="#FFFFFF"
                    />

                    <Text
                      style={
                        calendarStyles.modalChipText
                      }
                    >
                      {
                        registroDiaSelecionado
                          .humor
                      }
                    </Text>
                  </View>
                </View>
              </>
            )}

            {/* =====================================
                SEM REGISTROS
            ===================================== */}

            {!temAlgumRegistro && (
              <Text
                style={
                  calendarStyles.modalEmptyText
                }
              >
                Nada registrado
                neste dia ainda.
              </Text>
            )}

            {/* =====================================
                REGISTRAR HUMOR
            ===================================== */}

            <AnimatedPressable
              style={
                calendarStyles.modalPrimaryButton
              }
              onPress={() =>
                abrirRegistroHumor(
                  diaSelecionado ??
                    hojeString
                )
              }
            >
              <Text
                style={
                  calendarStyles.modalPrimaryButtonText
                }
              >
                Registrar humor
              </Text>
            </AnimatedPressable>

            {/* =====================================
                REGISTRAR SINTOMAS
            ===================================== */}

            <AnimatedPressable
              style={
                calendarStyles.modalPrimaryButton
              }
              onPress={() =>
                abrirRegistroSintomas(
                  diaSelecionado ??
                    hojeString
                )
              }
            >
              <Text
                style={
                  calendarStyles.modalPrimaryButtonText
                }
              >
                Registrar sintomas
              </Text>
            </AnimatedPressable>

            {/* =====================================
                REGISTRAR SECREÇÃO
            ===================================== */}

            <AnimatedPressable
              style={
                calendarStyles.modalPrimaryButton
              }
              onPress={() =>
                abrirRegistroSecrecao(
                  diaSelecionado ??
                    hojeString
                )
              }
            >
              <Text
                style={
                  calendarStyles.modalPrimaryButtonText
                }
              >
                Registrar secreção
              </Text>
            </AnimatedPressable>

            {/* =====================================
                REGISTRAR MENSTRUAÇÃO
            ===================================== */}

            {!infoDiaSelecionado
              ?.menstruacao && (
              <AnimatedPressable
                style={
                  calendarStyles.modalPrimaryButton
                }
                onPress={() => {
                  if (
                    diaSelecionado
                  ) {
                    registrarMenstruacao(
                      diaSelecionado
                    );
                  }
                }}
              >
                <Text
                  style={
                    calendarStyles.modalPrimaryButtonText
                  }
                >
                  Registrar início da
                  menstruação
                </Text>
              </AnimatedPressable>
            )}

            {/* =====================================
                FECHAR
            ===================================== */}

            <TouchableOpacity
              style={
                calendarStyles.modalCloseButton
              }
              onPress={() =>
                setDiaSelecionado(null)
              }
            >
              <Text
                style={
                  calendarStyles.modalCloseButtonText
                }
              >
                Fechar
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </Background>
  );
}