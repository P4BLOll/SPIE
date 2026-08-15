
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

export default function FollicularPhaseScreen() {

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
            name="leaf-outline"
            size={55}
            color="#8BC34A"
          />

          <Text style={tipsDetailStyles.title}>
            Fase folicular
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda o que acontece no corpo antes da ovulação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é a fase folicular?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A fase folicular é uma das etapas do ciclo
            menstrual.

            {'\n\n'}

            Ela começa no primeiro dia da menstruação e
            termina quando ocorre a ovulação.

            {'\n\n'}

            Durante esse período, os ovários começam a
            desenvolver os folículos que contêm os óvulos.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que acontece nos ovários?
          </Text>

          <Text style={tipsDetailStyles.text}>
            No início dessa fase, vários folículos podem
            começar a se desenvolver nos ovários.

            {'\n\n'}

            Com o passar dos dias, geralmente um deles
            se torna dominante e continua seu desenvolvimento
            até a ovulação.

            {'\n\n'}

            Esse processo é influenciado principalmente pelo
            hormônio folículo-estimulante, conhecido como FSH.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            E os hormônios?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Durante a fase folicular, os níveis de estrogênio
            tendem a aumentar à medida que o folículo
            dominante se desenvolve.

            {'\n\n'}

            Esse aumento do estrogênio contribui para o
            crescimento e a preparação do endométrio,
            deixando o útero preparado para uma possível
            gestação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que você pode perceber?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas pessoas podem perceber mudanças
            durante essa fase, como:

            {'\n\n'}

            • Aumento gradual da disposição;

            {'\n'}

            • Alterações no muco cervical;

            {'\n'}

            • Mudanças na pele;

            {'\n'}

            • Alterações no humor;

            {'\n'}

            • Mudanças na libido.

            {'\n\n'}

            Essas características podem variar bastante
            de pessoa para pessoa.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Relação com a ovulação
          </Text>

          <Text style={tipsDetailStyles.text}>
            A fase folicular termina com a ovulação.

            {'\n\n'}

            Conforme o folículo dominante amadurece,
            o aumento dos níveis de estrogênio contribui
            para desencadear uma elevação do hormônio
            luteinizante, conhecido como LH.

            {'\n\n'}

            Esse aumento do LH está relacionado à
            liberação do óvulo durante a ovulação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            A duração é sempre igual?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Não.

            {'\n\n'}

            A fase folicular pode variar bastante entre
            diferentes pessoas e também entre ciclos
            da mesma pessoa.

            {'\n\n'}

            Por isso, não é recomendado considerar um
            determinado dia como obrigatório para o início
            ou o fim dessa fase.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            A fase folicular prepara o organismo para a
            ovulação. Observar as mudanças do ciclo pode
            ajudar você a conhecer melhor o funcionamento
            do seu corpo.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}

