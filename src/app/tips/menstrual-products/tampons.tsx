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

export default function TamponsScreen() {

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
            name="ellipse-outline"
            size={55}
            color="#EC4899"
          />

          <Text style={tipsDetailStyles.title}>
            Absorvente interno
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda como funciona, como utilizar com
            segurança e quais cuidados são importantes.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O absorvente interno é um produto menstrual
            colocado dentro da vagina para absorver
            o sangue menstrual.

            {'\n\n'}

            Ele possui diferentes tamanhos e níveis
            de absorção, permitindo escolher uma opção
            de acordo com o fluxo.

            {'\n\n'}

            A escolha deve priorizar a menor absorção
            necessária para o seu fluxo.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como utilizar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Antes de colocar ou retirar o absorvente
            interno, lave bem as mãos.

            {'\n\n'}

            O produto deve ser inserido suavemente na
            vagina, seguindo as instruções da embalagem.

            {'\n\n'}

            Alguns modelos possuem aplicador e outros
            são inseridos diretamente com os dedos.

            {'\n\n'}

            Nunca force a inserção. Se houver dor ou
            desconforto persistente, interrompa o uso.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando trocar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O absorvente interno deve ser trocado
            regularmente, seguindo o intervalo indicado
            pelo fabricante.

            {'\n\n'}

            Não ultrapasse o tempo máximo de uso
            recomendado na embalagem.

            {'\n\n'}

            Evite utilizar um absorvente interno por
            tempo maior do que o recomendado,
            principalmente durante a noite.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Síndrome do choque tóxico
          </Text>

          <Text style={tipsDetailStyles.text}>
            A síndrome do choque tóxico (SCT) é uma
            condição rara, mas grave, que pode estar
            associada ao uso de absorventes internos.

            {'\n\n'}

            O risco pode ser reduzido utilizando o
            produto corretamente, trocando-o dentro
            do período recomendado e utilizando a
            menor absorção necessária.

            {'\n\n'}

            Leia sempre as instruções fornecidas pelo
            fabricante.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Sinais de alerta
          </Text>

          <Text style={tipsDetailStyles.text}>
            Durante o uso, procure atendimento médico
            imediatamente se surgirem sintomas como:

            {'\n\n'}

            • Febre alta repentina;

            {'\n'}

            • Tontura ou desmaio;

            {'\n'}

            • Vômitos ou diarreia;

            {'\n'}

            • Fraqueza intensa;

            {'\n'}

            • Dores musculares;

            {'\n'}

            • Erupção ou vermelhidão na pele.

            {'\n\n'}

            Retire o absorvente interno e procure
            atendimento caso esses sintomas ocorram.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Pode dormir usando?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O uso durante a noite depende das orientações
            do produto e do tempo total de utilização.

            {'\n\n'}

            Se não for possível respeitar o tempo máximo
            recomendado pelo fabricante, prefira um
            produto externo para dormir.

            {'\n\n'}

            Nunca mantenha o mesmo absorvente interno
            por mais tempo do que o indicado.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Absorvente interno pode ficar preso?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O absorvente interno não desaparece dentro
            do corpo, pois a vagina não é um espaço aberto
            para outras partes do organismo.

            {'\n\n'}

            Em algumas situações, porém, pode ser difícil
            alcançar o cordão para retirá-lo.

            {'\n\n'}

            Se você não conseguir retirar o produto,
            procure um profissional de saúde para removê-lo
            com segurança.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Pode usar com pouco fluxo?
          </Text>

          <Text style={tipsDetailStyles.text}>
            É recomendado utilizar a menor capacidade
            de absorção adequada ao fluxo.

            {'\n\n'}

            Quando o fluxo é muito pequeno, o produto
            pode ficar mais seco e causar desconforto
            durante a retirada.

            {'\n\n'}

            Nesse caso, um absorvente externo pode ser
            uma alternativa mais confortável.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Use absorventes internos de acordo com as
            instruções do fabricante e nunca ultrapasse
            o tempo máximo recomendado. Se sentir dor,
            desconforto ou sintomas incomuns, interrompa
            o uso e procure orientação.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}