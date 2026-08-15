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

export default function GonorrheaScreen() {

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
            name="shield-outline"
            size={55}
            color="#EF4444"
          />

          <Text style={tipsDetailStyles.title}>
            Gonorreia
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda essa infecção sexualmente transmissível,
            seus sintomas, transmissão e prevenção.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é gonorreia?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A gonorreia é uma infecção sexualmente
            transmissível causada pela bactéria
            Neisseria gonorrhoeae.

            {'\n\n'}

            Ela pode infectar principalmente o colo do útero,
            a uretra, o reto e a garganta, dependendo da
            forma de contato sexual.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Pode não apresentar sintomas?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Sim.

            {'\n\n'}

            Algumas pessoas podem ter gonorreia sem
            apresentar sintomas perceptíveis.

            {'\n\n'}

            Mesmo sem sintomas, a infecção pode ser
            transmitida para outras pessoas e, por isso,
            a testagem pode ser importante quando existe
            risco de exposição.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Possíveis sintomas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Quando aparecem, os sintomas podem incluir:

            {'\n\n'}

            • Corrimento vaginal diferente do habitual;

            {'\n'}

            • Ardência ou dor ao urinar;

            {'\n'}

            • Dor ou desconforto na parte inferior
            do abdômen;

            {'\n'}

            • Sangramento entre as menstruações;

            {'\n'}

            • Sangramento após relações sexuais;

            {'\n'}

            • Dor durante a relação sexual.

            {'\n\n'}

            Os sintomas podem variar de acordo com o
            local infectado.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como é transmitida?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A gonorreia pode ser transmitida durante
            relações sexuais vaginais, anais ou orais
            com uma pessoa infectada.

            {'\n\n'}

            A transmissão pode acontecer mesmo quando
            a pessoa não apresenta sintomas.

            {'\n\n'}

            O uso correto de preservativos ajuda a reduzir
            o risco de transmissão.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Por que tratar é importante?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Quando não tratada, a gonorreia pode causar
            complicações.

            {'\n\n'}

            Em algumas pessoas, a infecção pode atingir
            órgãos do sistema reprodutivo e contribuir para
            doença inflamatória pélvica.

            {'\n\n'}

            O tratamento adequado ajuda a reduzir o risco
            de complicações e também evita a transmissão
            para outras pessoas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Diagnóstico
          </Text>

          <Text style={tipsDetailStyles.text}>
            Os sintomas não são suficientes para confirmar
            a gonorreia, pois podem ser semelhantes aos de
            outras infecções.

            {'\n\n'}

            Exames laboratoriais podem ser utilizados para
            identificar a bactéria.

            {'\n\n'}

            O profissional de saúde indicará o exame mais
            adequado de acordo com cada situação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Tratamento
          </Text>

          <Text style={tipsDetailStyles.text}>
            A gonorreia é uma infecção bacteriana tratável
            com antibióticos específicos.

            {'\n\n'}

            O medicamento deve ser escolhido e prescrito
            por um profissional de saúde.

            {'\n\n'}

            É importante não se automedicar, especialmente
            porque existem cepas da bactéria com resistência
            a alguns antibióticos.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como prevenir?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas medidas podem reduzir o risco de
            transmissão:

            {'\n\n'}

            • Usar preservativo corretamente;

            {'\n'}

            • Realizar testes para ISTs quando indicado;

            {'\n'}

            • Buscar atendimento após uma possível
            exposição;

            {'\n'}

            • Informar parceiros quando houver diagnóstico,
            seguindo orientação profissional;

            {'\n'}

            • Completar o tratamento indicado.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure um serviço de saúde se apresentar:

            {'\n\n'}

            • Corrimento diferente do habitual;

            {'\n'}

            • Ardência ao urinar;

            {'\n'}

            • Dor pélvica;

            {'\n'}

            • Sangramento fora do período menstrual;

            {'\n'}

            • Dor durante a relação sexual;

            {'\n'}

            • Suspeita de exposição a uma IST.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            A gonorreia pode não apresentar sintomas.
            O diagnóstico depende de avaliação e, quando
            indicado, de testes. Evite a automedicação e
            procure um serviço de saúde diante de uma
            possível exposição.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}