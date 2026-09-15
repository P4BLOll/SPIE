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
import { SafeAreaView } from 'react-native-safe-area-context';

import { Background } from '@/components/Background';

import {
  cycleColors,
} from '@/styles/calendar.styles';

import {
  registerSecretionStyles,
} from '@/styles/register-secretion.styles';

import {
  useCycle,
} from '@/modules/cycle/hooks/useCycle';
import { haptics } from '@/shared/utils/haptics';

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
    nome: 'Clear and stretchy',
    descricao:
      'Egg white consistency. Often appears near ovulation.',
  },

  {
    id: 'branca',
    nome: 'Creamy white',
    descricao:
      'Common throughout various phases of the cycle.',
  },

  {
    id: 'pastosa',
    nome: 'Thick white',
    descricao:
      'May appear after ovulation.',
  },

  {
    id: 'amarela',
    nome: 'Yellowish',
    descricao:
      'Pay attention to strong odor or discomfort.',
  },

  {
    id: 'verde',
    nome: 'Greenish',
    descricao:
      'May indicate an imbalance and deserves medical attention.',
  },

  {
    id: 'sangue',
    nome: 'Spotting / Blood-tinged',
    descricao:
      'May occur around the start or end of your period.',
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

  return `${mes}/${dia}/${ano}`;
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
      haptics.warning();
      Alert.alert(
        'Select a type',
        'Choose a cervical fluid type before saving.'
      );

      return;
    }

    haptics.success();
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
      <SafeAreaView
        style={registerSecretionStyles.screen}
        edges={['top', 'left', 'right']}
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
            Log Cervical Fluid
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
            <View
              style={[
                registerSecretionStyles.iconRing,
                { backgroundColor: cycleColors.rose },
              ]}
            >
              <Ionicons
                name="water-outline"
                size={34}
                color="#FFFFFF"
              />
            </View>

            <Text
              style={
                registerSecretionStyles.subtitle
              }
            >
              Track changes in your body throughout your menstrual cycle.
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
                  Logging for{' '}
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
              Fluid Type
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
                  onPress={() => {
                    haptics.selection();
                    setSelecionada(
                      item.id
                    );
                  }}
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
            <View
              style={[
                registerSecretionStyles.button,
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
                  registerSecretionStyles.buttonText
                }
              >
                Save record
              </Text>
            </View>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}