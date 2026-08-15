
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

export default function LutealPhaseScreen() {

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
            name="moon-outline"
            size={55}
            color="#9C7CFF"
          />

          <Text style={tipsDetailStyles.title}>
            Fase lútea
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda o que acontece no corpo depois da ovulação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é a fase lútea?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A fase lútea acontece depois da ovulação e
            corresponde à última etapa do ciclo menstrual.

            {'\n\n'}

            Durante esse período, o organismo se prepara
            para uma possível gravidez.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que acontece no ovário?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Depois que o óvulo é liberado, o folículo que
            participou da ovulação se transforma em uma
            estrutura chamada corpo lúteo.

            {'\n\n'}

            O corpo lúteo produz principalmente progesterona,
            um hormônio importante durante essa fase.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Preparação do útero
          </Text>

          <Text style={tipsDetailStyles.text}>
            A progesterona ajuda a manter o endométrio
            preparado para uma possível implantação de um
            embrião.

            {'\n\n'}

            Se não houver gravidez, o corpo lúteo perde
            sua função e os níveis hormonais diminuem.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Sintomas que podem aparecer
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas pessoas podem perceber mudanças
            durante a fase lútea, como:

            {'\n\n'}

            • Sensibilidade nas mamas;

            {'\n'}

            • Inchaço;

            {'\n'}

            • Alterações de humor;

            {'\n'}

            • Cansaço;

            {'\n'}

            • Aumento do apetite;

            {'\n'}

            • Cólicas leves;

            {'\n'}

            • Alterações na temperatura corporal.

            {'\n\n'}

            A intensidade desses sintomas pode variar
            bastante entre as pessoas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Relação com a TPM
          </Text>

          <Text style={tipsDetailStyles.text}>
            Alguns sintomas da TPM podem aparecer durante
            a fase lútea, principalmente nos dias próximos
            à menstruação.

            {'\n\n'}

            Alterações hormonais podem estar relacionadas
            a sintomas físicos e emocionais, mas nem todas
            as pessoas apresentam TPM.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            E quando a menstruação começa?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Quando não ocorre uma gravidez, os níveis de
            progesterona e estrogênio diminuem.

            {'\n\n'}

            Essa queda hormonal contribui para a
            descamação do endométrio, dando início
            a uma nova menstruação.

            {'\n\n'}

            Assim, um novo ciclo começa.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            A fase lútea acontece após a ovulação e
            geralmente apresenta menos variação de duração
            do que a fase folicular. Cada pessoa pode
            apresentar diferentes sintomas ao longo dessa
            etapa do ciclo.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}

