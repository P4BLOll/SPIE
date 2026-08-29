import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useBLE } from '../context/BLEContext';

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
            <Ionicons name="warning" size={56} color={Colors.white} />
          </View>

          <Text style={styles.alertTitle}>EMERGÊNCIA ATIVADA</Text>
          <Text style={styles.alertDescription}>
            Seus contatos de emergência e sua localização em tempo real foram acionados.
          </Text>

          <View style={styles.pulseIndicator}>
            <Text style={styles.pulseText}>🚨 Socorro e localização enviados aos contatos</Text>
          </View>

          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={desativarAlertaManual}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelButtonText}>DESATIVAR ALERTA</Text>
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
    padding: 28,
    alignItems: 'center',
    shadowColor: Colors.danger,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  pulseCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  alertTitle: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: 10,
  },
  alertDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  pulseIndicator: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
  },
  pulseText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  cancelButton: {
    width: '100%',
    backgroundColor: Colors.white,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: Colors.danger,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
});