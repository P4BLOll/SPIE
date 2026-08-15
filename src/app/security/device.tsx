import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Background } from '../../components/Background';
import { Colors } from '../../constants/Colors';
import { useBLE } from '../../context/BLEContext';
import { deviceStyles } from '../../styles/device.styles';

export default function DeviceScreen() {
  const {
    status,
    conectarDispositivo,
    deviceConectado,
  } = useBLE();

  const isConnecting =
    status === 'Buscando pulseira...' ||
    status === 'Conectando...';

  const isConnected =
    status === 'Pulseira Conectada' &&
    deviceConectado !== null;

  return (
    <Background style={deviceStyles.container}>
      <View style={deviceStyles.header}>
        <Text style={deviceStyles.title}>
          Meu Dispositivo
        </Text>

        <Text style={deviceStyles.subtitle}>
          Gerencie a conexão com a sua pulseira SPIE
        </Text>
      </View>

      <View
        style={[
          deviceStyles.statusCard,
          isConnected &&
            deviceStyles.statusCardConnected,
        ]}
      >
        <Ionicons
          name={
            isConnected
              ? 'watch'
              : 'watch-outline'
          }
          size={64}
          color={
            isConnected
              ? Colors.accent
              : Colors.textMuted
          }
          style={deviceStyles.deviceIcon}
        />

        <Text style={deviceStyles.statusLabel}>
          Status do Hardware
        </Text>

        <Text
          style={[
            deviceStyles.statusValue,
            isConnected
              ? deviceStyles.textOk
              : deviceStyles.textError,
          ]}
        >
          {status}
        </Text>

        {isConnected && (
          <View style={deviceStyles.hardwareSpecs}>
            <Text style={deviceStyles.specText}>
              Nome: {deviceConectado?.name}
            </Text>

            <Text style={deviceStyles.specText}>
              ID: {deviceConectado?.id}
            </Text>
          </View>
        )}
      </View>

      <View style={deviceStyles.controlContainer}>
        {!isConnected ? (
          <TouchableOpacity
            onPress={conectarDispositivo}
            disabled={isConnecting}
            activeOpacity={0.8}
            style={deviceStyles.btnWrapper}
          >
            <LinearGradient
              colors={
                isConnecting
                  ? [
                      Colors.surface,
                      Colors.surface,
                    ]
                  : [
                      Colors.primary,
                      Colors.secondary,
                    ]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={deviceStyles.button}
            >
              {isConnecting ? (
                <View style={deviceStyles.row}>
                  <ActivityIndicator
                    color={Colors.accent}
                    style={{ marginRight: 10 }}
                  />

                  <Text
                    style={[
                      deviceStyles.buttonText,
                      {
                        color:
                          Colors.textMuted,
                      },
                    ]}
                  >
                    Sincronizando...
                  </Text>
                </View>
              ) : (
                <View style={deviceStyles.row}>
                  <Ionicons
                    name="bluetooth"
                    size={20}
                    color={Colors.text}
                    style={{ marginRight: 8 }}
                  />

                  <Text style={deviceStyles.buttonText}>
                    Emparelhar Pulseira
                  </Text>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View style={deviceStyles.connectedPanel}>
            <View style={deviceStyles.infoRow}>
              <Ionicons
                name="wifi"
                size={20}
                color={Colors.accent}
              />

              <Text style={deviceStyles.infoText}>
                Sinal BLE está estável
              </Text>
            </View>

            <View style={deviceStyles.infoRow}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color="#00b37e"
              />

              <Text style={deviceStyles.infoText}>
                Monitoramento ativo
              </Text>
            </View>
          </View>
        )}
      </View>
    </Background>
  );
}