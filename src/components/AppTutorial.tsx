import React, { useEffect, useState } from 'react';

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/services/firebaseConfig';

import { Ionicons } from '@expo/vector-icons';
import { cycleColors } from '@/styles/calendar.styles';

export const TUTORIAL_KEY = '@spie_tutorial_do_not_show_again';

export function getTutorialStorageKey(userId?: string | null): string {
  const uid = userId || auth.currentUser?.uid;
  return uid ? `@spie_tutorial_seen_${uid}` : TUTORIAL_KEY;
}

type TutorialItem = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
};

const tutorialItems: TutorialItem[] = [
  {
    icon: 'heart-outline',
    title: 'Welcome to SPIE',
    description:
      'SPIE was designed to help you track your menstrual cycle, log important symptoms, and access discrete security features in emergency situations.',
  },

  {
    icon: 'calendar-outline',
    title: 'Track your cycle',
    description:
      'On the calendar, you can log the first day of your period, set your cycle duration, and view forecasts for your upcoming phases.',
  },

  {
    icon: 'fitness-outline',
    title: 'Log how you feel',
    description:
      'Record symptoms, intensity, cervical fluid, notes, and mood each day. These entries help you understand your body throughout each cycle.',
  },

  {
    icon: 'analytics-outline',
    title: 'View smart insights',
    description:
      'Based on your logged data, track patterns and meaningful health insights in a simple, organized way.',
  },

  {
    icon: 'shield-checkmark-outline',
    title: 'Secret Vault & Security',
    description:
      'For your protection, SPIE operates in disguise. To open your emergency contacts and SOS history, press and hold the date at the top of the Calendar for 1.5 seconds (or access it via Profile). On first access, you will set your personal 4-digit PIN.',
  },

  {
    icon: 'checkmark-circle-outline',
    title: "You're all set!",
    description:
      "Now you're familiar with the core features of SPIE. Explore the app and track your health at your own pace.",
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

    async function verificarParaUsuario(uid?: string | null) {
      try {
        if (!ativo) return;

        // Explicit manual open (e.g. from Profile menu)
        if (visible === true) {
          setEtapa(0);
          setInternoVisible(true);
          return;
        }

        if (visible === false) {
          setInternoVisible(false);
          return;
        }

        const effectiveUid = uid !== undefined ? uid : auth.currentUser?.uid;
        const storageKey = getTutorialStorageKey(effectiveUid);
        const jaVistoLocal = await AsyncStorage.getItem(storageKey);

        if (!ativo) return;

        if (jaVistoLocal === 'true') {
          setInternoVisible(false);
          return;
        }

        // If user is authenticated, also check Firestore (in case user logged in on a new device)
        if (effectiveUid) {
          try {
            const userDoc = await getDoc(doc(db, 'users', effectiveUid));
            if (userDoc.exists() && userDoc.data()?.tutorialSeen === true) {
              await AsyncStorage.setItem(storageKey, 'true');
              if (ativo) setInternoVisible(false);
              return;
            }
          } catch (cloudErr) {
            console.warn('[AppTutorial] Warning checking Firestore tutorial status:', cloudErr);
          }
        }

        // New user has not seen the tutorial yet: show it!
        if (ativo) {
          setEtapa(0);
          setInternoVisible(true);
        }
      } catch (error) {
        console.error('Error checking tutorial preference:', error);
      }
    }

    if (visible !== undefined) {
      if (visible) {
        setEtapa(0);
        setInternoVisible(true);
      } else {
        setInternoVisible(false);
      }
      return;
    }

    // Subscribe to auth state so new accounts trigger the tutorial immediately
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      verificarParaUsuario(user?.uid);
    });

    return () => {
      ativo = false;
      unsubscribe();
    };
  }, [visible]);

  async function marcarComoVisto() {
    try {
      const uid = auth.currentUser?.uid;
      const storageKey = getTutorialStorageKey(uid);
      await AsyncStorage.setItem(storageKey, 'true');

      if (uid) {
        try {
          await updateDoc(doc(db, 'users', uid), {
            tutorialSeen: true,
            tutorialSeenAt: new Date().toISOString(),
          });
        } catch (cloudErr) {
          console.warn('[AppTutorial] Warning saving tutorial completion to Firestore:', cloudErr);
        }
      }
    } catch (err) {
      console.warn('[AppTutorial] Error saving tutorial completion:', err);
    }
  }

  function fecharTutorial() {
    setInternoVisible(false);
    setEtapa(0);
    onFinish?.();
  }

  async function finalizarTutorial() {
    await marcarComoVisto();
    fecharTutorial();
  }

  async function naoMostrarNovamente() {
    await marcarComoVisto();
    fecharTutorial();
  }

  function proximaEtapa() {
    if (etapa === tutorialItems.length - 1) {
      finalizarTutorial();
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
    finalizarTutorial();
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
                Skip
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
                  Previous
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
                    ? 'Get Started'
                    : 'Next'}
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
              Don't show again
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
            {etapa + 1} of {tutorialItems.length}
          </Text>
        </View>
      </View>
    </Modal>
  );
}