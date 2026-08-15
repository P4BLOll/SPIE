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

export default function MenstrualCrampsScreen() {

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
            name="flash-outline"
            size={55}
            color="#F97316"
          />

          <Text style={tipsDetailStyles.title}>
            Cólicas menstruais
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda por que as cólicas acontecem,
            como aliviar o desconforto e quando procurar ajuda.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que são cólicas menstruais?
          </Text>

          <Text style={tipsDetailStyles.text}>
            As cólicas menstruais, também chamadas de
            dismenorreia, são dores que podem aparecer
            antes ou durante a menstruação.

            {'\n\n'}

            Elas acontecem principalmente devido às
            contrações do útero durante a eliminação
            do endométrio.

            {'\n\n'}

            A intensidade pode variar bastante entre
            as pessoas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Por que o útero contrai?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Durante a menstruação, o organismo produz
            substâncias chamadas prostaglandinas.

            {'\n\n'}

            Elas ajudam o útero a se contrair para eliminar
            o revestimento interno que não foi utilizado
            naquele ciclo.

            {'\n\n'}

            Quando os níveis dessas substâncias são maiores,
            as contrações podem provocar dores mais intensas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Sintomas que podem acompanhar
          </Text>

          <Text style={tipsDetailStyles.text}>
            Além da dor abdominal, algumas pessoas podem
            apresentar:

            {'\n\n'}

            • Dor na região lombar;

            {'\n'}

            • Dor que se espalha para as pernas;

            {'\n'}

            • Náusea;

            {'\n'}

            • Dor de cabeça;

            {'\n'}

            • Cansaço;

            {'\n'}

            • Alterações intestinais;

            {'\n'}

            • Sensação de fraqueza.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que pode ajudar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas medidas podem ajudar a aliviar
            cólicas leves ou moderadas:

            {'\n\n'}

            • Aplicar calor na região abdominal ou lombar;

            {'\n'}

            • Fazer atividades físicas leves, quando
            possível;

            {'\n'}

            • Descansar adequadamente;

            {'\n'}

            • Manter uma boa hidratação;

            {'\n'}

            • Utilizar medicamentos somente de acordo
            com orientação profissional ou bula.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando a cólica não deve ser normalizada?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Cólicas leves ou moderadas podem fazer parte
            da menstruação.

            {'\n\n'}

            Porém, dores muito intensas não devem ser
            simplesmente consideradas normais.

            {'\n\n'}

            Procure avaliação quando a dor:

            {'\n\n'}

            • Impede atividades do dia a dia;

            {'\n'}

            • Faz você faltar às aulas ou ao trabalho;

            {'\n'}

            • Não melhora com medidas habituais;

            {'\n'}

            • Está ficando progressivamente mais intensa;

            {'\n'}

            • Começou depois de anos com menstruações
            pouco dolorosas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Cólicas podem estar relacionadas a doenças?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Sim.

            {'\n\n'}

            Cólicas muito fortes ou que surgem de forma
            diferente do habitual podem estar associadas
            a condições como:

            {'\n\n'}

            • Endometriose;

            {'\n'}

            • Adenomiose;

            {'\n'}

            • Miomas uterinos;

            {'\n'}

            • Doença Inflamatória Pélvica;

            {'\n'}

            • Outras alterações ginecológicas.

            {'\n\n'}

            Somente uma avaliação profissional pode
            determinar a causa.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar atendimento rapidamente?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure atendimento com urgência se a dor
            for muito intensa e aparecer acompanhada de:

            {'\n\n'}

            • Desmaio ou sensação de desmaio;

            {'\n'}

            • Febre;

            {'\n'}

            • Vômitos persistentes;

            {'\n'}

            • Sangramento muito intenso;

            {'\n'}

            • Dor súbita e diferente do habitual;

            {'\n'}

            • Possibilidade de gravidez.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Sentir algum desconforto durante a menstruação
            pode ser comum, mas dor incapacitante não deve
            ser ignorada. Registrar a intensidade da dor
            ao longo dos ciclos pode ajudar na avaliação.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}