import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Background } from '../../components/Background';
import { Colors } from '../../constants/Colors';
import { useBLE } from '../../context/BLEContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function DeviceScreen() {
  const { status, conectarDispositivo, deviceConectado } = useBLE();

  // Verifica se o sistema está em processo de busca ou conexão
  const isConnecting = status === 'Buscando pulseira...' || status === 'Conectando...';
  const isConnected = status === 'Pulseira Conectada' && deviceConectado !== null;

  return (
    <Background style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meu Dispositivo</Text>
        <Text style={styles.subtitle}>Gerencie a conexão com a sua pulseira SPIE</Text>
      </View>

      {/* Card de Status Central */}
      <View style={[styles.statusCard, isConnected && styles.statusCardConnected]}>
        <Ionicons 
          name={isConnected ? "watch" : "watch-outline"} 
          size={64} 
          color={isConnected ? Colors.accent : Colors.textMuted} 
          style={styles.deviceIcon}
        />
        
        <Text style={styles.statusLabel}>Status do Hardware</Text>
        <Text style={[styles.statusValue, isConnected ? styles.textOk : styles.textError]}>
          {status}
        </Text>

        {isConnected && (
          <View style={styles.hardwareSpecs}>
            <Text style={styles.specText}>Nome: {deviceConectado?.name}</Text>
            <Text style={styles.specText}>ID: {deviceConectado?.id}</Text>
          </View>
        )}
      </View>

      {/* Painel de Controle / Botão de Ação */}
      <View style={styles.controlContainer}>
        {!isConnected ? (
          <TouchableOpacity 
            onPress={conectarDispositivo} 
            disabled={isConnecting}
            activeOpacity={0.8}
            style={styles.btnWrapper}
          >
            <LinearGradient
              colors={isConnecting ? [Colors.surface, Colors.surface] : [Colors.primary, Colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              {isConnecting ? (
                <View style={styles.row}>
                  <ActivityIndicator color={Colors.accent} style={{ marginRight: 10 }} />
                  <Text style={[styles.buttonText, { color: Colors.textMuted }]}>Sincronizando...</Text>
                </View>
              ) : (
                <View style={styles.row}>
                  <Ionicons name="bluetooth" size={20} color={Colors.text} style={{ marginRight: 8 }} />
                  <Text style={styles.buttonText}>Emparelhar Pulseira</Text>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View style={styles.connectedPanel}>
            <View style={styles.infoRow}>
              <Ionicons name="wifi" size={20} color={Colors.accent} />
              <Text style={styles.infoText}>Sinal de rádio BLE está estável</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="checkmark-circle" size={20} color="#00b37e" />
              <Text style={styles.infoText}>Monitoramento em segundo plano ativo</Text>
            </View>
          </View>
        )}
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    marginBottom: 32,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 4,
  },
  statusCard: {
    backgroundColor: Colors.surface,
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  statusCardConnected: {
    borderColor: 'rgba(0, 242, 254, 0.15)',
    borderWidth: 1,
  },
  deviceIcon: {
    marginBottom: 16,
  },
  statusLabel: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 6,
    textAlign: 'center',
  },
  textOk: {
    color: Colors.accent,
  },
  textError: {
    color: Colors.danger,
  },
  hardwareSpecs: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    width: '100%',
    alignItems: 'center',
  },
  specText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginTop: 2,
  },
  controlContainer: {
    width: '100%',
  },
  btnWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectedPanel: {
    backgroundColor: 'rgba(22, 31, 48, 0.5)',
    padding: 20,
    borderRadius: 12,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    color: Colors.text,
    fontSize: 14,
  },
});