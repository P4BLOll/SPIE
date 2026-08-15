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

export default function CervicalMucusScreen() {

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
            name="water-outline"
            size={55}
            color="#14B8A6"
          />

          <Text style={tipsDetailStyles.title}>
            Muco cervical
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda como o muco muda ao longo do ciclo menstrual.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é o muco cervical?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O muco cervical é uma secreção produzida pelo colo do útero.

            {'\n\n'}

            Ele ajuda a proteger a vagina, manter sua lubrificação e também sofre mudanças naturais durante o ciclo menstrual.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Logo após a menstruação
          </Text>

          <Text style={tipsDetailStyles.text}>
            Nos dias seguintes à menstruação, algumas pessoas podem perceber pouca secreção ou uma sensação de ressecamento.

            {'\n\n'}

            Isso faz parte das variações naturais do ciclo.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Próximo da ovulação
          </Text>

          <Text style={tipsDetailStyles.text}>
            Conforme a ovulação se aproxima, o muco costuma ficar mais abundante, transparente e elástico.

            {'\n\n'}

            Muitas pessoas o descrevem como semelhante à clara de ovo, uma característica comum dessa fase do ciclo.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Depois da ovulação
          </Text>

          <Text style={tipsDetailStyles.text}>
            Após a ovulação, o muco geralmente volta a ficar mais espesso, cremoso ou em menor quantidade.

            {'\n\n'}

            Essas mudanças acontecem principalmente por causa das alterações hormonais.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é considerado normal?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O muco pode variar em:

            {'\n\n'}

            • Quantidade;

            {'\n'}

            • Textura;

            {'\n'}

            • Cor;

            {'\n'}

            • Elasticidade.

            {'\n\n'}

            Essas mudanças podem acontecer naturalmente ao longo do ciclo e nem sempre indicam um problema.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure orientação profissional se houver:

            {'\n\n'}

            • Mau cheiro persistente;

            {'\n'}

            • Cor incomum acompanhada de outros sintomas;

            {'\n'}

            • Coceira ou ardência;

            {'\n'}

            • Dor durante a relação sexual;

            {'\n'}

            • Alterações que persistem por vários dias ou ciclos.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Observar o muco cervical pode ajudar você a entender melhor seu ciclo, mas ele não deve ser usado sozinho para diagnosticar doenças ou determinar fertilidade.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}