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

export default function MenstrualPadsCareScreen() {

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
            name="water-outline"
            size={55}
            color="#EC4899"
          />

          <Text style={tipsDetailStyles.title}>
            Cuidados com absorventes
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Dicas para utilizar absorventes com mais
            conforto, segurança e higiene.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Escolha o absorvente adequado
          </Text>

          <Text style={tipsDetailStyles.text}>
            Existem diferentes tipos e tamanhos de
            absorventes.

            {'\n\n'}

            Escolha uma opção adequada ao seu fluxo
            menstrual e que proporcione conforto durante
            as atividades do dia a dia.

            {'\n\n'}

            Caso o fluxo seja mais intenso, pode ser
            necessário utilizar produtos com maior
            capacidade de absorção.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Troque regularmente
          </Text>

          <Text style={tipsDetailStyles.text}>
            O absorvente deve ser trocado regularmente,
            mesmo quando o fluxo não estiver muito intenso.

            {'\n\n'}

            Permanecer por muito tempo com o mesmo
            absorvente pode aumentar a umidade e o
            desconforto na região íntima.

            {'\n\n'}

            Siga também as orientações indicadas pelo
            fabricante do produto.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Lave as mãos
          </Text>

          <Text style={tipsDetailStyles.text}>
            Lave as mãos antes e depois de trocar o
            absorvente.

            {'\n\n'}

            Essa é uma medida simples que ajuda a reduzir
            a transferência de microrganismos para a região
            íntima.

            {'\n\n'}

            Evite tocar desnecessariamente na parte
            absorvente do produto.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Cuidado com produtos perfumados
          </Text>

          <Text style={tipsDetailStyles.text}>
            Alguns absorventes possuem fragrâncias ou
            componentes que podem causar irritação em
            pessoas mais sensíveis.

            {'\n\n'}

            Se perceber coceira, ardência, vermelhidão ou
            desconforto após utilizar determinado produto,
            considere interromper o uso e procurar uma
            alternativa.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Mantenha a região seca
          </Text>

          <Text style={tipsDetailStyles.text}>
            A umidade excessiva pode aumentar o desconforto
            durante a menstruação.

            {'\n\n'}

            Troque o absorvente regularmente e prefira
            roupas íntimas confortáveis que permitam uma
            boa circulação de ar.

            {'\n\n'}

            Após o banho, seque delicadamente a região
            íntima antes de colocar uma nova peça de roupa.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Descarte corretamente
          </Text>

          <Text style={tipsDetailStyles.text}>
            Após utilizar o absorvente, enrole-o e descarte-o
            no lixo comum.

            {'\n\n'}

            Não jogue absorventes no vaso sanitário, pois
            eles podem causar entupimentos.

            {'\n\n'}

            Manter o banheiro limpo também contribui para
            uma boa higiene durante a menstruação.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure orientação profissional caso apareçam:

            {'\n\n'}

            • Irritação persistente;

            {'\n'}

            • Coceira intensa;

            {'\n'}

            • Ardência;

            {'\n'}

            • Feridas ou lesões;

            {'\n'}

            • Dor incomum;

            {'\n'}

            • Inchaço;

            {'\n'}

            • Alterações que não melhoram após trocar
              o produto.
          </Text>

        </View>


        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Não existe uma frequência única de troca que
            seja ideal para todas as pessoas. O momento
            adequado depende do fluxo, do produto utilizado
            e das orientações do fabricante.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}