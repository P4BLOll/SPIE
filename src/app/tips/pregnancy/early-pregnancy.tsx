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

export default function EarlyPregnancyScreen() {

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
            name="heart-outline"
            size={55}
            color="#EC4899"
          />

          <Text style={tipsDetailStyles.title}>
            Início da gravidez
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Saiba o que pode acontecer nas primeiras
            semanas da gestação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que acontece no início?
          </Text>

          <Text style={tipsDetailStyles.text}>
            As primeiras semanas são marcadas por
            mudanças importantes no organismo.

            {'\n\n'}

            Após a fecundação, o embrião passa por
            processos de desenvolvimento e implantação
            no útero.

            {'\n\n'}

            Ao mesmo tempo, o corpo começa a produzir
            alterações hormonais que ajudam a manter
            a gestação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Sintomas comuns
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas pessoas podem apresentar:

            {'\n\n'}

            • Atraso menstrual;

            {'\n'}

            • Náuseas ou vômitos;

            {'\n'}

            • Cansaço;

            {'\n'}

            • Sensibilidade ou aumento das mamas;

            {'\n'}

            • Maior frequência para urinar;

            {'\n'}

            • Alterações no apetite;

            {'\n'}

            • Maior sensibilidade a cheiros.

            {'\n\n'}

            Nem todas as pessoas apresentam esses
            sintomas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Alimentação
          </Text>

          <Text style={tipsDetailStyles.text}>
            Uma alimentação variada e equilibrada é
            importante durante a gravidez.

            {'\n\n'}

            Procure incluir diferentes grupos de
            alimentos, como frutas, verduras, legumes,
            cereais e fontes de proteínas.

            {'\n\n'}

            O profissional responsável pelo pré-natal
            pode orientar necessidades específicas
            de acordo com cada gestação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Ácido fólico
          </Text>

          <Text style={tipsDetailStyles.text}>
            O ácido fólico é um nutriente importante
            durante o início da gravidez.

            {'\n\n'}

            A suplementação pode ser recomendada por
            profissionais de saúde para ajudar na
            prevenção de alterações no desenvolvimento
            do tubo neural.

            {'\n\n'}

            A dose e a forma de utilização devem ser
            orientadas por um profissional.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Medicamentos
          </Text>

          <Text style={tipsDetailStyles.text}>
            Durante a gravidez, medicamentos devem ser
            utilizados com orientação profissional.

            {'\n\n'}

            Alguns medicamentos podem não ser seguros
            durante a gestação.

            {'\n\n'}

            Se você descobrir que está grávida e utiliza
            algum medicamento regularmente, informe
            o profissional que acompanha sua saúde.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Álcool, cigarro e outras substâncias
          </Text>

          <Text style={tipsDetailStyles.text}>
            O consumo de álcool durante a gravidez pode
            causar danos ao desenvolvimento do bebê.

            {'\n\n'}

            O tabagismo também está associado a riscos
            para a gestação e para o bebê.

            {'\n\n'}

            Outras substâncias também podem oferecer
            riscos.

            {'\n\n'}

            Procure orientação profissional caso tenha
            dificuldade para interromper algum consumo.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Atividade física
          </Text>

          <Text style={tipsDetailStyles.text}>
            Em muitas gestações, atividades físicas
            adequadas podem fazer parte da rotina.

            {'\n\n'}

            Entretanto, o tipo e a intensidade da atividade
            devem considerar as condições de cada pessoa.

            {'\n\n'}

            Converse com o profissional responsável pelo
            pré-natal antes de iniciar ou modificar uma
            rotina de exercícios.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Comece o pré-natal
          </Text>

          <Text style={tipsDetailStyles.text}>
            Assim que a gravidez for confirmada, procure
            um serviço de saúde para iniciar o
            acompanhamento pré-natal.

            {'\n\n'}

            As consultas permitem acompanhar a saúde
            da gestante e o desenvolvimento da gravidez.

            {'\n\n'}

            Também é possível receber orientações sobre
            exames, alimentação, vacinação e outros
            cuidados importantes.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Sangramento e dor
          </Text>

          <Text style={tipsDetailStyles.text}>
            Sangramento ou dor durante o início da
            gravidez não devem ser ignorados.

            {'\n\n'}

            Pequenas alterações podem ter diferentes
            causas, mas sangramento intenso, dor forte,
            tontura, desmaio ou piora dos sintomas
            precisam de avaliação médica.

            {'\n\n'}

            Em caso de sintomas importantes, procure
            atendimento imediatamente.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            As primeiras semanas são importantes para
            o desenvolvimento da gestação. Procure
            iniciar o pré-natal o quanto antes e siga
            as orientações do profissional de saúde.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}