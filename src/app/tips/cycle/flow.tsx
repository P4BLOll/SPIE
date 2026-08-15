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

export default function FlowScreen() {

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
            name="water-outline"
            size={55}
            color="#EF4444"
          />

          <Text style={tipsDetailStyles.title}>
            Fluxo menstrual
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda as variações da quantidade de sangue
            durante a menstruação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é o fluxo menstrual?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O fluxo menstrual corresponde à quantidade de
            sangue e tecido eliminado durante a menstruação.

            {'\n\n'}

            A quantidade pode mudar ao longo dos dias.
            Geralmente, o fluxo pode ser diferente no início,
            no meio e no final da menstruação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Fluxo leve
          </Text>

          <Text style={tipsDetailStyles.text}>
            Um fluxo leve apresenta uma pequena quantidade
            de sangue.

            {'\n\n'}

            Pode acontecer no início ou no final da
            menstruação e também pode fazer parte do
            padrão normal de algumas pessoas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Fluxo moderado
          </Text>

          <Text style={tipsDetailStyles.text}>
            Um fluxo moderado apresenta uma quantidade
            intermediária de sangue.

            {'\n\n'}

            Para algumas pessoas, essa pode ser a
            característica predominante durante boa parte
            da menstruação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Fluxo intenso
          </Text>

          <Text style={tipsDetailStyles.text}>
            Um fluxo intenso apresenta uma quantidade
            maior de sangue e pode exigir trocas mais
            frequentes do produto menstrual.

            {'\n\n'}

            O que é considerado intenso pode variar,
            mas mudanças importantes em relação ao seu
            padrão habitual merecem atenção.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O fluxo pode mudar durante o ciclo?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Sim.

            {'\n\n'}

            É comum que a quantidade de sangue varie
            durante os dias da menstruação.

            {'\n\n'}

            Algumas pessoas apresentam maior fluxo nos
            primeiros dias e uma redução gradual depois.
            Outras podem apresentar padrões diferentes.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando o fluxo merece atenção?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure orientação profissional se houver:

            {'\n\n'}

            • Sangramento muito intenso;

            {'\n'}

            • Necessidade de trocar o produto menstrual
            com frequência incomum;

            {'\n'}

            • Sangramento que dura muito mais tempo
            do que o habitual;

            {'\n'}

            • Coágulos grandes ou frequentes;

            {'\n'}

            • Cansaço, fraqueza ou tontura associados
            ao sangramento;

            {'\n'}

            • Mudança persistente no padrão menstrual.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Acompanhar o fluxo
          </Text>

          <Text style={tipsDetailStyles.text}>
            Observar a quantidade e a duração do
            sangramento pode ajudar você a conhecer
            melhor seu padrão menstrual.

            {'\n\n'}

            Registrar essas informações no SPIE também
            pode facilitar a identificação de mudanças
            ao longo dos ciclos.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Não existe uma quantidade de fluxo exatamente
            igual para todas as pessoas. O mais importante
            é conhecer o seu padrão e observar mudanças
            significativas ou persistentes.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}

