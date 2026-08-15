import React, { useState } from 'react';

import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Background } from '@/components/Background';
import { cycleColors } from '@/styles/calendar.styles';
import { registerPeriodStyles } from '@/styles/register-period.styles';
import { useCycle } from '@/context/CycleContext';
import { sintomasDisponiveis } from '../calendar/symptoms';
import { secrecoesDisponiveis } from '../calendar/register-secretion';

function formatarDataBR(dataISO: string) {
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}

export default function RegisterPeriod() {

  const { setUltimaMenstruacao, obterRegistrosDoDia } = useCycle();
  const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);

  const marcado = dataSelecionada
    ? {
        [dataSelecionada]: {
          selected: true,
          selectedColor: cycleColors.rose,
          selectedTextColor: '#FFFFFF',
        },
      }
    : {};

  // registros já salvos no dia selecionado (sintomas + secreção)
  const registrosDoDia = dataSelecionada
    ? obterRegistrosDoDia?.(dataSelecionada)
    : undefined;

  const sintomasDoDia = registrosDoDia?.sintomas ?? [];
  const secrecoesDoDia = registrosDoDia?.secrecoes ?? [];
  const temRegistros = sintomasDoDia.length > 0 || secrecoesDoDia.length > 0;

  function irParaSintomas() {
    if (!dataSelecionada) return;
    router.push({ pathname: '/calendar/symptoms', params: { data: dataSelecionada } });
  }

  function irParaSecrecao() {
    if (!dataSelecionada) return;
    router.push({ pathname: '/calendar/register-secretion', params: { data: dataSelecionada } });
  }

  function salvarMenstruacao() {
    if (!dataSelecionada) return;

    Alert.alert(
      'Confirmar registro',
      `Registrar o início da menstruação em ${formatarDataBR(dataSelecionada)}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            setUltimaMenstruacao(dataSelecionada);
            router.back();
          },
        },
      ]
    );
  }

  return (
    <Background>
      <View style={registerPeriodStyles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={registerPeriodStyles.container}
        >

          {/* TOPO */}

          <View style={registerPeriodStyles.topBar}>
            <TouchableOpacity
              style={registerPeriodStyles.backButton}
              activeOpacity={0.7}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={cycleColors.text} />
            </TouchableOpacity>

            <View style={registerPeriodStyles.emptySpace} />
          </View>

          {/* CABEÇALHO */}

          <View style={registerPeriodStyles.header}>
            <LinearGradient
              colors={[cycleColors.rose, cycleColors.lavender]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={registerPeriodStyles.iconRing}
            >
              <Ionicons name="water-outline" size={34} color="#FFFFFF" />
            </LinearGradient>

            <Text style={registerPeriodStyles.title}>
              Registrar menstruação
            </Text>

            <Text style={registerPeriodStyles.subtitle}>
              Escolha um dia para marcar o início do sangramento, ou para ver e adicionar sintomas e secreção daquela data.
            </Text>
          </View>

          {/* CALENDÁRIO */}

          <View style={registerPeriodStyles.card}>
            <Calendar
              style={{ height: 350 }}
              markedDates={marcado}
              firstDay={1}
              enableSwipeMonths
              theme={{
                calendarBackground: cycleColors.surface,
                backgroundColor: cycleColors.surface,
                monthTextColor: cycleColors.text,
                dayTextColor: cycleColors.text,
                textSectionTitleColor: cycleColors.textMuted,
                todayTextColor: cycleColors.gold,
                arrowColor: cycleColors.rose,
                selectedDayBackgroundColor: cycleColors.rose,
                selectedDayTextColor: '#FFFFFF',
                textMonthFontSize: 18,
                textMonthFontWeight: '700',
                textDayFontSize: 15,
                textDayFontWeight: '600',
              }}
              onDayPress={(day) => setDataSelecionada(day.dateString)}
            />
          </View>

          {/* DATA SELECIONADA */}

          {dataSelecionada && (
            <View style={registerPeriodStyles.selectedCard}>
              <Ionicons name="checkmark-circle" size={30} color={cycleColors.teal} />

              <View>
                <Text style={registerPeriodStyles.selectedTitle}>
                  Data selecionada
                </Text>

                <Text style={registerPeriodStyles.selectedText}>
                  {formatarDataBR(dataSelecionada)}
                </Text>
              </View>
            </View>
          )}

          {/* REGISTROS DO DIA */}

          {dataSelecionada && (
            <View style={registerPeriodStyles.dayRecordsCard}>
              <View style={registerPeriodStyles.dayRecordsHeader}>
                <Text style={registerPeriodStyles.dayRecordsTitle}>
                  Registros do dia
                </Text>
              </View>

              <View style={registerPeriodStyles.quickActionsRow}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    registerPeriodStyles.quickActionButton,
                    registerPeriodStyles.quickActionButtonSymptom,
                  ]}
                  onPress={irParaSintomas}
                >
                  <Ionicons name="add-circle-outline" size={18} color={cycleColors.rose} />
                  <Text style={registerPeriodStyles.quickActionText}>Sintomas</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    registerPeriodStyles.quickActionButton,
                    registerPeriodStyles.quickActionButtonSecretion,
                  ]}
                  onPress={irParaSecrecao}
                >
                  <Ionicons name="add-circle-outline" size={18} color={cycleColors.lavender} />
                  <Text style={registerPeriodStyles.quickActionText}>Secreção</Text>
                </TouchableOpacity>
              </View>

              {temRegistros ? (
                <View style={registerPeriodStyles.badgesWrap}>
                  {sintomasDoDia.map((item) => {
                    const sintoma = sintomasDisponiveis.find((s) => s.id === item.id);
                    return (
                      <View key={`sintoma-${item.id}`} style={registerPeriodStyles.badge}>
                        <View style={registerPeriodStyles.badgeDotSymptom} />
                        <Text style={registerPeriodStyles.badgeText}>
                          {sintoma?.nome ?? item.id}
                        </Text>
                      </View>
                    );
                  })}

                  {secrecoesDoDia.map((item, index) => {
                    const secrecao = secrecoesDisponiveis.find((s) => s.id === item.tipo);
                    return (
                      <View key={`secrecao-${index}`} style={registerPeriodStyles.badge}>
                        <View style={registerPeriodStyles.badgeDotSecretion} />
                        <Text style={registerPeriodStyles.badgeText}>
                          {secrecao?.nome ?? item.tipo}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <Text style={registerPeriodStyles.emptyDayText}>
                  Nenhum sintoma ou secreção registrado nesse dia ainda.
                </Text>
              )}
            </View>
          )}

          {/* SALVAR */}

          <TouchableOpacity
            activeOpacity={0.85}
            disabled={!dataSelecionada}
            onPress={salvarMenstruacao}
            style={!dataSelecionada && registerPeriodStyles.buttonDisabled}
          >
            <LinearGradient
              colors={[cycleColors.rose, cycleColors.lavender]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={registerPeriodStyles.button}
            >
              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
              <Text style={registerPeriodStyles.buttonText}>
                Marcar início da menstruação
              </Text>
            </LinearGradient>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </Background>
  );
}