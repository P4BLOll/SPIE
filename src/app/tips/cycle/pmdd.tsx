import React from 'react';

import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Background } from '../../../components/Background';
import { Colors } from '../../../constants/Colors';
import { tipsDetailStyles } from '../../../styles/tips-detail.styles';

export default function PMDDscreen() {

  return (
    <Background>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tipsDetailStyles.container}
      >

        <TouchableOpacity
          style={tipsDetailStyles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={25}
            color={Colors.text}
          />
        </TouchableOpacity>

        <View style={tipsDetailStyles.header}>

          <Ionicons
            name="heart-outline"
            size={55}
            color="#EC4899"
          />

          <Text style={tipsDetailStyles.title}>
            TDPM
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda o Transtorno Disfórico Pré-Menstrual,
            seus sintomas e quando procurar ajuda.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é TDPM?
          </Text>

          <Text style={tipsDetailStyles.text}>
            TDPM significa Transtorno Disfórico
            Pré-Menstrual.

            {'\n\n'}

            É uma condição relacionada ao ciclo menstrual
            que pode provocar sintomas emocionais e físicos
            intensos nos dias que antecedem a menstruação.

            {'\n\n'}

            Os sintomas podem interferir significativamente
            na rotina, nos relacionamentos, nos estudos
            ou no trabalho.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            TDPM x TPM
          </Text>

          <Text style={tipsDetailStyles.text}>
            TPM e TDPM não são exatamente a mesma coisa.

            {'\n\n'}

            A TPM pode provocar alterações físicas e
            emocionais antes da menstruação.

            {'\n\n'}

            No TDPM, os sintomas emocionais tendem a ser
            mais intensos e podem causar prejuízos
            significativos na vida cotidiana.

            {'\n\n'}

            Apenas um profissional pode fazer o diagnóstico
            corretamente.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Sintomas emocionais
          </Text>

          <Text style={tipsDetailStyles.text}>
            Podem aparecer:

            {'\n\n'}

            • Irritabilidade intensa;

            {'\n'}

            • Mudanças de humor;

            {'\n'}

            • Tristeza ou sensação de desesperança;

            {'\n'}

            • Ansiedade ou tensão;

            {'\n'}

            • Maior sensibilidade emocional;

            {'\n'}

            • Dificuldade de concentração;

            {'\n'}

            • Sensação de perda de controle;

            {'\n'}

            • Falta de interesse em atividades habituais.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Sintomas físicos
          </Text>

          <Text style={tipsDetailStyles.text}>
            Também podem ocorrer sintomas físicos, como:

            {'\n\n'}

            • Cólicas;

            {'\n'}

            • Inchaço;

            {'\n'}

            • Sensibilidade ou dor nas mamas;

            {'\n'}

            • Dor de cabeça;

            {'\n'}

            • Cansaço;

            {'\n'}

            • Alterações no sono;

            {'\n'}

            • Alterações no apetite.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Os sintomas acontecem durante todo o mês?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Normalmente, os sintomas do TDPM apresentam
            uma relação clara com o ciclo menstrual.

            {'\n\n'}

            Eles costumam aparecer durante a fase anterior
            à menstruação e melhorar após o início ou
            durante os primeiros dias do fluxo.

            {'\n\n'}

            Observar essa relação ao longo de vários ciclos
            pode ajudar o profissional de saúde na avaliação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como é feito o diagnóstico?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Não existe um único exame que confirme o TDPM.

            {'\n\n'}

            O diagnóstico é baseado principalmente nos
            sintomas, na intensidade deles e na relação
            com o ciclo menstrual.

            {'\n\n'}

            Registrar os sintomas durante vários ciclos
            pode ajudar a identificar um padrão.

            {'\n\n'}

            Outras condições que podem causar sintomas
            semelhantes também precisam ser consideradas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Tratamento e cuidados
          </Text>

          <Text style={tipsDetailStyles.text}>
            O tratamento depende da intensidade dos
            sintomas e das necessidades de cada pessoa.

            {'\n\n'}

            Podem ser considerados medicamentos,
            tratamentos hormonais e mudanças no estilo
            de vida.

            {'\n\n'}

            Atividade física regular, sono adequado,
            alimentação equilibrada e acompanhamento
            profissional podem fazer parte dos cuidados.

            {'\n\n'}

            Não é recomendado iniciar medicamentos
            por conta própria.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure um profissional de saúde se os sintomas:

            {'\n\n'}

            • Interferirem nos estudos ou trabalho;

            {'\n'}

            • Prejudicarem relacionamentos;

            {'\n'}

            • Causarem sofrimento emocional significativo;

            {'\n'}

            • Voltarem de forma intensa em vários ciclos;

            {'\n'}

            • Tornarem difícil realizar atividades
            normalmente.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Sintomas emocionais intensos relacionados ao
            ciclo menstrual não devem ser ignorados.
            Registrar os sintomas por alguns ciclos pode
            ajudar na avaliação profissional.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}