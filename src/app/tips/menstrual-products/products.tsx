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

export default function MenstrualProductsScreen() {

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
            name="heart-outline"
            size={55}
            color="#EC4899"
          />

          <Text style={tipsDetailStyles.title}>
            Produtos menstruais
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Conheça diferentes opções para cuidar da
            menstruação e escolha a que melhor combina
            com você.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Existem várias opções
          </Text>

          <Text style={tipsDetailStyles.text}>
            Não existe um único produto menstrual ideal
            para todas as pessoas.

            {'\n\n'}

            A escolha pode depender do fluxo menstrual,
            conforto, rotina, preferência pessoal,
            facilidade de uso e possibilidade de acesso
            ao produto.

            {'\n\n'}

            Algumas pessoas também preferem alternar
            diferentes produtos durante o ciclo.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Absorvente externo
          </Text>

          <Text style={tipsDetailStyles.text}>
            É colocado na parte externa da roupa íntima
            para absorver o sangue menstrual.

            {'\n\n'}

            Existem diferentes tamanhos, formatos e
            níveis de absorção.

            {'\n\n'}

            É uma opção prática para muitas pessoas,
            especialmente para quem não deseja utilizar
            produtos internos.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Absorvente interno
          </Text>

          <Text style={tipsDetailStyles.text}>
            O absorvente interno é inserido na vagina
            para absorver o sangue menstrual.

            {'\n\n'}

            Existem diferentes tamanhos e níveis de
            absorção.

            {'\n\n'}

            Deve ser utilizado seguindo as orientações
            do fabricante e trocado regularmente.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Coletor menstrual
          </Text>

          <Text style={tipsDetailStyles.text}>
            O coletor menstrual é um recipiente reutilizável
            que é inserido na vagina para coletar o sangue
            menstrual.

            {'\n\n'}

            Ele precisa ser higienizado corretamente
            entre os usos e armazenado de acordo com
            as orientações do fabricante.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Disco menstrual
          </Text>

          <Text style={tipsDetailStyles.text}>
            O disco menstrual é um produto que também
            pode ser reutilizável ou descartável,
            dependendo do modelo.

            {'\n\n'}

            Ele é colocado internamente e fica posicionado
            próximo ao colo do útero para coletar o sangue.

            {'\n\n'}

            O modo de colocação e retirada varia de acordo
            com o produto.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Calcinha menstrual
          </Text>

          <Text style={tipsDetailStyles.text}>
            A calcinha menstrual possui camadas
            desenvolvidas para absorver o sangue menstrual.

            {'\n\n'}

            Pode ser reutilizada após a lavagem correta.

            {'\n\n'}

            Existem modelos com diferentes níveis de
            absorção, por isso é importante verificar as
            informações do fabricante.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como escolher?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Na hora de escolher um produto, considere:

            {'\n\n'}

            • Intensidade do seu fluxo;

            {'\n'}

            • Conforto;

            {'\n'}

            • Sua rotina;

            {'\n'}

            • Atividades físicas;

            {'\n'}

            • Facilidade de troca ou higienização;

            {'\n'}

            • Custo;

            {'\n'}

            • Preferência por produtos descartáveis
            ou reutilizáveis.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Higiene e segurança
          </Text>

          <Text style={tipsDetailStyles.text}>
            Independentemente do produto escolhido,
            alguns cuidados são importantes.

            {'\n\n'}

            Lave as mãos antes e depois de trocar,
            colocar ou retirar produtos menstruais.

            {'\n\n'}

            Produtos internos devem ser utilizados de
            acordo com o tempo de uso recomendado
            pelo fabricante.

            {'\n\n'}

            Coletores e discos reutilizáveis precisam
            ser higienizados corretamente.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            O melhor produto menstrual é aquele que
            oferece segurança e conforto para você.
            Conhecer diferentes opções ajuda a encontrar
            uma alternativa adequada à sua rotina.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}