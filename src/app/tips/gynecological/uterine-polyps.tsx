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

export default function UterinePolypsScreen() {

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
            color="#14B8A6"
          />

          <Text style={tipsDetailStyles.title}>
            Pólipos uterinos
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Saiba o que são os pólipos, quais alterações
            podem causar e quando procurar avaliação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que são pólipos uterinos?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Pólipos uterinos são crescimentos de tecido que
            se desenvolvem no revestimento interno do útero,
            chamado endométrio.

            {'\n\n'}

            Eles podem ter diferentes tamanhos e podem
            aparecer como uma pequena alteração ou como
            uma estrutura maior dentro da cavidade uterina.

            {'\n\n'}

            A maioria é benigna, mas alguns pólipos podem
            apresentar alterações que precisam ser avaliadas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Podem não causar sintomas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas pessoas possuem pólipos sem apresentar
            nenhuma alteração perceptível.

            {'\n\n'}

            Em muitos casos, eles são descobertos durante
            exames realizados por outros motivos.

            {'\n\n'}

            Quando existem sintomas, o mais comum é haver
            alterações no padrão do sangramento.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Possíveis sintomas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Os pólipos podem estar associados a:

            {'\n\n'}

            • Sangramento entre as menstruações;

            {'\n'}

            • Menstruação mais intensa;

            {'\n'}

            • Menstruação irregular;

            {'\n'}

            • Sangramento após a menopausa;

            {'\n'}

            • Sangramento após relações sexuais;

            {'\n'}

            • Sangramento vaginal inesperado.

            {'\n\n'}

            Nem todo sangramento anormal é causado
            por pólipos.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Pólipos e fertilidade
          </Text>

          <Text style={tipsDetailStyles.text}>
            Em algumas situações, pólipos dentro da
            cavidade uterina podem estar associados a
            dificuldades para engravidar.

            {'\n\n'}

            Isso não significa que toda pessoa com pólipo
            terá problemas de fertilidade.

            {'\n\n'}

            A avaliação deve considerar o tamanho,
            localização e características do pólipo,
            além dos objetivos reprodutivos da pessoa.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Pólipo é câncer?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Na maioria das vezes, os pólipos uterinos
            são benignos.

            {'\n\n'}

            Entretanto, alguns podem apresentar alterações
            pré-cancerosas ou cancerosas.

            {'\n\n'}

            Por isso, o profissional de saúde pode recomendar
            investigação ou acompanhamento, principalmente
            quando existem fatores de risco ou sangramentos
            anormais.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como é feito o diagnóstico?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A investigação pode começar com uma
            ultrassonografia transvaginal.

            {'\n\n'}

            Dependendo do caso, outros exames podem ser
            indicados, como a histeroscopia, que permite
            visualizar diretamente o interior do útero.

            {'\n\n'}

            O profissional escolherá os exames de acordo
            com os sintomas e a situação de cada pessoa.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Tratamento
          </Text>

          <Text style={tipsDetailStyles.text}>
            Alguns pólipos pequenos podem ser apenas
            acompanhados, principalmente quando não
            provocam sintomas.

            {'\n\n'}

            Quando há sangramento, crescimento do pólipo,
            alterações suspeitas ou outras indicações,
            pode ser recomendada a remoção.

            {'\n\n'}

            A retirada pode ser realizada por meio de
            histeroscopia em muitos casos.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure avaliação profissional se houver:

            {'\n\n'}

            • Sangramento entre as menstruações;

            {'\n'}

            • Menstruação muito intensa ou irregular;

            {'\n'}

            • Sangramento após relações sexuais;

            {'\n'}

            • Sangramento após a menopausa;

            {'\n'}

            • Sangramento vaginal sem causa conhecida;

            {'\n'}

            • Alteração identificada em um exame.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            A maioria dos pólipos uterinos é benigna,
            mas sangramentos fora do padrão menstrual
            devem ser avaliados para identificar a causa
            corretamente.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}