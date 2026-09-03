import React, { useEffect, useState } from 'react';

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';

import { cycleColors } from '@/styles/calendar.styles';

const TUTORIAL_KEY = '@spie_tutorial_do_not_show_again';

type TutorialItem = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
};

const tutorialItems: TutorialItem[] = [
  {
    icon: 'heart-outline',
    title: 'Bem-vinda ao SPIE',
    description:
      'O SPIE foi desenvolvido para ajudar você a acompanhar seu ciclo menstrual, registrar informações importantes e ter acesso a recursos de segurança em situações de emergência.',
  },

  {
    icon: 'calendar-outline',
    title: 'Acompanhe seu ciclo',
    description:
      'No calendário, você pode registrar o primeiro dia da menstruação, informar a duração do ciclo e acompanhar as previsões das próximas fases.',
  },

  {
    icon: 'fitness-outline',
    title: 'Registre como você está',
    description:
      'Registre sintomas, intensidade, secreção, observações e humor em cada dia. Essas informações ajudam você a acompanhar as mudanças ao longo do ciclo.',
  },

  {
    icon: 'analytics-outline',
    title: 'Veja seus insights',
    description:
      'A partir dos seus registros, você poderá acompanhar padrões e informações sobre o seu ciclo de forma simples e organizada.',
  },

  {
    icon: 'shield-checkmark-outline',
    title: 'Área Secreta e Segurança',
    description:
      'O SPIE conta com uma Área Secreta protegida para contatos de emergência e histórico. Sua senha padrão inicial é 1234 e você pode alterá-la quando desejar.',
  },

  {
    icon: 'checkmark-circle-outline',
    title: 'Tudo pronto!',
    description:
      'Agora você já conhece as principais funções do SPIE. Explore o aplicativo e registre suas informações conforme sua rotina.',
  },
];

interface AppTutorialProps {
  visible?: boolean;
  onFinish?: () => void;
}

