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

export default function VaginalIrritationScreen() {

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
            name="alert-circle-outline"
            size={55}
            color="#F97316"
          />

          <Text style={tipsDetailStyles.title}>
            Coceira e irritação
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda possíveis causas da coceira e irritação
            na região íntima.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que pode causar coceira?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A coceira na região íntima pode ter diferentes
            causas.

            {'\n\n'}

            Ela pode acontecer por irritação da pele,
            contato com determinados produtos ou também
            estar relacionada a infecções e outras condições.

            {'\n\n'}

            Por isso, a presença de coceira não significa
            automaticamente que existe uma infecção.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Irritação por produtos
          </Text>

          <Text style={tipsDetailStyles.text}>
            Alguns produtos podem irritar a região externa,
            principalmente quando possuem fragrâncias
            ou outros componentes irritantes.

            {'\n\n'}

            Entre eles podem estar:

            {'\n\n'}

            • Sabonetes perfumados;

            {'\n'}

            • Sprays íntimos;

            {'\n'}

            • Lenços umedecidos perfumados;

            {'\n'}

            • Absorventes ou protetores com fragrância;

            {'\n'}

            • Outros produtos que causem irritação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Candidíase
          </Text>

          <Text style={tipsDetailStyles.text}>
            A candidíase é uma infecção causada pelo
            crescimento excessivo de fungos do gênero
            Candida.

            {'\n\n'}

            Ela pode causar coceira intensa, vermelhidão,
            irritação e alterações na secreção vaginal.

            {'\n\n'}

            Esses sintomas podem ser semelhantes aos de
            outras condições, por isso o diagnóstico deve
            ser realizado por um profissional.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Outras possíveis causas
          </Text>

          <Text style={tipsDetailStyles.text}>
            A coceira ou irritação também pode estar
            relacionada a:

            {'\n\n'}

            • Vaginose ou outras alterações da microbiota;

            {'\n'}

            • Infecções sexualmente transmissíveis;

            {'\n'}

            • Alergias ou dermatites;

            {'\n'}

            • Ressecamento vaginal;

            {'\n'}

            • Irritação causada por atrito.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que evitar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Quando houver irritação, evite produtos
            perfumados ou substâncias que possam piorar
            o desconforto.

            {'\n\n'}

            Também evite duchas vaginais, pois elas podem
            alterar o equilíbrio natural da região.

            {'\n\n'}

            Não utilize medicamentos por conta própria
            apenas com base nos sintomas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure orientação profissional se houver:

            {'\n\n'}

            • Coceira intensa ou persistente;

            {'\n'}

            • Ardência;

            {'\n'}

            • Inchaço ou vermelhidão importante;

            {'\n'}

            • Corrimento diferente do habitual;

            {'\n'}

            • Odor forte;

            {'\n'}

            • Feridas ou lesões;

            {'\n'}

            • Dor ao urinar;

            {'\n'}

            • Dor durante a relação sexual;

            {'\n'}

            • Sintomas que não melhoram.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Coceira e irritação podem ter diversas causas.
            Evite se automedicar e procure avaliação
            profissional quando os sintomas forem intensos,
            persistentes ou acompanhados de outras alterações.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}