import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Animated,
  ScrollView,
  Switch,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
  useRouter,
} from 'expo-router';

import { LinearGradient } from 'expo-linear-gradient';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useEmergency } from '@/modules/emergency/contexts/EmergencyContext';
import { useSecurity } from '@/modules/security-vault/contexts/SecurityContext';
import { useDevice } from '@/modules/device/hooks/useDevice';
import { emergencyRepository } from '@/modules/emergency/services/emergencyRepository';
import { secretStyles as styles } from '@/styles/secret.styles';
import { cycleColors } from '@/styles/calendar.styles';
import { useDialog } from '@/context/DialogContext';
import { haptics } from '@/shared/utils/haptics';


// =====================================================
// ONDAS DO BOTÃO SOS
// =====================================================

function PulseRing({
  delay,
}: {
  delay: number;
}) {

  const anim = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {

    const loop = Animated.loop(
      Animated.sequence([

        Animated.delay(delay),

        Animated.timing(
          anim,
          {
            toValue: 1,
            duration: 1800,
            useNativeDriver: true,
          }
        ),

        Animated.timing(
          anim,
          {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }
        ),

      ])
    );

    loop.start();

    return () => {
      loop.stop();
    };

  }, [delay, anim]);

  return (

    <Animated.View
      pointerEvents="none"
      style={[
        styles.pulseRing,

        {
          opacity:
            anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5, 0],
            }),

          transform: [
            {
              scale:
                anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.45],
                }),
            },
          ],
        },
      ]}
    />

  );

}


// =====================================================
// SECURITY INDEX
// =====================================================

