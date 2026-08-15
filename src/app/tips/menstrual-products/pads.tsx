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

export default function PadsScreen() {

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
            name="layers-outline"
            size={55}
            color="#EC4899"
          />

          <Text style={tipsDetailStyles.title}>
            Absorvente externo
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Saiba como funciona, quais tipos existem
            e quais cuidados são importantes.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O absorvente externo é um produto utilizado
            para absorver o sangue menstrual.

            {'\n\n'}

            Ele possui uma camada absorvente e uma parte
            adesiva que ajuda a mantê-lo preso à roupa
            íntima.

            {'\n\n'}

            Diferentemente dos produtos internos, ele
            não precisa ser colocado dentro da vagina.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Tipos de absorvente
          </Text>

          <Text style={tipsDetailStyles.text}>
            Existem diferentes modelos, como:

            {'\n\n'}

            • Absorvente regular;

            {'\n'}

            • Absorvente para fluxo intenso;

            {'\n'}

            • Absorvente noturno;

            {'\n'}

            • Absorvente com abas;

            {'\n'}

            • Absorvente sem abas;

            {'\n'}

            • Absorventes de diferentes tamanhos e
            níveis de absorção.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como escolher?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A escolha pode depender da intensidade
            do fluxo e da sua rotina.

            {'\n\n'}

            Para fluxos maiores, pode ser necessário
            utilizar um produto com maior capacidade
            de absorção.

            {'\n\n'}

            Durante a noite, algumas pessoas preferem
            modelos maiores e mais compridos para
            oferecer maior proteção.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando trocar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O absorvente deve ser trocado regularmente
            e sempre que estiver cheio ou desconfortável.

            {'\n\n'}

            O tempo necessário pode variar de acordo
            com o fluxo e com o próprio produto.

            {'\n\n'}

            Evite permanecer por longos períodos com
            um absorvente úmido ou saturado.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Higiene
          </Text>

          <Text style={tipsDetailStyles.text}>
            Lave as mãos antes e depois da troca.

            {'\n\n'}

            Durante a troca, faça a higiene da região
            íntima de maneira suave.

            {'\n\n'}

            Não é necessário utilizar produtos perfumados
            ou duchas vaginais para limpar a vagina.

            {'\n\n'}

            A vagina possui seu próprio mecanismo
            natural de limpeza.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Pode causar irritação?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas pessoas podem apresentar irritação,
            coceira ou desconforto devido ao contato
            prolongado com umidade, calor ou determinados
            materiais.

            {'\n\n'}

            Caso isso aconteça frequentemente, experimente
            outro modelo ou material e procure avaliação
            profissional se os sintomas persistirem.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Absorvente reutilizável
          </Text>

          <Text style={tipsDetailStyles.text}>
            Também existem absorventes de tecido
            reutilizáveis.

            {'\n\n'}

            Eles precisam ser lavados e secos corretamente
            após cada utilização.

            {'\n\n'}

            É importante seguir as instruções de lavagem
            fornecidas pelo fabricante para manter a
            higiene do produto.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Cuidados importantes
          </Text>

          <Text style={tipsDetailStyles.text}>
            • Troque o absorvente regularmente;

            {'\n'}

            • Lave as mãos antes e depois da troca;

            {'\n'}

            • Mantenha os produtos em local limpo e seco;

            {'\n'}

            • Evite produtos perfumados se causarem
            irritação;

            {'\n'}

            • Observe mudanças na pele ou na região
            íntima;

            {'\n'}

            • Descarte os absorventes usados no lixo
            apropriado.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Não existe um único tipo de absorvente
            ideal para todas as pessoas. Escolha um
            produto confortável e adequado ao seu fluxo.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}