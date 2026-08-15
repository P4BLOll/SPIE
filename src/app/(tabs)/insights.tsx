import React, { useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Background } from '@/components/Background';
import { useCycle } from '@/context/CycleContext';
import { cycleColors, TAB_BAR_BASE_HEIGHT } from '@/styles/calendar.styles';
import { insightsStyles } from '@/styles/insights.styles';

const CICLO_MEDIO = 28;

export default function InsightsScreen() {
  const cycle = useCycle() as any;
  const { ultimaMenstruacao } = cycle;

  const insets = useSafeAreaInsets();
  const espacoParaTabBar = TAB_BAR_BASE_HEIGHT + insets.bottom + 24;

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(25)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const diaDoCiclo = useMemo(() => {
    if (!ultimaMenstruacao) return 0;

    const inicio = new Date(ultimaMenstruacao);
    const hoje = new Date();

    const diferenca = Math.floor(
      (hoje.getTime() - inicio.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    return diferenca + 1;
  }, [ultimaMenstruacao]);

  const progresso = Math.min(
    (diaDoCiclo / CICLO_MEDIO) * 100,
    100
  );

  const proximaMenstruacao = useMemo(() => {
    if (!ultimaMenstruacao) return '--';

    const data = new Date(ultimaMenstruacao);

    data.setDate(data.getDate() + CICLO_MEDIO);

    return data.toLocaleDateString('pt-BR');
  }, [ultimaMenstruacao]);

  const ovulacao = useMemo(() => {
    if (!ultimaMenstruacao) return '--';

    const data = new Date(ultimaMenstruacao);

    data.setDate(data.getDate() + 14);

    return data.toLocaleDateString('pt-BR');
  }, [ultimaMenstruacao]);

  return (
    <Background>
      <SafeAreaView style={insightsStyles.screen} edges={['top', 'left', 'right']}>

        <View style={insightsStyles.topHeader}>
          <Text style={insightsStyles.title}>
            Insights
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: espacoParaTabBar,
          }}
        >

          <Animated.View
            style={[
              insightsStyles.container,
              {
                opacity: fade,
                transform: [
                  {
                    translateY: slide,
                  },
                ],
              },
            ]}
          >

            <Text style={insightsStyles.subtitle}>
              Conheça melhor seu ciclo menstrual
            </Text>

            {/* CARD PRINCIPAL */}

            <View style={insightsStyles.mainCard}>

              <View style={insightsStyles.mainHeader}>

                <Ionicons
                  name="heart"
                  color={cycleColors.rose}
                  size={28}
                />

                <Text style={insightsStyles.mainTitle}>
                  Seu ciclo
                </Text>

              </View>

              <Text style={insightsStyles.dayText}>
                Dia {diaDoCiclo}
              </Text>

              <View style={insightsStyles.progressBackground}>

                <View
                  style={[
                    insightsStyles.progressFill,
                    {
                      width: `${progresso}%`,
                    },
                  ]}
                />

              </View>

              <Text style={insightsStyles.progressText}>
                {Math.round(progresso)}% concluído
              </Text>

            </View>

            {/* ESTATÍSTICAS */}

            <View style={insightsStyles.statsGrid}>

              <View style={insightsStyles.statCard}>

                <Ionicons
                  name="calendar"
                  size={24}
                  color={cycleColors.gold}
                />

                <Text style={insightsStyles.statNumber}>
                  {CICLO_MEDIO}
                </Text>

                <Text style={insightsStyles.statLabel}>
                  Ciclo médio
                </Text>

              </View>

              <View style={insightsStyles.statCard}>

                <Ionicons
                  name="water"
                  size={24}
                  color={cycleColors.rose}
                />

                <Text style={insightsStyles.statNumber}>
                  5
                </Text>

                <Text style={insightsStyles.statLabel}>
                  Dias menstruada
                </Text>

              </View>

              <View style={insightsStyles.statCard}>

                <Ionicons
                  name="analytics"
                  size={24}
                  color={cycleColors.teal}
                />

                <Text style={insightsStyles.statNumber}>
                  92%
                </Text>

                <Text style={insightsStyles.statLabel}>
                  Regularidade
                </Text>

              </View>

              <View style={insightsStyles.statCard}>

                <Ionicons
                  name="sparkles"
                  size={24}
                  color={cycleColors.lavender}
                />

                <Text style={insightsStyles.statNumber}>
                  Alta
                </Text>

                <Text style={insightsStyles.statLabel}>
                  Precisão
                </Text>

              </View>

            </View>

            {/* PRÓXIMOS EVENTOS */}

            <View style={insightsStyles.eventsCard}>

              <Text style={insightsStyles.sectionTitle}>
                Próximos eventos
              </Text>

              <View style={insightsStyles.eventRow}>

                <Ionicons
                  name="flower"
                  size={22}
                  color={cycleColors.gold}
                />

                <View>

                  <Text style={insightsStyles.eventTitle}>
                    Ovulação
                  </Text>

                  <Text style={insightsStyles.eventDate}>
                    {ovulacao}
                  </Text>

                </View>

              </View>

              <View style={insightsStyles.divider} />

              <View style={insightsStyles.eventRow}>

                <Ionicons
                  name="water"
                  size={22}
                  color={cycleColors.rose}
                />

                <View>

                  <Text style={insightsStyles.eventTitle}>
                    Próxima menstruação
                  </Text>

                  <Text style={insightsStyles.eventDate}>
                    {proximaMenstruacao}
                  </Text>

                </View>

              </View>

            </View>

            {/* HISTÓRICO */}

            <View style={insightsStyles.historyCard}>

              <Text style={insightsStyles.sectionTitle}>
                Histórico dos últimos ciclos
              </Text>

              {[28, 30, 27, 29, 28, 31].map((valor, index) => (

                <View
                  key={index}
                  style={insightsStyles.historyRow}
                >

                  <Text style={insightsStyles.historyMonth}>
                    C{index + 1}
                  </Text>

                  <View
                    style={insightsStyles.historyBarBackground}
                  >

                    <View
                      style={[
                        insightsStyles.historyBar,
                        {
                          width: `${(valor / 35) * 100}%`,
                        },
                      ]}
                    />

                  </View>

                  <Text style={insightsStyles.historyValue}>
                    {valor} dias
                  </Text>

                </View>

              ))}

            </View>

            {/* SINTOMAS */}

            <View style={insightsStyles.symptomsCard}>

              <Text style={insightsStyles.sectionTitle}>
                Sintomas mais frequentes
              </Text>

              {[
                {
                  icon: "sad",
                  title: "Cólica",
                  value: 80,
                },
                {
                  icon: "medical",
                  title: "Dor de cabeça",
                  value: 60,
                },
                {
                  icon: "water",
                  title: "Inchaço",
                  value: 40,
                },
                {
                  icon: "moon",
                  title: "Cansaço",
                  value: 35,
                },
              ].map((item) => (

                <View
                  key={item.title}
                  style={insightsStyles.progressRow}
                >

                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={cycleColors.rose}
                  />

                  <Text style={insightsStyles.progressLabel}>
                    {item.title}
                  </Text>

                  <View
                    style={insightsStyles.progressSmallBackground}
                  >

                    <View
                      style={[
                        insightsStyles.progressSmallFill,
                        {
                          width: `${item.value}%`,
                        },
                      ]}
                    />

                  </View>

                </View>

              ))}

            </View>

            {/* HUMOR */}

            <View style={insightsStyles.moodCard}>

              <Text style={insightsStyles.sectionTitle}>
                Humor registrado
              </Text>

              <View style={insightsStyles.moodGrid}>

                <View style={insightsStyles.moodItem}>

                  <Text style={insightsStyles.emoji}>
                    😀
                  </Text>

                  <Text style={insightsStyles.moodText}>
                    Feliz
                  </Text>

                </View>

                <View style={insightsStyles.moodItem}>

                  <Text style={insightsStyles.emoji}>
                    😊
                  </Text>

                  <Text style={insightsStyles.moodText}>
                    Bem
                  </Text>

                </View>

                <View style={insightsStyles.moodItem}>

                  <Text style={insightsStyles.emoji}>
                    😐
                  </Text>

                  <Text style={insightsStyles.moodText}>
                    Normal
                  </Text>

                </View>

                <View style={insightsStyles.moodItem}>

                  <Text style={insightsStyles.emoji}>
                    😔
                  </Text>

                  <Text style={insightsStyles.moodText}>
                    Triste
                  </Text>

                </View>

              </View>

            </View>

            {/* INSIGHTS */}

            <View style={insightsStyles.insightCard}>

              <Text style={insightsStyles.sectionTitle}>
                Insights personalizados
              </Text>

              <View style={insightsStyles.tipRow}>

                <Ionicons
                  name="bulb"
                  size={22}
                  color={cycleColors.gold}
                />

                <Text style={insightsStyles.tipText}>
                  Seu ciclo está bastante regular.
                </Text>

              </View>

              <View style={insightsStyles.tipRow}>

                <Ionicons
                  name="heart"
                  size={22}
                  color={cycleColors.rose}
                />

                <Text style={insightsStyles.tipText}>
                  Você costuma registrar mais sintomas
                  nos primeiros dias da menstruação.
                </Text>

              </View>

              <View style={insightsStyles.tipRow}>

                <Ionicons
                  name="fitness"
                  size={22}
                  color={cycleColors.teal}
                />

                <Text style={insightsStyles.tipText}>
                  Continue registrando seus ciclos para
                  melhorar a precisão das previsões.
                </Text>

              </View>

            </View>

            {/* DICA */}

            <View style={insightsStyles.dailyTipCard}>

              <Text style={insightsStyles.sectionTitle}>
                Dica do dia
              </Text>

              <Text style={insightsStyles.dailyTipText}>
                Durante a fase lútea, alimentos ricos em
                magnésio e uma boa hidratação podem ajudar
                a aliviar cólicas e reduzir o inchaço.
              </Text>

            </View>

          </Animated.View>

        </ScrollView>
      </SafeAreaView>
    </Background>
  );

}