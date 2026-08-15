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

export default function OvulationScreen() {

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
            name="sunny-outline"
            size={55}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.title}>
            Ovulação
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda como essa fase influencia seu ciclo menstrual.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            O que é ovulação?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A ovulação acontece quando um dos ovários libera
            um óvulo maduro.

            Esse processo faz parte do ciclo menstrual e representa
            o período em que existe maior chance de gravidez caso
            haja relação sexual sem métodos contraceptivos.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Quando acontece?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Em um ciclo de 28 dias, a ovulação costuma acontecer
            próxima ao meio do ciclo, frequentemente por volta do
            14º dia.

            Porém, a duração do ciclo varia entre pessoas e a
            ovulação pode acontecer antes ou depois dessa data.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Sinais possíveis da ovulação
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas pessoas podem perceber:

            {'\n\n'}

            • Secreção transparente e elástica;

            {'\n'}

            • Aumento da temperatura basal;

            {'\n'}

            • Pequena dor ou cólica em um dos lados da barriga;

            {'\n'}

            • Sensibilidade nos seios;

            {'\n'}

            • Mudanças de humor ou desejo sexual.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Período fértil
          </Text>

          <Text style={tipsDetailStyles.text}>
            O período fértil corresponde aos dias próximos da
            ovulação.

            Ele acontece porque o óvulo permanece disponível por
            um curto período, enquanto os espermatozoides podem
            sobreviver alguns dias no corpo.

            Por isso, a maior chance de gravidez ocorre nessa fase.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Ovulação e calendário menstrual
          </Text>

          <Text style={tipsDetailStyles.text}>
            O calendário do SPIE utiliza informações registradas
            sobre seu ciclo para estimar períodos como ovulação
            e fertilidade.

            Essas previsões ajudam no acompanhamento, mas não
            substituem métodos contraceptivos ou avaliação médica.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="bulb-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Observar seu ciclo, sintomas e secreções ajuda a
            entender melhor os padrões do seu próprio corpo.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}