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

export default function PeriodUnderwearScreen() {

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
            name="shirt-outline"
            size={55}
            color="#EC4899"
          />

          <Text style={tipsDetailStyles.title}>
            Calcinha menstrual
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda como funciona, como utilizar e quais
            cuidados são importantes.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A calcinha menstrual é uma roupa íntima
            desenvolvida com camadas absorventes
            capazes de reter o sangue menstrual.

            {'\n\n'}

            Ela pode ser utilizada sozinha ou combinada
            com outros produtos menstruais, dependendo
            do fluxo e da preferência de cada pessoa.

            {'\n\n'}

            Existem modelos com diferentes níveis de
            absorção.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como funciona?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A região absorvente da calcinha possui
            diferentes camadas.

            {'\n\n'}

            Essas camadas ajudam a absorver o sangue
            e manter a umidade afastada da pele.

            {'\n\n'}

            A capacidade de absorção varia de acordo
            com o modelo e o fabricante.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como escolher?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Antes de comprar uma calcinha menstrual,
            observe:

            {'\n\n'}

            • Capacidade de absorção;

            {'\n'}

            • Tamanho;

            {'\n'}

            • Formato;

            {'\n'}

            • Tipo de tecido;

            {'\n'}

            • Seu fluxo menstrual;

            {'\n'}

            • Instruções de lavagem do fabricante.

            {'\n\n'}

            Para fluxos intensos, procure modelos
            desenvolvidos especificamente para maior
            absorção.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando trocar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A frequência de troca depende do fluxo
            menstrual e da capacidade de absorção
            do modelo.

            {'\n\n'}

            Troque quando a calcinha estiver próxima
            da capacidade máxima ou quando estiver
            causando sensação de umidade ou desconforto.

            {'\n\n'}

            Siga sempre as recomendações do fabricante.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como lavar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A calcinha menstrual deve ser lavada após
            cada utilização.

            {'\n\n'}

            O método de lavagem depende do fabricante,
            por isso é importante seguir as instruções
            da etiqueta.

            {'\n\n'}

            Em geral, recomenda-se enxaguar bem a peça
            e lavá-la de acordo com as orientações
            indicadas.

            {'\n\n'}

            Depois, deixe secar completamente antes
            de guardá-la.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Pode usar durante a noite?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Sim, algumas pessoas utilizam a calcinha
            menstrual durante a noite.

            {'\n\n'}

            Porém, é importante considerar a capacidade
            de absorção do modelo e a intensidade do
            seu fluxo.

            {'\n\n'}

            Para fluxos muito intensos, pode ser necessário
            utilizar outro produto ou uma combinação
            de produtos.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Vantagens
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas pessoas escolhem a calcinha menstrual
            porque:

            {'\n\n'}

            • É reutilizável;

            {'\n'}

            • Pode reduzir o uso de produtos descartáveis;

            {'\n'}

            • Pode ser confortável;

            {'\n'}

            • Não precisa ser inserida na vagina;

            {'\n'}

            • Pode ser utilizada sozinha ou combinada
            com outros produtos.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Cuidados importantes
          </Text>

          <Text style={tipsDetailStyles.text}>
            • Lave a peça após cada utilização;

            {'\n'}

            • Siga as instruções da etiqueta;

            {'\n'}

            • Deixe secar completamente;

            {'\n'}

            • Não guarde a peça úmida;

            {'\n'}

            • Observe sinais de desgaste;

            {'\n'}

            • Substitua a peça quando o fabricante
            indicar ou quando ela perder sua capacidade
            de absorção.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            A calcinha menstrual pode ser uma alternativa
            prática e reutilizável. Escolha um modelo
            adequado ao seu fluxo e siga corretamente
            as instruções de lavagem e conservação.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}