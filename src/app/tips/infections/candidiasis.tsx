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

export default function CandidiasisScreen() {

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
            name="bug-outline"
            size={55}
            color="#A855F7"
          />

          <Text style={tipsDetailStyles.title}>
            Candidíase vaginal
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda o que é a candidíase, seus sintomas
            e quando procurar ajuda.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é candidíase?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A candidíase vaginal é uma infecção causada
            principalmente pelo crescimento excessivo de
            fungos do gênero Candida.

            {'\n\n'}

            Esses fungos podem fazer parte naturalmente
            da microbiota da região íntima. O problema
            acontece quando ocorre um desequilíbrio que
            favorece seu crescimento.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Principais sintomas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Os sintomas podem variar, mas os mais comuns
            incluem:

            {'\n\n'}

            • Coceira intensa na região íntima;

            {'\n'}

            • Vermelhidão;

            {'\n'}

            • Ardência;

            {'\n'}

            • Irritação;

            {'\n'}

            • Dor ou desconforto durante a relação sexual;

            {'\n'}

            • Ardência ao urinar, principalmente quando
            a região externa está irritada;

            {'\n'}

            • Corrimento branco e mais espesso em alguns
            casos.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O corrimento sempre aparece?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Não necessariamente.

            {'\n\n'}

            Algumas pessoas podem apresentar os sintomas
            principalmente na região externa, enquanto
            outras podem apresentar alterações na secreção.

            {'\n\n'}

            Por isso, a ausência de corrimento não significa
            necessariamente que não exista candidíase.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que pode favorecer a candidíase?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Alguns fatores podem favorecer o crescimento
            excessivo do fungo, como:

            {'\n\n'}

            • Uso recente de alguns antibióticos;

            {'\n'}

            • Alterações hormonais;

            {'\n'}

            • Diabetes não controlada;

            {'\n'}

            • Sistema imunológico enfraquecido;

            {'\n'}

            • Outros fatores que alterem o equilíbrio
            da microbiota vaginal.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Candidíase é uma IST?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A candidíase vaginal não é considerada uma
            infecção sexualmente transmissível.

            {'\n\n'}

            Ela pode ocorrer mesmo em pessoas que não
            tiveram relações sexuais.

            {'\n\n'}

            Entretanto, atividade sexual pode estar associada
            à irritação ou ao aparecimento dos sintomas
            em algumas situações.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Tratamento
          </Text>

          <Text style={tipsDetailStyles.text}>
            O tratamento depende da avaliação da causa e
            pode envolver medicamentos antifúngicos.

            {'\n\n'}

            É importante não utilizar medicamentos por
            conta própria, principalmente porque outras
            infecções podem apresentar sintomas semelhantes.

            {'\n\n'}

            Quando os episódios são frequentes ou os
            sintomas não melhoram, uma avaliação médica
            é especialmente importante.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure orientação profissional se:

            {'\n\n'}

            • For a primeira vez que você apresenta esses
            sintomas;

            {'\n'}

            • Os sintomas forem intensos;

            {'\n'}

            • O tratamento não funcionar;

            {'\n'}

            • Os sintomas retornarem frequentemente;

            {'\n'}

            • Houver febre ou dor pélvica;

            {'\n'}

            • Existirem feridas ou lesões;

            {'\n'}

            • Houver dúvidas sobre a causa dos sintomas.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Coceira e corrimento podem acontecer em várias
            condições diferentes. Evite assumir que todo
            corrimento branco é candidíase. A avaliação
            profissional ajuda a identificar a causa correta.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}