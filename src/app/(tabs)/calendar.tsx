import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
  Modal,
  Animated,
} from 'react-native';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCycle } from '@/context/CycleContext';
import { Background } from '@/components/Background';
import { calendarStyles, cycleColors, TAB_BAR_BASE_HEIGHT } from '@/styles/calendar.styles';

// =====================================
// CONFIGURAÇÃO PADRÃO DO CICLO
// =====================================

const CICLO_MEDIO = 28;
const DURACAO_MENSTRUACAO = 5;

// =====================================
// CONFIGURAÇÃO PORTUGUÊS
// =====================================

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ],
  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
  ],
  dayNames: [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
    'Quinta-feira', 'Sexta-feira', 'Sábado',
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'pt-br';

// =====================================
// ROTAS
// =====================================
// Ajuste esses caminhos para bater com as rotas reais do seu app.

const ROTA_PERFIL = '../profile';
const ROTA_EDITAR_CALENDARIO = '/calendar/register-period';

// =====================================
// BOTÃO ANIMADO (feedback de toque)
// =====================================
// Encolhe suavemente ao ser pressionado. Usado nos ícones do
// topo e nos cards de ação de "hoje".

function AnimatedPressable({
  style,
  onPress,
  children,
}: {
  style?: any;
  onPress?: () => void;
  children: React.ReactNode;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  function handlePressIn() {
    Animated.spring(scale, {
      toValue: 0.94,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  }

  function handlePressOut() {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  }

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

export default function CalendarScreen() {

  // NOTA: continuo sem o CycleContext real, então leio "registros"
  // de forma defensiva (com fallback para {}). Veja o comentário no
  // fim do arquivo com a extensão sugerida para o context.
  const cycle = useCycle() as any;
  const { ultimaMenstruacao, setUltimaMenstruacao } = cycle;
  const registros: Record<string, { sintomas?: string[]; secrecao?: string }> =
    cycle.registros ?? {};

  const insets = useSafeAreaInsets();
  const espacoParaTabBar = TAB_BAR_BASE_HEIGHT + insets.bottom + 24;

  const hoje = new Date();
  const hojeString = hoje.toISOString().split('T')[0];

  const diaAtual = hoje.getDate();
  const mesAtual = hoje.toLocaleDateString('pt-BR', { month: 'long' });
  const mesAtualFormatado = mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1);

  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null);

  // =====================================
  // ANIMAÇÕES DE ENTRADA
  // =====================================

  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-8)).current;
  const contentFade = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(16)).current;
  const actionAnims = useRef([0, 1, 2].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, { toValue: 1, duration: 420, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 420, useNativeDriver: true }),
    ]).start();

    Animated.timing(contentFade, {
      toValue: 1, duration: 480, delay: 120, useNativeDriver: true,
    }).start();
    Animated.timing(contentSlide, {
      toValue: 0, duration: 480, delay: 120, useNativeDriver: true,
    }).start();

    Animated.stagger(
      90,
      actionAnims.map((anim) =>
        Animated.timing(anim, { toValue: 1, duration: 400, useNativeDriver: true })
      )
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =====================================
  // DIA DO CICLO
  // =====================================

  const diaDoCiclo = useMemo(() => {
    if (!ultimaMenstruacao) return null;

    const inicio = new Date(ultimaMenstruacao);
    const agora = new Date();
    const diferenca = Math.floor((agora.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));

    return diferenca + 1;
  }, [ultimaMenstruacao]);

  // =====================================
  // PRÓXIMA MENSTRUAÇÃO
  // =====================================

  const proximaMenstruacao = useMemo(() => {
    if (!ultimaMenstruacao) return null;

    const data = new Date(ultimaMenstruacao);
    data.setDate(data.getDate() + CICLO_MEDIO);

    return data.toLocaleDateString('pt-BR');
  }, [ultimaMenstruacao]);

  // =====================================
  // ATRASO
  // =====================================

  const atraso = useMemo(() => {
    if (!proximaMenstruacao) return null;

    const prevista = new Date(proximaMenstruacao.split('/').reverse().join('-'));
    const hoje = new Date();
    const dias = Math.floor((hoje.getTime() - prevista.getTime()) / (1000 * 60 * 60 * 24));

    return dias > 0 ? dias : null;
  }, [proximaMenstruacao]);

  // =====================================
  // CLASSIFICAÇÃO DOS DIAS
  // =====================================
  // Marca, para cada dia dos próximos ciclos, se é dia de
  // menstruação, período fértil e/ou ovulação. Usado tanto para
  // colorir o calendário quanto para o modal de detalhes do dia.

  const classificacaoDias = useMemo(() => {
    const classificacao: Record<string, { menstruacao?: boolean; fertil?: boolean; ovulacao?: boolean }> = {};

    if (!ultimaMenstruacao) return classificacao;

    const inicio = new Date(ultimaMenstruacao);

    for (let ciclo = 0; ciclo < 6; ciclo++) {
      const inicioCiclo = new Date(inicio);
      inicioCiclo.setDate(inicioCiclo.getDate() + (CICLO_MEDIO * ciclo));

      // menstruação
      for (let i = 0; i < DURACAO_MENSTRUACAO; i++) {
        const dia = new Date(inicioCiclo);
        dia.setDate(dia.getDate() + i);
        const chave = dia.toISOString().split('T')[0];
        classificacao[chave] = { ...classificacao[chave], menstruacao: true };
      }

      // ovulação — aproximada: 14 dias antes da próxima menstruação
      const ovulacao = new Date(inicioCiclo);
      const diaOvulacao = CICLO_MEDIO - 14;
      ovulacao.setDate(ovulacao.getDate() + diaOvulacao);

      // período fértil — 2 dias antes e depois da ovulação
      for (let i = -2; i <= 2; i++) {
        const fertil = new Date(ovulacao);
        fertil.setDate(fertil.getDate() + i);
        const chave = fertil.toISOString().split('T')[0];
        classificacao[chave] = { ...classificacao[chave], fertil: true };
      }

      const chaveOvulacao = ovulacao.toISOString().split('T')[0];
      classificacao[chaveOvulacao] = { ...classificacao[chaveOvulacao], ovulacao: true };
    }

    return classificacao;
  }, [ultimaMenstruacao]);

  // =====================================
  // MARCAÇÕES DO CALENDÁRIO
  // =====================================

  const markedDates = useMemo(() => {
    const marks: any = {};

    Object.keys(classificacaoDias).forEach((chave) => {
      const { menstruacao, ovulacao, fertil } = classificacaoDias[chave];

      let backgroundColor: string | null = null;
      let textColor = '#FFFFFF';

      if (menstruacao) {
        backgroundColor = cycleColors.rose;
      } else if (ovulacao) {
        backgroundColor = cycleColors.gold;
        textColor = cycleColors.surfaceAlt;
      } else if (fertil) {
        backgroundColor = cycleColors.lavender;
      }

      if (backgroundColor) {
        marks[chave] = {
          customStyles: {
            container: { backgroundColor, borderRadius: 20 },
            text: { color: textColor, fontWeight: 'bold' },
          },
        };
      }
    });

    // dias com sintomas/secreção registrados ganham uma marcação extra
    Object.keys(registros).forEach((chave) => {
      const temDados = (registros[chave]?.sintomas?.length ?? 0) > 0 || !!registros[chave]?.secrecao;
      if (!temDados) return;

      marks[chave] = {
        ...marks[chave],
        customStyles: {
          container: {
            ...marks[chave]?.customStyles?.container,
            borderBottomWidth: 3,
            borderBottomColor: cycleColors.teal,
          },
          text: {
            color: marks[chave]?.customStyles?.text?.color ?? cycleColors.text,
            fontWeight: 'bold',
          },
        },
      };
    });

    // dia atual — sempre com destaque próprio
    marks[hojeString] = {
      ...marks[hojeString],
      customStyles: {
        ...marks[hojeString]?.customStyles,
        container: {
          ...marks[hojeString]?.customStyles?.container,
          borderWidth: 2,
          borderColor: cycleColors.teal,
          borderRadius: 20,
        },
        text: {
          ...marks[hojeString]?.customStyles?.text,
          color: marks[hojeString]?.customStyles?.container?.backgroundColor
            ? (marks[hojeString]?.customStyles?.text?.color ?? '#FFFFFF')
            : cycleColors.teal,
          fontWeight: 'bold',
        },
      },
    };

    return marks;
  }, [classificacaoDias, registros, hojeString]);

  // =====================================
  // REGISTRAR MENSTRUAÇÃO
  // =====================================

  function registrarMenstruacao(data: string) {
    Alert.alert(
      'Registrar menstruação',
      `Deseja registrar ${new Date(data).toLocaleDateString('pt-BR')} como início da menstruação?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Registrar',
          onPress: () => {
            setUltimaMenstruacao(data);
            setDiaSelecionado(null);
          },
        },
      ]
    );
  }

  const infoDiaSelecionado = diaSelecionado ? classificacaoDias[diaSelecionado] : null;
  const registroDiaSelecionado = diaSelecionado ? registros[diaSelecionado] : null;
  const temAlgumRegistro =
    !!infoDiaSelecionado?.menstruacao ||
    (registroDiaSelecionado?.sintomas?.length ?? 0) > 0 ||
    !!registroDiaSelecionado?.secrecao;

  return (
    <Background>
      <View style={calendarStyles.root}>

        {/* TOPO FIXO: calendário | data | perfil */}

        <Animated.View
          style={[
            calendarStyles.fixedHeader,
            { opacity: headerFade, transform: [{ translateY: headerSlide }] },
          ]}
        >
          <AnimatedPressable
            style={calendarStyles.topBarIcon}
            onPress={() => router.push(ROTA_EDITAR_CALENDARIO)}
          >
            <Ionicons name="calendar-outline" size={24} color={cycleColors.text} />
          </AnimatedPressable>

          <View style={calendarStyles.dateRow}>
            <Text style={calendarStyles.dateDay}>{diaAtual}</Text>
            <Text style={calendarStyles.dateMonth}>de {mesAtualFormatado}</Text>
          </View>

          <AnimatedPressable
            style={calendarStyles.topBarIcon}
            onPress={() => router.push(ROTA_PERFIL)}
          >
            {/* Troque pelo <Image source={{ uri: fotoDoUsuario }} /> quando
                houver uma foto de perfil real disponível. */}
            <Ionicons name="person-circle-outline" size={30} color={cycleColors.text} />
          </AnimatedPressable>
        </Animated.View>

        {/* CONTEÚDO ROLÁVEL */}

        <ScrollView
          style={calendarStyles.scrollArea}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            calendarStyles.container,
            { paddingBottom: espacoParaTabBar },
          ]}
        >
          <Animated.View style={{ opacity: contentFade, transform: [{ translateY: contentSlide }] }}>

            {/* AVISO DE SEM REGISTRO — o calendário continua aparecendo embaixo */}

            {!ultimaMenstruacao && (
              <View style={calendarStyles.noRecordBanner}>
                <Ionicons name="water-outline" size={20} color={cycleColors.rose} />
                <Text style={calendarStyles.noRecordText}>
                  Nenhum registro de menstruação salvo ainda. Toque em um dia no calendário para começar.
                </Text>
              </View>
            )}

            {/* CALENDÁRIO */}

            <View style={calendarStyles.calendarCard}>
              <Calendar
                style={calendarStyles.calendar}
                markedDates={markedDates}
                markingType="custom"
                firstDay={1}
                hideExtraDays={false}
                enableSwipeMonths={true}
                theme={{
                  calendarBackground: cycleColors.surface,
                  backgroundColor: cycleColors.surface,
                  textSectionTitleColor: cycleColors.textMuted,
                  dayTextColor: cycleColors.text,
                  monthTextColor: cycleColors.text,
                  todayTextColor: cycleColors.teal,
                  arrowColor: cycleColors.gold,
                  textDisabledColor: '#4A3D50',
                  textMonthFontSize: 18,
                  textMonthFontWeight: '700',
                  textDayFontSize: 15,
                  textDayFontWeight: '600',
                }}
                onDayPress={(day) => setDiaSelecionado(day.dateString)}
              />
            </View>

            {/* LEGENDA */}

            <View style={calendarStyles.legend}>
              <View style={calendarStyles.legendItem}>
                <View style={[calendarStyles.legendDot, { backgroundColor: cycleColors.rose }]} />
                <Text style={calendarStyles.legendText}>Menstruação</Text>
              </View>

              <View style={calendarStyles.legendItem}>
                <View style={[calendarStyles.legendDot, { backgroundColor: cycleColors.lavender }]} />
                <Text style={calendarStyles.legendText}>Período fértil</Text>
              </View>

              <View style={calendarStyles.legendItem}>
                <View style={[calendarStyles.legendDot, { backgroundColor: cycleColors.gold }]} />
                <Text style={calendarStyles.legendText}>Ovulação</Text>
              </View>

              <View style={calendarStyles.legendItem}>
                <View style={[calendarStyles.legendDot, { backgroundColor: cycleColors.teal }]} />
                <Text style={calendarStyles.legendText}>Hoje</Text>
              </View>
            </View>

            {/* SEÇÃO "HOJE" — AÇÕES DIÁRIAS */}

            <View style={calendarStyles.dailySection}>
              <Text style={calendarStyles.dailyEyebrow}>HOJE</Text>
              <Text style={calendarStyles.dailyTitle}>O que você quer registrar?</Text>

              <View style={calendarStyles.dailyActions}>
                {[
                  {
                    label: 'Menstruação',
                    icon: 'water',
                    bg: cycleColors.roseSoft,
                    iconBg: cycleColors.rose,
                    iconColor: '#FFFFFF',
                    onPress: () => router.push('/calendar/register-period'),
                  },
                  {
                    label: 'Sintomas',
                    icon: 'happy',
                    bg: cycleColors.goldSoft,
                    iconBg: cycleColors.gold,
                    iconColor: cycleColors.surfaceAlt,
                    onPress: () => router.push('/calendar/symptoms'),
                  },
                  {
                    label: 'Secreção',
                    icon: 'flask',
                    bg: cycleColors.lavenderSoft,
                    iconBg: cycleColors.lavender,
                    iconColor: '#FFFFFF',
                    onPress: () => router.push('/calendar/register-secretion'),
                  },
                ].map((acao, index) => (
                  <Animated.View
                    key={acao.label}
                    style={{
                      flex: 1,
                      opacity: actionAnims[index],
                      transform: [
                        {
                          translateY: actionAnims[index].interpolate({
                            inputRange: [0, 1],
                            outputRange: [16, 0],
                          }),
                        },
                      ],
                    }}
                  >
                    <AnimatedPressable
                      style={[calendarStyles.dailyActionCard, { backgroundColor: acao.bg }]}
                      onPress={acao.onPress}
                    >
                      <View style={[calendarStyles.dailyActionIcon, { backgroundColor: acao.iconBg }]}>
                        <Ionicons name={acao.icon as any} size={22} color={acao.iconColor} />
                      </View>
                      <Text style={calendarStyles.dailyActionText}>{acao.label}</Text>
                    </AnimatedPressable>
                  </Animated.View>
                ))}
              </View>
            </View>

            {/* INFORMAÇÕES DO CICLO */}

            {ultimaMenstruacao && (
              <View style={calendarStyles.infoCard}>
                <Text style={calendarStyles.infoTitle}>Informações do ciclo</Text>

                <View style={calendarStyles.infoRow}>
                  <Ionicons name="ellipse" size={20} color={cycleColors.gold} />
                  <Text style={calendarStyles.info}>Dia do ciclo:</Text>
                  <Text style={calendarStyles.value}>
                    {diaDoCiclo ? `Dia ${diaDoCiclo}` : '--'}
                  </Text>
                </View>

                <View style={calendarStyles.infoRow}>
                  <Ionicons name="water-outline" size={20} color={cycleColors.rose} />
                  <Text style={calendarStyles.info}>Última menstruação:</Text>
                  <Text style={calendarStyles.value}>
                    {new Date(ultimaMenstruacao).toLocaleDateString('pt-BR')}
                  </Text>
                </View>

                <View style={calendarStyles.infoRow}>
                  <Ionicons name="time-outline" size={20} color={cycleColors.teal} />
                  <Text style={calendarStyles.info}>Próxima:</Text>
                  <Text style={calendarStyles.value}>{proximaMenstruacao}</Text>
                </View>

                {atraso && (
                  <Text style={calendarStyles.delay}>
                    Seu ciclo está {atraso} dias além da previsão.
                  </Text>
                )}
              </View>
            )}

          </Animated.View>
        </ScrollView>
      </View>

      {/* MODAL — DETALHES DO DIA SELECIONADO */}

      <Modal
        visible={!!diaSelecionado}
        transparent
        animationType="slide"
        onRequestClose={() => setDiaSelecionado(null)}
      >
        <Pressable style={calendarStyles.modalOverlay} onPress={() => setDiaSelecionado(null)}>
          <Pressable style={calendarStyles.modalCard} onPress={() => {}}>
            <View style={calendarStyles.modalHandle} />

            <Text style={calendarStyles.modalTitle}>
              {diaSelecionado &&
                new Date(diaSelecionado).toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
            </Text>
            <Text style={calendarStyles.modalSubtitle}>Detalhes do dia</Text>

            {(infoDiaSelecionado?.menstruacao || infoDiaSelecionado?.ovulacao || infoDiaSelecionado?.fertil) && (
              <View style={calendarStyles.modalTagsRow}>
                {infoDiaSelecionado?.menstruacao && (
                  <View style={[calendarStyles.modalTag, { backgroundColor: cycleColors.roseSoft }]}>
                    <Ionicons name="water" size={14} color={cycleColors.rose} />
                    <Text style={calendarStyles.modalTagText}>Menstruação</Text>
                  </View>
                )}
                {infoDiaSelecionado?.ovulacao && (
                  <View style={[calendarStyles.modalTag, { backgroundColor: cycleColors.goldSoft }]}>
                    <Ionicons name="sunny" size={14} color={cycleColors.gold} />
                    <Text style={calendarStyles.modalTagText}>Ovulação</Text>
                  </View>
                )}
                {infoDiaSelecionado?.fertil && !infoDiaSelecionado?.ovulacao && (
                  <View style={[calendarStyles.modalTag, { backgroundColor: cycleColors.lavenderSoft }]}>
                    <Ionicons name="flower" size={14} color={cycleColors.lavender} />
                    <Text style={calendarStyles.modalTagText}>Período fértil</Text>
                  </View>
                )}
              </View>
            )}

            {(registroDiaSelecionado?.sintomas?.length ?? 0) > 0 && (
              <>
                <Text style={calendarStyles.modalSectionLabel}>SINTOMAS</Text>
                <View style={calendarStyles.modalChipsRow}>
                  {registroDiaSelecionado!.sintomas!.map((sintoma) => (
                    <View key={sintoma} style={calendarStyles.modalChip}>
                      <Text style={calendarStyles.modalChipText}>{sintoma}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}

            {registroDiaSelecionado?.secrecao && (
              <>
                <Text style={calendarStyles.modalSectionLabel}>SECREÇÃO</Text>
                <View style={calendarStyles.modalChipsRow}>
                  <View style={calendarStyles.modalChip}>
                    <Text style={calendarStyles.modalChipText}>{registroDiaSelecionado.secrecao}</Text>
                  </View>
                </View>
              </>
            )}

            {!temAlgumRegistro && (
              <Text style={calendarStyles.modalEmptyText}>Nada registrado neste dia ainda.</Text>
            )}

            {!infoDiaSelecionado?.menstruacao && (
              <AnimatedPressable
                style={calendarStyles.modalPrimaryButton}
                onPress={() => diaSelecionado && registrarMenstruacao(diaSelecionado)}
              >
                <Text style={calendarStyles.modalPrimaryButtonText}>
                  Registrar início da menstruação
                </Text>
              </AnimatedPressable>
            )}

            <TouchableOpacity
              style={calendarStyles.modalCloseButton}
              onPress={() => setDiaSelecionado(null)}
            >
              <Text style={calendarStyles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </Background>
  );
}
