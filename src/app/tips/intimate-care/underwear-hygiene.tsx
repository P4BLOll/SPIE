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

export default function UnderwearHygieneScreen() {

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
            name="shirt-outline"
            size={55}
            color="#8B5CF6"
          />

          <Text style={tipsDetailStyles.title}>
            Higiene da roupa íntima
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Cuidados simples com a roupa íntima que ajudam
            a manter conforto e higiene no dia a dia.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Troque a roupa íntima regularmente
          </Text>

          <Text style={tipsDetailStyles.text}>
            A roupa íntima entra em contato direto com a
            região genital e deve ser trocada regularmente.

            {'\n\n'}

            Em geral, uma peça limpa deve ser utilizada
            diariamente e sempre que estiver úmida, suada
            ou suja.

            {'\n\n'}

            Após atividades físicas, pode ser confortável
            trocar a roupa íntima para evitar permanecer
            com tecido úmido por muito tempo.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Lave corretamente
          </Text>

          <Text style={tipsDetailStyles.text}>
            Lave as peças de acordo com as orientações
            presentes na etiqueta do fabricante.

            {'\n\n'}

            Utilize produtos de limpeza adequados para
            roupas e enxágue bem para evitar resíduos.

            {'\n\n'}

            Evite compartilhar roupas íntimas com outras
            pessoas.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Seque completamente
          </Text>

          <Text style={tipsDetailStyles.text}>
            Antes de guardar ou utilizar uma peça, certifique-se
            de que ela esteja completamente seca.

            {'\n\n'}

            Guardar roupas úmidas pode favorecer a proliferação
            de microrganismos e causar odores desagradáveis.

            {'\n\n'}

            Mantenha as peças em um local limpo e seco.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Escolha tecidos confortáveis
          </Text>

          <Text style={tipsDetailStyles.text}>
            Prefira roupas íntimas que sejam confortáveis
            e adequadas para o seu corpo.

            {'\n\n'}

            Tecidos respiráveis podem ajudar a reduzir o
            acúmulo de calor e umidade.

            {'\n\n'}

            O mais importante é evitar peças que causem
            atrito, aperto ou desconforto.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Evite permanecer com roupas úmidas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Após nadar, praticar exercícios ou ficar muito
            tempo com roupas molhadas, troque-as assim que
            possível.

            {'\n\n'}

            A umidade prolongada pode aumentar o desconforto
            e favorecer irritações na região íntima.

            {'\n\n'}

            Mantenha a região limpa e seca sem realizar
            lavagens excessivas.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Cuide do armazenamento
          </Text>

          <Text style={tipsDetailStyles.text}>
            Guarde as roupas íntimas limpas e completamente
            secas.

            {'\n\n'}

            Evite deixá-las em locais úmidos, como dentro
            do banheiro, principalmente quando houver pouca
            ventilação.

            {'\n\n'}

            Organizar as peças em um local limpo ajuda a
            preservá-las por mais tempo.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure orientação profissional caso apareçam:

            {'\n\n'}

            • Coceira persistente;

            {'\n'}

            • Ardência;

            {'\n'}

            • Irritação frequente;

            {'\n'}

            • Feridas ou lesões;

            {'\n'}

            • Dor incomum;

            {'\n'}

            • Corrimento diferente do habitual;

            {'\n'}

            • Odor forte e persistente.
          </Text>

        </View>


        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Higiene não significa lavar a região íntima
            excessivamente. Manter roupas limpas, secas e
            confortáveis é mais importante do que realizar
            lavagens frequentes.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}