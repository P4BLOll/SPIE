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
import { SafeAreaView } from 'react-native-safe-area-context';

import { Background } from '@/components/Background';

import {
  cycleColors,
} from '@/styles/calendar.styles';

import {
  symptomsStyles,
} from '@/styles/symptoms.styles';

import {
  useCycle,
} from '@/modules/cycle/hooks/useCycle';
import { haptics } from '@/shared/utils/haptics';

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
  { id: 'leve', label: 'Mild' },
  { id: 'moderada', label: 'Moderate' },
  { id: 'forte', label: 'Severe' },
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
    nome: 'No symptoms',
    icon: 'happy-outline',
  },

  {
    id: 'head',
    nome: 'Headache',
    icon: 'medical-outline',
  },

  {
    id: 'back',
    nome: 'Back pain',
    icon: 'body-outline',
  },

  {
    id: 'breast',
    nome: 'Breast tenderness',
    icon: 'heart-outline',
  },

  {
    id: 'cramp',
    nome: 'Cramps',
    icon: 'flash-outline',
  },

  {
    id: 'bloating',
    nome: 'Bloating',
    icon: 'ellipse-outline',
  },

  {
    id: 'mood',
    nome: 'Mood swings',
    icon: 'sad-outline',
  },

  {
    id: 'tired',
    nome: 'Fatigue',
    icon: 'moon-outline',
  },

  {
    id: 'nausea',
    nome: 'Nausea',
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

  return `${mes}/${dia}/${ano}`;
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
    haptics.selection();
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
    haptics.selection();
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
    haptics.success();
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
      <SafeAreaView
        style={symptomsStyles.screen}
        edges={['top', 'left', 'right']}
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
            Symptoms
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
            <View
              style={[
                symptomsStyles.iconRing,
                { backgroundColor: cycleColors.rose },
              ]}
            >
              <Ionicons
                name="fitness-outline"
                size={34}
                color="#FFFFFF"
              />
            </View>

            <Text
              style={
                symptomsStyles.title
              }
            >
              How are you feeling today?
            </Text>

            <Text
              style={
                symptomsStyles.subtitle
              }
            >
              Log your symptoms to track your menstrual cycle.
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
                  Logging for{' '}
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
              Select symptoms
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
                Intensity
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
                              nivel.id;

                            return (
                              <TouchableOpacity
                                key={nivel.id}
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
                                    nivel.id
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
                                  {nivel.label}
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
            <View
              style={[
                symptomsStyles.button,
                { backgroundColor: cycleColors.rose },
              ]}
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
                Save symptoms
              </Text>
            </View>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}