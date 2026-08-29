import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Linking,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '@/components/Background';
import { cycleColors } from '@/styles/calendar.styles';
import { historyStyles as styles } from '@/styles/history.styles';
import { useDialog } from '@/context/DialogContext';
import { emergencyRepository } from '@/modules/emergency/services/emergencyRepository';
import { parseFirebaseDate, formatDateTimeBR } from '@/shared/utils/dateUtils';

interface Alerta {
  id: string;
  data: string;
  timestampRaw: any;
  tipo: string;
  status: string;
  origem?: string;
  latitude?: number | null;
  longitude?: number | null;
  linkMapa?: string;
}

export default function AlertHistory() {
  const { showConfirm, showAlert } = useDialog();
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = emergencyRepository.subscribeAlertHistory((snapshotData) => {
      const dados: Alerta[] = snapshotData.map((itemData: any) => {
        const rawTime = parseFirebaseDate(itemData.timestamp || itemData.createdAt);
        return {
          id: itemData.id,
          data: formatDateTimeBR(rawTime),
          timestampRaw: rawTime,
          tipo: itemData.tipo || itemData.type || 'SOS Silencioso',
          status: itemData.status || 'Disparado',
          origem: itemData.device || itemData.source || 'Pulseira SPIE',
          latitude: itemData.latitude ?? itemData.location?.latitude ?? null,
          longitude: itemData.longitude ?? itemData.location?.longitude ?? null,
          linkMapa: itemData.linkMapa ?? itemData.mapUrl ?? null,
        };
      });

      dados.sort((a, b) => b.timestampRaw - a.timestampRaw);
      setAlertas(dados);
      setCarregando(false);
    });

    return () => {
      unsubscribe?.();
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  };

  function voltar() {
    router.replace('/(tabs)/profile');
  }

  async function abrirMapa(alerta: Alerta) {
    let url = alerta.linkMapa;

    if (!url && alerta.latitude && alerta.longitude) {
      url = `https://www.google.com/maps/search/?api=1&query=${alerta.latitude},${alerta.longitude}`;
    }

    if (url) {
      try {
        await Linking.openURL(url);
      } catch (err) {
        showAlert({
          title: 'Erro',
          message: 'Não foi possível abrir o aplicativo de mapas.',
          type: 'error',
        });
      }
    } else {
      showAlert({
        title: 'Localização',
        message: 'As coordenadas de GPS não estavam disponíveis para este alerta.',
        type: 'info',
      });
    }
  }

  function excluirAlerta(id: string) {
    showConfirm({
      title: 'Excluir Alerta',
      message: 'Deseja realmente remover este registro do seu histórico?',
      type: 'danger',
      confirmText: 'Excluir',
      cancelText: 'Cancelar',
      onConfirm: async () => {
        try {
          await emergencyRepository.deleteAlert(id);
        } catch (err) {
          showAlert({
            title: 'Erro',
            message: 'Não foi possível excluir o alerta.',
            type: 'error',
          });
        }
      },
    });
  }

  function limparTodoHistorico() {
    if (alertas.length === 0) return;

    showConfirm({
      title: 'Limpar Todo o Histórico',
      message: 'Tem certeza de que deseja apagar todos os registros de alerta? Esta ação não pode ser desfeita.',
      type: 'danger',
      confirmText: 'Apagar Tudo',
      cancelText: 'Cancelar',
      onConfirm: async () => {
        try {
          await emergencyRepository.clearAllAlerts();
        } catch (err) {
          showAlert({
            title: 'Erro',
            message: 'Não foi possível limpar o histórico.',
            type: 'error',
          });
        }
      },
    });
  }

  function renderStatusBadge(status: string) {
    const st = status.toLowerCase();
    let bg = 'rgba(20, 184, 166, 0.15)';
    let textCol: string = cycleColors.teal;

    if (st.includes('cancel') || st.includes('erro') || st.includes('falha')) {
      bg = 'rgba(239, 68, 68, 0.15)';
      textCol = '#EF4444';
    } else if (st.includes('disparando') || st.includes('andamento') || st.includes('ativado')) {
      bg = 'rgba(245, 158, 11, 0.15)';
      textCol = '#F59E0B';
    }

    return (
      <View style={[styles.statusBadge, { backgroundColor: bg }]}>
        <Text style={[styles.statusText, { color: textCol }]}>{status}</Text>
      </View>
    );
  }

  return (
    <Background>
      <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
        <View style={styles.container}>
          {/* TOPO */}
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backButton} activeOpacity={0.7} onPress={voltar}>
              <Ionicons name="arrow-back" size={20} color={cycleColors.text} />
            </TouchableOpacity>

            {alertas.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                activeOpacity={0.7}
                onPress={limparTodoHistorico}
              >
                <Ionicons name="trash-outline" size={14} color="#EF4444" />
                <Text style={styles.clearButtonText}>Limpar Tudo</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.eyebrow}>SEGURANÇA PESSOAL</Text>
          <Text style={styles.title}>Histórico de Alertas</Text>

          {carregando ? (
            <View style={styles.card}>
              <ActivityIndicator size="large" color={cycleColors.rose} />
              <Text style={styles.text}>Carregando histórico...</Text>
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => setRefreshing(true)}
                  tintColor={cycleColors.rose}
                />
              }
            >
              {alertas.length === 0 ? (
                <View style={styles.card}>
                  <View style={styles.iconRing}>
                    <Ionicons name="shield-checkmark" size={38} color={cycleColors.teal} />
                  </View>
                  <Text style={styles.text}>Nenhum alerta registrado</Text>
                  <Text style={styles.sub}>
                    Quando a pulseira ou o botão SOS forem acionados, o registro aparecerá aqui com rota e horário.
                  </Text>
                </View>
              ) : (
                alertas.map((alerta) => (
                  <View key={alerta.id} style={styles.alertCard}>
                    {/* Header do Card */}
                    <View style={styles.alertHeader}>
                      <View style={styles.alertHeaderLeft}>
                        <View style={styles.alertIconWrap}>
                          <Ionicons
                            name={alerta.origem === 'DISPOSITIVO_BLE' ? 'watch-outline' : 'warning'}
                            size={18}
                            color="#EF4444"
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.alertType}>{alerta.tipo}</Text>
                          <Text style={styles.alertDate}>{alerta.data}</Text>
                        </View>
                      </View>

                      <TouchableOpacity
                        style={styles.deleteAlertBtn}
                        activeOpacity={0.7}
                        onPress={() => excluirAlerta(alerta.id)}
                      >
                        <Ionicons name="trash-outline" size={16} color={cycleColors.textMuted} />
                      </TouchableOpacity>
                    </View>

                    {/* Badge de Status */}
                    <View style={{ marginTop: 2, marginBottom: 8 }}>
                      {renderStatusBadge(alerta.status)}
                    </View>

                    {/* Divisor */}
                    <View style={styles.alertDivider} />

                    {/* Informações de Localização */}
                    <View style={styles.locationRow}>
                      <View style={styles.locationInfo}>
                        <Ionicons name="location-outline" size={16} color={cycleColors.rose} />
                        <Text style={styles.locationText}>
                          {alerta.latitude && alerta.longitude
                            ? `${alerta.latitude.toFixed(4)}, ${alerta.longitude.toFixed(4)}`
                            : 'GPS registrado'}
                        </Text>
                      </View>

                      {(alerta.linkMapa || (alerta.latitude && alerta.longitude)) && (
                        <TouchableOpacity
                          style={styles.mapButton}
                          activeOpacity={0.8}
                          onPress={() => abrirMapa(alerta)}
                        >
                          <Ionicons name="map-outline" size={14} color={cycleColors.rose} />
                          <Text style={styles.mapButtonText}>Ver no mapa</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </Background>
  );
}