import React from 'react';

import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '@/components/Background';
import { cycleColors } from '@/constants/Colors';
import { securityStyles as styles } from '@/styles/security.styles';

export default function VaultScreen() {
  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View
              style={[styles.headerIconRing, { backgroundColor: cycleColors.rose }]}
            >
              <Ionicons name="lock-closed" size={34} color="#FFFFFF" />
            </View>

            <Text style={styles.title}>Cofre Seguro</Text>
            <Text style={styles.subtitle}>Seus dados sensíveis protegidos.</Text>
          </View>

          <View style={styles.vaultCard}>
            <View style={styles.vaultItem}>
              <View style={[styles.vaultIconWrap, { backgroundColor: cycleColors.roseSoft }]}>
                <Ionicons name="medical-outline" size={22} color={cycleColors.rose} />
              </View>

              <View style={styles.vaultText}>
                <Text style={styles.cardTitle}>Informações médicas</Text>
                <Text style={styles.cardText}>
                  Dados importantes para situações de emergência.
                </Text>
              </View>
            </View>

            <View style={styles.vaultItem}>
              <View style={[styles.vaultIconWrap, { backgroundColor: cycleColors.lavenderSoft }]}>
                <Ionicons name="people-outline" size={22} color={cycleColors.lavender} />
              </View>

              <View style={styles.vaultText}>
                <Text style={styles.cardTitle}>Contatos de emergência</Text>
                <Text style={styles.cardText}>
                  Pessoas que podem receber alertas.
                </Text>
              </View>
            </View>

            <View style={[styles.vaultItem, styles.vaultItemLast]}>
              <View style={[styles.vaultIconWrap, { backgroundColor: cycleColors.tealSoft }]}>
                <Ionicons name="shield-checkmark-outline" size={22} color={cycleColors.teal} />
              </View>

              <View style={styles.vaultText}>
                <Text style={styles.cardTitle}>Proteção de dados</Text>
                <Text style={styles.cardText}>
                  Informações protegidas dentro do aplicativo.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
}