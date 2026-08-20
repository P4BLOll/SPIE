import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import { LinearGradient } from 'expo-linear-gradient';

import { Background } from '@/components/Background';

import {
  cycleColors,
} from '@/styles/calendar.styles';

import {
  symptomsStyles,
} from '@/styles/symptoms.styles';

import {
  useCycle,
} from '@/context/CycleContext';

// =====================================
// TIPOS
// =====================================

type Sintoma = {
  id: string;
  nome: string;
  icon: keyof typeof Ionicons.glyphMap;
};

type SintomaSelecionado = {
  id: string;
  intensidade: string | null;
};

// =====================================
// NÍVEIS DE INTENSIDADE
// =====================================

const niveisIntensidade = [
  'leve',
  'moderada',
  'forte',
];

// =====================================
// SINTOMAS DISPONÍVEIS
// =====================================
// IMPORTANTE:
// Os IDs continuam exatamente iguais
// para não quebrar os registros existentes.

export const sintomasDisponiveis: Sintoma[] = [
  {
    id: 'none',
    nome: 'Nenhum sintoma',
    icon: 'happy-outline',
  },

  {
    id: 'head',
    nome: 'Dor de cabeça',
    icon: 'medical-outline',
  },

  {
    id: 'back',
    nome: 'Dor nas costas',
    icon: 'body-outline',
  },

  {
    id: 'breast',
    nome: 'Sensibilidade nos seios',
    icon: 'heart-outline',
  },

  {
    id: 'cramp',
    nome: 'Cólica',
    icon: 'flash-outline',
  },

  {
    id: 'bloating',
    nome: 'Inchaço',
    icon: 'ellipse-outline',
  },

  {
    id: 'mood',
    nome: 'Alteração de humor',
    icon: 'sad-outline',
  },

  {
    id: 'tired',
    nome: 'Cansaço',
    icon: 'moon-outline',
  },

  {
    id: 'nausea',
    nome: 'Náusea',
    icon: 'fitness-outline',
  },
];

// =====================================
// BUSCAR NOME DO SINTOMA
// =====================================

export function nomeDoSintoma(
  id: string
): string {
  const sintoma =
    sintomasDisponiveis.find(
      (item) => item.id === id
    );

  return sintoma?.nome ?? id;
}

// =====================================
// FORMATAR DATA
// =====================================

function formatarDataBR(
  dataISO: string
) {
  const [ano, mes, dia] =
    dataISO.split('-');

  return `${dia}/${mes}/${ano}`;
}

// =====================================
// TELA
// =====================================

