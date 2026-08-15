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

export default function AdenomyosisScreen() {

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
            name="medkit-outline"
            size={55}
            color="#A855F7"
          />

          <Text style={tipsDetailStyles.title}>
            Adenomiose
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda essa condição do útero, seus sintomas
            e quando procurar avaliação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é adenomiose?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A adenomiose é uma condição em que o tecido
            semelhante ao endométrio cresce dentro da
            parede muscular do útero.

            {'\n\n'}

            Esse tecido pode responder às alterações
            hormonais do ciclo menstrual e provocar
            inflamação, aumento do útero e dor.

            {'\n\n'}

            A intensidade dos sintomas pode variar bastante
            entre as pessoas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Principais sintomas
          </Text>

          <Text style={tipsDetailStyles.text}>
            A adenomiose pode causar:

            {'\n\n'}

            • Cólicas menstruais intensas;

            {'\n'}

            • Sangramento menstrual intenso;

            {'\n'}

            • Menstruação prolongada;

            {'\n'}

            • Dor pélvica;

            {'\n'}

            • Dor durante as relações sexuais;

            {'\n'}

            • Sensação de pressão ou peso na pelve;

            {'\n'}

            • Aumento da sensibilidade durante a menstruação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Adenomiose pode não causar sintomas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas pessoas com adenomiose não apresentam
            sintomas perceptíveis.

            {'\n\n'}

            Em outras, a condição pode provocar dores
            importantes e alterações no fluxo menstrual.

            {'\n\n'}

            Por isso, a intensidade dos sintomas varia
            bastante de uma pessoa para outra.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Adenomiose x Endometriose
          </Text>

          <Text style={tipsDetailStyles.text}>
            As duas condições envolvem tecido semelhante
            ao endométrio, mas não são a mesma doença.

            {'\n\n'}

            Na adenomiose, esse tecido cresce dentro da
            parede muscular do útero.

            {'\n\n'}

            Na endometriose, o tecido semelhante ao
            endométrio aparece fora do útero.

            {'\n\n'}

            Uma mesma pessoa pode apresentar as duas
            condições ao mesmo tempo.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Sangramento intenso
          </Text>

          <Text style={tipsDetailStyles.text}>
            O aumento do fluxo menstrual pode acontecer
            em pessoas com adenomiose.

            {'\n\n'}

            Sangramentos muito intensos ou prolongados
            podem contribuir para anemia.

            {'\n\n'}

            Cansaço excessivo, fraqueza ou falta de energia
            associados a sangramentos frequentes merecem
            avaliação profissional.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como é feito o diagnóstico?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O diagnóstico começa com a avaliação dos
            sintomas e do histórico menstrual.

            {'\n\n'}

            Exames de imagem, principalmente ultrassonografia
            e, em alguns casos, ressonância magnética,
            podem ajudar na investigação.

            {'\n\n'}

            A avaliação deve ser feita por um profissional
            de saúde.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Tratamento
          </Text>

          <Text style={tipsDetailStyles.text}>
            O tratamento depende dos sintomas, da idade,
            dos objetivos reprodutivos e de outros fatores.

            {'\n\n'}

            Podem ser utilizados medicamentos para controlar
            a dor e o sangramento, incluindo opções hormonais.

            {'\n\n'}

            Em casos específicos, outros procedimentos podem
            ser considerados.

            {'\n\n'}

            A escolha do tratamento deve ser feita com
            orientação profissional.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure avaliação se houver:

            {'\n\n'}

            • Cólicas muito fortes;

            {'\n'}

            • Sangramento menstrual muito intenso;

            {'\n'}

            • Menstruação prolongada;

            {'\n'}

            • Dor pélvica persistente;

            {'\n'}

            • Dor durante relações sexuais;

            {'\n'}

            • Cansaço ou fraqueza associados a sangramentos;

            {'\n'}

            • Alterações menstruais que interferem na rotina.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Cólicas muito intensas e sangramentos que
            interferem na rotina não devem ser simplesmente
            normalizados. Uma avaliação profissional pode
            ajudar a identificar a causa dos sintomas.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}