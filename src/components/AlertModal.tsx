import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useBLE } from '../context/BLEContext'; // 👈 Consome apenas os dados necessários

export function AlertModal() {
  const { alertaAtivo, desativarAlertaManual } = useBLE();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={alertaAtivo}
      onRequestClose={desativarAlertaManual}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.alertContainer}>
        <View style={styles.pulseCircle}>
        {/* 💡 Correção: 'warning' é o nome correto para o triângulo de alerta no Ionicons */}
        <Ionicons name="warning" size={64} color={Colors.white} />
        </View>
                
          <Text style={styles.alertTitle}>EMERGÊNCIA ATIVADA</Text>
          <Text style={styles.alertDescription}>
            Um sinal de socorro foi recebido através da sua pulseira SPIE. Seus contatos de emergência e sua localização estão sendo acionados.
          </Text>

          <View style={styles.pulseIndicator}>
            <Text style={styles.pulseText}>📳 Celular vibrando em modo de pânico</Text>
          </View>

          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={desativarAlertaManual}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelButtonText}>FALSO ALARME (DESATIVAR)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 17, 30, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  alertContainer: {
    width: '100%',
    backgroundColor: Colors.danger,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: Colors.danger,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 20,
  },
  pulseCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  alertTitle: {
    color: Colors.white,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 16,
  },
  alertDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  pulseIndicator: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 32,
  },
  pulseText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  cancelButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#0B111E',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});