import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
  Animated,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Background } from '@/components/Background';

import {
  cycleColors,
} from '@/styles/calendar.styles';

import {
  messageStyles as styles,
} from '@/styles/message.styles';

// =====================================================
// TIPOS
// =====================================================

type AlertType =
  | 'veridico'
  | 'falso';

// =====================================================
// BOTÃO ANIMADO
// =====================================================

function AnimatedPressable({
  style,
  onPress,
  children,
}: {
  style?: any;
  onPress?: () => void;
  children: React.ReactNode;
}) {
  const scale =
    useRef(
      new Animated.Value(1)
    ).current;

  function handlePressIn() {
    Animated.spring(
      scale,
      {
        toValue: 0.94,
        useNativeDriver: true,
        speed: 40,
        bounciness: 6,
      }
    ).start();
  }

  function handlePressOut() {
    Animated.spring(
      scale,
      {
        toValue: 1,
        useNativeDriver: true,
        speed: 40,
        bounciness: 6,
      }
    ).start();
  }

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
            transform: [
              {
                scale,
              },
            ],
          },
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

// =====================================================
// TELA
// =====================================================

export default function MessageScreen() {

  // ===================================================
  // TIPO DE ALERTA
  // ===================================================

  const [
    tipoAlerta,
    setTipoAlerta,
  ] = useState<AlertType>(
    'veridico'
  );

  // ===================================================
  // MENSAGENS
  // ===================================================

  const [
    mensagemVeridica,
    setMensagemVeridica,
  ] = useState(
    'Uma pessoa acionou um pedido de ajuda. Entre em contato com ela o mais rápido possível.'
  );

  const [
    mensagemFalsa,
    setMensagemFalsa,
  ] = useState(
    'O alerta de emergência foi acionado por engano. Não é necessário entrar em contato.'
  );

  const mensagemAtual =
    tipoAlerta === 'veridico'
      ? mensagemVeridica
      : mensagemFalsa;

  // ===================================================
  // SELETOR
  // ===================================================

  const [
    pillWidth,
    setPillWidth,
  ] = useState(0);

  const slideAnim =
    useRef(
      new Animated.Value(0)
    ).current;

  useEffect(() => {
    Animated.spring(
      slideAnim,
      {
        toValue:
          tipoAlerta === 'veridico'
            ? 0
            : 1,
        useNativeDriver: true,
        bounciness: 8,
      }
    ).start();
  }, [
    tipoAlerta,
    slideAnim,
  ]);

  const indicatorTranslateX =
    slideAnim.interpolate({
      inputRange: [
        0,
        1,
      ],
      outputRange: [
        0,
        pillWidth / 2,
      ],
    });

  // ===================================================
  // ANIMAÇÕES DE ENTRADA
  // ===================================================

  const headerFade =
    useRef(
      new Animated.Value(0)
    ).current;

  const headerSlide =
    useRef(
      new Animated.Value(-8)
    ).current;

  const contentFade =
    useRef(
      new Animated.Value(0)
    ).current;

  const contentSlide =
    useRef(
      new Animated.Value(16)
    ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(
        headerFade,
        {
          toValue: 1,
          duration: 420,
          useNativeDriver: true,
        }
      ),

      Animated.timing(
        headerSlide,
        {
          toValue: 0,
          duration: 420,
          useNativeDriver: true,
        }
      ),
    ]).start();

    Animated.parallel([
      Animated.timing(
        contentFade,
        {
          toValue: 1,
          duration: 480,
          delay: 120,
          useNativeDriver: true,
        }
      ),

      Animated.timing(
        contentSlide,
        {
          toValue: 0,
          duration: 480,
          delay: 120,
          useNativeDriver: true,
        }
      ),
    ]).start();
  }, [
    headerFade,
    headerSlide,
    contentFade,
    contentSlide,
  ]);

  // ===================================================
  // SALVAR
  // ===================================================

  function salvarMensagens() {
    Alert.alert(
      'Mensagens salvas',
      'Suas mensagens de emergência foram atualizadas.'
    );
  }

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <Background>
      <View
        style={
          styles.root
        }
      >

        {/* =================================================
            TOPO FIXO
        ================================================= */}

        <Animated.View
          style={[
            styles.fixedHeader,
            {
              opacity:
                headerFade,

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
              styles.topBarIcon
            }
            onPress={() =>
              router.back()
            }
          >

            <Ionicons
              name="chevron-back"
              size={22}
              color={
                cycleColors.text
              }
            />

          </AnimatedPressable>

          <Text
            style={
              styles.pageTitle
            }
          >
            MENSAGEM DE EMERGÊNCIA
          </Text>

          <View
            style={
              styles.topBarSpacer
            }
          />

        </Animated.View>

        {/* =================================================
            CONTEÚDO
        ================================================= */}

        <ScrollView
          style={
            styles.scrollArea
          }
          showsVerticalScrollIndicator={
            false
          }
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            styles.container
          }
        >

          <Animated.View
            style={[
              {
                opacity:
                  contentFade,

                transform: [
                  {
                    translateY:
                      contentSlide,
                  },
                ],
              },
            ]}
          >

            {/* =================================================
                PRÉVIA DA MENSAGEM
            ================================================= */}

            <View
              style={[
                styles.heroCard,
                {
                  // VERÍDICO = TEAL
                  // FALSO = ROSA
                  backgroundColor:
                    tipoAlerta === 'veridico'
                      ? cycleColors.tealSoft
                      : cycleColors.roseSoft,

                  borderWidth: 1,

                  borderColor:
                    tipoAlerta === 'veridico'
                      ? cycleColors.teal
                      : cycleColors.rose,
                },
              ]}
            >

              <View
                style={
                  styles.heroTopRow
                }
              >

                <View
                  style={[
                    styles.heroAvatar,
                    {
                      // VERÍDICO = TEAL
                      // FALSO = ROSA
                      backgroundColor:
                        tipoAlerta === 'veridico'
                          ? cycleColors.teal
                          : cycleColors.rose,
                    },
                  ]}
                >

                  <Ionicons
                    name="shield-checkmark"
                    size={18}
                    color={
                      cycleColors.text
                    }
                  />

                </View>

                <View
                  style={{
                    flex: 1,
                  }}
                >

                  <Text
                    style={
                      styles.heroSenderName
                    }
                  >
                    SPIE
                  </Text>

                  <Text
                    style={
                      styles.heroTimestamp
                    }
                  >
                    agora
                  </Text>

                </View>

                <View
                  style={[
                    styles.heroBadge,
                    {
                      // VERÍDICO = TEAL
                      // FALSO = ROSA
                      backgroundColor:
                        tipoAlerta === 'veridico'
                          ? cycleColors.teal
                          : cycleColors.rose,
                    },
                  ]}
                >

                  <Ionicons
                    name={
                      tipoAlerta === 'veridico'
                        ? 'warning'
                        : 'checkmark-circle'
                    }
                    size={12}
                    color={
                      cycleColors.text
                    }
                  />

                  <Text
                    style={
                      styles.heroBadgeText
                    }
                  >
                    {tipoAlerta === 'veridico'
                      ? 'REAL'
                      : 'FALSO'}
                  </Text>

                </View>

              </View>

              {/* =================================================
                  BOLHA DA MENSAGEM
              ================================================= */}

              <View>

                <View
                  style={
                    styles.bubbleTail
                  }
                />

                <View
                  style={
                    styles.bubble
                  }
                >

                  <Text
                    style={
                      styles.bubbleText
                    }
                  >
                    {mensagemAtual}
                  </Text>

                </View>

              </View>

              <Text
                style={
                  styles.heroFootnote
                }
              >
                É assim que seus contatos verão a mensagem
              </Text>

            </View>

            {/* =================================================
                SELETOR
            ================================================= */}

            <View
              style={
                styles.pillContainer
              }
              onLayout={(event) =>
                setPillWidth(
                  event.nativeEvent.layout.width
                )
              }
            >

              {pillWidth > 0 && (
                <Animated.View
                  style={[
                    styles.pillIndicator,
                    {
                      // VERÍDICO = TEAL
                      // FALSO = ROSA
                      backgroundColor:
                        tipoAlerta === 'veridico'
                          ? cycleColors.teal
                          : cycleColors.rose,

                      transform: [
                        {
                          translateX:
                            indicatorTranslateX,
                        },
                      ],
                    },
                  ]}
                />
              )}

              {/* VERÍDICO */}

              <TouchableOpacity
                style={
                  styles.pillOption
                }
                activeOpacity={0.8}
                onPress={() =>
                  setTipoAlerta(
                    'veridico'
                  )
                }
              >

                <Ionicons
                  name="warning"
                  size={15}
                  color={
                    tipoAlerta === 'veridico'
                      ? cycleColors.text
                      : cycleColors.textMuted
                  }
                />

                <Text
                  style={[
                    styles.pillOptionText,
                    {
                      color:
                        tipoAlerta === 'veridico'
                          ? cycleColors.text
                          : cycleColors.textMuted,
                    },
                  ]}
                >
                  Verídico
                </Text>

              </TouchableOpacity>

              {/* FALSO */}

              <TouchableOpacity
                style={
                  styles.pillOption
                }
                activeOpacity={0.8}
                onPress={() =>
                  setTipoAlerta(
                    'falso'
                  )
                }
              >

                <Ionicons
                  name="checkmark-circle"
                  size={15}
                  color={
                    tipoAlerta === 'falso'
                      ? cycleColors.text
                      : cycleColors.textMuted
                  }
                />

                <Text
                  style={[
                    styles.pillOptionText,
                    {
                      color:
                        tipoAlerta === 'falso'
                          ? cycleColors.text
                          : cycleColors.textMuted,
                    },
                  ]}
                >
                  Falso
                </Text>

              </TouchableOpacity>

            </View>

            {/* =================================================
                MENSAGEM
            ================================================= */}

            <Text
              style={
                styles.sectionLabel
              }
            >
              MENSAGEM
            </Text>

            <Text
              style={
                styles.sectionDescription
              }
            >
              Edite o conteúdo enviado aos contatos
            </Text>

            <View
              style={
                styles.editorCard
              }
            >

              <TextInput
                value={
                  mensagemAtual
                }
                onChangeText={
                  tipoAlerta === 'veridico'
                    ? setMensagemVeridica
                    : setMensagemFalsa
                }
                multiline
                textAlignVertical="top"
                placeholder="Digite a mensagem..."
                placeholderTextColor={
                  cycleColors.textMuted
                }
                style={
                  styles.messageInput
                }
              />

              <View
                style={
                  styles.editIndicator
                }
              >

                <Ionicons
                  name="create-outline"
                  size={15}
                  color={
                    cycleColors.textMuted
                  }
                />

                <Text
                  style={
                    styles.editIndicatorText
                  }
                >
                  Toque no texto para editar
                </Text>

              </View>

            </View>

            {/* =================================================
                INFORMAÇÃO
            ================================================= */}

            <View
              style={
                styles.infoCard
              }
            >

              <View
                style={
                  styles.infoIcon
                }
              >

                <Ionicons
                  name="information-circle-outline"
                  size={21}
                  color={
                    cycleColors.lavender
                  }
                />

              </View>

              <View
                style={
                  styles.infoContent
                }
              >

                <Text
                  style={
                    styles.infoTitle
                  }
                >
                  Como funciona
                </Text>

                <Text
                  style={
                    styles.infoText
                  }
                >
                  O SPIE utiliza uma mensagem diferente para cada situação. Você pode
                  personalizar o texto do alerta verídico e também o texto utilizado
                  quando o alerta for considerado falso.
                </Text>

              </View>

            </View>

            {/* =================================================
                SALVAR
            ================================================= */}

            <AnimatedPressable
              style={
                styles.saveButtonWrapper
              }
              onPress={
                salvarMensagens
              }
            >

              <View
                style={[
                  styles.saveButton,
                  {
                    backgroundColor:
                      cycleColors.rose,
                  },
                ]}
              >

                <Ionicons
                  name="checkmark"
                  size={18}
                  color={
                    cycleColors.text
                  }
                />

                <Text
                  style={
                    styles.saveButtonText
                  }
                >
                  Salvar mensagens
                </Text>

              </View>

            </AnimatedPressable>

          </Animated.View>

        </ScrollView>

      </View>
    </Background>
  );
}