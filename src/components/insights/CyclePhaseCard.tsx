import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { cycleColors } from '@/styles/calendar.styles';
import { insightsStyles } from '@/styles/insights.styles';
import { CycleMetrics } from '@/modules/insights/types/insights.types';

interface CyclePhaseCardProps {
  metricas: CycleMetrics | null;
  temCicloRegistrado: boolean;
}

export function CyclePhaseCard({ metricas, temCicloRegistrado }: CyclePhaseCardProps) {
  if (!temCicloRegistrado) {
    return (
      <View style={insightsStyles.mainCard}>
        <View style={insightsStyles.mainHeader}>
          <Ionicons name="heart" color={cycleColors.rose} size={28} />
          <Text style={insightsStyles.mainTitle}>Seu ciclo</Text>
        </View>

        <View style={{ alignItems: 'center', paddingVertical: 20 }}>
          <Ionicons name="calendar-outline" size={44} color={cycleColors.gold} />
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginTop: 14 }}>
            Nenhum ciclo registrado
          </Text>
          <Text style={{ fontSize: 14, textAlign: 'center', marginTop: 8, color: '#B8B8B8', lineHeight: 20, paddingHorizontal: 10 }}>
            Adicione a data de início da sua menstruação no Calendário para ativar o acompanhamento do seu ciclo.
          </Text>

          <TouchableOpacity
            style={{
              marginTop: 18,
              backgroundColor: cycleColors.roseSoft,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
            onPress={() => router.push('/(tabs)/calendar')}
            activeOpacity={0.7}
          >
            <Ionicons name="calendar" size={16} color={cycleColors.rose} />
            <Text style={{ color: cycleColors.rose, fontWeight: '700', fontSize: 14 }}>
              Ir para o Calendário
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const diaExibicao = metricas?.diaDoCiclo ?? 1;
  const progressoExibicao = metricas?.progressoCiclo ?? 0;
  const duracaoCicloExibicao = metricas?.duracaoCiclo ?? 28;
  const duracaoMenstruacaoExibicao = metricas?.duracaoMenstruacao ?? 5;
  const faseExibicao = metricas?.faseAtual ?? 'Em andamento';

  return (
    <View style={insightsStyles.mainCard}>
      <View style={insightsStyles.mainHeader}>
        <Ionicons name="heart" color={cycleColors.rose} size={28} />
        <Text style={insightsStyles.mainTitle}>Seu ciclo</Text>
      </View>

      <Text style={insightsStyles.dayText}>Dia {diaExibicao}</Text>

      <View style={insightsStyles.progressBackground}>
        <View
          style={[
            insightsStyles.progressFill,
            { width: `${progressoExibicao}%` },
          ]}
        />
      </View>

      <Text style={insightsStyles.progressText}>
        {progressoExibicao}% concluído
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 18,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              color: cycleColors.textMuted,
              fontSize: 11,
              textTransform: 'uppercase',
              fontWeight: '700',
            }}
          >
            CICLO
          </Text>
          <Text
            style={{
              color: cycleColors.text,
              fontSize: 16,
              fontWeight: '700',
              marginTop: 4,
            }}
          >
            {duracaoCicloExibicao} dias
          </Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              color: cycleColors.textMuted,
              fontSize: 11,
              textTransform: 'uppercase',
              fontWeight: '700',
            }}
          >
            MENSTRUAÇÃO
          </Text>
          <Text
            style={{
              color: cycleColors.text,
              fontSize: 16,
              fontWeight: '700',
              marginTop: 4,
            }}
          >
            {duracaoMenstruacaoExibicao} {duracaoMenstruacaoExibicao === 1 ? 'dia' : 'dias'}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text
          style={{
            color: cycleColors.textMuted,
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontWeight: '700',
          }}
        >
          FASE ATUAL
        </Text>
        <Text
          style={{
            color: cycleColors.rose,
            fontSize: 18,
            fontWeight: '800',
            marginTop: 4,
          }}
        >
          {faseExibicao}
        </Text>
      </View>
    </View>
  );
}
