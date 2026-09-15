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

            <Text style={styles.title}>Secure Vault</Text>
            <Text style={styles.subtitle}>Your sensitive data is protected.</Text>
          </View>

          <View style={styles.vaultCard}>
            <View style={styles.vaultItem}>
              <View style={[styles.vaultIconWrap, { backgroundColor: cycleColors.roseSoft }]}>
                <Ionicons name="medical-outline" size={22} color={cycleColors.rose} />
              </View>

              <View style={styles.vaultText}>
                <Text style={styles.cardTitle}>Medical Information</Text>
                <Text style={styles.cardText}>
                  Critical information for emergency situations.
                </Text>
              </View>
            </View>

            <View style={styles.vaultItem}>
              <View style={[styles.vaultIconWrap, { backgroundColor: cycleColors.lavenderSoft }]}>
                <Ionicons name="people-outline" size={22} color={cycleColors.lavender} />
              </View>

              <View style={styles.vaultText}>
                <Text style={styles.cardTitle}>Emergency Contacts</Text>
                <Text style={styles.cardText}>
                  People who can receive your alerts.
                </Text>
              </View>
            </View>

            <View style={[styles.vaultItem, styles.vaultItemLast]}>
              <View style={[styles.vaultIconWrap, { backgroundColor: cycleColors.tealSoft }]}>
                <Ionicons name="shield-checkmark-outline" size={22} color={cycleColors.teal} />
              </View>

              <View style={styles.vaultText}>
                <Text style={styles.cardTitle}>Data Protection</Text>
                <Text style={styles.cardText}>
                  Protected information stored securely within the app.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
}