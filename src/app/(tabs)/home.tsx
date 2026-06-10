import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Background } from '../../components/Background';
import { Colors } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useBLE } from '../../context/BLEContext'; // 👈 Consumindo o cérebro do Bluetooth

export default function HomeScreen() {
  const { status, alertaAtivo } = useBLE(); // 👈 Puxando os estados em tempo real
  
  function handleSOSTrigger() {
    Alert.alert(
      "EMERGÊNCIA ATIVADA",
      "O alerta de socorro foi enviado aos seus contatos de emergência e sua localização está sendo monitorada.",
      [{ text: "Entendido", style: "destructive" }]
    );
  }

  function handleSOSShortPress() {
    Alert.alert("Aviso", "Segure o botão SOS por 3 segundos para ativar o alarme.");
  }

  return (
    <Background style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.logoText}>SPIE</Text>
        <TouchableOpacity>
          <Ionicons 
            name={status === 'Pulseira Conectada' ? "bluetooth" : "bluetooth-outline"} 
            size={24} 
            color={status === 'Pulseira Conectada' ? Colors.accent : Colors.textMuted} 
          />
        </TouchableOpacity>
      </View>

      {/* Card Dinâmico: Muda de cor e texto se o ESP32 enviar o sinal de alerta */}
      <View style={[
        styles.statusCard, 
        alertaAtivo && { borderColor: Colors.danger, backgroundColor: 'rgba(255, 65, 108, 0.1)' }
      ]}>
        <View style={[styles.iconCircle, alertaAtivo && { backgroundColor: 'rgba(255, 65, 108, 0.15)' }]}>
          <Ionicons 
            name={alertaAtivo ? "alert-circle" : "shield-checkmark"} 
            size={28} 
            color={alertaAtivo ? Colors.danger : Colors.accent} 
          />
        </View>
        <View style={styles.statusInfo}>
          <Text style={styles.statusTitle}>
            {alertaAtivo ? "ALERTA DE EMERGÊNCIA" : "SISTEMA PROTEGIDO"}
          </Text>
          <Text style={styles.statusSubtitle}>
            {alertaAtivo ? "A pulseira enviou um sinal de socorro crítico!" : "Nenhuma ameaça detectada no momento."}
          </Text>
        </View>
      </View>

      <View style={styles.grid}>
        {/* Card Pulseira Dinâmico */}
        <View style={styles.miniCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="watch-outline" size={20} color={Colors.textMuted} />
            <Text style={styles.miniCardTitle}>Pulseira</Text>
          </View>
          <Text style={[styles.miniCardValue, { fontSize: 13 }]}>{status}</Text>
          <Text style={styles.miniCardSub}>Sinal de rádio BLE</Text>
        </View>

        {/* Card GPS */}
        <View style={styles.miniCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="location-outline" size={20} color={Colors.textMuted} />
            <Text style={styles.miniCardTitle}>Localização</Text>
          </View>
          <Text style={styles.miniCardValue}>GPS Ativo</Text>
          <Text style={styles.miniCardSub}>Monitorização pronta</Text>
        </View>
      </View>

      <View style={styles.sosContainer}>
        <Text style={styles.sosInstruction}>Segure o botão por 3 segundos em caso de perigo iminente</Text>
        
        <TouchableOpacity
          onPress={handleSOSShortPress}
          onLongPress={handleSOSTrigger}
          delayLongPress={3000}
          activeOpacity={0.8}
          style={styles.sosTouch}
        >
          <LinearGradient
            colors={[Colors.danger, '#B3113E']}
            style={styles.sosButton}
          >
            <Text style={styles.sosText}>BOTÃO SOS</Text>
            <Text style={styles.sosSubText}>(Segure por 3s)</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, paddingTop: Platform.OS === 'ios' ? 60 : 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 28 },
  logoText: { fontSize: 24, fontWeight: '900', color: Colors.text, letterSpacing: 2 },
  statusCard: { backgroundColor: Colors.surface, padding: 20, borderRadius: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: 'rgba(0, 242, 254, 0.1)' },
  iconCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(0, 242, 254, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  statusInfo: { flex: 1 },
  statusTitle: { color: Colors.text, fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  statusSubtitle: { color: Colors.textMuted, fontSize: 12, marginTop: 2 },
  grid: { flexDirection: 'row', justifyContent: 'space-between', gap: 14, marginBottom: 40 },
  miniCard: { flex: 1, backgroundColor: Colors.surface, padding: 16, borderRadius: 14 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  miniCardTitle: { color: Colors.textMuted, fontSize: 12, fontWeight: '500' },
  miniCardValue: { color: Colors.text, fontSize: 15, fontWeight: 'bold' },
  miniCardSub: { color: Colors.textMuted, fontSize: 11, marginTop: 4 },
  sosContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
  sosInstruction: { color: Colors.textMuted, textAlign: 'center', fontSize: 13, marginBottom: 24, paddingHorizontal: 20 },
  sosTouch: { width: 220, height: 220, borderRadius: 110, elevation: 15, shadowColor: Colors.danger, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16 },
  sosButton: { width: '100%', height: '100%', borderRadius: 110, justifyContent: 'center', alignItems: 'center' },
  sosText: { color: Colors.text, fontSize: 22, fontWeight: '900', letterSpacing: 1 },
  sosSubText: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4 },
});