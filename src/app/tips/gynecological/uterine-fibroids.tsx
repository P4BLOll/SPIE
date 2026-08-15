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

export default function UterineFibroidsScreen() {

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
            name="medkit-outline"
            size={55}
            color="#F97316"
          />

          <Text style={tipsDetailStyles.title}>
            Miomas uterinos
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda o que são os miomas, seus possíveis
            sintomas e quando procurar avaliação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que são miomas?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Miomas uterinos são tumores benignos que se
            desenvolvem no útero.

            {'\n\n'}

            Eles são formados principalmente por tecido
            muscular e podem aparecer em diferentes
            regiões do útero.

            {'\n\n'}

            Miomas não são câncer e, na maioria dos casos,
            não se transformam em câncer.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Nem sempre causam sintomas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Muitas pessoas com miomas não apresentam
            sintomas.

            {'\n\n'}

            Quando não causam desconforto ou alterações
            importantes, o profissional de saúde pode
            apenas acompanhar a evolução dos miomas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Principais sintomas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Quando aparecem, os sintomas podem incluir:

            {'\n\n'}

            • Menstruação muito intensa;

            {'\n'}

            • Menstruação prolongada;

            {'\n'}

            • Cólicas ou dor pélvica;

            {'\n'}

            • Sensação de pressão ou peso na pelve;

            {'\n'}

            • Aumento da frequência urinária;

            {'\n'}

            • Constipação;

            {'\n'}

            • Dor durante a relação sexual;

            {'\n'}

            • Dificuldade para engravidar em alguns casos.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Tipos de miomas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Os miomas podem ser classificados de acordo
            com a região do útero onde estão localizados.

            {'\n\n'}

            • Intramural: localizado na parede muscular
            do útero;

            {'\n'}

            • Submucoso: cresce em direção à cavidade
            uterina;

            {'\n'}

            • Subseroso: cresce em direção à parte externa
            do útero.

            {'\n\n'}

            A localização e o tamanho podem influenciar
            os sintomas apresentados.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Miomas e fertilidade
          </Text>

          <Text style={tipsDetailStyles.text}>
            A presença de um mioma não significa
            necessariamente que haverá dificuldade
            para engravidar.

            {'\n\n'}

            Entretanto, alguns miomas, principalmente
            dependendo da localização e do tamanho,
            podem interferir na fertilidade ou na gestação.

            {'\n\n'}

            A avaliação deve ser individualizada.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como é feito o diagnóstico?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O diagnóstico normalmente começa com uma
            avaliação dos sintomas e do histórico de saúde.

            {'\n\n'}

            Exames de imagem, como a ultrassonografia,
            podem ajudar a identificar o tamanho, a
            localização e a quantidade de miomas.

            {'\n\n'}

            Outros exames podem ser solicitados dependendo
            da situação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Tratamento
          </Text>

          <Text style={tipsDetailStyles.text}>
            Nem todo mioma precisa de tratamento.

            {'\n\n'}

            Quando existem sintomas, o tratamento pode
            incluir medicamentos para controlar sangramentos
            ou dores.

            {'\n\n'}

            Em determinadas situações, procedimentos
            minimamente invasivos ou cirurgia podem ser
            considerados.

            {'\n\n'}

            A escolha depende dos sintomas, tamanho e
            localização dos miomas, além dos objetivos
            da pessoa.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure avaliação profissional se houver:

            {'\n\n'}

            • Sangramento menstrual muito intenso;

            {'\n'}

            • Menstruação que dura muitos dias;

            {'\n'}

            • Cólicas ou dor pélvica intensa;

            {'\n'}

            • Sensação persistente de pressão na pelve;

            {'\n'}

            • Sangramento fora do período menstrual;

            {'\n'}

            • Sintomas de anemia, como cansaço excessivo
            ou fraqueza;

            {'\n'}

            • Dificuldade para engravidar.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Miomas são comuns e geralmente benignos.
            A presença de um mioma não significa
            necessariamente que exista um problema grave
            ou que seja necessário realizar cirurgia.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}