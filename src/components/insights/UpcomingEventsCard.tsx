import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cycleColors } from '@/styles/calendar.styles';
import { insightsStyles } from '@/styles/insights.styles';
import { CycleMetrics } from '@/modules/insights/types/insights.types';

interface UpcomingEventsCardProps {
  metricas: CycleMetrics | null;
}

function formatarDataEn(isoStr: string | null): string {
  if (!isoStr) return '--';
  const partes = isoStr.split('-');
  if (partes.length !== 3) return isoStr;
  return `${partes[1]}/${partes[2]}/${partes[0]}`;
}

export function UpcomingEventsCard({ metricas }: UpcomingEventsCardProps) {
  if (!metricas || !metricas.proximaMenstruacao) {
    return null;
  }

  return (
    <View style={insightsStyles.eventsCard}>
      <Text style={insightsStyles.sectionTitle}>Upcoming events</Text>

      {/* Ovulação */}
      {metricas.ovulacaoEstimada && (
        <View style={insightsStyles.eventRow}>
          <Ionicons name="flower" size={22} color={cycleColors.gold} />
          <View style={{ flex: 1 }}>
            <Text style={insightsStyles.eventTitle}>Estimated ovulation</Text>
            <Text style={insightsStyles.eventDate}>
              {formatarDataEn(metricas.ovulacaoEstimada)}
            </Text>
          </View>
        </View>
      )}

      {metricas.ovulacaoEstimada && <View style={insightsStyles.divider} />}

      {/* Próxima Menstruação */}
      <View style={insightsStyles.eventRow}>
        <Ionicons name="water" size={22} color={cycleColors.rose} />
        <View style={{ flex: 1 }}>
          <Text style={insightsStyles.eventTitle}>Next period</Text>
          <Text style={insightsStyles.eventDate}>
            {formatarDataEn(metricas.proximaMenstruacao)}
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
              {metricas.diasAtraso} {metricas.diasAtraso === 1 ? 'day' : 'days'} past expected date
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
              <Text style={insightsStyles.eventTitle}>Estimated fertile window</Text>
              <Text style={insightsStyles.eventDate}>
                {formatarDataEn(metricas.periodoFertil.inicio)} to{' '}
                {formatarDataEn(metricas.periodoFertil.fim)}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
