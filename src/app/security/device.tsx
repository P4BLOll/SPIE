import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { Background } from '../../components/Background';
import { useBLE } from '../../context/BLEContext';
import { deviceStyles } from '../../styles/device.styles';

import { cycleColors } from '../../styles/calendar.styles';

export default function DeviceScreen() {
  const router = useRouter();

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

  // Volta para a página anterior
  function voltar() {
    router.back();
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: cycleColors.background,
      }}
    >
      <Background
        style={[
          deviceStyles.container,
          {
            backgroundColor: cycleColors.background,
          },
        ]}
      >
        {/* ==============================
            HEADER
        ============================== */}

        <View style={deviceStyles.header}>
          <TouchableOpacity
            onPress={voltar}
            activeOpacity={0.7}
            style={[
              deviceStyles.backButton,
              {
                backgroundColor: cycleColors.surface,
              },
            ]}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={cycleColors.text}
            />
          </TouchableOpacity>

          <View style={deviceStyles.headerContent}>
            <Text
              style={[
                deviceStyles.title,
                {
                  color: cycleColors.text,
                },
              ]}
            >
              Meu Dispositivo
            </Text>

            <Text
              style={[
                deviceStyles.subtitle,
                {
                  color: cycleColors.textMuted,
                },
              ]}
            >
              Gerencie a conexão com a sua pulseira SPIE
            </Text>
          </View>
        </View>

        {/* ==============================
            STATUS DO DISPOSITIVO
        ============================== */}

        <View
          style={[
            deviceStyles.statusCard,
            {
              backgroundColor: cycleColors.surface,
              borderWidth: isConnected ? 1 : 0,
              borderColor: isConnected
                ? cycleColors.roseBorder
                : 'transparent',
            },
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
                ? cycleColors.rose
                : cycleColors.textMuted
            }
            style={deviceStyles.deviceIcon}
          />

          <Text
            style={[
              deviceStyles.statusLabel,
              {
                color: cycleColors.textMuted,
              },
            ]}
          >
            Status do Hardware
          </Text>

          <Text
            style={[
              deviceStyles.statusValue,
              {
                color: isConnected
                  ? cycleColors.rose
                  : cycleColors.textMuted,
              },
            ]}
          >
            {status}
          </Text>

          {/* INFORMAÇÕES DO DISPOSITIVO */}

          {isConnected && (
            <View
              style={[
                deviceStyles.hardwareSpecs,
                {
                  backgroundColor: cycleColors.surfaceAlt,
                },
              ]}
            >
              <Text
                style={[
                  deviceStyles.specText,
                  {
                    color: cycleColors.textMuted,
                  },
                ]}
              >
                Nome: {deviceConectado?.name}
              </Text>

              <Text
                style={[
                  deviceStyles.specText,
                  {
                    color: cycleColors.textMuted,
                  },
                ]}
              >
                ID: {deviceConectado?.id}
              </Text>
            </View>
          )}
        </View>

        {/* ==============================
            CONTROLES
        ============================== */}

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
                        cycleColors.surface,
                        cycleColors.surface,
                      ]
                    : [
                        cycleColors.rose,
                        cycleColors.lavender,
                      ]
                }
                start={{
                  x: 0,
                  y: 0,
                }}
                end={{
                  x: 1,
                  y: 0,
                }}
                style={deviceStyles.button}
              >
                {isConnecting ? (
                  <View style={deviceStyles.row}>
                    <ActivityIndicator
                      color={cycleColors.rose}
                      style={{
                        marginRight: 10,
                      }}
                    />

                    <Text
                      style={[
                        deviceStyles.buttonText,
                        {
                          color: cycleColors.textMuted,
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
                      color="#FFFFFF"
                      style={{
                        marginRight: 8,
                      }}
                    />

                    <Text
                      style={[
                        deviceStyles.buttonText,
                        {
                          color: '#FFFFFF',
                        },
                      ]}
                    >
                      Emparelhar Pulseira
                    </Text>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <View
              style={[
                deviceStyles.connectedPanel,
                {
                  backgroundColor: cycleColors.surface,
                  borderColor: cycleColors.roseBorder,
                },
              ]}
            >
              {/* SINAL BLE */}

              <View style={deviceStyles.infoRow}>
                <Ionicons
                  name="bluetooth"
                  size={20}
                  color={cycleColors.rose}
                />

                <Text
                  style={[
                    deviceStyles.infoText,
                    {
                      color: cycleColors.text,
                    },
                  ]}
                >
                  Sinal BLE está estável
                </Text>
              </View>

              {/* MONITORAMENTO */}

              <View style={deviceStyles.infoRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={cycleColors.teal}
                />

                <Text
                  style={[
                    deviceStyles.infoText,
                    {
                      color: cycleColors.text,
                    },
                  ]}
                >
                  Monitoramento ativo
                </Text>
              </View>
            </View>
          )}
        </View>
      </Background>
    </View>
  );
}