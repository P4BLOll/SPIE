import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Linking,
  Animated,
} from 'react-native';

import * as Location from 'expo-location';
import * as SMS from 'expo-sms';

import { Ionicons } from '@expo/vector-icons';

import MapView, {
  Marker,
  Region,
} from 'react-native-maps';

import { SafeAreaView } from 'react-native-safe-area-context';

import { router } from 'expo-router';

import { cycleColors } from '@/styles/calendar.styles';

import {
  emergencyStyles as styles,
} from '@/styles/emergency.styles';

import {
  db,
  auth,
} from '@/services/firebaseConfig';

import {
  collection,
  onSnapshot,
} from 'firebase/firestore';

// ============================================================
// CORES SEGURAS
// ============================================================

const SAFE_ROSE =
  typeof cycleColors.rose === 'string'
    ? cycleColors.rose
    : '#E88BA5';

const SAFE_LAVENDER =
  typeof cycleColors.lavender === 'string'
    ? cycleColors.lavender
    : '#A98BC6';

const SAFE_DANGER =
  typeof cycleColors.danger === 'string'
    ? cycleColors.danger
    : '#E05252';

const SAFE_TEAL =
  typeof cycleColors.teal === 'string'
    ? cycleColors.teal
    : '#4FA89A';

const SAFE_GOLD =
  typeof cycleColors.gold === 'string'
    ? cycleColors.gold
    : '#C9A227';

const SAFE_TEXT =
  typeof cycleColors.text === 'string'
    ? cycleColors.text
    : '#2F2A35';

const SAFE_TEXT_MUTED =
  typeof cycleColors.textMuted === 'string'
    ? cycleColors.textMuted
    : '#8A8390';

const SAFE_SURFACE_ALT =
  typeof cycleColors.surfaceAlt === 'string'
    ? cycleColors.surfaceAlt
    : '#F2EEF4';

const SAFE_ROSE_SOFT =
  typeof cycleColors.roseSoft === 'string'
    ? cycleColors.roseSoft
    : '#FCEEF3';

const SAFE_LAVENDER_SOFT =
  typeof cycleColors.lavenderSoft === 'string'
    ? cycleColors.lavenderSoft
    : '#F2ECF8';

const SAFE_TEAL_SOFT =
  typeof cycleColors.tealSoft === 'string'
    ? cycleColors.tealSoft
    : '#EAF7F4';

const SAFE_GOLD_SOFT =
  typeof cycleColors.goldSoft === 'string'
    ? cycleColors.goldSoft
    : '#FBF4DC';

const SAFE_DANGER_SOFT =
  typeof cycleColors.dangerSoft === 'string'
    ? cycleColors.dangerSoft
    : '#FCEBEC';

// ============================================================
// TIPOS
// ============================================================

interface Contact {
  id: string;
  name: string;
  phone: string;
}

type LocationState =
  | 'loading'
  | 'ready'
  | 'permission'
  | 'services'
  | 'error';

type ContactStatus =
  | 'waiting'
  | 'sending'
  | 'sent'
  | 'received';

// ============================================================
// TELA
// ============================================================

