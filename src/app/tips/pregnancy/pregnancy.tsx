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

export default function PregnancyScreen() {

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
            name="heart-circle-outline"
            size={55}
            color="#EC4899"
          />

          <Text style={tipsDetailStyles.title}>
            Gravidez
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda as principais mudanças que acontecem
            no corpo durante a gravidez.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é a gravidez?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A gravidez começa quando ocorre a fecundação
            e o embrião se desenvolve no útero.

            {'\n\n'}

            Durante esse período, o corpo passa por
            diversas mudanças para permitir o crescimento
            e o desenvolvimento do bebê.

            {'\n\n'}

            A duração da gestação é geralmente calculada
            em semanas, contando a partir do primeiro dia
            da última menstruação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como acontece?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Em um ciclo menstrual, a ovulação libera um
            óvulo.

            {'\n\n'}

            Quando um espermatozoide fecunda esse óvulo,
            forma-se uma célula que começa a se dividir
            e se desenvolver.

            {'\n\n'}

            Posteriormente, o embrião se fixa no
            revestimento do útero, processo chamado
            implantação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Primeiras mudanças
          </Text>

          <Text style={tipsDetailStyles.text}>
            No início da gravidez, algumas pessoas podem
            perceber mudanças no corpo, como:

            {'\n\n'}

            • Atraso menstrual;

            {'\n'}

            • Náuseas;

            {'\n'}

            • Cansaço;

            {'\n'}

            • Maior sensibilidade nas mamas;

            {'\n'}

            • Alterações no apetite;

            {'\n'}

            • Maior frequência para urinar;

            {'\n'}

            • Mudanças de humor.

            {'\n\n'}

            Esses sinais não confirmam uma gravidez
            sozinhos.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Trimestres da gravidez
          </Text>

          <Text style={tipsDetailStyles.text}>
            A gravidez costuma ser dividida em três
            trimestres.

            {'\n\n'}

            Primeiro trimestre:

            {'\n'}

            É o período inicial, marcado pela implantação
            e pelo desenvolvimento inicial do embrião.

            {'\n\n'}

            Segundo trimestre:

            {'\n'}

            O feto continua crescendo e diversas estruturas
            do corpo continuam se desenvolvendo.

            {'\n\n'}

            Terceiro trimestre:

            {'\n'}

            O bebê continua ganhando peso e amadurecendo
            os órgãos enquanto o corpo se prepara para
            o parto.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Acompanhamento pré-natal
          </Text>

          <Text style={tipsDetailStyles.text}>
            O acompanhamento pré-natal é importante
            durante a gravidez.

            {'\n\n'}

            Nas consultas, profissionais de saúde podem
            acompanhar o desenvolvimento da gestação,
            avaliar a saúde da gestante e solicitar exames
            quando necessário.

            {'\n\n'}

            O acompanhamento também permite identificar
            possíveis alterações mais cedo.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Alimentação e cuidados
          </Text>

          <Text style={tipsDetailStyles.text}>
            Durante a gravidez, alguns cuidados são
            especialmente importantes.

            {'\n\n'}

            • Fazer acompanhamento pré-natal;

            {'\n'}

            • Manter uma alimentação equilibrada;

            {'\n'}

            • Manter-se hidratada;

            {'\n'}

            • Evitar álcool e outras substâncias
            prejudiciais;

            {'\n'}

            • Utilizar medicamentos somente com
            orientação profissional;

            {'\n'}

            • Seguir as orientações recebidas durante
            o pré-natal.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Gravidez é igual para todas?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Não.

            {'\n\n'}

            Cada gravidez pode apresentar sintomas,
            mudanças e experiências diferentes.

            {'\n\n'}

            Algumas pessoas apresentam muitos sintomas
            no início, enquanto outras apresentam poucas
            mudanças perceptíveis.

            {'\n\n'}

            Por isso, informações encontradas na internet
            não substituem uma avaliação profissional.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Se houver suspeita de gravidez, um teste
            apropriado pode ajudar a confirmar a gestação.
            Em caso de resultado positivo, procure
            atendimento para iniciar o acompanhamento
            pré-natal.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}