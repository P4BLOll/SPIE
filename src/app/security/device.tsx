import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Background } from '@/components/Background';
import { useDevice } from '@/modules/device/hooks/useDevice';
import { useDialog } from '@/context/DialogContext';
import { deviceStyles } from '@/styles/device.styles';
import { cycleColors } from '@/styles/calendar.styles';

export default function DeviceScreen() {
  const router = useRouter();
  const { showConfirm, showAlert } = useDialog();

  const {
    status,
    connect,
    disconnect,
    device,
    isScanning,
    startScan,
    stopScan,
    discoveredDevices,
  } = useDevice();

  const [connectingId, setConnectingId] = useState<string | null>(null);

  const isConnected = status === 'connected' && device !== null;

  // Inicia a varredura ao entrar na tela se não estiver conectado
  useEffect(() => {
    if (!isConnected) {
      startScan();
    }

    return () => {
      stopScan();
    };
  }, [isConnected, startScan, stopScan]);

  function voltar() {
    router.back();
  }

  async function handleConnect(deviceId: string) {
    if (connectingId) return;
    try {
      setConnectingId(deviceId);
      const success = await connect(deviceId);
      if (!success) {
        showAlert({
          title: 'Connection Failed',
          message: 'Unable to connect to the selected device. Make sure it is turned on and nearby.',
          type: 'warning',
        });
      }
    } finally {
      setConnectingId(null);
    }
  }

  function handleDisconnect() {
    showConfirm({
      title: 'Disconnect Smartband',
      message: 'Are you sure you want to disconnect from the current smartband?',
      type: 'danger',
      confirmText: 'Disconnect',
      cancelText: 'Cancel',
      onConfirm: async () => {
        await disconnect();
        startScan();
      },
    });
  }

  function getStatusLabel() {
    if (isConnected) return 'Connected';
    if (isScanning || status === 'connecting') return 'Searching / Connecting...';
    return 'Disconnected';
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: cycleColors.background,
      }}
      edges={['top', 'left', 'right']}
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
              My Device
            </Text>

            <Text
              style={[
                deviceStyles.subtitle,
                {
                  color: cycleColors.textMuted,
                },
              ]}
            >
              Manage the connection to your SPIE smartband
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* ==============================
              STATUS DO DISPOSITIVO ATUAL
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
              name={isConnected ? 'watch' : 'watch-outline'}
              size={56}
              color={isConnected ? cycleColors.teal : cycleColors.textMuted}
              style={deviceStyles.deviceIcon}
            />

            <Text style={deviceStyles.statusLabel}>
              Hardware Status
            </Text>

            <Text
              style={[
                deviceStyles.statusValue,
                {
                  color: isConnected
                    ? cycleColors.teal
                    : isScanning
                    ? cycleColors.rose
                    : cycleColors.textMuted,
                },
              ]}
            >
              {getStatusLabel()}
            </Text>

            {/* DETALHES DO DISPOSITIVO CONECTADO */}
            {isConnected && (
              <View style={deviceStyles.hardwareSpecs}>
                <Text style={deviceStyles.specText}>
                  Name: {device?.name || 'SPIE Smartband'}
                </Text>
                <Text style={deviceStyles.specText}>
                  ID: {device?.id}
                </Text>

                <TouchableOpacity
                  style={deviceStyles.disconnectButton}
                  onPress={handleDisconnect}
                  activeOpacity={0.7}
                >
                  <Ionicons name="close-circle-outline" size={16} color={cycleColors.rose} />
                  <Text style={deviceStyles.disconnectButtonText}>
                    Disconnect Smartband
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* ==============================
              SEÇÃO: DISPOSITIVOS DISPONÍVEIS
          ============================== */}
          <View style={deviceStyles.sectionHeader}>
            <View style={deviceStyles.sectionTitleRow}>
              <Text style={deviceStyles.sectionTitle}>
                Nearby Devices
              </Text>
              <View style={deviceStyles.countBadge}>
                <Text style={deviceStyles.countBadgeText}>
                  {discoveredDevices.length}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={deviceStyles.scanActionButton}
              onPress={() => {
                if (isScanning) {
                  stopScan();
                } else {
                  startScan();
                }
              }}
              activeOpacity={0.7}
            >
              {isScanning ? (
                <>
                  <ActivityIndicator size="small" color={cycleColors.rose} />
                  <Text style={deviceStyles.scanActionButtonText}>Searching...</Text>
                </>
              ) : (
                <>
                  <Ionicons name="refresh" size={16} color={cycleColors.rose} />
                  <Text style={deviceStyles.scanActionButtonText}>Search</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* ==============================
              LISTAGEM DE DISPOSITIVOS
          ============================== */}
          <View style={deviceStyles.deviceListContainer}>
            {discoveredDevices.length > 0 ? (
              discoveredDevices.map((item) => {
                const isThisConnected = isConnected && device?.id === item.id;
                const isThisConnecting = connectingId === item.id;

                return (
                  <View
                    key={item.id}
                    style={[
                      deviceStyles.deviceItemCard,
                      isThisConnected && deviceStyles.deviceItemCardActive,
                    ]}
                  >
                    <View style={deviceStyles.deviceItemLeft}>
                      <View style={deviceStyles.deviceIconWrapper}>
                        <Ionicons
                          name="bluetooth"
                          size={22}
                          color={isThisConnected ? cycleColors.teal : cycleColors.rose}
                        />
                      </View>

                      <View style={deviceStyles.deviceItemDetails}>
                        <Text style={deviceStyles.deviceItemName}>
                          {item.name || 'SPIE Device'}
                        </Text>
                        <Text style={deviceStyles.deviceItemMac}>
                          {item.id}
                        </Text>
                        {item.rssi !== null && item.rssi !== undefined && (
                          <View style={deviceStyles.deviceSignalBadge}>
                            <Ionicons name="cellular" size={12} color={cycleColors.textMuted} />
                            <Text style={deviceStyles.deviceSignalText}>
                              Signal: {item.rssi} dBm
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>

                    {isThisConnected ? (
                      <View
                        style={[
                          deviceStyles.deviceItemButton,
                          deviceStyles.deviceItemButtonConnected,
                        ]}
                      >
                        <Text
                          style={[
                            deviceStyles.deviceItemButtonText,
                            deviceStyles.deviceItemButtonTextConnected,
                          ]}
                        >
                          Connected
                        </Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={deviceStyles.deviceItemButton}
                        onPress={() => handleConnect(item.id)}
                        disabled={isThisConnecting || isConnected}
                        activeOpacity={0.8}
                      >
                        {isThisConnecting ? (
                          <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                          <Text style={deviceStyles.deviceItemButtonText}>
                            Connect
                          </Text>
                        )}
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })
            ) : isScanning ? (
              <View style={deviceStyles.emptyCard}>
                <ActivityIndicator size="large" color={cycleColors.rose} />
                <Text style={deviceStyles.emptyCardText}>
                  Searching for nearby SPIE smartbands...
                </Text>
                <Text style={deviceStyles.emptyCardSubtext}>
                  Ensure your smartband or ESP32 simulator is powered on and Bluetooth is enabled.
                </Text>
              </View>
            ) : (
              <View style={deviceStyles.emptyCard}>
                <Ionicons name="bluetooth-outline" size={48} color={cycleColors.textMuted} />
                <Text style={deviceStyles.emptyCardText}>
                  No smartbands found
                </Text>
                <Text style={deviceStyles.emptyCardSubtext}>
                  Tap the button below to search for nearby Bluetooth devices.
                </Text>
                <TouchableOpacity
                  style={deviceStyles.fullScanButton}
                  onPress={() => startScan()}
                  activeOpacity={0.8}
                >
                  <Ionicons name="search" size={16} color="#FFFFFF" />
                  <Text style={deviceStyles.fullScanButtonText}>
                    Search Devices
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
}