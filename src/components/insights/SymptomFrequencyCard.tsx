import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cycleColors } from '@/styles/calendar.styles';
import { insightsStyles } from '@/styles/insights.styles';
import { CycleMetrics } from '@/modules/insights/types/insights.types';

interface SymptomFrequencyCardProps {
  metricas: CycleMetrics | null;
}

const symptomTranslations: Record<string, string> = {
  head: 'Headache',
  'Dor de cabeça': 'Headache',
  back: 'Back pain',
  'Dor nas costas': 'Back pain',
  breast: 'Breast tenderness',
  'Sensibilidade nos seios': 'Breast tenderness',
  cramp: 'Cramps',
  'Cólica': 'Cramps',
  bloating: 'Bloating',
  'Inchaço': 'Bloating',
  mood: 'Mood swings',
  'Alteração de humor': 'Mood swings',
  tired: 'Fatigue',
  'Cansaço': 'Fatigue',
  nausea: 'Nausea',
  'Náusea': 'Nausea',
  none: 'No symptoms',
  'Nenhum sintoma': 'No symptoms',
};

const phaseTranslations: Record<string, string> = {
  'Menstruação': 'Menstruation',
  'Fase Folicular': 'Follicular Phase',
  'Ovulação': 'Ovulation',
  'Fase Lútea': 'Luteal Phase',
  'Em andamento': 'In Progress',
};

const moodTranslations: Record<string, string> = {
  'Muito feliz': 'Very happy',
  'Bem': 'Good',
  'Normal': 'Normal',
  'Triste': 'Sad',
  'Muito triste': 'Very sad',
  'Irritada': 'Irritable',
  'Ansiosa': 'Anxious',
  'Cansada': 'Tired',
};

export function SymptomFrequencyCard({ metricas }: SymptomFrequencyCardProps) {
  if (!metricas) return null;

  const temSintomas = metricas.sintomasFrequentes.length > 0;
  const temHumor = Boolean(metricas.humorPredominante);

  return (
    <>
      {/* Sintomas mais frequentes */}
      <View style={insightsStyles.symptomsCard}>
        <Text style={insightsStyles.sectionTitle}>Most frequent symptoms</Text>

        {temSintomas ? (
          metricas.sintomasFrequentes.map((item, index) => {
            const nomeSintoma = symptomTranslations[item.sintoma] || item.sintoma;
            const nomeFase = phaseTranslations[item.fasePredominante] || item.fasePredominante;

            return (
              <View
                key={item.sintoma}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 9,
                }}
              >
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: cycleColors.roseSoft,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: cycleColors.rose,
                      fontWeight: '800',
                      fontSize: 12,
                    }}
                  >
                    {index + 1}
                  </Text>
                </View>

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={insightsStyles.eventTitle}>{nomeSintoma}</Text>
                  <Text style={insightsStyles.eventDate}>
                    {item.contagem} {item.contagem === 1 ? 'log' : 'logs'} • Phase:{' '}
                    {nomeFase}
                  </Text>
                </View>

                <Ionicons name="pulse" size={18} color={cycleColors.rose} />
              </View>
            );
          })
        ) : (
          <Text style={{ color: '#B8B8B8', fontSize: 14, lineHeight: 21 }}>
            No symptoms recorded yet. As you log in the Calendar, your body patterns will appear here.
          </Text>
        )}
      </View>

      {/* Humor predominante */}
      {temHumor && (
        <View style={insightsStyles.moodCard}>
          <Text style={insightsStyles.sectionTitle}>Observed mood</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: 'rgba(217, 154, 136, 0.2)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="heart" size={22} color={cycleColors.rose} />
            </View>

            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={{ color: cycleColors.textMuted, fontSize: 12, textTransform: 'uppercase' }}>
                PREDOMINANT MOOD
              </Text>
              <Text style={{ color: cycleColors.text, fontSize: 17, fontWeight: '700', marginTop: 2 }}>
                {metricas.humorPredominante ? (moodTranslations[metricas.humorPredominante] || metricas.humorPredominante) : ''}
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
}
