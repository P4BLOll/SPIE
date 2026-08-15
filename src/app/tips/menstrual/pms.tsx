
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

export default function PMSScreen() {

  return (

    <Background>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          tipsDetailStyles.container
        }
      >

        <TouchableOpacity
          style={tipsDetailStyles.backButton}
          onPress={() =>
            router.back()
          }
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
            TPM
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda as mudanças que podem acontecer antes
            da menstruação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é a TPM?
          </Text>

          <Text style={tipsDetailStyles.text}>
            TPM significa Tensão Pré-Menstrual.

            {'\n\n'}

            É o conjunto de sintomas físicos e emocionais
            que algumas pessoas podem apresentar nos dias
            ou semanas anteriores à menstruação.

            {'\n\n'}

            Esses sintomas estão relacionados às mudanças
            hormonais que acontecem durante o ciclo menstrual.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Sintomas físicos
          </Text>

          <Text style={tipsDetailStyles.text}>
            A TPM pode causar diferentes sintomas físicos,
            como:

            {'\n\n'}

            • Inchaço;

            {'\n'}

            • Sensibilidade ou dor nas mamas;

            {'\n'}

            • Cólicas;

            {'\n'}

            • Dor de cabeça;

            {'\n'}

            • Cansaço;

            {'\n'}

            • Alterações no apetite;

            {'\n'}

            • Maior retenção de líquidos.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Sintomas emocionais
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas pessoas também podem apresentar
            alterações emocionais, como:

            {'\n\n'}

            • Irritabilidade;

            {'\n'}

            • Ansiedade;

            {'\n'}

            • Tristeza;

            {'\n'}

            • Mudanças de humor;

            {'\n'}

            • Maior sensibilidade emocional;

            {'\n'}

            • Dificuldade de concentração.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando os sintomas aparecem?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Os sintomas geralmente aparecem durante a fase
            lútea, após a ovulação e antes da menstruação.

            {'\n\n'}

            Eles podem melhorar ou desaparecer depois que
            a menstruação começa.

            {'\n\n'}

            A intensidade e a combinação de sintomas podem
            variar bastante entre as pessoas e entre os ciclos.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que pode ajudar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Alguns hábitos podem contribuir para o bem-estar
            durante esse período:

            {'\n\n'}

            • Ter uma alimentação equilibrada;

            {'\n'}

            • Manter uma boa hidratação;

            {'\n'}

            • Praticar atividades físicas;

            {'\n'}

            • Dormir adequadamente;

            {'\n'}

            • Reservar momentos para descanso;

            {'\n'}

            • Acompanhar os sintomas ao longo dos ciclos.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure orientação profissional se os sintomas:

            {'\n\n'}

            • Forem muito intensos;

            {'\n'}

            • Interferirem nas atividades do dia a dia;

            {'\n'}

            • Afetarem significativamente seu bem-estar;

            {'\n'}

            • Apresentarem mudanças importantes em relação
            ao seu padrão habitual;

            {'\n'}

            • Persistirem fora do período em que normalmente
            aparecem.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            TPM não é igual para todas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas pessoas apresentam muitos sintomas,
            enquanto outras apresentam poucos ou nenhum.

            {'\n\n'}

            Também é possível que os sintomas mudem ao
            longo dos meses.

            {'\n\n'}

            Por isso, acompanhar seu próprio padrão pode
            ajudar a entender melhor como seu corpo reage
            às diferentes fases do ciclo.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            A TPM é diferente de uma pessoa para outra.
            Sintomas muito intensos que interferem na rotina
            merecem avaliação profissional, especialmente
            quando se repetem ao longo dos ciclos.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}

