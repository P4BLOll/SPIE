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

export default function PelvicInflammatoryDiseaseScreen() {

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
            color="#EF4444"
          />

          <Text style={tipsDetailStyles.title}>
            Doença Inflamatória Pélvica
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda a DIP, seus possíveis sintomas,
            causas e a importância do tratamento.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é DIP?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A Doença Inflamatória Pélvica, conhecida como
            DIP, é uma infecção que pode atingir órgãos
            do sistema reprodutivo feminino.

            {'\n\n'}

            Ela pode afetar estruturas como o útero,
            as tubas uterinas e os ovários.

            {'\n\n'}

            Geralmente acontece quando bactérias presentes
            na vagina ou no colo do útero alcançam regiões
            superiores do sistema reprodutivo.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Relação com as ISTs
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas causas importantes da DIP são
            infecções sexualmente transmissíveis, como
            clamídia e gonorreia.

            {'\n\n'}

            Porém, a DIP não é necessariamente causada
            por uma única bactéria ou exclusivamente por
            uma IST.

            {'\n\n'}

            O diagnóstico e o tratamento devem ser feitos
            por um profissional de saúde.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Possíveis sintomas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Os sintomas podem variar bastante.

            {'\n\n'}

            Entre os possíveis sinais estão:

            {'\n\n'}

            • Dor na parte inferior do abdômen ou na pelve;

            {'\n'}

            • Dor durante as relações sexuais;

            {'\n'}

            • Corrimento vaginal diferente do habitual;

            {'\n'}

            • Sangramento fora do período menstrual;

            {'\n'}

            • Sangramento após relações sexuais;

            {'\n'}

            • Dor ou ardência ao urinar;

            {'\n'}

            • Febre;

            {'\n'}

            • Mal-estar.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Pode não apresentar sintomas?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Sim.

            {'\n\n'}

            Algumas pessoas podem apresentar sintomas
            leves ou até mesmo não perceber alterações.

            {'\n\n'}

            Mesmo assim, a infecção pode causar danos
            aos órgãos reprodutivos se não for tratada.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Por que tratar rapidamente?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O tratamento precoce é importante porque a
            DIP pode causar complicações.

            {'\n\n'}

            Entre elas estão:

            {'\n\n'}

            • Formação de cicatrizes nas tubas uterinas;

            {'\n'}

            • Dor pélvica persistente;

            {'\n'}

            • Dificuldade para engravidar;

            {'\n'}

            • Maior risco de gravidez ectópica;

            {'\n'}

            • Formação de abscessos em casos mais graves.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como é feito o diagnóstico?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Não existe um único exame capaz de confirmar
            todos os casos de DIP.

            {'\n\n'}

            O profissional de saúde pode avaliar os
            sintomas, realizar exame físico e solicitar
            exames laboratoriais ou de imagem quando
            necessário.

            {'\n\n'}

            Como o tratamento precoce é importante, o
            profissional pode iniciar o tratamento com
            base na avaliação clínica.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Tratamento
          </Text>

          <Text style={tipsDetailStyles.text}>
            A DIP geralmente é tratada com antibióticos
            prescritos por um profissional de saúde.

            {'\n\n'}

            É importante seguir o tratamento completo
            conforme a orientação recebida.

            {'\n\n'}

            Dependendo da causa, parceiros sexuais também
            podem precisar de avaliação e tratamento.

            {'\n\n'}

            Em casos mais graves, pode ser necessário
            tratamento hospitalar.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como reduzir o risco?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas medidas podem ajudar:

            {'\n\n'}

            • Usar preservativo corretamente;

            {'\n'}

            • Realizar testes para ISTs quando indicado;

            {'\n'}

            • Buscar atendimento diante de sintomas;

            {'\n'}

            • Realizar o tratamento indicado;

            {'\n'}

            • Seguir as orientações sobre parceiros
            sexuais quando houver diagnóstico de uma IST.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure atendimento médico se apresentar:

            {'\n\n'}

            • Dor pélvica ou abdominal;

            {'\n'}

            • Febre;

            {'\n'}

            • Corrimento vaginal anormal;

            {'\n'}

            • Sangramento fora do período menstrual;

            {'\n'}

            • Dor durante relações sexuais;

            {'\n'}

            • Suspeita de exposição a uma IST.

            {'\n\n'}

            Dor pélvica intensa acompanhada de febre,
            vômitos ou mal-estar importante merece
            atendimento médico com urgência.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            A DIP pode causar complicações quando não
            tratada. Dor pélvica, febre e alterações no
            corrimento ou sangramento devem ser avaliadas,
            principalmente quando aparecem juntas.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}