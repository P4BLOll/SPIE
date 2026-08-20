import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import { Calendar } from 'react-native-calendars';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { Background } from '@/components/Background';

import {
  cycleColors,
} from '@/styles/calendar.styles';

import {
  registerPeriodStyles,
} from '@/styles/register-period.styles';

import {
  useCycle,
  DURACAO_MENSTRUACAO_MIN,
  DURACAO_MENSTRUACAO_MAX,
  DURACAO_CICLO_MIN,
  DURACAO_CICLO_MAX,
} from '@/context/CycleContext';

// =====================================
// FORMATAR DATA
// =====================================

function formatarDataBR(dataISO: string) {
  const [ano, mes, dia] =
    dataISO.split('-');

  return `${dia}/${mes}/${ano}`;
}

// =====================================
// COMPONENTE DE CONTROLE DE QUANTIDADE
// =====================================

function QuantitySelector({
  valor,
  minimo,
  maximo,
  onChange,
}: {
  valor: number;
  minimo: number;
  maximo: number;
  onChange: (valor: number) => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:
          cycleColors.surfaceAlt,
        borderRadius: 16,
        paddingHorizontal: 8,
        paddingVertical: 8,
      }}
    >
      {/* MENOS */}

      <TouchableOpacity
        activeOpacity={0.7}
        disabled={valor <= minimo}
        onPress={() =>
          onChange(valor - 1)
        }
        style={{
          width: 44,
          height: 44,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:
            valor <= minimo
              ? '#3A303F'
              : cycleColors.roseSoft,
        }}
      >
        <Ionicons
          name="remove"
          size={22}
          color={
            valor <= minimo
              ? cycleColors.textMuted
              : cycleColors.rose
          }
        />
      </TouchableOpacity>

      {/* VALOR */}

      <View
        style={{
          alignItems: 'center',
          minWidth: 90,
        }}
      >
        <Text
          style={{
            color: cycleColors.text,
            fontSize: 26,
            fontWeight: '800',
          }}
        >
          {valor}
        </Text>

        <Text
          style={{
            color: cycleColors.textMuted,
            fontSize: 12,
            marginTop: 2,
          }}
        >
          {valor === 1
            ? 'dia'
            : 'dias'}
        </Text>
      </View>

      {/* MAIS */}

      <TouchableOpacity
        activeOpacity={0.7}
        disabled={valor >= maximo}
        onPress={() =>
          onChange(valor + 1)
        }
        style={{
          width: 44,
          height: 44,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:
            valor >= maximo
              ? '#3A303F'
              : cycleColors.roseSoft,
        }}
      >
        <Ionicons
          name="add"
          size={22}
          color={
            valor >= maximo
              ? cycleColors.textMuted
              : cycleColors.rose
          }
        />
      </TouchableOpacity>
    </View>
  );
}

// =====================================
// TELA
// =====================================

