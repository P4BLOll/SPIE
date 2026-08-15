
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

export default function CycleOverviewScreen() {

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
            name="sync-outline"
            size={55}
            color="#7C4DFF"
          />

          <Text style={tipsDetailStyles.title}>
            O ciclo completo
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda como as diferentes fases do ciclo
            menstrual se conectam.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é o ciclo menstrual?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O ciclo menstrual é uma sequência de mudanças
            hormonais e físicas que acontece no organismo
            ao longo do tempo.

            {'\n\n'}

            Essas mudanças envolvem principalmente os
            ovários e o útero e preparam o corpo para uma
            possível gravidez.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            1. Fase menstrual
          </Text>

          <Text style={tipsDetailStyles.text}>
            É o período em que ocorre o sangramento
            menstrual.

            {'\n\n'}

            O endométrio, que havia se preparado durante
            o ciclo anterior, é eliminado quando não
            ocorre uma gravidez.

            {'\n\n'}

            Essa fase marca o início de um novo ciclo.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            2. Fase folicular
          </Text>

          <Text style={tipsDetailStyles.text}>
            Durante essa fase, os folículos presentes nos
            ovários começam a se desenvolver.

            {'\n\n'}

            Um dos folículos geralmente se torna dominante
            e continua seu desenvolvimento até a ovulação.

            {'\n\n'}

            Os níveis de estrogênio também aumentam
            gradualmente durante esse processo.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            3. Ovulação
          </Text>

          <Text style={tipsDetailStyles.text}>
            A ovulação acontece quando um óvulo é liberado
            por um dos ovários.

            {'\n\n'}

            O momento da ovulação pode variar de pessoa
            para pessoa e entre diferentes ciclos.

            {'\n\n'}

            Essa é a fase em que existe maior possibilidade
            de ocorrer uma gravidez caso haja relação sexual
            sem contracepção.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            4. Fase lútea
          </Text>

          <Text style={tipsDetailStyles.text}>
            Depois da ovulação, começa a fase lútea.

            {'\n\n'}

            O corpo lúteo passa a produzir principalmente
            progesterona, ajudando a manter o endométrio
            preparado para uma possível gravidez.

            {'\n\n'}

            Quando não ocorre uma gravidez, os níveis
            hormonais diminuem e uma nova menstruação
            começa.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O ciclo se repete
          </Text>

          <Text style={tipsDetailStyles.text}>
            Depois da fase lútea, quando não ocorre uma
            gravidez, o endométrio é eliminado e uma nova
            menstruação começa.

            {'\n\n'}

            Assim, o ciclo recomeça e as fases voltam a
            acontecer em sequência.

            {'\n\n'}

            Cada pessoa pode apresentar um ciclo com
            características e duração diferentes.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O ciclo não é igual para todas
          </Text>

          <Text style={tipsDetailStyles.text}>
            A duração do ciclo pode variar entre pessoas
            e também entre diferentes ciclos da mesma pessoa.

            {'\n\n'}

            Por isso, não é necessário que todas as fases
            aconteçam exatamente nos mesmos dias todos
            os meses.

            {'\n\n'}

            Observar seu próprio padrão pode ajudar a
            compreender melhor as mudanças do seu corpo.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            O ciclo menstrual é contínuo e pode apresentar
            variações naturais. As fases ajudam a entender
            o que acontece no organismo, mas não devem ser
            usadas isoladamente para determinar o período
            fértil ou diagnosticar problemas de saúde.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}

