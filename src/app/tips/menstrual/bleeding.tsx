import React from 'react';

import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router'
import { Background } from '../../../components/Background';
import { Colors } from '../../../constants/Colors';
import { tipsDetailStyles } from '../../../styles/tips-detail.styles';

export default function BleedingScreen() {

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
            Cor do sangue menstrual
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda as possíveis variações durante a menstruação.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Vermelho vivo
          </Text>

          <Text style={tipsDetailStyles.text}>

            Geralmente representa sangue mais recente,
            que está sendo eliminado rapidamente pelo corpo.

            É comum principalmente no início do fluxo menstrual.

          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Vermelho escuro
          </Text>

          <Text style={tipsDetailStyles.text}>

            Pode acontecer quando o sangue leva mais tempo
            para sair do útero.

            Essa alteração de tonalidade pode ser uma variação
            normal durante a menstruação.

          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Marrom
          </Text>

          <Text style={tipsDetailStyles.text}>

            Normalmente indica sangue mais antigo, que sofreu
            alteração de cor antes de ser eliminado.

            Pode aparecer principalmente no começo ou final
            da menstruação.

          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>

            Procure orientação profissional se houver:

            {'\n\n'}

            • Sangramento muito intenso;

            {'\n'}

            • Dor forte ou diferente do habitual;

            {'\n'}

            • Sangramento fora do período esperado;

            {'\n'}

            • Mau cheiro;

            {'\n'}
            • Mudanças que permanecem por vários ciclos.

          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Coágulos menstruais
          </Text>

          <Text style={tipsDetailStyles.text}>
            Pequenos coágulos podem aparecer principalmente
            em fluxos mais intensos.
            Coágulos grandes, frequentes ou acompanhados
            de outros sintomas devem ser avaliados.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Cada pessoa possui um padrão menstrual próprio.
            Acompanhar suas mudanças ajuda a entender melhor
            o funcionamento do seu corpo.
          </Text>
        </View>

      </ScrollView>
    </Background>
  );
}