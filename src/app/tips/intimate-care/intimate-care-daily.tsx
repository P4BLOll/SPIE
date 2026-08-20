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

export default function IntimateCareDailyScreen() {

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
            name="heart-outline"
            size={55}
            color="#F43F5E"
          />

          <Text style={tipsDetailStyles.title}>
            Cuidados íntimos no dia a dia
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Hábitos simples para cuidar da região íntima
            de forma saudável e confortável.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Limpe apenas a parte externa
          </Text>

          <Text style={tipsDetailStyles.text}>
            A higiene íntima deve se concentrar principalmente
            na vulva, que é a parte externa da região genital.

            {'\n\n'}

            A vagina possui mecanismos naturais de limpeza
            e não precisa ser lavada internamente.

            {'\n\n'}

            Durante o banho, faça uma limpeza delicada,
            sem esfregar excessivamente a região.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Evite duchas vaginais
          </Text>

          <Text style={tipsDetailStyles.text}>
            Duchas vaginais são utilizadas para lavar o
            interior da vagina.

            {'\n\n'}

            Esse tipo de prática não é necessário para a
            higiene e pode alterar o equilíbrio natural da
            região íntima.

            {'\n\n'}

            Evite também introduzir produtos de higiene,
            sabonetes ou perfumes dentro da vagina.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Cuidado com produtos perfumados
          </Text>

          <Text style={tipsDetailStyles.text}>
            Perfumes, sprays, lenços perfumados e outros
            produtos podem irritar a pele da região íntima.

            {'\n\n'}

            Se precisar utilizar algum produto específico,
            prefira opções suaves e siga as orientações
            presentes no rótulo.

            {'\n\n'}

            Caso apareça irritação, suspenda o produto.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Após exercícios e suor
          </Text>

          <Text style={tipsDetailStyles.text}>
            Depois de atividades físicas, procure trocar
            roupas muito suadas ou úmidas assim que possível.

            {'\n\n'}

            Permanecer por muito tempo com roupas úmidas
            pode aumentar o desconforto na região íntima.

            {'\n\n'}

            Um banho após a atividade também pode ajudar
            a remover suor e resíduos da pele.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Tenha atenção ao papel higiênico
          </Text>

          <Text style={tipsDetailStyles.text}>
            Ao utilizar o banheiro, a limpeza deve ser feita
            de maneira delicada.

            {'\n\n'}

            Ao se limpar após evacuar, faça o movimento da
            frente para trás.

            {'\n\n'}

            Esse cuidado ajuda a evitar que microrganismos
            da região anal sejam levados para a região
            genital.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Higiene antes e depois da relação sexual
          </Text>

          <Text style={tipsDetailStyles.text}>
            Uma higiene delicada pode ser realizada antes
            e depois da relação sexual.

            {'\n\n'}

            Não é necessário realizar lavagens internas
            ou utilizar produtos perfumados.

            {'\n\n'}

            O uso de preservativos também é uma importante
            forma de prevenção contra infecções sexualmente
            transmissíveis.
          </Text>

        </View>


        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Observe as mudanças no seu corpo
          </Text>

          <Text style={tipsDetailStyles.text}>
            Conhecer o próprio corpo ajuda a perceber quando
            alguma mudança foge do seu padrão habitual.

            {'\n\n'}

            Fique atenta a alterações persistentes no odor,
            corrimento, coceira, ardência, dor ou irritação.

            {'\n\n'}

            Nem toda alteração significa uma doença, mas
            mudanças persistentes merecem atenção.
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

            • Dor;

            {'\n'}

            • Feridas ou lesões;

            {'\n'}

            • Corrimento diferente do habitual;

            {'\n'}

            • Odor forte e persistente;

            {'\n'}

            • Sangramento fora do período menstrual;

            {'\n'}

            • Sintomas que não melhoram.
          </Text>

        </View>


        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Uma boa higiene íntima não precisa ser exagerada.
            A região genital possui mecanismos naturais de
            proteção. Limpeza delicada, roupas confortáveis
            e atenção às mudanças do corpo são cuidados
            importantes para o dia a dia.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}