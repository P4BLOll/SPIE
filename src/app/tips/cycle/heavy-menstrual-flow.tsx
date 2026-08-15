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

export default function HeavyMenstrualFlowScreen() {

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
            color="#DC2626"
          />

          <Text style={tipsDetailStyles.title}>
            Fluxo menstrual intenso
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda quando o sangramento menstrual pode
            ser considerado intenso e quando procurar ajuda.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é fluxo menstrual intenso?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas pessoas naturalmente apresentam um
            fluxo menstrual maior que outras.

            {'\n\n'}

            Porém, quando o sangramento é muito intenso,
            dura muitos dias ou interfere significativamente
            na rotina, é importante investigar a causa.

            {'\n\n'}

            O termo médico usado para esse tipo de
            sangramento é sangramento menstrual intenso.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como identificar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Alguns sinais podem indicar que o fluxo está
            mais intenso do que o habitual:

            {'\n\n'}

            • Precisar trocar absorvente ou outro produto
            menstrual com muita frequência;

            {'\n'}

            • Acordar durante a noite para trocar o
            produto menstrual;

            {'\n'}

            • Sangramento que dura muitos dias;

            {'\n'}

            • Necessidade de utilizar mais de um produto
            menstrual ao mesmo tempo;

            {'\n'}

            • Coágulos grandes ou frequentes;

            {'\n'}

            • Sangramento que interfere nas atividades
            do dia a dia.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Coágulos menstruais
          </Text>

          <Text style={tipsDetailStyles.text}>
            Pequenos coágulos podem aparecer durante
            menstruações mais intensas e nem sempre
            representam um problema.

            {'\n\n'}

            Porém, coágulos grandes, frequentes ou
            acompanhados de sangramento muito intenso
            merecem avaliação.

            {'\n\n'}

            É importante observar se essa característica
            acontece repetidamente ao longo dos ciclos.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Possíveis causas
          </Text>

          <Text style={tipsDetailStyles.text}>
            O sangramento intenso pode ter diferentes
            causas.

            {'\n\n'}

            Entre elas estão:

            {'\n\n'}

            • Miomas uterinos;

            {'\n'}

            • Adenomiose;

            {'\n'}

            • Pólipos uterinos;

            {'\n'}

            • Alterações hormonais;

            {'\n'}

            • Distúrbios da coagulação;

            {'\n'}

            • Algumas alterações da tireoide;

            {'\n'}

            • Uso de determinados medicamentos;

            {'\n'}

            • Outras condições ginecológicas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Sangramento intenso pode causar anemia?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Sim.

            {'\n\n'}

            Perder uma quantidade elevada de sangue
            repetidamente pode reduzir os níveis de ferro
            e contribuir para o desenvolvimento de anemia.

            {'\n\n'}

            Alguns sinais podem incluir:

            {'\n\n'}

            • Cansaço excessivo;

            {'\n'}

            • Fraqueza;

            {'\n'}

            • Tontura;

            {'\n'}

            • Falta de energia;

            {'\n'}

            • Palidez;

            {'\n'}

            • Falta de ar em alguns casos.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como investigar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A investigação depende da idade, histórico
            menstrual e outros sintomas.

            {'\n\n'}

            O profissional pode solicitar exames de sangue,
            exames hormonais ou exames de imagem, como
            ultrassonografia.

            {'\n\n'}

            O objetivo é identificar a causa do sangramento
            e avaliar possíveis consequências, como anemia.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure avaliação profissional se:

            {'\n\n'}

            • O fluxo mudou e ficou muito mais intenso;

            {'\n'}

            • A menstruação dura muitos dias;

            {'\n'}

            • Os sangramentos interferem na sua rotina;

            {'\n'}

            • Há coágulos grandes e frequentes;

            {'\n'}

            • Você apresenta cansaço, fraqueza ou tontura;

            {'\n'}

            • O sangramento intenso acontece repetidamente.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar atendimento urgente?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure atendimento rapidamente se o sangramento
            for muito intenso e vier acompanhado de:

            {'\n\n'}

            • Tontura intensa;

            {'\n'}

            • Desmaio ou sensação de desmaio;

            {'\n'}

            • Fraqueza importante;

            {'\n'}

            • Falta de ar;

            {'\n'}

            • Palidez intensa;

            {'\n'}

            • Dor forte ou outros sintomas preocupantes.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Cada pessoa possui um padrão menstrual
            diferente. O mais importante é perceber
            mudanças persistentes no seu próprio padrão
            e procurar avaliação quando o sangramento
            estiver interferindo na sua rotina.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}