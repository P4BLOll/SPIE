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

export default function LatePeriodScreen() {

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
            name="calendar-outline"
            size={55}
            color="#8B5CF6"
          />

          <Text style={tipsDetailStyles.title}>
            Menstruação atrasada
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda algumas possíveis causas do atraso
            menstrual e quando é importante investigar.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que significa uma menstruação atrasada?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A menstruação pode não acontecer exatamente
            no mesmo dia em todos os ciclos.

            {'\n\n'}

            Pequenas variações podem acontecer e nem
            sempre indicam algum problema.

            {'\n\n'}

            Porém, quando o atraso é diferente do padrão
            habitual ou acontece repetidamente, é importante
            observar outras possíveis causas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Gravidez
          </Text>

          <Text style={tipsDetailStyles.text}>
            Para pessoas que tiveram relações sexuais com
            possibilidade de gravidez, essa é uma das
            primeiras possibilidades a ser considerada
            diante de um atraso.

            {'\n\n'}

            Um teste de gravidez pode ajudar a esclarecer
            a situação.

            {'\n\n'}

            O momento adequado para realizar o teste pode
            variar de acordo com o tipo de teste e o período
            da relação ou do atraso.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Estresse e alterações na rotina
          </Text>

          <Text style={tipsDetailStyles.text}>
            Estresse intenso, mudanças importantes na rotina,
            falta de sono e alterações emocionais podem
            interferir na ovulação.

            {'\n\n'}

            Como a menstruação acontece após a ovulação,
            uma ovulação mais tardia também pode fazer
            com que o sangramento menstrual aconteça
            mais tarde.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Alterações hormonais
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas alterações hormonais podem interferir
            no ciclo menstrual.

            {'\n\n'}

            Entre as possíveis causas estão:

            {'\n\n'}

            • Síndrome dos ovários policísticos (SOP);

            {'\n'}

            • Alterações da tireoide;

            {'\n'}

            • Alterações relacionadas à prolactina;

            {'\n'}

            • Mudanças importantes de peso;

            {'\n'}

            • Outras condições hormonais.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Exercícios e mudanças no peso
          </Text>

          <Text style={tipsDetailStyles.text}>
            Perdas ou ganhos significativos de peso podem
            alterar o funcionamento do ciclo menstrual.

            {'\n\n'}

            Exercícios físicos muito intensos, especialmente
            quando associados a baixa disponibilidade de
            energia, também podem fazer a menstruação
            atrasar ou desaparecer.

            {'\n\n'}

            Essas alterações devem ser avaliadas quando
            persistentes.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Medicamentos e anticoncepcionais
          </Text>

          <Text style={tipsDetailStyles.text}>
            Alguns medicamentos e métodos contraceptivos
            podem modificar o padrão menstrual.

            {'\n\n'}

            Dependendo do método utilizado, pode ocorrer
            redução, irregularidade ou até ausência de
            sangramento.

            {'\n\n'}

            Não interrompa um medicamento ou método
            contraceptivo por conta própria.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar avaliação?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure um profissional de saúde quando:

            {'\n\n'}

            • Os atrasos acontecem repetidamente;

            {'\n'}

            • O ciclo ficou muito diferente do seu padrão;

            {'\n'}

            • A menstruação desapareceu por vários meses;

            {'\n'}

            • Existem outros sintomas, como dor pélvica,
            alterações importantes de peso ou secreção
            mamilar;

            {'\n'}

            • Existe possibilidade de gravidez e o resultado
            do teste não esclarece a situação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Acompanhe seu ciclo
          </Text>

          <Text style={tipsDetailStyles.text}>
            Registrar o primeiro dia da menstruação,
            duração do ciclo, sintomas e alterações pode
            ajudar a identificar padrões.

            {'\n\n'}

            Essas informações também podem ser úteis
            durante uma consulta médica.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Um atraso menstrual pode ter várias causas.
            Se houver possibilidade de gravidez, considere
            realizar um teste. Atrasos frequentes ou
            persistentes merecem avaliação profissional.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}