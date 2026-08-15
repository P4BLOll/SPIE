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

export default function MenstrualPhaseScreen() {

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
            color="#E91E63"
          />

          <Text style={tipsDetailStyles.title}>
            Fase menstrual
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda o que acontece no corpo durante a menstruação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é a fase menstrual?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A fase menstrual é o período em que ocorre a
            eliminação do revestimento interno do útero,
            conhecido como endométrio.

            {'\n\n'}

            Esse processo acontece quando não ocorre uma
            gravidez e os níveis de determinados hormônios
            diminuem, levando ao início do sangramento
            menstrual.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que acontece no corpo?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Durante essa fase, o útero elimina o endométrio
            que havia se preparado ao longo do ciclo.

            {'\n\n'}

            Os níveis de estrogênio e progesterona ficam
            mais baixos, e um novo ciclo menstrual começa.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Sintomas comuns
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas pessoas podem apresentar:

            {'\n\n'}

            • Cólicas ou desconforto abdominal;

            {'\n'}

            • Cansaço;

            {'\n'}

            • Dor nas costas;

            {'\n'}

            • Sensibilidade nas mamas;

            {'\n'}

            • Alterações de humor;

            {'\n'}

            • Dor de cabeça;

            {'\n'}

            • Inchaço.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quanto tempo dura?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A duração da menstruação pode variar de pessoa
            para pessoa e também entre diferentes ciclos.

            {'\n\n'}

            Por isso, pequenas diferenças na duração ou no
            fluxo podem acontecer sem necessariamente
            significarem um problema de saúde.

            {'\n\n'}

            Observar o próprio padrão ao longo dos ciclos
            pode ajudar a identificar mudanças importantes.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Cuidados durante a menstruação
          </Text>

          <Text style={tipsDetailStyles.text}>
            Durante esse período, alguns cuidados podem
            ajudar no bem-estar:

            {'\n\n'}

            • Manter uma boa hidratação;

            {'\n'}

            • Ter uma alimentação equilibrada;

            {'\n'}

            • Descansar quando necessário;

            {'\n'}

            • Praticar atividades físicas de acordo com
            sua disposição;

            {'\n'}

            • Manter uma boa higiene menstrual;

            {'\n'}

            • Observar mudanças diferentes do seu padrão
            habitual.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure orientação profissional se apresentar:

            {'\n\n'}

            • Sangramento muito intenso;

            {'\n'}

            • Dor forte ou incapacitante;

            {'\n'}

            • Sangramento por um período muito diferente
            do habitual;

            {'\n'}

            • Tontura ou fraqueza associada ao sangramento;

            {'\n'}

            • Mudanças persistentes no padrão menstrual.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Cada pessoa possui um ciclo menstrual diferente.
            Conhecer o seu próprio padrão ajuda a perceber
            mudanças e conversar melhor com um profissional
            de saúde quando necessário.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}

