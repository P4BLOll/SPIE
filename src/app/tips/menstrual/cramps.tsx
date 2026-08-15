
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

export default function CrampsScreen() {

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
            name="pulse-outline"
            size={55}
            color="#F97316"
          />

          <Text style={tipsDetailStyles.title}>
            Cólicas menstruais
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda por que as cólicas acontecem e quando
            elas podem precisar de atenção.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que são as cólicas?
          </Text>

          <Text style={tipsDetailStyles.text}>
            As cólicas menstruais são dores ou desconfortos
            que podem aparecer antes ou durante a menstruação.

            {'\n\n'}

            Elas acontecem principalmente por causa das
            contrações do útero, que ajudam a eliminar o
            endométrio durante o período menstrual.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Por que o útero se contrai?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Durante a menstruação, o organismo produz
            substâncias chamadas prostaglandinas.

            {'\n\n'}

            Elas participam das contrações do útero e podem
            estar relacionadas à intensidade da dor.

            {'\n\n'}

            Quanto maior a atividade dessas substâncias,
            mais intensas as contrações podem ser para
            algumas pessoas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como a cólica pode ser sentida?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A intensidade pode variar bastante.

            {'\n\n'}

            Algumas pessoas sentem apenas um leve
            desconforto, enquanto outras podem apresentar:

            {'\n\n'}

            • Dor ou pressão na parte inferior do abdômen;

            {'\n'}

            • Dor na região lombar;

            {'\n'}

            • Dor que pode irradiar para as pernas;

            {'\n'}

            • Náusea;

            {'\n'}

            • Dor de cabeça;

            {'\n'}

            • Cansaço ou indisposição.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que pode ajudar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas medidas podem ajudar a aliviar o
            desconforto, dependendo da pessoa:

            {'\n\n'}

            • Aplicar calor na região abdominal;

            {'\n'}

            • Descansar quando necessário;

            {'\n'}

            • Manter-se hidratada;

            {'\n'}

            • Praticar atividades físicas leves, se estiver
            se sentindo bem;

            {'\n'}

            • Buscar orientação profissional sobre o uso
            de medicamentos, quando necessário.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando a cólica merece atenção?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A dor deve ser avaliada por um profissional
            quando:

            {'\n\n'}

            • É muito intensa ou incapacitante;

            {'\n'}

            • Impede atividades do dia a dia;

            {'\n'}

            • Piora progressivamente ao longo dos ciclos;

            {'\n'}

            • Não melhora com medidas habituais;

            {'\n'}

            • Surge acompanhada de sangramento muito
            intenso;

            {'\n'}

            • Está associada a outros sintomas importantes.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Cólicas muito fortes podem ter uma causa?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Nem toda cólica intensa significa que existe
            uma doença.

            {'\n\n'}

            Porém, dores muito fortes ou persistentes podem
            estar relacionadas a condições como endometriose,
            adenomiose ou miomas.

            {'\n\n'}

            Por isso, quando a dor é diferente do habitual
            ou interfere na rotina, é importante buscar uma
            avaliação profissional.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Sentir algum desconforto durante a menstruação
            pode ser comum, mas uma dor intensa que interfere
            na sua rotina não deve ser ignorada. Conhecer
            seu padrão ajuda a perceber mudanças.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}

