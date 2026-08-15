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

export default function HPVScreen() {

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
            color="#8B5CF6"
          />

          <Text style={tipsDetailStyles.title}>
            HPV
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda o que é o HPV, seus sinais, formas
            de prevenção e a importância do acompanhamento.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é HPV?
          </Text>

          <Text style={tipsDetailStyles.text}>
            HPV significa papilomavírus humano. É um grupo
            de vírus muito comum que pode infectar a pele
            e as mucosas.

            {'\n\n'}

            Existem muitos tipos de HPV. Alguns podem
            causar verrugas, enquanto outros estão
            relacionados ao desenvolvimento de alguns
            tipos de câncer.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O HPV sempre causa sintomas?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Não.

            {'\n\n'}

            Muitas infecções pelo HPV não apresentam
            sintomas e podem desaparecer naturalmente
            graças à resposta do sistema imunológico.

            {'\n\n'}

            Por isso, uma pessoa pode ter HPV sem saber
            que está infectada.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Verrugas genitais
          </Text>

          <Text style={tipsDetailStyles.text}>
            Alguns tipos de HPV podem provocar verrugas
            na região genital ou anal.

            {'\n\n'}

            Elas podem aparecer como pequenas
            protuberâncias únicas ou agrupadas.

            {'\n\n'}

            Nem toda lesão na região íntima é causada
            por HPV. Por isso, qualquer alteração deve
            ser avaliada por um profissional.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            HPV e câncer
          </Text>

          <Text style={tipsDetailStyles.text}>
            Alguns tipos de HPV são considerados de
            alto risco porque podem causar alterações
            nas células ao longo do tempo.

            {'\n\n'}

            A infecção persistente por alguns desses tipos
            está relacionada principalmente ao câncer do
            colo do útero e também pode estar associada
            a outros tipos de câncer.

            {'\n\n'}

            Ter HPV não significa que a pessoa terá câncer.
            O acompanhamento adequado é fundamental para
            identificar alterações precocemente.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como é transmitido?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O HPV pode ser transmitido principalmente pelo
            contato direto com a pele e mucosas durante
            atividades sexuais.

            {'\n\n'}

            A transmissão pode acontecer mesmo quando
            não existem verrugas ou outros sinais visíveis.

            {'\n\n'}

            O preservativo reduz o risco de transmissão,
            mas não oferece proteção completa porque
            algumas áreas da pele podem ficar expostas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Vacina contra o HPV
          </Text>

          <Text style={tipsDetailStyles.text}>
            A vacinação é uma das principais formas de
            prevenção contra os tipos de HPV relacionados
            a diversas doenças.

            {'\n\n'}

            A vacina é mais eficaz quando aplicada antes
            da exposição ao vírus, mas a indicação e o
            esquema de vacinação dependem da idade e
            das orientações de saúde vigentes.

            {'\n\n'}

            Procure um serviço de saúde para saber se a
            vacinação está indicada para você.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Prevenção
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas medidas ajudam a reduzir os riscos:

            {'\n\n'}

            • Manter a vacinação contra o HPV em dia;

            {'\n'}

            • Usar preservativo nas relações sexuais;

            {'\n'}

            • Realizar o acompanhamento ginecológico;

            {'\n'}

            • Fazer os exames preventivos recomendados;

            {'\n'}

            • Procurar atendimento diante de alterações
            ou lesões na região genital.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure orientação profissional se houver:

            {'\n\n'}

            • Verrugas ou lesões na região genital;

            {'\n'}

            • Alterações identificadas em exames;

            {'\n'}

            • Sangramento vaginal anormal;

            {'\n'}

            • Dor ou outros sintomas persistentes;

            {'\n'}

            • Dúvidas sobre vacinação;

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
            O HPV é muito comum e muitas infecções não
            apresentam sintomas. A vacinação, o uso de
            preservativos e o acompanhamento preventivo
            são importantes para reduzir os riscos.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}