export default function Symptoms() {
  const {
    registrarSintomas,
  } = useCycle();

  const {
    data: dataParam,
  } =
    useLocalSearchParams<{
      data?: string;
    }>();

  const dataAlvo =
    dataParam ??
    new Date()
      .toISOString()
      .slice(0, 10);

  const dataEspecifica =
    Boolean(dataParam);

  // =====================================
  // SINTOMAS SELECIONADOS
  // =====================================

  const [
    sintomasSelecionados,
    setSintomasSelecionados,
  ] = useState<
    SintomaSelecionado[]
  >([]);

  // =====================================
  // SELECIONAR SINTOMA
  // =====================================

  function selecionar(
    id: string
  ) {
    // -------------------------------
    // NENHUM SINTOMA
    // -------------------------------

    if (id === 'none') {
      setSintomasSelecionados([
        {
          id: 'none',
          intensidade: null,
        },
      ]);

      return;
    }

    // -------------------------------
    // VERIFICAR SE JÁ EXISTE
    // -------------------------------

    const existe =
      sintomasSelecionados.find(
        (item) => item.id === id
      );

    // -------------------------------
    // REMOVER
    // -------------------------------

    if (existe) {
      setSintomasSelecionados(
        sintomasSelecionados.filter(
          (item) =>
            item.id !== id
        )
      );

      return;
    }

    // -------------------------------
    // ADICIONAR
    // -------------------------------

    setSintomasSelecionados([
      ...sintomasSelecionados.filter(
        (item) =>
          item.id !== 'none'
      ),

      {
        id,
        intensidade: 'leve',
      },
    ]);
  }

  // =====================================
  // ALTERAR INTENSIDADE
  // =====================================

  function alterarIntensidade(
    id: string,
    nivel: string
  ) {
    setSintomasSelecionados(
      sintomasSelecionados.map(
        (item) =>
          item.id === id
            ? {
                ...item,
                intensidade: nivel,
              }
            : item
      )
    );
  }

  // =====================================
  // SALVAR
  // =====================================

  function salvar() {
    registrarSintomas({
      data: dataAlvo,
      sintomas:
        sintomasSelecionados,
    });

    router.back();
  }

  // =====================================
  // VERIFICAR SE POSSUI SINTOMA
  // =====================================

  const possuiSintoma =
    sintomasSelecionados.length >
      0 &&
    !sintomasSelecionados.some(
      (item) =>
        item.id === 'none'
    );

  // =====================================
  // PODE SALVAR
  // =====================================

  const podeSalvar =
    sintomasSelecionados.length >
    0;

  // =====================================
  // RETURN
  // =====================================

  return (
    <Background>
      <View
        style={
          symptomsStyles.screen
        }
      >

        {/* =====================================
            TOPO FIXO
        ===================================== */}

        <View
          style={
            symptomsStyles.topBar
          }
        >
          {/* BOTÃO VOLTAR */}

          <TouchableOpacity
            style={
              symptomsStyles.backButton
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

          {/* TÍTULO */}

          <Text
            style={
              symptomsStyles.pageTitle
            }
          >
            Sintomas
          </Text>

          {/* ESPAÇO PARA CENTRALIZAR */}

          <View
            style={
              symptomsStyles.emptySpace
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
            symptomsStyles.container
          }
        >

          {/* =====================================
              CABEÇALHO
          ===================================== */}

          <View
            style={
              symptomsStyles.header
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
                symptomsStyles.iconRing
              }
            >
              <Ionicons
                name="fitness-outline"
                size={34}
                color="#FFFFFF"
              />
            </LinearGradient>

            <Text
              style={
                symptomsStyles.title
              }
            >
              Como você está hoje?
            </Text>

            <Text
              style={
                symptomsStyles.subtitle
              }
            >
              Registre seus sintomas
              para acompanhar seu
              ciclo menstrual.
            </Text>

            {/* DATA */}

            {dataEspecifica && (
              <View
                style={
                  symptomsStyles.dateBadge
                }
              >
                <Ionicons
                  name="calendar-outline"
                  size={14}
                  color={
                    cycleColors.text
                  }
                />

                <Text
                  style={
                    symptomsStyles.dateBadgeText
                  }
                >
                  Registrando para{' '}
                  {formatarDataBR(
                    dataAlvo
                  )}
                </Text>
              </View>
            )}
          </View>

          {/* =====================================
              SINTOMAS
          ===================================== */}

          <View
            style={
              symptomsStyles.card
            }
          >
            <Text
              style={
                symptomsStyles.sectionTitle
              }
            >
              Selecione os sintomas
            </Text>

            <View
              style={
                symptomsStyles.grid
              }
            >
              {sintomasDisponiveis.map(
                (item) => {
                  const selecionado =
                    sintomasSelecionados.some(
                      (s) =>
                        s.id ===
                        item.id
                    );

                  return (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.7}
                      style={[
                        symptomsStyles.symptom,

                        selecionado &&
                          (item.id ===
                          'none'
                            ? symptomsStyles.selectedNone
                            : symptomsStyles.selected),
                      ]}
                      onPress={() =>
                        selecionar(
                          item.id
                        )
                      }
                    >
                      <Ionicons
                        name={
                          item.icon
                        }
                        size={26}
                        color={
                          selecionado
                            ? '#FFFFFF'
                            : cycleColors.textMuted
                        }
                      />

                      <Text
                        style={[
                          symptomsStyles.symptomText,

                          selecionado &&
                            symptomsStyles.selectedText,
                        ]}
                      >
                        {item.nome}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              )}
            </View>
          </View>

          {/* =====================================
              INTENSIDADE
          ===================================== */}

          {possuiSintoma && (
            <View
              style={
                symptomsStyles.card
              }
            >
              <Text
                style={
                  symptomsStyles.sectionTitle
                }
              >
                Intensidade
              </Text>

              {sintomasSelecionados.map(
                (item, index) => {
                  const sintoma =
                    sintomasDisponiveis.find(
                      (s) =>
                        s.id ===
                        item.id
                    );

                  const ultimo =
                    index ===
                    sintomasSelecionados.length -
                      1;

                  return (
                    <View
                      key={item.id}
                      style={[
                        symptomsStyles.intensityCard,

                        ultimo &&
                          symptomsStyles.intensityCardLast,
                      ]}
                    >
                      <Text
                        style={
                          symptomsStyles.intensityTitle
                        }
                      >
                        {sintoma?.nome ??
                          nomeDoSintoma(
                            item.id
                          )}
                      </Text>

                      <View
                        style={
                          symptomsStyles.intensityRow
                        }
                      >
                        {niveisIntensidade.map(
                          (nivel) => {
                            const ativo =
                              item.intensidade ===
                              nivel;

                            return (
                              <TouchableOpacity
                                key={nivel}
                                activeOpacity={
                                  0.7
                                }
                                style={[
                                  symptomsStyles.intensityButton,

                                  ativo &&
                                    symptomsStyles.intensitySelected,
                                ]}
                                onPress={() =>
                                  alterarIntensidade(
                                    item.id,
                                    nivel
                                  )
                                }
                              >
                                <Text
                                  style={[
                                    symptomsStyles.intensityText,

                                    ativo &&
                                      symptomsStyles.intensityTextSelected,
                                  ]}
                                >
                                  {nivel
                                    .charAt(
                                      0
                                    )
                                    .toUpperCase() +
                                    nivel.slice(
                                      1
                                    )}
                                </Text>
                              </TouchableOpacity>
                            );
                          }
                        )}
                      </View>
                    </View>
                  );
                }
              )}
            </View>
          )}

          {/* =====================================
              BOTÃO SALVAR
          ===================================== */}

          <TouchableOpacity
            activeOpacity={0.85}
            disabled={!podeSalvar}
            onPress={salvar}
            style={
              !podeSalvar
                ? symptomsStyles.buttonDisabled
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
                symptomsStyles.button
              }
            >
              <Ionicons
                name="checkmark"
                size={18}
                color="#FFFFFF"
              />

              <Text
                style={
                  symptomsStyles.buttonText
                }
              >
                Salvar sintomas
              </Text>
            </LinearGradient>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </Background>
  );
}