export default function SecurityScreen() {

  const router = useRouter();
  const { showAlert } = useDialog();
  const { status: bleStatus } = useDevice();
  const {
    alertaAtivo,
    dispararAlerta,
    ligacaoEmergenciaAtiva,
    alternarLigacaoEmergencia,
  } = useEmergency();
  const { bloquear } = useSecurity();

  const conectado = bleStatus === 'connected';


  // =====================================================
  // ESTADOS
  // =====================================================

  const [
    quantidadeContatos,
    setQuantidadeContatos,
  ] = useState(0);


  const [
    criandoAlerta,
    setCriandoAlerta,
  ] = useState(false);


  // =====================================================
  // CONTAGEM DO SOS
  // =====================================================

  const [
    pressionandoSOS,
    setPressionandoSOS,
  ] = useState(false);


  const [
    contagemSOS,
    setContagemSOS,
  ] = useState(3);


  const inicioPressaoRef =
    useRef<number | null>(null);


  const timerSOSRef =
    useRef<ReturnType<typeof setInterval> | null>(
      null
    );


  const alertaAtivadoRef =
    useRef(false);


  // =====================================================
  // STATUS DA PULSEIRA
  // =====================================================

  const status =
    bleStatus === 'connected'
      ? 'Band Connected'
      : bleStatus === 'connecting'
      ? 'Connecting...'
      : 'Disconnected';


  // =====================================================
  // LIMPAR TIMER
  // =====================================================

  useEffect(() => {

    return () => {

      if (timerSOSRef.current) {

        clearInterval(
          timerSOSRef.current
        );

        timerSOSRef.current = null;

      }

    };

  }, []);


  // =====================================================
  // VOLTAR
  // =====================================================

  function voltar() {

    bloquear();

    router.replace(
      '/(tabs)/calendar'
    );

  }


  // =====================================================
  // CONTATOS DE EMERGÊNCIA
  // =====================================================

  useEffect(() => {

    const unsubscribe = emergencyRepository.subscribeContacts((list) => {
      setQuantidadeContatos(list.length);
    });

    return () => {
      unsubscribe?.();
    };

  }, []);


  // =====================================================
  // EMERGÊNCIA
  // =====================================================

  async function ativarEmergencia() {

    if (criandoAlerta) {
      return;
    }


    try {

      setCriandoAlerta(true);


      // ===================================================
      // CRIA O ALERTA
      // ===================================================

      const alertId = await dispararAlerta('SOS', 'APP_BUTTON');


      // ===================================================
      // ABRE A EMERGENCY SCREEN
      // ===================================================

      router.push({

        pathname:
          '/security/emergency',

        params: {

          alertaId:
            alertId || '',

        },

      });


    } catch (error) {

      console.log(
        'Error creating emergency alert:',
        error
      );

      showAlert({
        title: 'Error',
        message: 'Could not trigger the emergency alert.',
        type: 'error',
      });

    } finally {

      setCriandoAlerta(false);

    }

  }


  // =====================================================
  // COMEÇAR CONTAGEM DO SOS
  // =====================================================

  function iniciarContagemSOS() {

    if (
      criandoAlerta ||
      alertaAtivo
    ) {
      return;
    }


    // -----------------------------------------------------
    // LIMPA TIMER ANTERIOR
    // -----------------------------------------------------

    if (timerSOSRef.current) {

      clearInterval(
        timerSOSRef.current
      );

      timerSOSRef.current = null;

    }


    // -----------------------------------------------------
    // RESETA ESTADOS
    // -----------------------------------------------------

    alertaAtivadoRef.current = false;

    inicioPressaoRef.current =
      Date.now();

    haptics.impactMedium();
    setPressionandoSOS(true);

    setContagemSOS(3);


    // -----------------------------------------------------
    // ATUALIZA A CONTAGEM
    // -----------------------------------------------------

    timerSOSRef.current =
      setInterval(() => {

        if (
          inicioPressaoRef.current === null
        ) {
          return;
        }


        const tempoDecorrido =
          Date.now() -
          inicioPressaoRef.current;


        // ===============================================
        // COMPLETOU 3 SEGUNDOS
        // ===============================================

        if (
          tempoDecorrido >= 3000
        ) {

          if (
            timerSOSRef.current
          ) {

            clearInterval(
              timerSOSRef.current
            );

            timerSOSRef.current =
              null;

          }


          alertaAtivadoRef.current =
            true;

          haptics.impactHeavy();
          setContagemSOS(0);

          setPressionandoSOS(false);

          inicioPressaoRef.current =
            null;


          // Ativa automaticamente
          // assim que completar os 3 segundos.

          ativarEmergencia();

          return;

        }


        // ===============================================
        // CALCULA CONTAGEM
        // ===============================================

        const restante =
          Math.ceil(
            (3000 - tempoDecorrido) /
              1000
          );


        setContagemSOS(
          Math.max(
            1,
            restante
          )
        );

      }, 50);

  }


  // =====================================================
  // SOLTAR BOTÃO SOS
  // =====================================================

  function finalizarPressaoSOS() {

    // -----------------------------------------------------
    // LIMPA TIMER
    // -----------------------------------------------------

    if (timerSOSRef.current) {

      clearInterval(
        timerSOSRef.current
      );

      timerSOSRef.current = null;

    }


    // -----------------------------------------------------
    // SE JÁ ATIVOU, NÃO FAZ NADA
    // -----------------------------------------------------

    if (
      alertaAtivadoRef.current
    ) {

      alertaAtivadoRef.current =
        false;

      setPressionandoSOS(false);

      inicioPressaoRef.current =
        null;

      return;

    }


    // -----------------------------------------------------
    // SE SOLTOU ANTES DOS 3 SEGUNDOS
    // -----------------------------------------------------

    if (
      pressionandoSOS
    ) {

      setPressionandoSOS(false);

      inicioPressaoRef.current =
        null;

      setContagemSOS(3);

      showAlert({
        title: 'Notice',
        message: 'Hold the SOS button for 3 seconds to activate the emergency alarm.',
        type: 'warning',
      });

    }

  }


  // =====================================================
  // TEXTO DOS CONTATOS
  // =====================================================

  function textoContatos() {

    if (
      quantidadeContatos === 0
    ) {

      return 'No contacts';

    }


    if (
      quantidadeContatos === 1
    ) {

      return '1 contact';

    }


    return `${quantidadeContatos} contacts`;

  }


  // =====================================================
  // ÁREA SEGURA
  // =====================================================

  return (

    <SafeAreaView
      style={styles.container}
      edges={[
        'top',
        'left',
        'right',
      ]}
    >

      <StatusBar
        barStyle="light-content"
      />


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scroll
        }
      >


        {/* =================================================
            BOTÃO VOLTAR
        ================================================= */}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={voltar}
          style={styles.backButton}
        >

          <Ionicons
            name="arrow-back"
            size={22}
            color={cycleColors.text}
          />

        </TouchableOpacity>


        {/* =================================================
            CABEÇALHO
        ================================================= */}

        <Text
          style={styles.eyebrow}
        >
          SECURE AREA
        </Text>


        <Text
          style={styles.title}
        >
          SPIE
        </Text>


        <View
          style={
            styles.connectionPill
          }
        >

          <View
            style={[
              styles.connectionDot,

              {
                backgroundColor:
                  conectado
                    ? cycleColors.teal
                    : cycleColors.textMuted,
              },

            ]}
          />


          <Text
            style={
              styles.connectionText
            }
          >

            {conectado
              ? 'Smartband connected'
              : 'Smartband disconnected'}

          </Text>

        </View>


        {/* =================================================
            STATUS
        ================================================= */}

        <View
          style={[
            styles.statusCard,

            alertaAtivo &&
              styles.alertCard,

          ]}
        >

          <View
            style={[
              styles.statusIconWrap,

              alertaAtivo && {
                backgroundColor:
                  cycleColors.dangerSoft,
              },

            ]}
          >

            <Ionicons
              name={
                alertaAtivo
                  ? 'alert-circle'
                  : 'shield-checkmark'
              }

              size={20}

              color={
                alertaAtivo
                  ? cycleColors.danger
                  : cycleColors.text
              }
            />

          </View>


          <View
            style={
              styles.statusInfo
            }
          >

            <Text
              style={[
                styles.statusTitle,

                alertaAtivo &&
                  styles.alertTitle,

              ]}
            >

              {alertaAtivo
                ? 'Emergency Alert'
                : 'System Protected'}

            </Text>


            <Text
              style={
                styles.statusSubtitle
              }
            >

              {alertaAtivo
                ? 'The smartband sent a critical signal.'
                : 'No threats detected at the moment.'}

            </Text>

          </View>

        </View>


        {/* =================================================
            MINI CARDS
        ================================================= */}

        <View
          style={
            styles.statsContainer
          }
        >

          {/* =================================================
              PULSEIRA
          ================================================= */}

          <TouchableOpacity
            style={
              styles.statCard
            }

            activeOpacity={0.85}

            onPress={() =>
              router.push(
                '/security/device'
              )
            }
          >

            <View
              style={[
                styles.statIconWrap,

                {
                  backgroundColor:
                    cycleColors.lavenderSoft,
                },

              ]}
            >

              <Ionicons
                name="watch-outline"
                size={18}
                color={
                  cycleColors.lavender
                }
              />

            </View>


            <Text
              style={
                styles.statNumber
              }
            >
              {status}
            </Text>


            <Text
              style={
                styles.statTitle
              }
            >
              Smartband
            </Text>

          </TouchableOpacity>


          {/* =================================================
              CONTATOS
          ================================================= */}

          <TouchableOpacity
            style={
              styles.statCard
            }

            activeOpacity={0.85}

            onPress={() => {

              console.log(
                'ABRINDO CONTATOS'
              );


              router.push({
                pathname:
                  '/security/contacts',
              });

            }}
          >

            <View
              style={[
                styles.statIconWrap,

                {
                  backgroundColor:
                    cycleColors.roseSoft,
                },

              ]}
            >

              <Ionicons
                name="people-outline"
                size={18}
                color={
                  cycleColors.rose
                }
              />

            </View>


            <Text
              style={
                styles.statNumber
              }
            >
              {textoContatos()}
            </Text>


            <Text
              style={
                styles.statTitle
              }
            >
              Emergency
            </Text>

          </TouchableOpacity>

        </View>

        {/* =================================================
            HISTÓRICO E SEGURANÇA
        ================================================= */}

        <View
          style={[
            styles.statsContainer,
            { marginTop: -14 },
          ]}
        >

          <TouchableOpacity
            style={styles.statCard}
            activeOpacity={0.85}
            onPress={() => router.push('/security/alert-history')}
          >
            <View
              style={[
                styles.statIconWrap,
                { backgroundColor: cycleColors.goldSoft },
              ]}
            >
              <Ionicons
                name="time-outline"
                size={18}
                color={cycleColors.gold}
              />
            </View>

            <Text style={styles.statNumber}>
              History
            </Text>

            <Text style={styles.statTitle}>
              SOS Alerts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statCard}
            activeOpacity={0.85}
            onPress={() => router.push('/security/change-pin')}
          >
            <View
              style={[
                styles.statIconWrap,
                { backgroundColor: 'rgba(139, 127, 232, 0.15)' },
              ]}
            >
              <Ionicons
                name="key-outline"
                size={18}
                color={cycleColors.lavender}
              />
            </View>

            <Text style={styles.statNumber}>
              PIN
            </Text>

            <Text style={styles.statTitle}>
              Security
            </Text>
          </TouchableOpacity>

        </View>


        {/* =================================================
            CONFIGURAÇÃO DE DISCAGEM SOS
        ================================================= */}

        <View style={styles.settingCard}>
          <View style={styles.settingLeft}>
            <View
              style={[
                styles.settingIconWrap,
                {
                  backgroundColor: ligacaoEmergenciaAtiva
                    ? 'rgba(61, 220, 151, 0.15)'
                    : 'rgba(255, 92, 141, 0.15)',
                },
              ]}
            >
              <Ionicons
                name={ligacaoEmergenciaAtiva ? 'call' : 'call-outline'}
                size={20}
                color={ligacaoEmergenciaAtiva ? cycleColors.teal : cycleColors.rose}
              />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Emergency Call</Text>
              <Text style={styles.settingDesc}>
                {ligacaoEmergenciaAtiva
                  ? 'Automatically dial after sending SMS'
                  : 'Silent mode (SMS with GPS only)'}
              </Text>
            </View>
          </View>

          <Switch
            value={ligacaoEmergenciaAtiva}
            onValueChange={(val) => {
              haptics.selection();
              alternarLigacaoEmergencia(val);
            }}
            trackColor={{
              false: 'rgba(255, 255, 255, 0.15)',
              true: cycleColors.teal,
            }}
            thumbColor="#FFFFFF"
          />
        </View>


        {/* =================================================
            SOS
        ================================================= */}

        <Text
          style={
            styles.sosSectionLabel
          }
        >
          EMERGENCY
        </Text>


        <View
          style={
            styles.sosContainer
          }
        >

          <Text
            style={
              styles.sosInstruction
            }
          >
            {pressionandoSOS
              ? 'Keep holding...'
              : 'Hold the button for 3 seconds in case of danger'}
          </Text>


          <View
            style={
              styles.sosWrapper
            }
          >

            <PulseRing
              delay={0}
            />


            <PulseRing
              delay={900}
            />


            <TouchableOpacity
              activeOpacity={0.85}

              onPressIn={
                iniciarContagemSOS
              }

              onPressOut={
                finalizarPressaoSOS
              }

              disabled={
                criandoAlerta ||
                alertaAtivo
              }

              style={
                styles.sosTouch
              }
            >

              <View
                style={[
                  styles.sosButton,
                  { backgroundColor: '#EF4444' },
                ]}
              >
                {criandoAlerta ? (
                  <>
                    <Ionicons
                      name="hourglass-outline"
                      size={30}
                      color="#FFFFFF"
                      style={{
                        marginBottom: 6,
                      }}
                    />

                    <Text
                      style={
                        styles.sosText
                      }
                    >
                      SENDING
                    </Text>

                    <Text
                      style={
                        styles.sosSubText
                      }
                    >
                      Please wait...
                    </Text>
                  </>
                ) : pressionandoSOS ? (
                  <>
                    <Text
                      style={[
                        styles.sosText,
                        {
                          fontSize: 42,
                          lineHeight: 48,
                        },
                      ]}
                    >
                      {contagemSOS}
                    </Text>

                    <Text
                      style={
                        styles.sosSubText
                      }
                    >
                      Keep holding
                    </Text>
                  </>
                ) : (
                  <>
                    <Ionicons
                      name="warning"
                      size={30}
                      color="#FFFFFF"
                      style={{
                        marginBottom: 6,
                      }}
                    />

                    <Text
                      style={
                        styles.sosText
                      }
                    >
                      SOS
                    </Text>

                    <Text
                      style={
                        styles.sosSubText
                      }
                    >
                      Hold for 3s
                    </Text>
                  </>
                )}
              </View>
            </TouchableOpacity>

          </View>

        </View>

      </ScrollView>

    </SafeAreaView>

  );

}