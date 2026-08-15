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

export default function PregnancyWarningSignsScreen() {

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
            name="warning-outline"
            size={55}
            color="#EF4444"
          />

          <Text style={tipsDetailStyles.title}>
            Sinais de alerta
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Conheça alguns sintomas durante a gravidez
            que precisam de avaliação profissional.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Sangramento vaginal
          </Text>

          <Text style={tipsDetailStyles.text}>
            Qualquer sangramento durante a gravidez
            deve ser comunicado ao profissional que
            acompanha a gestação.

            {'\n\n'}

            Sangramento intenso, presença de coágulos,
            dor forte ou piora dos sintomas precisam
            de avaliação médica.

            {'\n\n'}

            Não tente descobrir a causa sozinha.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Dor abdominal ou pélvica intensa
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas dores podem acontecer durante a
            gravidez, mas dor intensa, persistente ou
            diferente do habitual merece atenção.

            {'\n\n'}

            Principalmente quando a dor vem acompanhada
            de sangramento, tontura, desmaio ou outros
            sintomas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Perda de líquido
          </Text>

          <Text style={tipsDetailStyles.text}>
            Uma saída repentina ou contínua de líquido
            pela vagina durante a gravidez pode indicar
            perda de líquido amniótico.

            {'\n\n'}

            Se isso acontecer, procure avaliação em
            um serviço de saúde, especialmente quando
            ocorre antes do momento esperado para o parto.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Febre
          </Text>

          <Text style={tipsDetailStyles.text}>
            Febre durante a gravidez pode estar
            relacionada a uma infecção ou outra
            condição que precisa ser avaliada.

            {'\n\n'}

            Não tome medicamentos por conta própria
            para tentar controlar a febre.

            {'\n\n'}

            Procure orientação profissional.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Dor de cabeça forte
          </Text>

          <Text style={tipsDetailStyles.text}>
            Dores de cabeça podem acontecer durante
            a gravidez.

            {'\n\n'}

            Porém, uma dor muito forte, persistente ou
            acompanhada de alterações na visão, inchaço
            importante ou pressão arterial elevada
            precisa ser avaliada rapidamente.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Alterações na visão
          </Text>

          <Text style={tipsDetailStyles.text}>
            Visão embaçada, pontos luminosos, perda
            de visão ou outras alterações visuais
            inesperadas durante a gravidez precisam
            de avaliação.

            {'\n\n'}

            Principalmente quando aparecem junto com
            dor de cabeça forte ou outros sintomas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Inchaço súbito
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algum grau de inchaço pode ocorrer durante
            a gravidez.

            {'\n\n'}

            Porém, um inchaço repentino ou muito intenso,
            principalmente no rosto e nas mãos, pode
            precisar de avaliação.

            {'\n\n'}

            Procure orientação profissional se essa
            alteração aparecer de forma inesperada.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Falta de ar ou dor no peito
          </Text>

          <Text style={tipsDetailStyles.text}>
            Dificuldade intensa para respirar, falta de
            ar repentina ou dor no peito não devem ser
            ignoradas.

            {'\n\n'}

            Esses sintomas podem estar relacionados
            a situações que precisam de atendimento
            imediato.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Desmaio ou tontura intensa
          </Text>

          <Text style={tipsDetailStyles.text}>
            Tonturas leves podem acontecer durante a
            gravidez.

            {'\n\n'}

            Entretanto, desmaio, tontura intensa ou
            episódios repetidos precisam ser avaliados,
            principalmente quando acompanhados de
            sangramento, dor ou falta de ar.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Redução dos movimentos do bebê
          </Text>

          <Text style={tipsDetailStyles.text}>
            Depois que os movimentos do bebê começam
            a ser percebidos regularmente, uma redução
            importante ou ausência de movimentos pode
            ser um sinal de alerta.

            {'\n\n'}

            Nessa situação, procure imediatamente o
            serviço de saúde responsável pelo
            acompanhamento da gestação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Contrações regulares
          </Text>

          <Text style={tipsDetailStyles.text}>
            No final da gravidez, algumas contrações
            podem acontecer como parte da preparação
            para o parto.

            {'\n\n'}

            Contrações regulares, cada vez mais fortes
            e próximas umas das outras podem indicar
            o início do trabalho de parto.

            {'\n\n'}

            Se acontecerem antes do período esperado,
            procure atendimento.
          </Text>

        </View>

        <View
          style={[
            tipsDetailStyles.infoBox,
            {
              backgroundColor: 'rgba(239,68,68,0.15)',
            },
          ]}
        >

          <Ionicons
            name="alert-circle-outline"
            size={25}
            color="#EF4444"
          />

          <Text style={tipsDetailStyles.infoText}>
            Alguns sinais durante a gravidez precisam
            de atendimento rápido. Em caso de sintomas
            intensos, súbitos ou que causem preocupação,
            procure um serviço de saúde imediatamente.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}