export default function EmergencyScreen() {

  // ============================================================
  // ESTADOS
  // ============================================================

  const [location, setLocation] =
    useState<Region | null>(null);

  const [locationState, setLocationState] =
    useState<LocationState>('loading');

  const [contatos, setContatos] =
    useState<Contact[]>([]);

  const [cancelado, setCancelado] =
    useState(false);

  const [statusEnvio, setStatusEnvio] =
    useState<ContactStatus>('sending');

  const [enviandoSMS, setEnviandoSMS] =
    useState(false);

  const [smsEnviado, setSmsEnviado] =
    useState(false);

  const [contagem, setContagem] =
    useState<number | null>(null);

  const countdownRef =
    useRef<ReturnType<typeof setInterval> | null>(null);

  // ============================================================
  // ANIMAÇÃO
  // ============================================================

  const cancelPulse =
    useRef(
      new Animated.Value(1)
    ).current;

  const cancelFill =
    useRef(
      new Animated.Value(0)
    ).current;

  // ============================================================
  // USUÁRIO ATUAL
  // ============================================================

  const currentUser =
    auth.currentUser;

  // ============================================================
  // ANIMAÇÃO DO BOTÃO
  // ============================================================

  useEffect(() => {

    const loop =
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            cancelPulse,
            {
              toValue: 1.03,
              duration: 900,
              useNativeDriver: true,
            }
          ),

          Animated.timing(
            cancelPulse,
            {
              toValue: 1,
              duration: 900,
              useNativeDriver: true,
            }
          ),
        ])
      );

    loop.start();

    return () => {
      loop.stop();
    };

  }, [cancelPulse]);

  useEffect(() => {

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };

  }, []);

  // ============================================================
  // CONTATOS DE EMERGÊNCIA
  // ============================================================

  useEffect(() => {

    if (!currentUser) {
      setContatos([]);
      return;
    }

    const contactsRef =
      collection(
        db,
        'users',
        currentUser.uid,
        'emergency_contacts'
      );

    const unsubscribe =
      onSnapshot(
        contactsRef,
        (snapshot) => {

          const data: Contact[] = [];

          snapshot.forEach(
            (contactDoc) => {

              const contact =
                contactDoc.data();

              data.push({
                id: contactDoc.id,

                name:
                  typeof contact.name === 'string'
                    ? contact.name
                    : 'Contato',

                phone:
                  typeof contact.phone === 'string'
                    ? contact.phone
                    : '',
              });

            }
          );

          setContatos(data);

        },

        (error) => {

          console.log(
            'Erro ao carregar contatos:',
            error
          );

          setContatos([]);

        }
      );

    return () => {
      unsubscribe();
    };

  }, [currentUser?.uid]);

  // ============================================================
  // LOCALIZAÇÃO
  // ============================================================

  useEffect(() => {
    obterLocalizacao();
  }, []);

  async function obterLocalizacao() {

    setLocationState('loading');

    try {

      // ========================================================
      // PERMISSÃO
      // ========================================================

      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (
        permission.status !== 'granted'
      ) {

        setLocationState('permission');
        return;

      }

      // ========================================================
      // SERVIÇOS DE LOCALIZAÇÃO
      // ========================================================

      const servicesEnabled =
        await Location.hasServicesEnabledAsync();

      if (!servicesEnabled) {

        setLocationState('services');
        return;

      }

      // ========================================================
      // ÚLTIMA LOCALIZAÇÃO CONHECIDA
      // ========================================================

      try {

        const last =
          await Location.getLastKnownPositionAsync({
            maxAge:
              24 * 60 * 60 * 1000,
            requiredAccuracy:
              10000,
          });

        if (last) {

          const {
            latitude,
            longitude,
          } = last.coords;

          setLocation({
            latitude,
            longitude,
            latitudeDelta:
              0.008,
            longitudeDelta:
              0.008,
          });

          setLocationState('ready');

        }

      } catch (error) {

        console.log(
          'Erro na última localização:',
          error
        );

      }

      // ========================================================
      // LOCALIZAÇÃO ATUAL
      // ========================================================

      try {

        const current =
          await Location.getCurrentPositionAsync({
            accuracy:
              Location.Accuracy.Balanced,
            mayShowUserSettingsDialog:
              true,
          });

        const {
          latitude,
          longitude,
        } = current.coords;

        setLocation({
          latitude,
          longitude,
          latitudeDelta:
            0.008,
          longitudeDelta:
            0.008,
        });

        setLocationState('ready');

        return;

      } catch (error: any) {

        console.log(
          'Erro ao obter posição atual:',
          error?.message || error
        );

      }

      // ========================================================
      // SEGUNDA TENTATIVA
      // ========================================================

      try {

        const current =
          await Location.getCurrentPositionAsync({
            accuracy:
              Location.Accuracy.Lowest,
            mayShowUserSettingsDialog:
              true,
          });

        const {
          latitude,
          longitude,
        } = current.coords;

        setLocation({
          latitude,
          longitude,
          latitudeDelta:
            0.008,
          longitudeDelta:
            0.008,
        });

        setLocationState('ready');

        return;

      } catch (error: any) {

        console.log(
          'Erro na segunda tentativa:',
          error?.message || error
        );

      }

      setLocationState('services');

    } catch (error: any) {

      console.log(
        'ERRO GERAL DE LOCALIZAÇÃO:',
        error?.message || error
      );

      setLocationState('error');

    }
  }

  // ============================================================
  // ENVIO DO ALERTA POR SMS
  // ============================================================

  async function enviarAlertaPorSMS() {

    if (enviandoSMS) {
      return;
    }

    if (cancelado) {
      return;
    }

    if (!location) {

      Alert.alert(
        'Localização indisponível',
        'Aguarde a localização ser obtida antes de enviar o alerta.'
      );

      return;
    }

    if (contatos.length === 0) {

      Alert.alert(
        'Nenhum contato',
        'Cadastre pelo menos um contato de emergência antes de enviar o alerta.'
      );

      return;
    }

    try {

      setEnviandoSMS(true);
      setStatusEnvio('sending');

      // ========================================================
      // VERIFICAR SUPORTE A SMS
      // ========================================================

      const smsAvailable =
        await SMS.isAvailableAsync();

      if (!smsAvailable) {

        Alert.alert(
          'SMS indisponível',
          'Este aparelho não possui suporte ao envio de SMS.'
        );

        setStatusEnvio('waiting');

        return;
      }

      // ========================================================
      // LOCALIZAÇÃO
      // ========================================================

      const latitude =
        location.latitude;

      const longitude =
        location.longitude;

      const mapa =
        `https://maps.google.com/?q=${latitude},${longitude}`;

      // ========================================================
      // MENSAGEM
      // ========================================================

      const mensagem =
        'ALERTA DE EMERGÊNCIA SPIE\n\n' +
        'Uma pessoa acionou um pedido de ajuda.\n\n' +
        'Localização atual:\n' +
        mapa +
        '\n\n' +
        'Entre em contato com ela o mais rápido possível.';

      // ========================================================
      // TELEFONES
      // ========================================================

      const telefones =
        contatos
          .map(
            (contato) =>
              contato.phone.trim()
          )
          .filter(
            (telefone) =>
              telefone.length > 0
          );

      if (telefones.length === 0) {

        Alert.alert(
          'Telefones inválidos',
          'Nenhum contato possui um número de telefone válido.'
        );

        setStatusEnvio('waiting');

        return;
      }

      console.log(
        'Preparando SMS para:',
        telefones
      );

      // ========================================================
      // ABRIR APLICATIVO DE SMS
      // ========================================================

      const resultado =
        await SMS.sendSMSAsync(
          telefones,
          mensagem
        );

      console.log(
        'Resultado do SMS:',
        resultado
      );

      // ========================================================
      // SUCESSO
      // ========================================================

      setSmsEnviado(true);
      setStatusEnvio('sent');

      Alert.alert(
        'Alerta preparado',
        'O aplicativo de mensagens foi aberto com os contatos e a mensagem de emergência preenchidos.'
      );

    } catch (error) {

      console.log(
        'Erro ao preparar SMS:',
        error
      );

      setStatusEnvio('waiting');

      Alert.alert(
        'Erro',
        'Não foi possível abrir o envio de SMS.'
      );

    } finally {

      setEnviandoSMS(false);

    }
  }

  // ============================================================
  // ENVIO AUTOMÁTICO
  // ============================================================

  useEffect(() => {

    if (
      !location ||
      contatos.length === 0 ||
      smsEnviado ||
      cancelado
    ) {
      return;
    }

    enviarAlertaPorSMS();

  }, [
    location,
    contatos.length,
    smsEnviado,
    cancelado,
  ]);

  // ============================================================
  // STATUS VISUAL
  // ============================================================

  function getStatus(
    status: ContactStatus
  ) {

    switch (status) {

      case 'sending':

        return {
          icon:
            'paper-plane-outline' as const,

          text:
            enviandoSMS
              ? 'Abrindo envio por SMS'
              : 'Preparando alerta',

          color:
            SAFE_GOLD,

          background:
            SAFE_GOLD_SOFT,
        };

      case 'sent':

        return {
          icon:
            'checkmark-circle-outline' as const,

          text:
            smsEnviado
              ? 'Alerta preparado por SMS'
              : 'Alerta preparado',

          color:
            SAFE_TEAL,

          background:
            SAFE_TEAL_SOFT,
        };

      case 'received':

        return {
          icon:
            'checkmark-done-circle-outline' as const,

          text:
            'Mensagem recebida',

          color:
            SAFE_TEAL,

          background:
            SAFE_TEAL_SOFT,
        };

      default:

        return {
          icon:
            'time-outline' as const,

          text:
            'Aguardando envio',

          color:
            SAFE_TEXT_MUTED,

          background:
            SAFE_SURFACE_ALT,
        };
    }
  }

  const status =
    getStatus(statusEnvio);

  // ============================================================
  // ABRIR CONFIGURAÇÕES
  // ============================================================

  async function abrirConfiguracoes() {

    try {

      await Linking.openSettings();

    } catch (error) {

      console.log(
        'Não foi possível abrir as configurações:',
        error
      );

    }
  }

  // ============================================================
  // CONTAGEM REGRESSIVA DO BOTÃO DE CANCELAR
  // ============================================================

  function iniciarContagem() {

    setContagem(3);

    Animated.timing(
      cancelFill,
      {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }
    ).start();

    let restante = 3;

    countdownRef.current =
      setInterval(() => {

        restante -= 1;

        if (restante <= 0) {

          if (countdownRef.current) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
          }

          setContagem(0);

        } else {

          setContagem(restante);

        }

      }, 1000);

  }

  function pararContagem() {

    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }

    setContagem(null);

    Animated.timing(
      cancelFill,
      {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }
    ).start();

  }

  // ============================================================
  // CANCELAR ALERTA
  // ============================================================

  function cancelarAlerta() {

    pararContagem();

    Alert.alert(
      'Desativar alerta',
      'Tem certeza de que deseja desativar o alerta de emergência?',
      [
        {
          text:
            'Continuar alerta',

          style:
            'cancel',
        },

        {
          text:
            'Desativar',

          style:
            'destructive',

          onPress:
            () => {

              setCancelado(true);
              setStatusEnvio('waiting');

              setTimeout(() => {

                router.replace(
                  '/(tabs)/calendar'
                );

              }, 700);

            },
        },
      ]
    );
  }

  // ============================================================
  // RENDERIZA LOCALIZAÇÃO
  // ============================================================

  function renderLocation() {

    // ==========================================================
    // CARREGANDO
    // ==========================================================

    if (
      locationState === 'loading'
    ) {

      return (
        <View
          style={[
            styles.locationState,
            {
              minHeight: 150,
              paddingVertical: 16,
            },
          ]}
        >

          <View
            style={
              styles.locationLoadingIcon
            }
          >

            <ActivityIndicator
              size="small"
              color={SAFE_ROSE}
            />

          </View>

          <Text
            style={
              styles.locationStateTitle
            }
          >
            Obtendo sua localização
          </Text>

          <Text
            style={
              styles.locationStateText
            }
          >
            Identificando sua posição atual...
          </Text>

        </View>
      );
    }

    // ==========================================================
    // PERMISSÃO
    // ==========================================================

    if (
      locationState === 'permission'
    ) {

      return (
        <View
          style={[
            styles.locationState,
            {
              minHeight: 150,
              paddingVertical: 16,
            },
          ]}
        >

          <View
            style={[
              styles.locationStateIcon,
              {
                backgroundColor:
                  SAFE_GOLD_SOFT,
              },
            ]}
          >

            <Ionicons
              name="shield-checkmark-outline"
              size={25}
              color={SAFE_GOLD}
            />

          </View>

          <Text
            style={
              styles.locationStateTitle
            }
          >
            Permissão necessária
          </Text>

          <Text
            style={
              styles.locationStateText
            }
          >
            O SPIE precisa da sua permissão para acessar a localização atual do aparelho.
          </Text>

          <TouchableOpacity
            style={
              styles.retryButton
            }
            activeOpacity={0.8}
            onPress={
              obterLocalizacao
            }
          >

            <Ionicons
              name="location-outline"
              size={16}
              color={SAFE_TEXT}
            />

            <Text
              style={
                styles.retryButtonText
              }
            >
              Permitir localização
            </Text>

          </TouchableOpacity>

        </View>
      );
    }

    // ==========================================================
    // SERVIÇOS
    // ==========================================================

    if (
      locationState === 'services'
    ) {

      return (
        <View
          style={[
            styles.locationState,
            {
              minHeight: 150,
              paddingVertical: 14,
            },
          ]}
        >

          <View
            style={[
              styles.locationStateIcon,
              {
                backgroundColor:
                  SAFE_ROSE_SOFT,
              },
            ]}
          >

            <Ionicons
              name="location-outline"
              size={25}
              color={SAFE_ROSE}
            />

          </View>

          <Text
            style={
              styles.locationStateTitle
            }
          >
            Não foi possível localizar você
          </Text>

          <Text
            style={
              styles.locationStateText
            }
          >
            O aparelho não conseguiu fornecer uma localização neste momento. Verifique as configurações de localização e tente novamente.
          </Text>

          <TouchableOpacity
            style={
              styles.retryButton
            }
            activeOpacity={0.8}
            onPress={
              abrirConfiguracoes
            }
          >

            <Ionicons
              name="settings-outline"
              size={16}
              color={SAFE_TEXT}
            />

            <Text
              style={
                styles.retryButtonText
              }
            >
              Abrir configurações
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={
              styles.secondaryRetryButton
            }
            activeOpacity={0.7}
            onPress={
              obterLocalizacao
            }
          >

            <Ionicons
              name="refresh-outline"
              size={15}
              color={SAFE_LAVENDER}
            />

            <Text
              style={
                styles.secondaryRetryText
              }
            >
              Tentar novamente
            </Text>

          </TouchableOpacity>

        </View>
      );
    }

    // ==========================================================
    // ERRO
    // ==========================================================

    if (
      locationState === 'error'
    ) {

      return (
        <View
          style={[
            styles.locationState,
            {
              minHeight: 150,
              paddingVertical: 16,
            },
          ]}
        >

          <View
            style={[
              styles.locationStateIcon,
              {
                backgroundColor:
                  SAFE_DANGER_SOFT,
              },
            ]}
          >

            <Ionicons
              name="alert-circle-outline"
              size={25}
              color={SAFE_DANGER}
            />

          </View>

          <Text
            style={
              styles.locationStateTitle
            }
          >
            Não foi possível obter sua localização
          </Text>

          <Text
            style={
              styles.locationStateText
            }
          >
            Ocorreu um problema ao acessar a localização. Tente novamente.
          </Text>

          <TouchableOpacity
            style={
              styles.retryButton
            }
            activeOpacity={0.8}
            onPress={
              obterLocalizacao
            }
          >

            <Ionicons
              name="refresh-outline"
              size={16}
              color={SAFE_TEXT}
            />

            <Text
              style={
                styles.retryButtonText
              }
            >
              Tentar novamente
            </Text>

          </TouchableOpacity>

        </View>
      );
    }

    // ==========================================================
    // MAPA
    // ==========================================================

    if (location) {

      return (
        <View
          style={
            styles.mapWrapper
          }
        >

          <MapView
            style={
              styles.map
            }
            region={
              location
            }
            showsUserLocation
            showsMyLocationButton={false}
            showsCompass={false}
            toolbarEnabled={false}
            rotateEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            zoomEnabled={false}
          >

            <Marker
              coordinate={{
                latitude:
                  location.latitude,

                longitude:
                  location.longitude,
              }}

              title="Você está aqui"

              description="Sua localização atual"
            />

          </MapView>

          <View
            style={
              styles.locationBadge
            }
          >

            <View
              style={
                styles.locationBadgeDot
              }
            />

            <Text
              style={
                styles.locationBadgeText
              }
            >
              Localização atual
            </Text>

          </View>

          <TouchableOpacity
            style={
              styles.refreshLocationButton
            }
            activeOpacity={0.8}
            onPress={
              obterLocalizacao
            }
          >

            <Ionicons
              name="locate-outline"
              size={19}
              color={SAFE_TEXT}
            />

          </TouchableOpacity>

        </View>
      );
    }

    return null;
  }

  // ============================================================
  // TELA
  // ============================================================

  return (

    <SafeAreaView
      style={
        styles.container
      }

      edges={[
        'top',
        'left',
        'right',
      ]}
    >

      {/* ======================================================
          TOPO
      ====================================================== */}

      <View
        style={
          styles.topBar
        }
      >

        <TouchableOpacity
          style={
            styles.backButton
          }
          activeOpacity={0.7}
          onPress={() =>
            router.back()
          }
        >

          <Ionicons
            name="chevron-back"
            size={22}
            color={SAFE_TEXT}
          />

        </TouchableOpacity>

        <Text
          style={
            styles.pageTitle
          }
        >
          ALERTA DE EMERGÊNCIA
        </Text>

        <View
          style={
            styles.topBarSpacer
          }
        />

      </View>

      <View
        style={
          styles.headerDivider
        }
      />

      {/* ======================================================
          CONTEÚDO
      ====================================================== */}

      <ScrollView
        style={{
          flex: 1,
        }}

        showsVerticalScrollIndicator={false}

        keyboardShouldPersistTaps="handled"

        contentContainerStyle={
          styles.scroll
        }
      >

        {/* ====================================================
            MENSAGEM DE EMERGÊNCIA
        ==================================================== */}

        <TouchableOpacity
          activeOpacity={0.8}

          onPress={() =>
            router.push(
              '/security/message'
            )
          }

          style={{
            marginBottom: 20,
          }}
        >

          <View
            style={{
              minHeight: 68,
              borderRadius: 18,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 15,

              backgroundColor:
                cycleColors.surface,

              borderWidth: 1,

              borderColor:
                cycleColors.divider,

              elevation: 2,

              shadowColor:
                '#000000',

              shadowOffset: {
                width: 0,
                height: 2,
              },

              shadowOpacity: 0.06,

              shadowRadius: 5,
            }}
          >

            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 13,

                backgroundColor:
                  SAFE_LAVENDER_SOFT,

                alignItems: 'center',
                justifyContent: 'center',
              }}
            >

              <Ionicons
                name="chatbubble-ellipses-outline"
                size={20}
                color={SAFE_LAVENDER}
              />

            </View>

            <View
              style={{
                flex: 1,
                marginLeft: 12,
              }}
            >

              <Text
                style={{
                  color:
                    SAFE_TEXT,

                  fontSize: 13,
                  fontWeight: '800',
                }}
              >
                Ver mensagem de emergência
              </Text>

              <Text
                style={{
                  color:
                    SAFE_TEXT_MUTED,

                  fontSize: 11,
                  marginTop: 3,
                  lineHeight: 16,
                }}
              >
                Confira a mensagem que será enviada aos contatos
              </Text>

            </View>

            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,

                backgroundColor:
                  SAFE_SURFACE_ALT,

                alignItems: 'center',
                justifyContent: 'center',
              }}
            >

              <Ionicons
                name="chevron-forward"
                size={17}
                color={SAFE_TEXT_MUTED}
              />

            </View>

          </View>

        </TouchableOpacity>

        {/* ====================================================
            LOCALIZAÇÃO
        ==================================================== */}

        <View
          style={
            styles.sectionHeader
          }
        >

          <View
            style={
              styles.sectionHeaderContent
            }
          >

            <Text
              style={
                styles.sectionLabel
              }
            >
              SUA LOCALIZAÇÃO
            </Text>

            <Text
              style={
                styles.sectionDescription
              }
            >
              Posição atual do seu aparelho
            </Text>

          </View>

          {locationState === 'ready' && (

            <View
              style={
                styles.readyIndicator
              }
            >

              <View
                style={
                  styles.readyDot
                }
              />

              <Text
                style={
                  styles.readyText
                }
              >
                Ativa
              </Text>

            </View>

          )}

        </View>

        <View
          style={
            styles.mapCard
          }
        >

          {renderLocation()}

        </View>

        {/* ====================================================
            STATUS
        ==================================================== */}

        <View
          style={
            styles.alertStatus
          }
        >

          <View
            style={[
              styles.alertStatusIcon,
              {
                backgroundColor:
                  status.background,
              },
            ]}
          >

            <Ionicons
              name={
                status.icon
              }

              size={19}

              color={
                status.color
              }
            />

          </View>

          <View
            style={
              styles.alertStatusContent
            }
          >

            <Text
              style={
                styles.alertStatusLabel
              }
            >
              STATUS DO ENVIO
            </Text>

            <Text
              style={[
                styles.alertStatusText,
                {
                  color:
                    status.color,
                },
              ]}
            >
              {status.text}
            </Text>

          </View>

          <View
            style={[
              styles.statusIndicator,
              {
                backgroundColor:
                  status.color,
              },
            ]}
          />

        </View>

        {/* ====================================================
            BOTÃO SMS
        ==================================================== */}

        {location &&
          contatos.length > 0 &&
          !cancelado && (

            <TouchableOpacity
              activeOpacity={0.85}

              onPress={
                enviarAlertaPorSMS
              }

              disabled={
                enviandoSMS
              }
            >

              <View
                style={{
                  marginBottom: 20,
                  minHeight: 50,
                  borderRadius: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 20,

                  backgroundColor:
                    SAFE_ROSE,
                }}
              >

                {enviandoSMS ? (

                  <ActivityIndicator
                    size="small"
                    color="#FFFFFF"
                  />

                ) : (

                  <Ionicons
                    name="chatbubble-ellipses-outline"
                    size={19}
                    color="#FFFFFF"
                  />

                )}

                <Text
                  style={{
                    marginLeft: 8,
                    color: '#FFFFFF',
                    fontSize: 14,
                    fontWeight: '700',
                  }}
                >
                  {enviandoSMS
                    ? 'Abrindo SMS...'
                    : 'Enviar alerta por SMS'}
                </Text>

              </View>

            </TouchableOpacity>

          )}

        {/* ====================================================
            CONTATOS
        ==================================================== */}

        <View
          style={
            styles.sectionHeader
          }
        >

          <View
            style={
              styles.sectionHeaderContent
            }
          >

            <Text
              style={
                styles.sectionLabel
              }
            >
              CONTATOS DE EMERGÊNCIA
            </Text>

            <Text
              style={
                styles.sectionDescription
              }
            >
              Pessoas que receberão o alerta
            </Text>

          </View>

          <TouchableOpacity
            activeOpacity={0.7}

            onPress={() =>
              router.push(
                '/security/contacts'
              )
            }
          >

            <Text
              style={
                styles.manageText
              }
            >
              Gerenciar
            </Text>

          </TouchableOpacity>

        </View>

        {/* ====================================================
            SEM CONTATOS
        ==================================================== */}

        {contatos.length === 0 ? (

          <View
            style={
              styles.emptyContacts
            }
          >

            <View
              style={
                styles.emptyIcon
              }
            >

              <Ionicons
                name="people-outline"
                size={27}
                color={SAFE_LAVENDER}
              />

            </View>

            <Text
              style={
                styles.emptyTitle
              }
            >
              Nenhum contato cadastrado
            </Text>

            <Text
              style={
                styles.emptyDescription
              }
            >
              Você ainda não possui contatos de emergência. Adicione pelo menos uma pessoa para receber seus alertas.
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}

              onPress={() =>
                router.push(
                  '/security/contacts/add'
                )
              }
            >

              <View
                style={
                  styles.addContactButton
                }
              >

                <Ionicons
                  name="add"
                  size={18}
                  color="#FFFFFF"
                />

                <Text
                  style={
                    styles.addContactText
                  }
                >
                  Adicionar contato
                </Text>

              </View>

            </TouchableOpacity>

          </View>

        ) : (

          <View
            style={
              styles.contactsCard
            }
          >

            {contatos.map(
              (
                contact,
                index
              ) => (

                <View
                  key={
                    contact.id
                  }

                  style={[
                    styles.contact,

                    index ===
                      contatos.length - 1 &&
                      styles.contactLast,
                  ]}
                >

                  <View
                    style={
                      styles.contactAvatar
                    }
                  >

                    <Ionicons
                      name="person-outline"
                      size={19}
                      color={SAFE_ROSE}
                    />

                  </View>

                  <View
                    style={
                      styles.contactInfo
                    }
                  >

                    <Text
                      style={
                        styles.contactName
                      }
                    >
                      {contact.name}
                    </Text>

                    <Text
                      style={
                        styles.contactPhone
                      }
                    >
                      {contact.phone}
                    </Text>

                    <View
                      style={[
                        styles.contactStatus,
                        {
                          backgroundColor:
                            status.background,
                        },
                      ]}
                    >

                      <Ionicons
                        name={
                          status.icon
                        }

                        size={12}

                        color={
                          status.color
                        }
                      />

                      <Text
                        style={[
                          styles.contactStatusText,
                          {
                            color:
                              status.color,
                          },
                        ]}
                      >
                        {status.text}
                      </Text>

                    </View>

                  </View>

                  <TouchableOpacity
                    style={
                      styles.contactEdit
                    }

                    activeOpacity={0.7}

                    onPress={() =>
                      router.push(
                        '/security/contacts'
                      )
                    }
                  >

                    <Ionicons
                      name="ellipsis-horizontal"
                      size={19}
                      color={
                        SAFE_TEXT_MUTED
                      }
                    />

                  </TouchableOpacity>

                </View>

              )
            )}

            <TouchableOpacity
              style={
                styles.addAnother
              }

              activeOpacity={0.7}

              onPress={() =>
                router.push(
                  '/security/contacts/add'
                )
              }
            >

              <Ionicons
                name="add-circle-outline"
                size={18}
                color={SAFE_LAVENDER}
              />

              <Text
                style={
                  styles.addAnotherText
                }
              >
                Adicionar outro contato
              </Text>

            </TouchableOpacity>

          </View>

        )}

        {/* ====================================================
            CANCELAR / DESATIVAR
        ==================================================== */}

        {!cancelado ? (

          <View
            style={
              styles.cancelArea
            }
          >

            <View
              style={
                styles.cancelWarning
              }
            >

              <Ionicons
                name="warning"
                size={18}
                color={SAFE_DANGER}
              />

              <Text
                style={[
                  styles.cancelWarningText,
                  { color: SAFE_DANGER },
                ]}
              >
                ATENÇÃO
              </Text>

            </View>

            <Text
              style={
                styles.cancelDescription
              }
            >
              Se o alerta foi acionado por engano, segure o botão abaixo por 3 segundos para desativá-lo.
            </Text>

            <TouchableOpacity
              delayLongPress={3000}

              onLongPress={
                cancelarAlerta
              }

              onPressIn={
                iniciarContagem
              }

              onPressOut={
                pararContagem
              }

              activeOpacity={0.85}

              style={
                styles.cancelButtonWrapper
              }
            >

              <Animated.View
                style={{
                  transform: [
                    {
                      scale:
                        cancelPulse,
                    },
                  ],
                }}
              >

                <View
                  style={
                    styles.cancelButton
                  }
                >

                  <Animated.View
                    pointerEvents="none"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(255,255,255,0.28)',
                      width: cancelFill.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      }),
                    }}
                  />

                  <View
                    style={
                      styles.cancelButtonIcon
                    }
                  >

                    {contagem !== null ? (

                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 16,
                          fontWeight: '900',
                        }}
                      >
                        {contagem}
                      </Text>

                    ) : (

                      <Ionicons
                        name="close-circle"
                        size={23}
                        color="#FFFFFF"
                      />

                    )}

                  </View>

                  <View
                    style={
                      styles.cancelButtonContent
                    }
                  >

                    <Text
                      style={
                        styles.cancelText
                      }
                    >
                      SEGURE PARA DESATIVAR
                    </Text>

                    <Text
                      style={
                        styles.cancelSub
                      }
                    >
                      {contagem !== null
                        ? 'continue segurando...'
                        : 'mantenha pressionado por 3 segundos'}
                    </Text>

                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="rgba(255,255,255,0.75)"
                  />

                </View>

              </Animated.View>

            </TouchableOpacity>

          </View>

        ) : (

          <View
            style={
              styles.cancelled
            }
          >

            <View
              style={
                styles.cancelledIcon
              }
            >

              <Ionicons
                name="checkmark"
                size={24}
                color={SAFE_TEAL}
              />

            </View>

            <Text
              style={
                styles.cancelledTitle
              }
            >
              Alerta desativado
            </Text>

            <Text
              style={
                styles.cancelledDescription
              }
            >
              O alerta de emergência foi desativado.
            </Text>

          </View>

        )}

      </ScrollView>

    </SafeAreaView>
  );
}