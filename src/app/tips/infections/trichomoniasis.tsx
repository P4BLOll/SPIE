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

export default function TrichomoniasisScreen() {

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
            color="#F97316"
          />

          <Text style={tipsDetailStyles.title}>
            Tricomoníase
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda essa infecção sexualmente transmissível,
            seus sintomas e formas de prevenção.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é tricomoníase?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A tricomoníase é uma infecção sexualmente
            transmissível causada pelo protozoário
            Trichomonas vaginalis.

            {'\n\n'}

            A infecção pode atingir principalmente a vagina
            e a uretra e pode ocorrer em pessoas de diferentes
            idades que possuem vida sexual ativa.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Pode não apresentar sintomas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Muitas pessoas com tricomoníase podem não
            apresentar sintomas.

            {'\n\n'}

            Isso significa que uma pessoa pode transmitir
            a infecção sem saber que está infectada.

            {'\n\n'}

            Por isso, a ausência de sintomas não exclui
            completamente uma IST.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Possíveis sintomas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Quando aparecem, os sintomas podem incluir:

            {'\n\n'}

            • Corrimento vaginal aumentado;

            {'\n'}

            • Corrimento com coloração amarelada ou
            esverdeada;

            {'\n'}

            • Odor desagradável;

            {'\n'}

            • Coceira;

            {'\n'}

            • Ardência;

            {'\n'}

            • Irritação da região genital;

            {'\n'}

            • Dor ou desconforto ao urinar;

            {'\n'}

            • Desconforto durante a relação sexual.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como é transmitida?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A tricomoníase é transmitida principalmente
            por meio de relações sexuais sem proteção
            com uma pessoa infectada.

            {'\n\n'}

            O uso correto de preservativos ajuda a reduzir
            o risco de transmissão.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Diagnóstico
          </Text>

          <Text style={tipsDetailStyles.text}>
            Os sintomas podem se parecer com os de outras
            infecções ou alterações vaginais.

            {'\n\n'}

            Por isso, observar apenas a aparência do
            corrimento não é suficiente para confirmar
            tricomoníase.

            {'\n\n'}

            Um profissional de saúde pode solicitar exames
            para identificar a infecção corretamente.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Tratamento
          </Text>

          <Text style={tipsDetailStyles.text}>
            A tricomoníase pode ser tratada com medicamentos
            específicos prescritos por um profissional
            de saúde.

            {'\n\n'}

            É importante seguir o tratamento corretamente.

            {'\n\n'}

            Os parceiros sexuais também podem precisar
            de avaliação e tratamento para evitar que a
            infecção volte a ocorrer.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como prevenir?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas medidas ajudam a reduzir o risco de
            transmissão:

            {'\n\n'}

            • Usar preservativo durante as relações sexuais;

            {'\n'}

            • Realizar testes para ISTs quando indicado;

            {'\n'}

            • Buscar atendimento diante de sintomas;

            {'\n'}

            • Seguir corretamente o tratamento quando
            houver diagnóstico;

            {'\n'}

            • Evitar relações sexuais até receber orientação
            adequada durante o tratamento.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure um serviço de saúde se apresentar:

            {'\n\n'}

            • Corrimento diferente do habitual;

            {'\n'}

            • Odor forte;

            {'\n'}

            • Coceira ou ardência;

            {'\n'}

            • Dor ao urinar;

            {'\n'}

            • Dor durante a relação sexual;

            {'\n'}

            • Dor pélvica;

            {'\n'}

            • Suspeita de exposição a uma IST.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            A tricomoníase pode não apresentar sintomas.
            O uso de preservativo reduz o risco de transmissão,
            mas nenhuma observação dos sintomas substitui
            a realização de testes quando houver indicação.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}