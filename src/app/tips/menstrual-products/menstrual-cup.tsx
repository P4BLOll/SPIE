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

export default function MenstrualCupScreen() {

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
            name="water-outline"
            size={55}
            color="#A855F7"
          />

          <Text style={tipsDetailStyles.title}>
            Coletor menstrual
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Saiba como funciona, como cuidar e quais
            cuidados são importantes durante o uso.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O coletor menstrual é um pequeno recipiente
            reutilizável feito geralmente de silicone
            próprio para uso médico.

            {'\n\n'}

            Ele é inserido na vagina e, em vez de absorver
            o sangue, coleta o fluxo menstrual.

            {'\n\n'}

            Existem diferentes tamanhos, formatos e
            capacidades. A escolha depende das
            características de cada pessoa e das
            orientações do fabricante.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como colocar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Antes de colocar o coletor, lave bem as mãos.

            {'\n\n'}

            O coletor pode ser dobrado para facilitar
            a inserção.

            {'\n\n'}

            Depois de inserido, ele deve ficar aberto
            dentro da vagina para formar uma vedação
            adequada.

            {'\n\n'}

            A posição pode variar de pessoa para pessoa.
            Nunca force o produto caso esteja causando
            dor.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como retirar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Lave as mãos antes de retirar o coletor.

            {'\n\n'}

            Para removê-lo, não puxe apenas pela haste.

            {'\n\n'}

            Primeiro, alcance a base do coletor e
            comprima suavemente a parte inferior para
            desfazer a vedação.

            {'\n\n'}

            Depois, retire lentamente.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quanto tempo pode ficar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O tempo de uso varia de acordo com o produto,
            o fluxo menstrual e as orientações do fabricante.

            {'\n\n'}

            O coletor deve ser esvaziado regularmente e
            nunca deve permanecer no corpo por mais tempo
            do que o recomendado.

            {'\n\n'}

            Em fluxos mais intensos, pode ser necessário
            esvaziá-lo com maior frequência.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como higienizar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A higiene correta é fundamental porque o
            coletor é reutilizado.

            {'\n\n'}

            Durante o ciclo, lave o coletor conforme as
            orientações do fabricante.

            {'\n\n'}

            Ao final do ciclo, alguns fabricantes
            recomendam a esterilização do coletor em
            água fervente pelo período indicado.

            {'\n\n'}

            Sempre siga as instruções específicas
            do produto.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Pode dormir com o coletor?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Alguns coletores podem ser utilizados durante
            o sono, desde que o tempo máximo de uso
            recomendado pelo fabricante seja respeitado.

            {'\n\n'}

            Antes de dormir, considere o seu fluxo e
            a capacidade do coletor.

            {'\n\n'}

            Se houver qualquer desconforto, retire o
            produto e procure uma alternativa.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            É normal sentir o coletor?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Quando colocado corretamente, o coletor
            geralmente não deve causar dor.

            {'\n\n'}

            Algumas pessoas podem precisar de um
            período de adaptação para aprender a
            inserir, posicionar e retirar o produto.

            {'\n\n'}

            Dor persistente, desconforto intenso ou
            dificuldade frequente para utilizar o coletor
            devem ser avaliados.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quem pode usar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O coletor pode ser uma opção para muitas
            pessoas que menstruam.

            {'\n\n'}

            Entretanto, algumas situações podem exigir
            orientação profissional antes do uso.

            {'\n\n'}

            Pessoas que passaram recentemente por
            procedimentos ginecológicos ou que possuem
            alguma condição específica devem conversar
            com um profissional de saúde.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Vantagens
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas pessoas escolhem o coletor porque:

            {'\n\n'}

            • Pode ser reutilizado;

            {'\n'}

            • Pode reduzir a quantidade de resíduos;

            {'\n'}

            • Pode permanecer em uso por várias horas,
            respeitando as orientações do fabricante;

            {'\n'}

            • Pode ser uma alternativa econômica
            a longo prazo;

            {'\n'}

            • Existem diferentes tamanhos e modelos.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            O coletor exige um período de adaptação.
            Leia as instruções do fabricante, mantenha
            uma boa higiene e nunca force a inserção ou
            retirada do produto.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}