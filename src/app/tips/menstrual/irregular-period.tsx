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

export default function IrregularPeriodScreen() {

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
            name="calendar-outline"
            size={55}
            color="#8B5CF6"
          />

          <Text style={tipsDetailStyles.title}>
            Menstruação irregular
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda o que pode causar alterações no ciclo
            menstrual e quando procurar avaliação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é um ciclo irregular?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O ciclo menstrual pode variar de uma pessoa
            para outra e também pode sofrer pequenas
            alterações ao longo da vida.

            {'\n\n'}

            Um ciclo é considerado irregular quando existe
            uma variação frequente ou significativa no
            intervalo entre as menstruações ou no padrão
            habitual de sangramento.

            {'\n\n'}

            Uma alteração isolada não significa
            necessariamente que exista uma doença.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que pode causar irregularidade?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Existem diversas causas possíveis, incluindo:

            {'\n\n'}

            • Alterações hormonais;

            {'\n'}

            • Estresse;

            {'\n'}

            • Mudanças importantes de peso;

            {'\n'}

            • Exercícios físicos muito intensos;

            {'\n'}

            • Síndrome dos ovários policísticos (SOP);

            {'\n'}

            • Alterações da tireoide;

            {'\n'}

            • Alguns medicamentos;

            {'\n'}

            • Uso ou mudança de métodos contraceptivos;

            {'\n'}

            • Gravidez;

            {'\n'}

            • Período próximo à menopausa.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Adolescência
          </Text>

          <Text style={tipsDetailStyles.text}>
            Nos primeiros anos após a primeira menstruação,
            é comum que os ciclos sejam irregulares.

            {'\n\n'}

            Isso acontece porque o sistema hormonal ainda
            está amadurecendo.

            {'\n\n'}

            Mesmo assim, alterações muito intensas,
            sangramentos excessivos ou ausência prolongada
            de menstruação devem ser avaliados.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Anticoncepcionais podem alterar o ciclo?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Sim.

            {'\n\n'}

            Alguns métodos contraceptivos podem modificar
            a quantidade, a duração e a frequência do
            sangramento.

            {'\n\n'}

            Dependendo do método, pode ocorrer sangramento
            irregular ou até ausência de menstruação.

            {'\n\n'}

            Essas alterações devem ser discutidas com um
            profissional quando causarem preocupação ou
            desconforto.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como acompanhar o ciclo?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Registrar o ciclo pode ajudar a perceber
            alterações.

            {'\n\n'}

            Você pode acompanhar:

            {'\n\n'}

            • Primeiro dia da menstruação;

            {'\n'}

            • Quantos dias durou o sangramento;

            {'\n'}

            • Intensidade do fluxo;

            {'\n'}

            • Cólicas e outros sintomas;

            {'\n'}

            • Sangramentos fora do período;

            {'\n'}

            • Alterações importantes entre um ciclo e outro.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure avaliação profissional se:

            {'\n\n'}

            • Seus ciclos ficaram constantemente
            diferentes do habitual;

            {'\n'}

            • A menstruação desapareceu por vários meses;

            {'\n'}

            • O sangramento ficou muito intenso;

            {'\n'}

            • Há sangramentos frequentes fora da
            menstruação;

            {'\n'}

            • A irregularidade vem acompanhada de dor
            intensa;

            {'\n'}

            • Existem outros sintomas, como alterações
            importantes de peso ou crescimento excessivo
            de pelos;

            {'\n'}

            • Existe possibilidade de gravidez.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            O mais importante é conhecer o seu próprio
            padrão menstrual. Registrar os ciclos ajuda
            a identificar mudanças e fornece informações
            úteis para uma avaliação profissional.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}