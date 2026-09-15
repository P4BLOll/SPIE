import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { cycleColors } from '@/styles/calendar.styles';
import { auth } from '@/services/firebaseConfig';
import { DEFAULT_PIN, pinAuthService } from '@/modules/security-vault/services/pinAuthService';
import { getTutorialStorageKey } from '@/components/AppTutorial';

export const getSecretPinNoticeKey = (uid?: string | null) => {
  const userId = uid || auth.currentUser?.uid;
  return userId ? `@spie_secret_pin_first_notice_seen_${userId}` : '@spie_secret_pin_first_notice_seen';
};

interface SecretPinFirstAccessModalProps {
  forcarExibicao?: boolean;
}

export function SecretPinFirstAccessModal({ forcarExibicao = false }: SecretPinFirstAccessModalProps) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function verificarAviso() {
      try {
        if (forcarExibicao) {
          setVisivel(true);
          return;
        }

        const uid = auth.currentUser?.uid;
        const noticeKey = getSecretPinNoticeKey(uid);
        const jaVisto = await AsyncStorage.getItem(noticeKey);
        if (jaVisto === 'true') {
          return;
        }

        const isDefault = await pinAuthService.isDefaultPin(uid);
        if (!isDefault) {
          return;
        }

        // Se o tutorial inicial ainda não foi concluído, aguarda 2.5s para não colidir
        const tutorialKey = getTutorialStorageKey(uid);
        const tutorialVisto = await AsyncStorage.getItem(tutorialKey);
        const delay = tutorialVisto === 'true' ? 600 : 2500;

        setTimeout(async () => {
          if (!ativo) return;
          const statusAtual = await AsyncStorage.getItem(noticeKey);
          if (statusAtual !== 'true') {
            setVisivel(true);
          }
        }, delay);
      } catch (error) {
        console.warn('[SecretPinFirstAccessModal] Erro ao verificar status:', error);
      }
    }

    verificarAviso();

    return () => {
      ativo = false;
    };
  }, [forcarExibicao]);

  async function fecharAviso(irParaAlterar = false) {
    try {
      const uid = auth.currentUser?.uid;
      await AsyncStorage.setItem(getSecretPinNoticeKey(uid), 'true');
    } catch (e) {
      console.warn('[SecretPinFirstAccessModal] Erro ao salvar status:', e);
    } finally {
      setVisivel(false);
      if (irParaAlterar) {
        router.push('/security/change-pin');
      }
    }
  }

  if (!visivel) {
    return null;
  }

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="fade"
      onRequestClose={() => fecharAviso(false)}
    >
      <View style={modalStyles.overlay}>
        <View style={modalStyles.card}>
          {/* Ícone de Escudo / Cadeado */}
          <View style={modalStyles.iconContainer}>
            <View style={modalStyles.iconRing}>
              <Ionicons name="shield-checkmark" size={36} color={cycleColors.rose} />
            </View>
          </View>

          {/* Título */}
          <Text style={modalStyles.title}>Secret Security Vault</Text>

          {/* Descrição */}
          <Text style={modalStyles.description}>
            To ensure your safety and privacy, SPIE includes a Secret Vault dedicated to emergency contacts and SOS alert history.
          </Text>

          {/* Box de Destaque da Senha Inicial */}
          <View style={modalStyles.pinBox}>
            <View style={modalStyles.pinHeader}>
              <Ionicons name="key" size={14} color={cycleColors.gold} />
              <Text style={modalStyles.pinLabel}>YOUR DEFAULT INITIAL PIN</Text>
            </View>

            <Text style={modalStyles.pinNumber}>{DEFAULT_PIN.split('').join('  ')}</Text>

            <Text style={modalStyles.pinHint}>
              Use this PIN to access the Secret Vault or change it to your preferred 4-digit PIN.
            </Text>
          </View>

          {/* Botões de Ação */}
          <TouchableOpacity
            style={modalStyles.primaryButton}
            activeOpacity={0.8}
            onPress={() => fecharAviso(true)}
          >
            <Ionicons name="create-outline" size={18} color="#FFFFFF" />
            <Text style={modalStyles.primaryButtonText}>Change PIN Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={modalStyles.secondaryButton}
            activeOpacity={0.7}
            onPress={() => fecharAviso(false)}
          >
            <Text style={modalStyles.secondaryButtonText}>
              Got it, keep {DEFAULT_PIN}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 3, 10, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: cycleColors.surface,
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
  },
  iconContainer: {
    marginBottom: 16,
  },
  iconRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 92, 141, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: cycleColors.rose,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: cycleColors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 18,
  },
  pinBox: {
    width: '100%',
    backgroundColor: cycleColors.surfaceAlt,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  pinHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  pinLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: cycleColors.gold,
    letterSpacing: 1.2,
  },
  pinNumber: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 6,
    marginVertical: 4,
  },
  pinHint: {
    fontSize: 12,
    color: cycleColors.textMuted,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: cycleColors.rose,
    borderRadius: 18,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 10,
    elevation: 4,
    shadowColor: cycleColors.rose,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  secondaryButtonText: {
    color: cycleColors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
});
