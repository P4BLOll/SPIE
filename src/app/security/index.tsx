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

        Animated.timing(anim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),

        Animated.timing(anim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),

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

  const {
    status,
    alertaAtivo,
  } = useBLE();

  const {
    bloquear,
  } = useSecurity();

  const [
    quantidadeContatos,
    setQuantidadeContatos,
  ] = useState(0);


  const conectado =
    status === 'Pulseira Conectada';


  // =====================================================
  // VOLTAR
  // =====================================================

  function voltar() {

    // Bloqueia novamente a área segura
    // antes de voltar para o Calendar.

    bloquear();

    // Volta sempre para o Calendar,
    // sem deixar a tela /security acumulada
    // na pilha de navegação.

    router.replace('/(tabs)/calendar');

  }


  // =====================================================
  // CONTATOS DE EMERGÊNCIA
  // =====================================================

  useEffect(() => {

    const user = auth.currentUser;

    if (!user) {

      setQuantidadeContatos(0);

      return;
    }

    const contatosRef = collection(
      db,
      'users',
      user.uid,
      'emergency_contacts'
    );

    const unsubscribe = onSnapshot(

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

  function ativarEmergencia() {

    router.push(
      '/security/emergency'
    );

  }


  // =====================================================
  // TOQUE CURTO
  // =====================================================

  function toqueCurto() {

    Alert.alert(
      'Aviso',
      'Segure o botão SOS por 3 segundos para ativar o alarme.'
    );

  }


  // =====================================================
  // TEXTO DOS CONTATOS
  // =====================================================

  function textoContatos() {

    if (quantidadeContatos === 0) {
      return 'Nenhum contato';
    }

    if (quantidadeContatos === 1) {
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

        <Text style={styles.eyebrow}>
          ÁREA SEGURA
        </Text>

        <Text style={styles.title}>
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

          {/* PULSEIRA */}

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


          {/* CONTATOS */}

                <TouchableOpacity
        style={styles.statCard}
        activeOpacity={0.85}
        onPress={() => {
          console.log('ABRINDO CONTATOS');

          router.push({
            pathname: '/security/contacts',
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
            Segure o botão por 3 segundos em caso de perigo
          </Text>


          <View
            style={
              styles.sosWrapper
            }
          >

            <PulseRing delay={0} />

            <PulseRing delay={900} />


            <TouchableOpacity
              activeOpacity={0.85}
              onPress={toqueCurto}
              onLongPress={
                ativarEmergencia
              }
              delayLongPress={3000}
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

              </LinearGradient>

            </TouchableOpacity>

          </View>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}