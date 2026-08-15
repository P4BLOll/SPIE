import React, { useEffect, useRef, useState } from 'react';

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

import { Ionicons } from '@expo/vector-icons';

import MapView, {
  Marker,
  Region,
} from 'react-native-maps';

import { LinearGradient } from 'expo-linear-gradient';

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

export default function EmergencyScreen() {
  const [location, setLocation] =
    useState<Region | null>(null);

  const [locationState, setLocationState] =
    useState<LocationState>('loading');

  const [contatos, setContatos] =
    useState<Contact[]>([]);

  const [cancelado, setCancelado] =
    useState(false);

  const [statusEnvio, setStatusEnvio] =
    useState<ContactStatus>('waiting');

  const cancelPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(cancelPulse, { toValue: 1.03, duration: 900, useNativeDriver: true }),
        Animated.timing(cancelPulse, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const currentUser = auth.currentUser;

  /*
   * ============================================================
   * CONTATOS
   * ============================================================
   */

  useEffect(() => {
    if (!currentUser) {
      setContatos([]);
      return;
    }

    const contactsRef = collection(
      db,
      'users',
      currentUser.uid,
      'emergency_contacts'
    );

    const unsubscribe = onSnapshot(
      contactsRef,
      (snapshot) => {
        const data: Contact[] = [];

        snapshot.forEach((doc) => {
          const contact = doc.data();

          data.push({
            id: doc.id,
            name: contact.name || 'Contato',
            phone: contact.phone || '',
          });
        });

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

    return () => unsubscribe();
  }, [currentUser?.uid]);

  /*
   * ============================================================
   * LOCALIZAÇÃO
   * ============================================================
   */

  useEffect(() => {
    obterLocalizacao();
  }, []);

  async function obterLocalizacao() {
    setLocationState('loading');

    try {
      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (permission.status !== 'granted') {
        setLocationState('permission');
        return;
      }

      const servicesEnabled =
        await Location.hasServicesEnabledAsync();

      if (!servicesEnabled) {
        setLocationState('services');
        return;
      }

      try {
        const last =
          await Location.getLastKnownPositionAsync({
            maxAge: 24 * 60 * 60 * 1000,
            requiredAccuracy: 10000,
          });

        if (last) {
          const { latitude, longitude } = last.coords;

          setLocation({
            latitude,
            longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          });

          setLocationState('ready');
        }
      } catch (error) {
        console.log('Erro na última localização:', error);
      }

      try {
        const current =
          await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
            mayShowUserSettingsDialog: true,
          });

        const { latitude, longitude } = current.coords;

        setLocation({
          latitude,
          longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        });

        setLocationState('ready');
        return;

      } catch (error: any) {
        console.log('Erro ao obter posição atual:', error?.message || error);
      }

      try {
        const current =
          await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Lowest,
            mayShowUserSettingsDialog: true,
          });

        const { latitude, longitude } = current.coords;

        setLocation({
          latitude,
          longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        });

        setLocationState('ready');
        return;

      } catch (error: any) {
        console.log('Erro na segunda tentativa:', error?.message || error);
      }

      if (!location) {
        setLocationState('services');
      }

    } catch (error: any) {
      console.log('ERRO GERAL DE LOCALIZAÇÃO:', error?.message || error);
      setLocationState('error');
    }
  }

  /*
   * ============================================================
   * STATUS DO ALERTA
   * ============================================================
   */

  useEffect(() => {
    if (contatos.length > 0 && location && !cancelado) {
      setStatusEnvio('sending');
    } else {
      setStatusEnvio('waiting');
    }
  }, [contatos.length, location, cancelado]);

  /*
   * ============================================================
   * CANCELAR ALERTA
   * ============================================================
   */

  function cancelarAlerta() {
    Alert.alert(
      'Desativar alerta',
      'Tem certeza de que deseja desativar o alerta de emergência?',
      [
        { text: 'Continuar alerta', style: 'cancel' },
        {
          text: 'Desativar',
          style: 'destructive',
          onPress: () => {
            setCancelado(true);
            setStatusEnvio('waiting');

            setTimeout(() => {
              router.replace('/(tabs)/calendar');
            }, 700);
          },
        },
      ]
    );
  }

  /*
   * ============================================================
   * STATUS
   * ============================================================
   */

  function getStatus(status: ContactStatus) {
    switch (status) {
      case 'sending':
        return {
          icon: 'paper-plane-outline' as const,
          text: 'Enviando mensagem',
          color: cycleColors.gold,
          background: cycleColors.goldSoft,
        };

      case 'sent':
        return {
          icon: 'checkmark-circle-outline' as const,
          text: 'Mensagem enviada',
          color: cycleColors.teal,
          background: cycleColors.tealSoft,
        };

      case 'received':
        return {
          icon: 'checkmark-done-circle-outline' as const,
          text: 'Mensagem recebida',
          color: cycleColors.teal,
          background: cycleColors.tealSoft,
        };

      default:
        return {
          icon: 'time-outline' as const,
          text: 'Aguardando envio',
          color: cycleColors.textMuted,
          background: cycleColors.surfaceAlt,
        };
    }
  }

  const status = getStatus(statusEnvio);

  /*
   * ============================================================
   * CONFIGURAÇÕES
   * ============================================================
   */

  async function abrirConfiguracoes() {
    try {
      await Linking.openSettings();
    } catch (error) {
      console.log('Não foi possível abrir as configurações:', error);
    }
  }

  /*
   * ============================================================
   * LOCALIZAÇÃO VISUAL
   * ============================================================
   */

  function renderLocation() {

    if (locationState === 'loading') {
      return (
        <View style={styles.locationState}>
          <View style={styles.locationLoadingIcon}>
            <ActivityIndicator size="small" color={cycleColors.rose} />
          </View>

          <Text style={styles.locationStateTitle}>
            Obtendo sua localização
          </Text>

          <Text style={styles.locationStateText}>
            Identificando sua posição atual...
          </Text>
        </View>
      );
    }

    if (locationState === 'permission') {
      return (
        <View style={styles.locationState}>
          <View style={[styles.locationStateIcon, { backgroundColor: cycleColors.goldSoft }]}>
            <Ionicons name="shield-checkmark-outline" size={27} color={cycleColors.gold} />
          </View>

          <Text style={styles.locationStateTitle}>
            Permissão necessária
          </Text>

          <Text style={styles.locationStateText}>
            O SPIE precisa da sua permissão para acessar a localização atual do aparelho.
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            activeOpacity={0.8}
            onPress={obterLocalizacao}
          >
            <Ionicons name="location-outline" size={17} color={cycleColors.text} />
            <Text style={styles.retryButtonText}>Permitir localização</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (locationState === 'services') {
      return (
        <View style={styles.locationState}>
          <View style={[styles.locationStateIcon, { backgroundColor: cycleColors.roseSoft }]}>
            <Ionicons name="location-outline" size={27} color={cycleColors.rose} />
          </View>

          <Text style={styles.locationStateTitle}>
            Não foi possível localizar você
          </Text>

          <Text style={styles.locationStateText}>
            O aparelho não conseguiu fornecer uma localização neste momento. Verifique as configurações de localização e tente novamente.
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            activeOpacity={0.8}
            onPress={abrirConfiguracoes}
          >
            <Ionicons name="settings-outline" size={17} color={cycleColors.text} />
            <Text style={styles.retryButtonText}>Abrir configurações</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryRetryButton}
            activeOpacity={0.7}
            onPress={obterLocalizacao}
          >
            <Ionicons name="refresh-outline" size={15} color={cycleColors.lavender} />
            <Text style={styles.secondaryRetryText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (locationState === 'error') {
      return (
        <View style={styles.locationState}>
          <View style={[styles.locationStateIcon, { backgroundColor: cycleColors.dangerSoft }]}>
            <Ionicons name="alert-circle-outline" size={27} color={cycleColors.danger} />
          </View>

          <Text style={styles.locationStateTitle}>
            Não foi possível obter sua localização
          </Text>

          <Text style={styles.locationStateText}>
            Ocorreu um problema ao acessar a localização. Tente novamente.
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            activeOpacity={0.8}
            onPress={obterLocalizacao}
          >
            <Ionicons name="refresh-outline" size={17} color={cycleColors.text} />
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (location) {
      return (
        <View style={styles.mapWrapper}>
          <MapView
            style={styles.map}
            region={location}
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
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title="Você está aqui"
              description="Sua localização atual"
            />
          </MapView>

          <View style={styles.locationBadge}>
            <View style={styles.locationBadgeDot} />
            <Text style={styles.locationBadgeText}>Localização atual</Text>
          </View>

          <TouchableOpacity
            style={styles.refreshLocationButton}
            activeOpacity={0.8}
            onPress={obterLocalizacao}
          >
            <Ionicons name="locate-outline" size={20} color={cycleColors.text} />
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  }

  /*
   * ============================================================
   * TELA
   * ============================================================
   */

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>

      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => router.replace('/(tabs)/calendar')}
        >
          <Ionicons name="chevron-back" size={22} color={cycleColors.text} />
        </TouchableOpacity>

        <Text style={styles.pageTitle}>ALERTA DE EMERGÊNCIA</Text>

        <View style={styles.topBarSpacer} />
      </View>

      <View style={styles.headerDivider} />

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scroll}
      >

        <View style={styles.alertIntro}>
          <View style={styles.alertIntroIcon}>
            <Ionicons name="warning-outline" size={23} color="#FFFFFF" />
          </View>

          <View style={styles.alertIntroContent}>
            <Text style={styles.alertIntroTitle}>
              Alerta de emergência ativo
            </Text>

            <Text style={styles.alertIntroText}>
              Sua localização está sendo preparada para o envio aos seus contatos.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeaderContent}>
            <Text style={styles.sectionLabel}>SUA LOCALIZAÇÃO</Text>
            <Text style={styles.sectionDescription}>Posição atual do seu aparelho</Text>
          </View>

          {locationState === 'ready' && (
            <View style={styles.readyIndicator}>
              <View style={styles.readyDot} />
              <Text style={styles.readyText}>Ativa</Text>
            </View>
          )}
        </View>

        <View style={styles.mapCard}>
          {renderLocation()}
        </View>

        {contatos.length > 0 && (
          <View style={styles.alertStatus}>
            <View style={[styles.alertStatusIcon, { backgroundColor: status.background }]}>
              <Ionicons name={status.icon} size={19} color={status.color} />
            </View>

            <View style={styles.alertStatusContent}>
              <Text style={styles.alertStatusLabel}>STATUS DO ENVIO</Text>
              <Text style={[styles.alertStatusText, { color: status.color }]}>
                {status.text}
              </Text>
            </View>

            <View style={[styles.statusIndicator, { backgroundColor: status.color }]} />
          </View>
        )}

        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeaderContent}>
            <Text style={styles.sectionLabel}>CONTATOS DE EMERGÊNCIA</Text>
            <Text style={styles.sectionDescription}>Pessoas que receberão o alerta</Text>
          </View>

          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/contacts')}>
            <Text style={styles.manageText}>Gerenciar</Text>
          </TouchableOpacity>
        </View>

        {contatos.length === 0 ? (

          <View style={styles.emptyContacts}>
            <View style={styles.emptyIcon}>
              <Ionicons name="people-outline" size={27} color={cycleColors.lavender} />
            </View>

            <Text style={styles.emptyTitle}>Nenhum contato cadastrado</Text>

            <Text style={styles.emptyDescription}>
              Você ainda não possui contatos de emergência. Adicione pelo menos uma pessoa para receber seus alertas.
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push('/contacts/add')}
            >
              <LinearGradient
                colors={[cycleColors.rose, cycleColors.lavender]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.addContactButton}
              >
                <Ionicons name="add" size={18} color="#FFFFFF" />
                <Text style={styles.addContactText}>Adicionar contato</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

        ) : (

          <View style={styles.contactsCard}>
            {contatos.map((contact, index) => (
              <View
                key={contact.id}
                style={[styles.contact, index === contatos.length - 1 && styles.contactLast]}
              >
                <View style={styles.contactAvatar}>
                  <Ionicons name="person-outline" size={19} color={cycleColors.rose} />
                </View>

                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactPhone}>{contact.phone}</Text>

                  <View style={[styles.contactStatus, { backgroundColor: status.background }]}>
                    <Ionicons name={status.icon} size={12} color={status.color} />
                    <Text style={[styles.contactStatusText, { color: status.color }]}>
                      {status.text}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.contactEdit}
                  activeOpacity={0.7}
                  onPress={() => router.push('/contacts')}
                >
                  <Ionicons name="ellipsis-horizontal" size={19} color={cycleColors.textMuted} />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              style={styles.addAnother}
              activeOpacity={0.7}
              onPress={() => router.push('/contacts/add')}
            >
              <Ionicons name="add-circle-outline" size={18} color={cycleColors.lavender} />
              <Text style={styles.addAnotherText}>Adicionar outro contato</Text>
            </TouchableOpacity>
          </View>
        )}

        {!cancelado ? (

          <View style={styles.cancelArea}>
            <View style={styles.cancelWarning}>
              <Ionicons name="warning" size={19} color={cycleColors.danger} />
              <Text style={styles.cancelWarningText}>ATENÇÃO</Text>
            </View>

            <Text style={styles.cancelDescription}>
              Se o alerta foi acionado por engano, segure o botão abaixo por 3 segundos para desativá-lo.
            </Text>

            <TouchableOpacity
              delayLongPress={3000}
              onLongPress={cancelarAlerta}
              activeOpacity={0.85}
              style={styles.cancelButtonWrapper}
            >
              <Animated.View style={{ transform: [{ scale: cancelPulse }] }}>
                <LinearGradient
                  colors={[cycleColors.danger, '#FF4B2B']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.cancelButton}
                >
                  <View style={styles.cancelButtonIcon}>
                    <Ionicons name="close-circle" size={30} color="#FFFFFF" />
                  </View>

                  <View style={styles.cancelButtonContent}>
                    <Text style={styles.cancelText}>SEGURE PARA DESATIVAR</Text>
                    <Text style={styles.cancelSub}>mantenha pressionado por 3 segundos</Text>
                  </View>

                  <Ionicons name="chevron-forward" size={21} color="rgba(255,255,255,0.75)" />
                </LinearGradient>
              </Animated.View>
            </TouchableOpacity>
          </View>

        ) : (

          <View style={styles.cancelled}>
            <View style={styles.cancelledIcon}>
              <Ionicons name="checkmark" size={24} color={cycleColors.teal} />
            </View>

            <Text style={styles.cancelledTitle}>Alerta desativado</Text>
            <Text style={styles.cancelledDescription}>
              O alerta de emergência foi desativado.
            </Text>
          </View>
        )}

      </ScrollView>

    </SafeAreaView>
  );
}