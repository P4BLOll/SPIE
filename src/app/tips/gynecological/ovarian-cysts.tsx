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

export default function OvarianCystsScreen() {

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
            color="#06B6D4"
          />

          <Text style={tipsDetailStyles.title}>
            Cistos ovarianos
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Saiba o que são os cistos ovarianos, seus
            possíveis sintomas e quando procurar ajuda.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que são cistos ovarianos?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Cistos ovarianos são bolsas ou estruturas
            preenchidas por líquido ou outros conteúdos
            que podem se desenvolver dentro ou sobre
            um ovário.

            {'\n\n'}

            Eles são relativamente comuns e muitos
            desaparecem espontaneamente sem precisar
            de tratamento.

            {'\n\n'}

            A maioria dos cistos ovarianos é benigna.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Cistos funcionais
          </Text>

          <Text style={tipsDetailStyles.text}>
            Alguns cistos estão relacionados ao próprio
            funcionamento dos ovários durante o ciclo
            menstrual.

            {'\n\n'}

            Esses são chamados de cistos funcionais e
            geralmente desaparecem sozinhos depois de
            algum tempo.

            {'\n\n'}

            O acompanhamento depende do tamanho,
            aparência e sintomas apresentados.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Possíveis sintomas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Muitos cistos não provocam sintomas.

            {'\n\n'}

            Quando causam alterações, podem aparecer:

            {'\n\n'}

            • Dor ou pressão na parte inferior do abdômen;

            {'\n'}

            • Sensação de peso ou desconforto na pelve;

            {'\n'}

            • Alterações no ciclo menstrual;

            {'\n'}

            • Dor durante relações sexuais;

            {'\n'}

            • Sensação de estufamento;

            {'\n'}

            • Necessidade de urinar com mais frequência
            em alguns casos.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Cisto não é sinônimo de câncer
          </Text>

          <Text style={tipsDetailStyles.text}>
            Encontrar um cisto no ovário não significa
            automaticamente que exista câncer.

            {'\n\n'}

            A maioria dos cistos ovarianos em pessoas
            que ainda menstruam é benigna.

            {'\n\n'}

            O profissional de saúde pode avaliar
            características como tamanho, aparência,
            localização e evolução para determinar
            a necessidade de acompanhamento.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando o cisto pode ser uma emergência?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Em algumas situações, um cisto pode sofrer
            complicações, como ruptura ou torção do ovário.

            {'\n\n'}

            Procure atendimento médico rapidamente se
            apresentar:

            {'\n\n'}

            • Dor abdominal ou pélvica súbita e muito forte;

            {'\n'}

            • Dor acompanhada de náuseas ou vômitos;

            {'\n'}

            • Tontura ou sensação de desmaio;

            {'\n'}

            • Fraqueza intensa;

            {'\n'}

            • Sangramento associado a dor intensa.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como é feito o diagnóstico?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O exame mais utilizado para investigar cistos
            ovarianos é a ultrassonografia.

            {'\n\n'}

            O profissional pode observar o tamanho,
            formato e características do cisto.

            {'\n\n'}

            Dependendo do caso, outros exames ou
            acompanhamento por novas ultrassonografias
            podem ser necessários.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Tratamento
          </Text>

          <Text style={tipsDetailStyles.text}>
            Muitos cistos não precisam de tratamento
            específico e desaparecem espontaneamente.

            {'\n\n'}

            Dependendo do caso, o profissional pode
            recomendar apenas acompanhamento.

            {'\n\n'}

            Quando o cisto é grande, persistente, causa
            sintomas importantes ou apresenta características
            preocupantes, outros tratamentos podem ser
            considerados.

            {'\n\n'}

            A cirurgia pode ser indicada em situações
            específicas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure avaliação profissional se houver:

            {'\n\n'}

            • Dor pélvica persistente;

            {'\n'}

            • Alterações menstruais importantes;

            {'\n'}

            • Sensação frequente de pressão ou peso
            na pelve;

            {'\n'}

            • Dor durante relações sexuais;

            {'\n'}

            • Cisto identificado em um exame;

            {'\n'}

            • Dor súbita e intensa na região abdominal
            ou pélvica.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Cistos ovarianos são comuns e muitos
            desaparecem naturalmente. Porém, dor súbita
            e intensa, principalmente acompanhada de
            náuseas, vômitos ou tontura, precisa de
            avaliação médica imediata.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}