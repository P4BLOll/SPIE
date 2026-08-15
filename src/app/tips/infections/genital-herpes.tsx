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

export default function GenitalHerpesScreen() {

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
            color="#EC4899"
          />

          <Text style={tipsDetailStyles.title}>
            Herpes genital
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda essa infecção, seus sintomas,
            transmissão e cuidados.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é herpes genital?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O herpes genital é uma infecção causada pelo
            vírus herpes simples, principalmente pelos tipos
            HSV-1 ou HSV-2.

            {'\n\n'}

            O vírus pode permanecer no organismo e,
            em algumas pessoas, causar novos episódios
            ao longo do tempo.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Pode não apresentar sintomas?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Sim.

            {'\n\n'}

            Muitas pessoas infectadas podem não perceber
            sintomas ou apresentar manifestações muito
            leves.

            {'\n\n'}

            Mesmo sem lesões aparentes, o vírus pode ser
            transmitido em algumas situações.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Principais sintomas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Durante um episódio, podem aparecer:

            {'\n\n'}

            • Pequenas bolhas ou feridas na região genital;

            {'\n'}

            • Coceira;

            {'\n'}

            • Ardência;

            {'\n'}

            • Dor ou sensibilidade na região;

            {'\n'}

            • Dor ao urinar quando as lesões estão
            próximas à saída da urina;

            {'\n'}

            • Mal-estar ou febre em alguns casos,
            principalmente no primeiro episódio.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como é transmitido?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O herpes genital pode ser transmitido por
            contato direto com a pele ou mucosas infectadas
            durante relações sexuais.

            {'\n\n'}

            A transmissão pode ocorrer mesmo quando não
            existem lesões visíveis.

            {'\n\n'}

            O uso de preservativos pode reduzir o risco,
            mas não elimina completamente a possibilidade
            de transmissão, pois áreas não cobertas também
            podem transmitir o vírus.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            As lesões sempre aparecem?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Não.

            {'\n\n'}

            Algumas pessoas nunca apresentam lesões
            perceptíveis.

            {'\n\n'}

            Em outras, podem ocorrer episódios com
            pequenas bolhas ou feridas que desaparecem
            depois de alguns dias.

            {'\n\n'}

            A aparência de uma lesão, sozinha, não é
            suficiente para confirmar o diagnóstico.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Tratamento
          </Text>

          <Text style={tipsDetailStyles.text}>
            Não existe atualmente um tratamento que elimine
            definitivamente o vírus do organismo.

            {'\n\n'}

            Entretanto, medicamentos antivirais podem ser
            prescritos para ajudar a reduzir a duração e a
            intensidade dos episódios.

            {'\n\n'}

            O tratamento deve ser orientado por um
            profissional de saúde.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como reduzir o risco de transmissão?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas medidas podem ajudar:

            {'\n\n'}

            • Usar preservativo durante as relações sexuais;

            {'\n'}

            • Evitar relações durante episódios com
            feridas ou bolhas;

            {'\n'}

            • Informar o parceiro ou parceira sobre o
            diagnóstico;

            {'\n'}

            • Seguir orientação profissional sobre
            tratamento e prevenção.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure um serviço de saúde se houver:

            {'\n\n'}

            • Bolhas ou feridas na região genital;

            {'\n'}

            • Dor ou ardência intensa;

            {'\n'}

            • Dor ao urinar;

            {'\n'}

            • Sintomas semelhantes após uma relação
            sem proteção;

            {'\n'}

            • Episódios que retornam frequentemente;

            {'\n'}

            • Dúvida sobre uma possível IST.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Lesões genitais podem ter diferentes causas.
            Evite tentar identificar uma infecção apenas
            pela aparência das lesões e procure avaliação
            profissional para obter um diagnóstico adequado.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}