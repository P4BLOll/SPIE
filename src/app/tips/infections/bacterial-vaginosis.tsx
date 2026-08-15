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

export default function BacterialVaginosisScreen() {

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
            name="git-network-outline"
            size={55}
            color="#06B6D4"
          />

          <Text style={tipsDetailStyles.title}>
            Vaginose bacteriana
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda o que é a vaginose bacteriana,
            seus sinais e quando procurar ajuda.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é vaginose bacteriana?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A vaginose bacteriana acontece quando ocorre
            um desequilíbrio entre os microrganismos que
            normalmente vivem na vagina.

            {'\n\n'}

            Esse desequilíbrio pode provocar uma alteração
            na composição da microbiota vaginal.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Principais sinais
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas pessoas não apresentam sintomas.

            {'\n\n'}

            Quando aparecem, os sinais podem incluir:

            {'\n\n'}

            • Corrimento fino ou mais fluido;

            {'\n'}

            • Corrimento esbranquiçado ou acinzentado;

            {'\n'}

            • Odor vaginal forte, que pode ficar mais
            perceptível após relações sexuais;

            {'\n'}

            • Em alguns casos, irritação ou desconforto.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Vaginose causa muita coceira?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A coceira intensa não é o sintoma mais
            característico da vaginose bacteriana.

            {'\n\n'}

            Quando existe muita coceira, especialmente
            acompanhada de vermelhidão e irritação, outras
            condições também precisam ser consideradas,
            como a candidíase.

            {'\n\n'}

            Apenas os sintomas não são suficientes para
            confirmar o diagnóstico.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            É uma infecção sexualmente transmissível?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A vaginose bacteriana não é classificada como
            uma infecção sexualmente transmissível.

            {'\n\n'}

            Ela pode ocorrer independentemente da atividade
            sexual.

            {'\n\n'}

            Entretanto, alguns fatores relacionados à vida
            sexual podem estar associados a um maior risco
            de desenvolver a condição.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que pode favorecer a vaginose?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Alguns fatores podem aumentar a possibilidade
            de alteração da microbiota vaginal, como:

            {'\n\n'}

            • Duchas vaginais;

            {'\n'}

            • Alterações na microbiota;

            {'\n'}

            • Novo parceiro sexual ou múltiplos parceiros;

            {'\n'}

            • Relações sexuais sem preservativo.

            {'\n\n'}

            Ter um desses fatores não significa que a
            pessoa necessariamente desenvolverá vaginose.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Tratamento
          </Text>

          <Text style={tipsDetailStyles.text}>
            A vaginose bacteriana pode ser tratada com
            antibióticos prescritos por um profissional
            de saúde.

            {'\n\n'}

            É importante seguir corretamente o tratamento
            indicado e evitar a automedicação.

            {'\n\n'}

            Usar medicamentos inadequados pode dificultar
            a identificação e o tratamento da causa correta.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure orientação profissional se houver:

            {'\n\n'}

            • Odor forte e persistente;

            {'\n'}

            • Corrimento diferente do habitual;

            {'\n'}

            • Irritação ou desconforto;

            {'\n'}

            • Sintomas que continuam ou retornam;

            {'\n'}

            • Dor pélvica;

            {'\n'}

            • Febre;

            {'\n'}

            • Gravidez associada a sintomas ou preocupação
            com uma possível infecção.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            O odor e a aparência do corrimento podem
            fornecer pistas, mas não permitem confirmar
            sozinhos uma vaginose bacteriana. O diagnóstico
            deve ser feito por um profissional de saúde.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}