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

export default function ChlamydiaScreen() {

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
            name="shield-outline"
            size={55}
            color="#3B82F6"
          />

          <Text style={tipsDetailStyles.title}>
            Clamídia
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Conheça essa infecção sexualmente transmissível
            e saiba quais sinais merecem atenção.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é clamídia?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A clamídia é uma infecção sexualmente
            transmissível causada pela bactéria
            Chlamydia trachomatis.

            {'\n\n'}

            Ela pode afetar principalmente o colo do útero,
            a uretra, o reto e outras regiões do sistema
            reprodutivo.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Pode não apresentar sintomas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Muitas pessoas infectadas não apresentam
            sintomas.

            {'\n\n'}

            Isso faz com que a infecção possa passar
            despercebida e ser transmitida para outras
            pessoas.

            {'\n\n'}

            Por esse motivo, testes são importantes quando
            existe indicação ou possibilidade de exposição.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Possíveis sintomas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Quando aparecem, os sintomas podem incluir:

            {'\n\n'}

            • Corrimento vaginal diferente do habitual;

            {'\n'}

            • Ardência ao urinar;

            {'\n'}

            • Dor ou desconforto durante a relação sexual;

            {'\n'}

            • Dor na parte inferior do abdômen;

            {'\n'}

            • Sangramento entre as menstruações;

            {'\n'}

            • Sangramento após a relação sexual.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como é transmitida?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A clamídia pode ser transmitida durante relações
            sexuais vaginais, anais ou orais sem proteção
            com uma pessoa infectada.

            {'\n\n'}

            A transmissão também pode acontecer mesmo
            quando a pessoa infectada não apresenta
            sintomas.

            {'\n\n'}

            O uso correto de preservativos ajuda a reduzir
            o risco de transmissão.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Por que o diagnóstico é importante?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Quando não tratada, a clamídia pode causar
            complicações no sistema reprodutivo.

            {'\n\n'}

            Em algumas pessoas, a infecção pode contribuir
            para doença inflamatória pélvica e problemas
            relacionados à fertilidade.

            {'\n\n'}

            O diagnóstico e o tratamento precoces ajudam
            a reduzir o risco dessas complicações.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Diagnóstico
          </Text>

          <Text style={tipsDetailStyles.text}>
            Como a clamídia frequentemente não apresenta
            sintomas, não é possível identificá-la apenas
            observando o corpo.

            {'\n\n'}

            Testes laboratoriais podem ser utilizados para
            confirmar a infecção.

            {'\n\n'}

            O profissional de saúde pode orientar qual exame
            é mais adequado para cada situação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Tratamento
          </Text>

          <Text style={tipsDetailStyles.text}>
            A clamídia é uma infecção bacteriana e pode
            ser tratada com antibióticos prescritos por
            um profissional de saúde.

            {'\n\n'}

            É importante seguir corretamente o tratamento
            e não interromper o uso do medicamento por
            conta própria.

            {'\n\n'}

            Parceiros sexuais também podem precisar de
            avaliação e tratamento.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como prevenir?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas medidas ajudam a reduzir o risco:

            {'\n\n'}

            • Usar preservativo corretamente;

            {'\n'}

            • Realizar testes para ISTs quando indicado;

            {'\n'}

            • Manter acompanhamento de saúde sexual;

            {'\n'}

            • Buscar atendimento após uma possível
            exposição;

            {'\n'}

            • Seguir o tratamento indicado quando houver
            diagnóstico.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure um serviço de saúde se houver:

            {'\n\n'}

            • Suspeita de exposição a uma IST;

            {'\n'}

            • Corrimento diferente do habitual;

            {'\n'}

            • Ardência ao urinar;

            {'\n'}

            • Dor pélvica;

            {'\n'}

            • Sangramento fora do período menstrual;

            {'\n'}

            • Dor durante a relação sexual;

            {'\n'}

            • Preocupação após uma relação sem proteção.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            A clamídia pode não causar sintomas. Por isso,
            observar alterações no corpo não substitui os
            testes de IST quando eles são recomendados.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}