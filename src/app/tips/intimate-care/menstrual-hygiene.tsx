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

export default function MenstrualHygieneScreen() {

  return (

    <Background>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          tipsDetailStyles.container
        }
      >

        <TouchableOpacity
          style={tipsDetailStyles.backButton}
          onPress={() =>
            router.back()
          }
        >
          <Ionicons
            name="arrow-back"
            size={25}
            color={Colors.text}
          />
        </TouchableOpacity>

        <View style={tipsDetailStyles.header}>

          <Ionicons
            name="sparkles-outline"
            size={55}
            color="#06B6D4"
          />

          <Text style={tipsDetailStyles.title}>
            Higiene menstrual
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Cuidados importantes para manter o conforto
            e a higiene durante a menstruação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é higiene menstrual?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Higiene menstrual envolve os cuidados realizados
            durante a menstruação para manter a região íntima
            limpa, confortável e saudável.

            {'\n\n'}

            Ela também inclui o uso adequado dos produtos
            menstruais e a atenção às mudanças no corpo.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Produtos menstruais
          </Text>

          <Text style={tipsDetailStyles.text}>
            Existem diferentes opções para lidar com o
            sangramento menstrual, como:

            {'\n\n'}

            • Absorventes externos;

            {'\n'}

            • Absorventes internos;

            {'\n'}

            • Coletores menstruais;

            {'\n'}

            • Calcinhas absorventes.

            {'\n\n'}

            A escolha depende das preferências, necessidades
            e conforto de cada pessoa.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Troque o produto regularmente
          </Text>

          <Text style={tipsDetailStyles.text}>
            Os produtos menstruais devem ser utilizados de
            acordo com as orientações do fabricante e trocados
            regularmente.

            {'\n\n'}

            Evite permanecer por períodos prolongados com
            um produto saturado de sangue.

            {'\n\n'}

            No caso de produtos reutilizáveis, siga
            cuidadosamente as instruções de limpeza e
            higienização indicadas pelo fabricante.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Higiene da região íntima
          </Text>

          <Text style={tipsDetailStyles.text}>
            A região íntima pode ser higienizada com água
            e produtos suaves, quando necessários.

            {'\n\n'}

            Evite duchas vaginais e produtos perfumados
            dentro da vagina, pois eles podem alterar o
            equilíbrio natural da região.

            {'\n\n'}

            A vagina possui mecanismos próprios de limpeza.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Lave as mãos
          </Text>

          <Text style={tipsDetailStyles.text}>
            Lavar as mãos antes e depois de trocar produtos
            menstruais é uma medida simples que ajuda a
            reduzir o risco de contaminação.

            {'\n\n'}

            Isso é especialmente importante ao utilizar
            absorventes internos ou coletores menstruais.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Atenção aos produtos reutilizáveis
          </Text>

          <Text style={tipsDetailStyles.text}>
            Coletores menstruais e calcinhas absorventes
            precisam de cuidados específicos.

            {'\n\n'}

            Siga as instruções de limpeza, armazenamento
            e tempo de uso fornecidas pelo fabricante.

            {'\n\n'}

            Uma higienização inadequada pode favorecer
            odores e crescimento de microrganismos.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure orientação profissional caso apareçam:

            {'\n\n'}

            • Coceira persistente;

            {'\n'}

            • Ardência;

            {'\n'}

            • Feridas ou lesões;

            {'\n'}

            • Dor incomum;

            {'\n'}

            • Corrimento diferente do habitual;

            {'\n'}

            • Odor forte e persistente;

            {'\n'}

            • Irritação que não melhora.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Higiene íntima não significa lavar excessivamente
            a região. Evitar duchas vaginais e produtos
            perfumados dentro da vagina ajuda a preservar
            o equilíbrio natural da região íntima.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}

