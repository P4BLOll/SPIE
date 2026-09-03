import React, { useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Background } from '@/components/Background';
import { useCycle } from '@/modules/cycle/hooks/useCycle';
import { useSmartInsights } from '@/modules/insights/hooks/useSmartInsights';
import { localInsightsEngine } from '@/modules/insights/services/localInsightsEngine';
import { CyclePhaseCard } from '@/components/insights/CyclePhaseCard';
import { SmartInsightsCard } from '@/components/insights/SmartInsightsCard';
import { UpcomingEventsCard } from '@/components/insights/UpcomingEventsCard';
import { SymptomFrequencyCard } from '@/components/insights/SymptomFrequencyCard';
import { cycleColors, TAB_BAR_BASE_HEIGHT } from '@/styles/calendar.styles';
import { insightsStyles } from '@/styles/insights.styles';

export default function InsightsScreen() {
  const {
    ultimaMenstruacao,
    duracaoCiclo,
    duracaoMenstruacao,
    registros,
    carregando: carregandoCiclo,
  } = useCycle();

  // 1. Cálculo síncrono instantâneo baseado no estado atual do ciclo
  const pacoteLocal = useMemo(() => {
    if (!ultimaMenstruacao) return null;
    return localInsightsEngine.gerarInsightLocal({
      ultimaMenstruacao,
      duracaoCiclo,
      duracaoMenstruacao,
      registros: registros || {},
    });
  }, [ultimaMenstruacao, duracaoCiclo, duracaoMenstruacao, registros]);

  // 2. Camada inteligente / Cloud Functions em segundo plano
  const {
    metricas: metricasCloud,
    insight: insightCloud,
    origem: origemCloud,
    carregando: carregandoIA,
    atualizando,
    recarregar,
  } = useSmartInsights(
    ultimaMenstruacao
      ? {
          ultimaMenstruacao,
          duracaoCiclo,
          duracaoMenstruacao,
          registros,
        }
      : null
  );

  const metricasFinais = metricasCloud ?? pacoteLocal?.metricas ?? null;
  const insightFinal = insightCloud ?? pacoteLocal?.insight ?? null;
  const origemFinal = origemCloud ?? pacoteLocal?.origem ?? 'fallback';
  const temCicloRegistrado = Boolean(ultimaMenstruacao);

  const insets = useSafeAreaInsets();
  const espacoParaTabBar = TAB_BAR_BASE_HEIGHT + insets.bottom + 24;

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Background>
      <SafeAreaView style={insightsStyles.screen} edges={['top', 'left', 'right']}>
        {/* Top Header */}
        <View style={insightsStyles.topHeader}>
          <Text style={insightsStyles.title}>Insights</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: espacoParaTabBar,
            flexGrow: 1,
          }}
          refreshControl={
            <RefreshControl
              refreshing={atualizando}
              onRefresh={recarregar}
              tintColor={cycleColors.rose}
              colors={[cycleColors.rose]}
            />
          }
        >
          <Animated.View
            style={[
              insightsStyles.container,
              {
                opacity: fade,
                transform: [{ translateY: slide }],
              },
            ]}
          >
            <Text style={insightsStyles.subtitle}>
              Padrões do seu ciclo e orientações personalizadas
            </Text>

            {carregandoCiclo ? (
              <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
                <ActivityIndicator size="large" color={cycleColors.rose} />
                <Text style={{ color: cycleColors.textMuted, marginTop: 12, fontSize: 14 }}>
                  Carregando dados do ciclo...
                </Text>
              </View>
            ) : (
              <>
                {/* 1. Card de Ciclo e Fase */}
                <CyclePhaseCard
                  metricas={metricasFinais}
                  temCicloRegistrado={temCicloRegistrado}
                />

                {/* 2. Card de Inteligência Artificial e Recomendações */}
                {temCicloRegistrado && (
                  <SmartInsightsCard
                    insight={insightFinal}
                    origem={origemFinal}
                    atualizando={atualizando}
                    onAtualizar={recarregar}
                  />
                )}

                {/* 3. Próximos Eventos (Ovulação, Menstruação, Período Fértil) */}
                {temCicloRegistrado && (
                  <UpcomingEventsCard metricas={metricasFinais} />
                )}

                {/* 4. Sintomas Frequentes e Humor Observado */}
                {temCicloRegistrado && (
                  <SymptomFrequencyCard metricas={metricasFinais} />
                )}

                {/* Aviso de Saúde Preventiva */}
                <View style={{ paddingHorizontal: 12, paddingBottom: 24, marginTop: 10 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: cycleColors.textMuted,
                      textAlign: 'center',
                      lineHeight: 18,
                    }}
                  >
                    O SPIE é uma ferramenta de suporte e acompanhamento de bem-estar. As informações exibidas não constituem diagnóstico ou prescrição médica.
                  </Text>
                </View>
              </>
            )}
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}