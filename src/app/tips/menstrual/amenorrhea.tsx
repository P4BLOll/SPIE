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

export default function AmenorrheaScreen() {

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
            name="calendar-clear-outline"
            size={55}
            color="#6366F1"
          />

          <Text style={tipsDetailStyles.title}>
            Amenorreia
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda a ausência de menstruação, suas
            possíveis causas e quando procurar ajuda.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é amenorreia?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Amenorreia é o termo utilizado para descrever
            a ausência de menstruação.

            {'\n\n'}

            Ela pode acontecer em diferentes situações e
            nem sempre significa que existe uma doença.

            {'\n\n'}

            É importante considerar a idade, o histórico
            menstrual, a possibilidade de gravidez,
            medicamentos utilizados e outras características
            de cada pessoa.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Amenorreia primária
          </Text>

          <Text style={tipsDetailStyles.text}>
            A amenorreia primária está relacionada à pessoa
            que ainda não apresentou a primeira menstruação
            dentro da idade esperada.

            {'\n\n'}

            Existem diferentes motivos para isso acontecer,
            incluindo fatores hormonais, genéticos e
            alterações no desenvolvimento do sistema
            reprodutivo.

            {'\n\n'}

            Quando a primeira menstruação demora além do
            esperado, é importante procurar avaliação
            profissional.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Amenorreia secundária
          </Text>

          <Text style={tipsDetailStyles.text}>
            A amenorreia secundária acontece quando uma
            pessoa que já menstruava deixa de menstruar
            por um período prolongado.

            {'\n\n'}

            A gravidez é uma das causas mais comuns em
            pessoas sexualmente ativas, mas existem
            diversas outras possibilidades.

            {'\n\n'}

            A ausência persistente da menstruação deve
            ser investigada para identificar a causa.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Possíveis causas
          </Text>

          <Text style={tipsDetailStyles.text}>
            A ausência de menstruação pode estar relacionada
            a diferentes fatores, como:

            {'\n\n'}

            • Gravidez;

            {'\n'}

            • Amamentação;

            {'\n'}

            • Menopausa;

            {'\n'}

            • Síndrome dos ovários policísticos (SOP);

            {'\n'}

            • Estresse intenso;

            {'\n'}

            • Perda ou ganho significativo de peso;

            {'\n'}

            • Exercícios físicos excessivos;

            {'\n'}

            • Alterações da tireoide;

            {'\n'}

            • Alterações hormonais;

            {'\n'}

            • Alguns medicamentos;

            {'\n'}

            • Outras condições de saúde.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            E se houver possibilidade de gravidez?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Quando existe possibilidade de gravidez,
            essa hipótese deve ser considerada.

            {'\n\n'}

            Um teste de gravidez pode ajudar a verificar
            a situação.

            {'\n\n'}

            Caso o resultado seja negativo, mas a
            menstruação continue ausente, pode ser
            necessário repetir o teste ou procurar
            orientação profissional, dependendo da situação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Sintomas que podem aparecer
          </Text>

          <Text style={tipsDetailStyles.text}>
            A ausência da menstruação pode acontecer
            acompanhada de outros sintomas.

            {'\n\n'}

            Dependendo da causa, podem ocorrer:

            {'\n\n'}

            • Acne;

            {'\n'}

            • Aumento de pelos;

            {'\n'}

            • Alterações de peso;

            {'\n'}

            • Ondas de calor;

            {'\n'}

            • Alterações no sono;

            {'\n'}

            • Dor de cabeça;

            {'\n'}

            • Secreção nas mamas;

            {'\n'}

            • Dor pélvica.

            {'\n\n'}

            Esses sintomas não indicam uma causa específica
            sozinhos.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como é feita a investigação?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O profissional pode perguntar sobre o histórico
            menstrual, alimentação, exercícios, medicamentos,
            saúde emocional e possibilidade de gravidez.

            {'\n\n'}

            Dependendo do caso, podem ser solicitados
            testes de gravidez, exames de sangue,
            avaliações hormonais ou exames de imagem.

            {'\n\n'}

            O objetivo é descobrir por que a menstruação
            não está acontecendo.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure avaliação profissional se:

            {'\n\n'}

            • A menstruação desapareceu por vários meses;

            {'\n'}

            • Você já menstruava e deixou de menstruar
            sem uma explicação conhecida;

            {'\n'}

            • Existe possibilidade de gravidez;

            {'\n'}

            • A ausência vem acompanhada de dor pélvica;

            {'\n'}

            • Existem alterações importantes de peso;

            {'\n'}

            • Há sintomas hormonais, como aumento
            significativo de pelos ou secreção nas mamas.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            A ausência da menstruação pode ter muitas
            causas. Se ela desaparecer por um período
            prolongado ou houver outros sintomas, procure
            orientação profissional para investigar a causa.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}