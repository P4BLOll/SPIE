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

export default function PregnancyWeeksScreen() {

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
            name="calendar-outline"
            size={55}
            color="#EC4899"
          />

          <Text style={tipsDetailStyles.title}>
            Semanas de gravidez
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda como a gestação é contada e o que
            acontece ao longo das semanas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como a gravidez é contada?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A idade gestacional geralmente é calculada
            em semanas a partir do primeiro dia da
            última menstruação.

            {'\n\n'}

            Isso significa que as primeiras semanas da
            contagem acontecem antes da fecundação.

            {'\n\n'}

            Quando a data da última menstruação não é
            conhecida ou não é confiável, o profissional
            de saúde pode utilizar outros métodos para
            estimar a idade gestacional.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Primeiro trimestre
          </Text>

          <Text style={tipsDetailStyles.text}>
            O primeiro trimestre corresponde às primeiras
            semanas da gestação.

            {'\n\n'}

            Nesse período acontecem mudanças importantes
            no desenvolvimento embrionário e na formação
            de diferentes estruturas do corpo.

            {'\n\n'}

            A gestante também pode apresentar sintomas
            como náuseas, cansaço e sensibilidade nas
            mamas.

            {'\n\n'}

            Algumas pessoas, porém, apresentam poucos
            sintomas ou nenhum sintoma perceptível.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Segundo trimestre
          </Text>

          <Text style={tipsDetailStyles.text}>
            Durante o segundo trimestre, o feto continua
            crescendo e desenvolvendo suas estruturas.

            {'\n\n'}

            Algumas pessoas percebem uma redução dos
            sintomas que ocorreram no início da gravidez.

            {'\n\n'}

            Com o avanço da gestação, a barriga também
            pode começar a ficar mais evidente.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Terceiro trimestre
          </Text>

          <Text style={tipsDetailStyles.text}>
            No terceiro trimestre, o bebê continua
            crescendo e ganhando peso.

            {'\n\n'}

            Os órgãos continuam amadurecendo e o corpo
            da gestante passa por novas mudanças enquanto
            se aproxima o momento do parto.

            {'\n\n'}

            Podem surgir maior cansaço, desconforto,
            dificuldade para dormir e maior frequência
            urinária.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Desenvolvimento ao longo das semanas
          </Text>

          <Text style={tipsDetailStyles.text}>
            A cada semana acontecem diferentes etapas
            do desenvolvimento.

            {'\n\n'}

            No início, ocorre a implantação e começa
            o desenvolvimento embrionário.

            {'\n\n'}

            Com o passar das semanas, estruturas como
            o coração, cérebro, membros e outros órgãos
            continuam se desenvolvendo.

            {'\n\n'}

            Mais tarde, o foco passa a ser principalmente
            o crescimento e o amadurecimento do bebê.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            A data provável do parto
          </Text>

          <Text style={tipsDetailStyles.text}>
            A data provável do parto é uma estimativa
            baseada na idade gestacional.

            {'\n\n'}

            Ela não significa que o parto necessariamente
            acontecerá naquele dia.

            {'\n\n'}

            O nascimento pode acontecer antes ou depois
            da data estimada, dependendo da evolução
            da gestação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Por que acompanhar as semanas?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A idade gestacional ajuda os profissionais
            de saúde a acompanhar o desenvolvimento
            da gravidez.

            {'\n\n'}

            Ela também auxilia na organização de exames,
            consultas e avaliações importantes durante
            o pré-natal.

            {'\n\n'}

            Por isso, é importante manter o acompanhamento
            regular da gestação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Cada gravidez é diferente
          </Text>

          <Text style={tipsDetailStyles.text}>
            O desenvolvimento pode apresentar pequenas
            diferenças entre as gestações.

            {'\n\n'}

            Comparações encontradas na internet não
            substituem o acompanhamento profissional.

            {'\n\n'}

            O pré-natal é a melhor forma de acompanhar
            individualmente a evolução da gestação.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            A idade gestacional é estimada em semanas
            e pode ser ajustada pelo profissional de
            saúde conforme as informações da gestação
            e os exames realizados.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}