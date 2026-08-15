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

export default function PrenatalCareScreen() {

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
            name="medical-outline"
            size={55}
            color="#EC4899"
          />

          <Text style={tipsDetailStyles.title}>
            Pré-natal
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda a importância do acompanhamento
            durante a gravidez.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é o pré-natal?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O pré-natal é o acompanhamento de saúde
            realizado durante a gravidez.

            {'\n\n'}

            Ele permite acompanhar a saúde da gestante
            e o desenvolvimento do bebê ao longo da
            gestação.

            {'\n\n'}

            As consultas podem incluir avaliações,
            orientações e exames de acordo com as
            necessidades de cada gestação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando começar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O ideal é iniciar o acompanhamento assim que
            a gravidez for confirmada.

            {'\n\n'}

            Quanto mais cedo o pré-natal começar,
            maiores são as oportunidades de acompanhar
            a gestação desde o início.

            {'\n\n'}

            Se você suspeita que está grávida, procure
            um serviço de saúde para receber orientação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que acontece nas consultas?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Durante as consultas, o profissional pode
            avaliar diferentes aspectos da saúde da
            gestante.

            {'\n\n'}

            Dependendo da etapa da gravidez, podem ser
            avaliados:

            {'\n\n'}

            • Pressão arterial;

            {'\n'}

            • Peso;

            {'\n'}

            • Crescimento e desenvolvimento da gestação;

            {'\n'}

            • Sintomas apresentados;

            {'\n'}

            • Resultados de exames;

            {'\n'}

            • Vacinação;

            {'\n'}

            • Alimentação e hábitos de vida.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Exames durante a gravidez
          </Text>

          <Text style={tipsDetailStyles.text}>
            Durante o pré-natal, diferentes exames podem
            ser solicitados.

            {'\n\n'}

            Eles podem ajudar a acompanhar a saúde da
            gestante e identificar possíveis alterações.

            {'\n\n'}

            A quantidade e o tipo de exames dependem
            da fase da gestação e das características
            de cada pessoa.

            {'\n\n'}

            Siga as orientações do profissional que
            acompanha o pré-natal.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Ultrassonografia
          </Text>

          <Text style={tipsDetailStyles.text}>
            A ultrassonografia utiliza ondas sonoras
            para produzir imagens do interior do corpo.

            {'\n\n'}

            Durante a gravidez, pode ser utilizada para
            acompanhar o desenvolvimento da gestação
            e avaliar diferentes estruturas.

            {'\n\n'}

            O momento e a quantidade de exames são
            definidos de acordo com a necessidade clínica.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Vacinação
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas vacinas são importantes durante
            a gravidez para proteger a gestante e o bebê.

            {'\n\n'}

            O calendário pode variar de acordo com
            as recomendações de saúde e a situação
            individual.

            {'\n\n'}

            Não tome ou deixe de tomar uma vacina por
            conta própria. Converse com o profissional
            responsável pelo seu acompanhamento.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Alimentação e suplementos
          </Text>

          <Text style={tipsDetailStyles.text}>
            Uma alimentação equilibrada contribui para
            a saúde durante a gestação.

            {'\n\n'}

            Alguns nutrientes podem precisar de atenção
            especial durante a gravidez.

            {'\n\n'}

            Suplementos, como ácido fólico ou ferro,
            podem ser recomendados dependendo da
            avaliação profissional.

            {'\n\n'}

            Não utilize suplementos por conta própria.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Saúde emocional
          </Text>

          <Text style={tipsDetailStyles.text}>
            A gravidez pode trazer mudanças físicas,
            emocionais e sociais.

            {'\n\n'}

            Sentir diferentes emoções durante esse
            período pode acontecer.

            {'\n\n'}

            Caso sentimentos de tristeza, ansiedade,
            medo ou preocupação estejam intensos ou
            atrapalhem sua rotina, converse com um
            profissional de saúde.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Não falte às consultas
          </Text>

          <Text style={tipsDetailStyles.text}>
            O acompanhamento regular permite observar
            a evolução da gestação e identificar possíveis
            alterações.

            {'\n\n'}

            Mesmo quando a gestante está se sentindo
            bem, as consultas continuam sendo importantes.

            {'\n\n'}

            Se não puder comparecer, procure remarcar
            a consulta.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            O pré-natal é uma das principais formas de
            acompanhar a saúde da gestante e do bebê.
            Procure um serviço de saúde assim que a
            gravidez for confirmada.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}