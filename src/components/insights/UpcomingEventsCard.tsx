import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cycleColors } from '@/styles/calendar.styles';
import { insightsStyles } from '@/styles/insights.styles';
import { CycleMetrics } from '@/modules/insights/types/insights.types';

interface UpcomingEventsCardProps {
  metricas: CycleMetrics | null;
}

function formatarDataPtBr(isoStr: string | null): string {
  if (!isoStr) return '--';
  const partes = isoStr.split('-');
  if (partes.length !== 3) return isoStr;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

export function UpcomingEventsCard({ metricas }: UpcomingEventsCardProps) {
  if (!metricas || !metricas.proximaMenstruacao) {
    return null;
  }

  return (
    <View style={insightsStyles.eventsCard}>
      <Text style={insightsStyles.sectionTitle}>Próximos eventos</Text>

      {/* Ovulação */}
      {metricas.ovulacaoEstimada && (
        <View style={insightsStyles.eventRow}>
          <Ionicons name="flower" size={22} color={cycleColors.gold} />
          <View style={{ flex: 1 }}>
            <Text style={insightsStyles.eventTitle}>Ovulação estimada</Text>
            <Text style={insightsStyles.eventDate}>
              {formatarDataPtBr(metricas.ovulacaoEstimada)}
            </Text>
          </View>
        </View>
      )}

      {metricas.ovulacaoEstimada && <View style={insightsStyles.divider} />}

      {/* Próxima Menstruação */}
      <View style={insightsStyles.eventRow}>
        <Ionicons name="water" size={22} color={cycleColors.rose} />
        <View style={{ flex: 1 }}>
          <Text style={insightsStyles.eventTitle}>Próxima menstruação</Text>
          <Text style={insightsStyles.eventDate}>
            {formatarDataPtBr(metricas.proximaMenstruacao)}
          </Text>
          {metricas.diasAtraso && metricas.diasAtraso > 0 && (
            <Text
              style={{
                color: cycleColors.rose,
                fontSize: 12,
                marginTop: 4,
                fontWeight: '700',
              }}
            >
              {metricas.diasAtraso} {metricas.diasAtraso === 1 ? 'dia' : 'dias'} além da previsão
            </Text>
          )}
        </View>
      </View>

      {/* Período Fértil */}
      {metricas.periodoFertil && (
        <>
          <View style={insightsStyles.divider} />
          <View style={insightsStyles.eventRow}>
            <Ionicons name="flower-outline" size={22} color={cycleColors.lavender} />
            <View style={{ flex: 1 }}>
              <Text style={insightsStyles.eventTitle}>Período fértil estimado</Text>
              <Text style={insightsStyles.eventDate}>
                {formatarDataPtBr(metricas.periodoFertil.inicio)} até{' '}
                {formatarDataPtBr(metricas.periodoFertil.fim)}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
