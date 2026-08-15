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

export default function ClotsScreen() {

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
            color="#DC2626"
          />

          <Text style={tipsDetailStyles.title}>
            Coágulos menstruais
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda por que os coágulos podem aparecer
            durante a menstruação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que são coágulos menstruais?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Coágulos menstruais são pequenas massas que
            podem aparecer junto ao sangue durante a
            menstruação.

            {'\n\n'}

            Eles podem ser formados por uma combinação
            de sangue e partes do endométrio que estão
            sendo eliminadas pelo útero.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Por que eles aparecem?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Durante um fluxo mais intenso, o sangue pode
            ser eliminado mais rapidamente do que o
            organismo consegue impedir sua coagulação.

            {'\n\n'}

            Por isso, pequenos coágulos podem aparecer
            principalmente nos dias de maior fluxo.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Coágulos pequenos
          </Text>

          <Text style={tipsDetailStyles.text}>
            Pequenos coágulos podem acontecer durante a
            menstruação e, isoladamente, nem sempre
            indicam um problema.

            {'\n\n'}

            Eles podem ser mais perceptíveis durante os
            dias em que o fluxo está mais intenso.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando os coágulos merecem atenção?
          </Text>

          <Text style={tipsDetailStyles.text}>
            É importante procurar orientação profissional
            quando os coágulos:

            {'\n\n'}

            • São grandes ou aparecem com frequência;

            {'\n'}

            • Surgem junto com sangramento muito intenso;

            {'\n'}

            • Estão associados a dor muito forte;

            {'\n'}

            • Aparecem acompanhados de tontura ou fraqueza;

            {'\n'}

            • Representam uma mudança importante em
            relação ao seu padrão habitual.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Coágulos e fluxo intenso
          </Text>

          <Text style={tipsDetailStyles.text}>
            A presença de coágulos pode estar relacionada
            a um fluxo menstrual mais intenso.

            {'\n\n'}

            Quando o sangramento é muito intenso ou
            interfere nas atividades do dia a dia, é
            importante investigar a causa.

            {'\n\n'}

            Algumas condições ginecológicas podem estar
            associadas a sangramentos intensos, por isso
            uma avaliação profissional pode ser necessária.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que observar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Ao acompanhar sua menstruação, observe:

            {'\n\n'}

            • Frequência dos coágulos;

            {'\n'}

            • Tamanho aproximado;

            {'\n'}

            • Intensidade do fluxo;

            {'\n'}

            • Presença de dor;

            {'\n'}

            • Mudanças em relação aos ciclos anteriores.

            {'\n\n'}

            Essas informações podem ser úteis caso seja
            necessário conversar com um profissional
            de saúde.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Pequenos coágulos podem ocorrer durante a
            menstruação, especialmente em períodos de
            maior fluxo. Coágulos grandes, frequentes ou
            acompanhados de sintomas importantes devem
            ser avaliados por um profissional.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}

