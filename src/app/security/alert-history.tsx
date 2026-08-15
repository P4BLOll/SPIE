import React from 'react';

import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Background } from '@/components/Background';
import { cycleColors } from '@/constants/Colors';
import { securityStyles as styles } from '@/styles/security.styles';

export default function AlertHistory() {

  const alertas: { data: string; tipo: string; status: string }[] = [
    // Futuro Firebase:
    // {
    //   data:'23/07/2026',
    //   tipo:'SOS',
    //   status:'Enviado'
    // }
  ];

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>

          <LinearGradient
            colors={[cycleColors.rose, cycleColors.lavender]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerIconRing}
          >
            <Ionicons name="time" size={32} color="#FFFFFF" />
          </LinearGradient>

          <Text style={styles.title}>Histórico de Alertas</Text>
          <Text style={styles.subtitle}>
            Veja os momentos em que o sistema enviou alertas.
          </Text>
        </View>

        {alertas.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="shield-checkmark-outline" size={44} color={cycleColors.teal} />

            <Text style={styles.emptyTitle}>Nenhum alerta registrado</Text>

            <Text style={styles.cardText}>
              Quando um alerta SOS for enviado, ele aparecerá aqui.
            </Text>
          </View>
        ) : (
          alertas.map((alerta, index) => (
            <View key={index} style={styles.alertItem}>
              <View style={styles.alertIconWrap}>
                <Ionicons name="warning" size={20} color={cycleColors.danger} />
              </View>

              <View style={styles.alertInfo}>
                <Text style={styles.alertType}>{alerta.tipo}</Text>
                <Text style={styles.alertDate}>{alerta.data}</Text>
              </View>

              <Text style={styles.alertStatus}>{alerta.status}</Text>
            </View>
          ))
        )}
      </View>
    </Background>
  );
}