export default function RegisterPeriod() {
  const {
    ultimaMenstruacao,
    setUltimaMenstruacao,

    duracaoMenstruacao,
    setDuracaoMenstruacao,

    duracaoCiclo,
    setDuracaoCiclo,

    registros,
  } = useCycle();

  // =====================================
  // DATA SELECIONADA
  // =====================================

  const [
    dataSelecionada,
    setDataSelecionada,
  ] = useState<string | null>(
    ultimaMenstruacao
  );

  // =====================================
  // VALORES TEMPORÁRIOS
  // =====================================

  const [
    duracaoMenstruacaoSelecionada,
    setDuracaoMenstruacaoSelecionada,
  ] = useState(
    duracaoMenstruacao
  );

  const [
    duracaoCicloSelecionada,
    setDuracaoCicloSelecionada,
  ] = useState(
    duracaoCiclo
  );

  // =====================================
  // REGISTRO DO DIA SELECIONADO
  // =====================================

  const registroDoDia =
    dataSelecionada
      ? registros[dataSelecionada]
      : undefined;

  const sintomasDoDia =
    registroDoDia?.sintomas ?? [];

  const secrecaoDoDia =
    registroDoDia?.secrecao;

  const humorDoDia =
    registroDoDia?.humor;

  const temRegistros =
    sintomasDoDia.length > 0 ||
    !!secrecaoDoDia ||
    !!humorDoDia;

  // =====================================
  // MARCAÇÃO DO CALENDÁRIO
  // =====================================

  const marcado = dataSelecionada
    ? {
        [dataSelecionada]: {
          selected: true,
          selectedColor:
            cycleColors.rose,
          selectedTextColor:
            '#FFFFFF',
        },
      }
    : {};

  // =====================================
  // IR PARA SINTOMAS
  // =====================================

  function irParaSintomas() {
    if (!dataSelecionada) {
      return;
    }

    router.push({
      pathname:
        '/calendar/symptoms',
      params: {
        data: dataSelecionada,
      },
    });
  }

  // =====================================
  // IR PARA SECREÇÃO
  // =====================================

  function irParaSecrecao() {
    if (!dataSelecionada) {
      return;
    }

    router.push({
      pathname:
        '/calendar/register-secretion',
      params: {
        data: dataSelecionada,
      },
    });
  }

  // =====================================
  // ALTERAR DURAÇÃO DA MENSTRUAÇÃO
  // =====================================

  function alterarDuracaoMenstruacao(
    valor: number
  ) {
    const novoValor = Math.min(
      Math.max(
        valor,
        DURACAO_MENSTRUACAO_MIN
      ),
      DURACAO_MENSTRUACAO_MAX
    );

    setDuracaoMenstruacaoSelecionada(
      novoValor
    );
  }

  // =====================================
  // ALTERAR DURAÇÃO DO CICLO
  // =====================================

  function alterarDuracaoCiclo(
    valor: number
  ) {
    const novoValor = Math.min(
      Math.max(
        valor,
        DURACAO_CICLO_MIN
      ),
      DURACAO_CICLO_MAX
    );

    setDuracaoCicloSelecionada(
      novoValor
    );
  }

  // =====================================
  // SALVAR CONFIGURAÇÕES
  // =====================================

  function salvarMenstruacao() {
    if (!dataSelecionada) {
      Alert.alert(
        'Selecione uma data',
        'Escolha o primeiro dia da sua menstruação no calendário.'
      );

      return;
    }

    Alert.alert(
      'Confirmar registro',
      `Registrar o início da menstruação em ${formatarDataBR(
        dataSelecionada
      )}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Confirmar',

          onPress: () => {
            // =====================================
            // DATA
            // =====================================

            setUltimaMenstruacao(
              dataSelecionada
            );

            // =====================================
            // DURAÇÃO DA MENSTRUAÇÃO
            // =====================================

            setDuracaoMenstruacao(
              duracaoMenstruacaoSelecionada
            );

            // =====================================
            // DURAÇÃO DO CICLO
            // =====================================

            setDuracaoCiclo(
              duracaoCicloSelecionada
            );

            router.back();
          },
        },
      ]
    );
  }

  // =====================================
  // RETURN
  // =====================================

  return (
    <Background>
      <View
        style={
          registerPeriodStyles.screen
        }
      >

        {/* =====================================
            TOPO FIXO
        ===================================== */}

        <View
          style={
            registerPeriodStyles.fixedTopBar
          }
        >
          <TouchableOpacity
            style={
              registerPeriodStyles.backButton
            }
            activeOpacity={0.7}
            onPress={() =>
              router.back()
            }
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={
                cycleColors.text
              }
            />
          </TouchableOpacity>

          <Text
            style={
              registerPeriodStyles.fixedTitle
            }
          >
            Registrar menstruação
          </Text>

          <View
            style={
              registerPeriodStyles.emptySpace
            }
          />
        </View>

        {/* =====================================
            CONTEÚDO ROLÁVEL
        ===================================== */}

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            registerPeriodStyles.container
          }
        >

          {/* =====================================
              CABEÇALHO
          ===================================== */}

          <View
            style={
              registerPeriodStyles.header
            }
          >
            <LinearGradient
              colors={[
                cycleColors.rose,
                cycleColors.lavender,
              ]}
              start={{
                x: 0,
                y: 0,
              }}
              end={{
                x: 1,
                y: 1,
              }}
              style={
                registerPeriodStyles.iconRing
              }
            >
              <Ionicons
                name="water-outline"
                size={34}
                color="#FFFFFF"
              />
            </LinearGradient>

            <Text
              style={
                registerPeriodStyles.subtitle
              }
            >
              Escolha o primeiro dia
              da sua menstruação. O
              aplicativo calculará
              automaticamente os
              próximos ciclos conforme
              as configurações abaixo.
            </Text>
          </View>

          {/* =====================================
              CALENDÁRIO
          ===================================== */}

          <View
            style={
              registerPeriodStyles.card
            }
          >
            <Calendar
              style={{
                height: 350,
              }}
              markedDates={
                marcado
              }
              firstDay={1}
              enableSwipeMonths
              theme={{
                calendarBackground:
                  cycleColors.surface,

                backgroundColor:
                  cycleColors.surface,

                monthTextColor:
                  cycleColors.text,

                dayTextColor:
                  cycleColors.text,

                textSectionTitleColor:
                  cycleColors.textMuted,

                todayTextColor:
                  cycleColors.gold,

                arrowColor:
                  cycleColors.rose,

                selectedDayBackgroundColor:
                  cycleColors.rose,

                selectedDayTextColor:
                  '#FFFFFF',

                textMonthFontSize:
                  18,

                textMonthFontWeight:
                  '700',

                textDayFontSize:
                  15,

                textDayFontWeight:
                  '600',
              }}
              onDayPress={(day) =>
                setDataSelecionada(
                  day.dateString
                )
              }
            />
          </View>

          {/* =====================================
              DATA SELECIONADA
          ===================================== */}

          {dataSelecionada && (
            <View
              style={
                registerPeriodStyles.selectedCard
              }
            >
              <Ionicons
                name="checkmark-circle"
                size={30}
                color={
                  cycleColors.teal
                }
              />

              <View>
                <Text
                  style={
                    registerPeriodStyles.selectedTitle
                  }
                >
                  Primeiro dia
                </Text>

                <Text
                  style={
                    registerPeriodStyles.selectedText
                  }
                >
                  {formatarDataBR(
                    dataSelecionada
                  )}
                </Text>
              </View>
            </View>
          )}

          {/* =====================================
              DURAÇÃO DA MENSTRUAÇÃO
          ===================================== */}

          <View
            style={{
              marginTop: 18,
              backgroundColor:
                cycleColors.surface,
              borderRadius: 20,
              padding: 18,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <Ionicons
                name="water"
                size={22}
                color={
                  cycleColors.rose
                }
              />

              <Text
                style={{
                  marginLeft: 10,
                  color: cycleColors.text,
                  fontSize: 17,
                  fontWeight: '700',
                }}
              >
                Duração da menstruação
              </Text>
            </View>

            <Text
              style={{
                color:
                  cycleColors.textMuted,
                fontSize: 13,
                lineHeight: 19,
                marginBottom: 14,
              }}
            >
              Quantos dias sua
              menstruação costuma durar?
              Você poderá ajustar essa
              duração para deixar as
              previsões mais precisas.
            </Text>

            <QuantitySelector
              valor={
                duracaoMenstruacaoSelecionada
              }
              minimo={
                DURACAO_MENSTRUACAO_MIN
              }
              maximo={
                DURACAO_MENSTRUACAO_MAX
              }
              onChange={
                alterarDuracaoMenstruacao
              }
            />
          </View>

          {/* =====================================
              DURAÇÃO DO CICLO
          ===================================== */}

          <View
            style={{
              marginTop: 12,
              backgroundColor:
                cycleColors.surface,
              borderRadius: 20,
              padding: 18,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <Ionicons
                name="repeat-outline"
                size={22}
                color={
                  cycleColors.gold
                }
              />

              <Text
                style={{
                  marginLeft: 10,
                  color: cycleColors.text,
                  fontSize: 17,
                  fontWeight: '700',
                }}
              >
                Duração do ciclo
              </Text>
            </View>

            <Text
              style={{
                color:
                  cycleColors.textMuted,
                fontSize: 13,
                lineHeight: 19,
                marginBottom: 14,
              }}
            >
              Informe quantos dias
              normalmente existem entre
              o primeiro dia de uma
              menstruação e o primeiro dia
              da próxima.
            </Text>

            <QuantitySelector
              valor={
                duracaoCicloSelecionada
              }
              minimo={
                DURACAO_CICLO_MIN
              }
              maximo={
                DURACAO_CICLO_MAX
              }
              onChange={
                alterarDuracaoCiclo
              }
            />
          </View>

          {/* =====================================
              REGISTROS DO DIA
          ===================================== */}

          {dataSelecionada && (
            <View
              style={
                registerPeriodStyles.dayRecordsCard
              }
            >
              <View
                style={
                  registerPeriodStyles.dayRecordsHeader
                }
              >
                <Text
                  style={
                    registerPeriodStyles.dayRecordsTitle
                  }
                >
                  Registros do dia
                </Text>
              </View>

              {/* AÇÕES */}

              <View
                style={
                  registerPeriodStyles.quickActionsRow
                }
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    registerPeriodStyles.quickActionButton,
                    registerPeriodStyles.quickActionButtonSymptom,
                  ]}
                  onPress={
                    irParaSintomas
                  }
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={18}
                    color={
                      cycleColors.rose
                    }
                  />

                  <Text
                    style={
                      registerPeriodStyles.quickActionText
                    }
                  >
                    Sintomas
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    registerPeriodStyles.quickActionButton,
                    registerPeriodStyles.quickActionButtonSecretion,
                  ]}
                  onPress={
                    irParaSecrecao
                  }
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={18}
                    color={
                      cycleColors.lavender
                    }
                  />

                  <Text
                    style={
                      registerPeriodStyles.quickActionText
                    }
                  >
                    Secreção
                  </Text>
                </TouchableOpacity>
              </View>

              {/* REGISTROS */}

              {temRegistros ? (
                <View
                  style={
                    registerPeriodStyles.badgesWrap
                  }
                >
                  {sintomasDoDia.map(
                    (sintoma) => (
                      <View
                        key={`sintoma-${sintoma.id}`}
                        style={
                          registerPeriodStyles.badge
                        }
                      >
                        <View
                          style={
                            registerPeriodStyles.badgeDotSymptom
                          }
                        />

                        <Text
                          style={
                            registerPeriodStyles.badgeText
                          }
                        >
                          {sintoma.id}
                        </Text>
                      </View>
                    )
                  )}

                  {secrecaoDoDia && (
                    <View
                      style={
                        registerPeriodStyles.badge
                      }
                    >
                      <View
                        style={
                          registerPeriodStyles.badgeDotSecretion
                        }
                      />

                      <Text
                        style={
                          registerPeriodStyles.badgeText
                        }
                      >
                        {typeof secrecaoDoDia ===
                        'object'
                          ? secrecaoDoDia.tipo
                          : secrecaoDoDia}
                      </Text>
                    </View>
                  )}

                  {humorDoDia && (
                    <View
                      style={
                        registerPeriodStyles.badge
                      }
                    >
                      <View
                        style={[
                          registerPeriodStyles.badgeDotSymptom,
                          {
                            backgroundColor:
                              '#A96B59',
                          },
                        ]}
                      />

                      <Text
                        style={
                          registerPeriodStyles.badgeText
                        }
                      >
                        {typeof humorDoDia ===
                        'object'
                          ? JSON.stringify(
                              humorDoDia
                            )
                          : humorDoDia}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <Text
                  style={
                    registerPeriodStyles.emptyDayText
                  }
                >
                  Nenhum registro
                  neste dia ainda.
                </Text>
              )}
            </View>
          )}

          {/* =====================================
              RESUMO
          ===================================== */}

          <View
            style={{
              marginTop: 14,
              paddingHorizontal: 4,
            }}
          >
            <Text
              style={{
                color:
                  cycleColors.textMuted,
                fontSize: 12,
                lineHeight: 18,
                textAlign: 'center',
              }}
            >
              Menstruação:{' '}
              {duracaoMenstruacaoSelecionada}{' '}
              dias · Ciclo:{' '}
              {duracaoCicloSelecionada}{' '}
              dias
            </Text>
          </View>

          {/* =====================================
              SALVAR
          ===================================== */}

          <TouchableOpacity
            activeOpacity={0.85}
            disabled={
              !dataSelecionada
            }
            onPress={
              salvarMenstruacao
            }
            style={
              !dataSelecionada
                ? registerPeriodStyles.buttonDisabled
                : undefined
            }
          >
            <LinearGradient
              colors={[
                cycleColors.rose,
                cycleColors.lavender,
              ]}
              start={{
                x: 0,
                y: 0,
              }}
              end={{
                x: 1,
                y: 0,
              }}
              style={
                registerPeriodStyles.button
              }
            >
              <Ionicons
                name="checkmark"
                size={18}
                color="#FFFFFF"
              />

              <Text
                style={
                  registerPeriodStyles.buttonText
                }
              >
                Salvar configurações
              </Text>
            </LinearGradient>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </Background>
  );
}