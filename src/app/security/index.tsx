import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  StatusBar,
  Animated,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
  useRouter,
} from 'expo-router';

import { LinearGradient } from 'expo-linear-gradient';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { cycleColors } from '../../styles/calendar.styles';

import { useBLE } from '../../context/BLEContext';

import { useSecurity } from '../../context/SecurityContext';

import {
  secretStyles as styles,
} from '../../styles/secret.styles';

import {
  db,
  auth,
} from '../../services/firebaseConfig';


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
                  outputRange: [1, 1.35],
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


  // =====================================================
  // BLE
  // =====================================================

  const {
    status,
    alertaAtivo,
  } = useBLE();


  // =====================================================
  // SEGURANÇA
  // =====================================================

  const {
    bloquear,
  } = useSecurity();


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

  const conectado =
    status === 'Pulseira Conectada';


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

    const user =
      auth.currentUser;


    if (!user) {

      setQuantidadeContatos(0);

      return;

    }


    const contatosRef =
      collection(
        db,
        'users',
        user.uid,
        'emergency_contacts'
      );


    const unsubscribe =
      onSnapshot(

        contatosRef,

        (snapshot) => {

          setQuantidadeContatos(
            snapshot.size
          );

        },

        (error) => {

          console.log(
            'Erro ao carregar contatos de emergência:',
            error
          );

          setQuantidadeContatos(0);

        }

      );


    return () => {
      unsubscribe();
    };

  }, []);


  // =====================================================
  // EMERGÊNCIA
  // =====================================================

  async function ativarEmergencia() {

    // -----------------------------------------------------
    // EVITA DUPLO TOQUE
    // -----------------------------------------------------

    if (criandoAlerta) {
      return;
    }


    const user =
      auth.currentUser;


    // -----------------------------------------------------
    // VERIFICA AUTENTICAÇÃO
    // -----------------------------------------------------

    if (!user) {

      Alert.alert(
        'Erro',
        'Usuário não autenticado.'
      );

      return;

    }


    try {

      setCriandoAlerta(true);


      // ===================================================
      // REFERÊNCIA DO HISTÓRICO
      // ===================================================

      const alertHistoryRef =
        collection(
          db,
          'users',
          user.uid,
          'alert_history'
        );


      // ===================================================
      // CRIA O ALERTA
      // ===================================================

      const alertaRef =
        await addDoc(
          alertHistoryRef,
          {

            tipo: 'SOS',

            status: 'Enviado',

            createdAt:
              serverTimestamp(),

            atualizadoEm:
              serverTimestamp(),

            latitude: null,

            longitude: null,

            quantidadeContatos:
              quantidadeContatos,

          }
        );


      console.log(
        'Alerta criado no Firebase:',
        alertaRef.id
      );


      // ===================================================
      // ABRE A EMERGENCY SCREEN
      // ===================================================

      router.push({

        pathname:
          '/security/emergency',

        params: {

          alertaId:
            alertaRef.id,

        },

      });


    } catch (error) {

      console.log(
        'Erro ao criar alerta de emergência:',
        error
      );


      Alert.alert(
        'Erro',
        'Não foi possível registrar o alerta de emergência.'
      );

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


      Alert.alert(
        'Aviso',
        'Segure o botão SOS por 3 segundos para ativar o alarme.'
      );

    }

  }


  // =====================================================
  // TEXTO DOS CONTATOS
  // =====================================================

  function textoContatos() {

    if (
      quantidadeContatos === 0
    ) {

      return 'Nenhum contato';

    }


    if (
      quantidadeContatos === 1
    ) {

      return '1 contato';

    }


    return `${quantidadeContatos} contatos`;

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
          ÁREA SEGURA
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
              ? 'Pulseira conectada'
              : 'Pulseira desconectada'}

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
                ? 'Alerta de emergência'
                : 'Sistema protegido'}

            </Text>


            <Text
              style={
                styles.statusSubtitle
              }
            >

              {alertaAtivo
                ? 'A pulseira enviou um sinal crítico.'
                : 'Nenhuma ameaça detectada no momento.'}

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
              Pulseira
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
              Emergência
            </Text>

          </TouchableOpacity>

        </View>


        {/* =================================================
            SOS
        ================================================= */}

        <Text
          style={
            styles.sosSectionLabel
          }
        >
          EMERGÊNCIA
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
              ? 'Continue segurando...'
              : 'Segure o botão por 3 segundos em caso de perigo'}
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
                  styles.sosButton
                }
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
                      ENVIANDO
                    </Text>


                    <Text
                      style={
                        styles.sosSubText
                      }
                    >
                      Aguarde...
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
                      Continue segurando
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
                      Segure por 3s
                    </Text>

                  </>

                )}

              </LinearGradient>

            </TouchableOpacity>

          </View>

        </View>

      </ScrollView>

    </SafeAreaView>

  );

}