export function AppTutorial({
  visible,
  onFinish,
}: AppTutorialProps) {
  const [internoVisible, setInternoVisible] = useState(false);
  const [etapa, setEtapa] = useState(0);

  useEffect(() => {
    let ativo = true;

    async function verificarTutorial() {
      try {
        const naoMostrarNovamente =
          await AsyncStorage.getItem(TUTORIAL_KEY);

        if (!ativo) return;

        /*
         * Se o usuário marcou "Não aparecer novamente",
         * o tutorial NUNCA mais será aberto automaticamente.
         */
        if (naoMostrarNovamente === 'true') {
          setInternoVisible(false);
          return;
        }

        /*
         * Caso ainda não tenha marcado a opção,
         * o tutorial pode aparecer.
         */
        setEtapa(0);

        if (visible === undefined || visible === true) {
          setInternoVisible(true);
        } else {
          setInternoVisible(false);
        }
      } catch (error) {
        console.error(
          'Erro ao verificar preferência do tutorial:',
          error
        );

        /*
         * Se houver erro ao consultar o AsyncStorage,
         * mantemos o comportamento padrão de mostrar.
         */
        if (ativo) {
          setEtapa(0);
          setInternoVisible(
            visible === undefined || visible === true
          );
        }
      }
    }

    verificarTutorial();

    return () => {
      ativo = false;
    };
  }, [visible]);

  /*
   * Apenas fecha o tutorial.
   *
   * NÃO salva preferência.
   *
   * Portanto, ele poderá aparecer novamente
   * quando for aberto pelo componente.
   */
  function fecharTutorial() {
    setInternoVisible(false);
    setEtapa(0);
    onFinish?.();
  }

  /*
   * Salva definitivamente a preferência.
   *
   * Depois disso, o AsyncStorage conterá:
   *
   * @spie_tutorial_do_not_show_again = true
   *
   * E o tutorial não será mais exibido automaticamente.
   */
  async function naoMostrarNovamente() {
    try {
      await AsyncStorage.setItem(
        TUTORIAL_KEY,
        'true'
      );

      setInternoVisible(false);
      setEtapa(0);

      onFinish?.();
    } catch (error) {
      console.error(
        'Erro ao salvar preferência do tutorial:',
        error
      );
    }
  }

  function proximaEtapa() {
    /*
     * Na última etapa, apenas fecha.
     *
     * Não salva "não mostrar novamente".
     */
    if (etapa === tutorialItems.length - 1) {
      fecharTutorial();
      return;
    }

    setEtapa((atual) => atual + 1);
  }

  function etapaAnterior() {
    if (etapa === 0) {
      return;
    }

    setEtapa((atual) => atual - 1);
  }

  function pularTutorial() {
    /*
     * Pular não significa "não mostrar novamente".
     */
    fecharTutorial();
  }

  const atual = tutorialItems[etapa];

  const ultimaEtapa =
    etapa === tutorialItems.length - 1;

  if (!atual) {
    return null;
  }

  return (
    <Modal
      visible={internoVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={pularTutorial}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.78)',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 22,
        }}
      >
        <View
          style={{
            width: '100%',
            maxWidth: 430,
            backgroundColor: cycleColors.surface,
            borderRadius: 28,
            padding: 24,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          {/* PULAR */}

          <View
            style={{
              alignItems: 'flex-end',
              marginBottom: 4,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={pularTutorial}
            >
              <Text
                style={{
                  color: cycleColors.textMuted,
                  fontSize: 13,
                  fontWeight: '600',
                }}
              >
                Pular
              </Text>
            </TouchableOpacity>
          </View>

          {/* ÍCONE */}

          <View
            style={{
              alignItems: 'center',
              marginTop: 8,
              marginBottom: 22,
            }}
          >
            <View
              style={{
                width: 86,
                height: 86,
                borderRadius: 43,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: cycleColors.rose,
              }}
            >
              <Ionicons
                name={atual.icon}
                size={42}
                color="#FFFFFF"
              />
            </View>
          </View>

          {/* TÍTULO */}

          <Text
            style={{
              color: cycleColors.text,
              fontSize: 24,
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: 12,
            }}
          >
            {atual.title}
          </Text>

          {/* DESCRIÇÃO */}

          <Text
            style={{
              color: cycleColors.textMuted,
              fontSize: 15,
              lineHeight: 23,
              textAlign: 'center',
              minHeight: 115,
            }}
          >
            {atual.description}
          </Text>

          {/* INDICADORES */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 24,
              gap: 7,
            }}
          >
            {tutorialItems.map((_, index) => (
              <View
                key={index}
                style={{
                  width:
                    index === etapa
                      ? 24
                      : 7,
                  height: 7,
                  borderRadius: 4,
                  backgroundColor:
                    index === etapa
                      ? cycleColors.rose
                      : cycleColors.textMuted,
                  opacity:
                    index === etapa
                      ? 1
                      : 0.35,
                }}
              />
            ))}
          </View>

          {/* BOTÕES */}

          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}
          >
            {etapa > 0 && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={etapaAnterior}
                style={{
                  flex: 1,
                  height: 50,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    cycleColors.surfaceAlt,
                }}
              >
                <Text
                  style={{
                    color: cycleColors.text,
                    fontSize: 15,
                    fontWeight: '700',
                  }}
                >
                  Anterior
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={proximaEtapa}
              style={{
                flex: 1,
              }}
            >
              <View
                style={{
                  height: 50,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  gap: 8,
                  backgroundColor: cycleColors.rose,
                }}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 15,
                    fontWeight: '800',
                  }}
                >
                  {ultimaEtapa
                    ? 'Começar a usar'
                    : 'Próximo'}
                </Text>

                <Ionicons
                  name={
                    ultimaEtapa
                      ? 'checkmark'
                      : 'arrow-forward'
                  }
                  size={18}
                  color="#FFFFFF"
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* NÃO APARECER NOVAMENTE */}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={naoMostrarNovamente}
            style={{
              alignItems: 'center',
              marginTop: 18,
              paddingVertical: 4,
            }}
          >
            <Text
              style={{
                color: cycleColors.textMuted,
                fontSize: 12,
                fontWeight: '600',
              }}
            >
              Não aparecer novamente
            </Text>
          </TouchableOpacity>

          {/* CONTADOR */}

          <Text
            style={{
              color: cycleColors.textMuted,
              fontSize: 11,
              textAlign: 'center',
              marginTop: 10,
            }}
          >
            {etapa + 1} de {tutorialItems.length}
          </Text>
        </View>
      </View>
    </Modal>
  );
}