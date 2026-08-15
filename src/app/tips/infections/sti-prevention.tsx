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

export default function STIPreventionScreen() {

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
            name="shield-checkmark-outline"
            size={55}
            color="#22C55E"
          />

          <Text style={tipsDetailStyles.title}>
            ISTs
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Prevenção, testagem e cuidados com a saúde sexual.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que são ISTs?
          </Text>

          <Text style={tipsDetailStyles.text}>
            IST significa Infecção Sexualmente Transmissível.

            {'\n\n'}

            São infecções que podem ser transmitidas
            principalmente por meio de relações sexuais
            sem proteção.

            {'\n\n'}

            Algumas ISTs também podem ser transmitidas
            de outras formas, dependendo da infecção.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Muitas ISTs não apresentam sintomas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Uma pessoa pode ter uma IST e não perceber
            nenhuma alteração no corpo.

            {'\n\n'}

            Por isso, não é possível saber se alguém
            possui uma infecção apenas observando a
            aparência ou a presença de sintomas.

            {'\n\n'}

            A testagem é importante quando houver
            indicação ou possibilidade de exposição.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como reduzir o risco?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas medidas ajudam na prevenção:

            {'\n\n'}

            • Usar preservativo externo ou interno
            corretamente;

            {'\n'}

            • Manter a vacinação contra HPV e hepatite B
            em dia, quando indicada;

            {'\n'}

            • Realizar testes para ISTs quando recomendado;

            {'\n'}

            • Conversar com parceiros sobre saúde sexual;

            {'\n'}

            • Procurar atendimento diante de sintomas
            ou após uma possível exposição.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando fazer testes?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A necessidade de testagem depende da situação
            de cada pessoa.

            {'\n\n'}

            Pode ser importante procurar um serviço de
            saúde quando:

            {'\n\n'}

            • Houve relação sexual sem preservativo;

            {'\n'}

            • O preservativo rompeu ou saiu durante a
            relação;

            {'\n'}

            • Existe suspeita de exposição a uma IST;

            {'\n'}

            • O parceiro ou parceira recebeu diagnóstico
            de uma IST;

            {'\n'}

            • Apareceram sintomas ou alterações na região
            genital.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Sintomas que merecem atenção
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure avaliação se aparecer:

            {'\n\n'}

            • Corrimento diferente do habitual;

            {'\n'}

            • Odor forte e persistente;

            {'\n'}

            • Coceira ou ardência;

            {'\n'}

            • Feridas, bolhas ou verrugas;

            {'\n'}

            • Dor ao urinar;

            {'\n'}

            • Dor durante a relação sexual;

            {'\n'}

            • Dor pélvica;

            {'\n'}

            • Sangramento fora do período menstrual.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O preservativo é importante
          </Text>

          <Text style={tipsDetailStyles.text}>
            O uso correto de preservativos ajuda a reduzir
            o risco de várias ISTs.

            {'\n\n'}

            Porém, ele não elimina completamente o risco
            de todas as infecções, especialmente aquelas
            que também podem ser transmitidas pelo contato
            com áreas da pele não cobertas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Não tenha vergonha de procurar ajuda
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procurar atendimento para uma possível IST é
            uma atitude de cuidado com a própria saúde e
            também com a saúde dos parceiros.

            {'\n\n'}

            Profissionais de saúde estão preparados para
            orientar, realizar testes e indicar o tratamento
            adequado quando necessário.

            {'\n\n'}

            Evite a automedicação e não interrompa um
            tratamento sem orientação profissional.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Ter uma IST não é motivo para vergonha.
            Informação, prevenção, testagem e tratamento
            adequado são partes importantes do cuidado
            com a saúde sexual.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}