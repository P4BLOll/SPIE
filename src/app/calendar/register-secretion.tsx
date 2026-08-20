import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';

import { Background } from '@/components/Background';

import {
  cycleColors,
} from '@/styles/calendar.styles';

import {
  registerSecretionStyles,
} from '@/styles/register-secretion.styles';

import {
  useCycle,
} from '@/context/CycleContext';

// =====================================
// TIPO
// =====================================

type Secrecao = {
  id: string;
  nome: string;
  descricao: string;
};

// =====================================
// SECREÇÕES DISPONÍVEIS
// =====================================

export const secrecoesDisponiveis: Secrecao[] = [
  {
    id: 'transparente',
    nome: 'Transparente e elástica',
    descricao:
      'Parecida com clara de ovo. Pode aparecer perto da ovulação.',
  },

  {
    id: 'branca',
    nome: 'Branca cremosa',
    descricao:
      'Comum em várias fases do ciclo.',
  },

  {
    id: 'pastosa',
    nome: 'Branca pastosa',
    descricao:
      'Pode aparecer após a ovulação.',
  },

  {
    id: 'amarela',
    nome: 'Amarelada',
    descricao:
      'Observe cheiro forte ou desconforto.',
  },

  {
    id: 'verde',
    nome: 'Esverdeada',
    descricao:
      'Pode indicar alteração e merece atenção.',
  },

  {
    id: 'sangue',
    nome: 'Com sangue',
    descricao:
      'Pode ocorrer no início/final da menstruação.',
  },
];

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

export default function RegisterSecretion() {
  const {
    registrarSecrecao,
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
  // SECREÇÃO SELECIONADA
  // =====================================

  const [
    selecionada,
    setSelecionada,
  ] = useState<string | null>(null);

  // =====================================
  // SALVAR
  // =====================================

  function salvar() {
    if (!selecionada) {
      Alert.alert(
        'Selecione um tipo',
        'Escolha o tipo de secreção antes de salvar.'
      );

      return;
    }

    registrarSecrecao({
      data: dataAlvo,
      tipo: selecionada,
    });

    router.back();
  }

  // =====================================
  // RETURN
  // =====================================

  return (
    <Background>
      <View
        style={
          registerSecretionStyles.screen
        }
      >

        {/* =====================================
            TOPO FIXO
        ===================================== */}

        <View
          style={
            registerSecretionStyles.topBar
          }
        >
          <TouchableOpacity
            style={
              registerSecretionStyles.backButton
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
              registerSecretionStyles.title
            }
          >
            Registrar secreção
          </Text>

          <View
            style={
              registerSecretionStyles.emptySpace
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
            registerSecretionStyles.container
          }
        >

          {/* =====================================
              CABEÇALHO
          ===================================== */}

          <View
            style={
              registerSecretionStyles.header
            }
          >
            <LinearGradient
              colors={[
                cycleColors.lavender,
                cycleColors.rose,
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
                registerSecretionStyles.iconRing
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
                registerSecretionStyles.subtitle
              }
            >
              Acompanhe mudanças no
              seu corpo durante o ciclo
              menstrual.
            </Text>

            {/* DATA */}

            {dataEspecifica && (
              <View
                style={
                  registerSecretionStyles.dateBadge
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
                    registerSecretionStyles.dateBadgeText
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
              TIPO DE SECREÇÃO
          ===================================== */}

          <View
            style={
              registerSecretionStyles.card
            }
          >
            <Text
              style={
                registerSecretionStyles.label
              }
            >
              Tipo de secreção
            </Text>

            {secrecoesDisponiveis.map(
              (item) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.7}
                  style={[
                    registerSecretionStyles.option,

                    selecionada ===
                      item.id &&
                      registerSecretionStyles.optionSelected,
                  ]}
                  onPress={() =>
                    setSelecionada(
                      item.id
                    )
                  }
                >
                  <Text
                    style={
                      registerSecretionStyles.optionText
                    }
                  >
                    {item.nome}
                  </Text>

                  <Text
                    style={
                      registerSecretionStyles.optionDescription
                    }
                  >
                    {item.descricao}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>

          {/* =====================================
              SALVAR
          ===================================== */}

          <TouchableOpacity
            activeOpacity={0.85}
            disabled={!selecionada}
            onPress={salvar}
            style={[
              registerSecretionStyles.saveButtonContainer,
              !selecionada &&
                registerSecretionStyles.buttonDisabled,
            ]}
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
                registerSecretionStyles.button
              }
            >
              <Ionicons
                name="checkmark"
                size={18}
                color="#FFFFFF"
              />

              <Text
                style={
                  registerSecretionStyles.buttonText
                }
              >
                Salvar registro
              </Text>
            </LinearGradient>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </Background>
  );
}