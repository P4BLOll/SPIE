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

export default function MenstrualDiscScreen() {

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
            name="radio-button-off-outline"
            size={55}
            color="#8B5CF6"
          />

          <Text style={tipsDetailStyles.title}>
            Disco menstrual
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
            O disco menstrual é um produto utilizado
            durante a menstruação para coletar o sangue.

            {'\n\n'}

            Ele possui um formato circular e é colocado
            dentro da vagina, ficando posicionado
            próximo ao colo do útero.

            {'\n\n'}

            Existem modelos descartáveis e reutilizáveis,
            dependendo do fabricante.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Disco x coletor menstrual
          </Text>

          <Text style={tipsDetailStyles.text}>
            Apesar de serem parecidos, o disco e o coletor
            possuem formatos e posicionamentos diferentes.

            {'\n\n'}

            O coletor possui formato semelhante a um
            pequeno recipiente e cria uma vedação na
            vagina.

            {'\n\n'}

            O disco possui formato mais achatado e fica
            posicionado próximo ao colo do útero,
            apoiado atrás do osso púbico.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como colocar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Lave as mãos antes de manipular o produto.

            {'\n\n'}

            O disco deve ser comprimido e inserido
            suavemente na vagina.

            {'\n\n'}

            Depois de inserido, ele deve ficar posicionado
            corretamente atrás do osso púbico.

            {'\n\n'}

            Sempre siga as instruções específicas do
            fabricante, pois o formato pode variar entre
            os modelos.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como retirar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Lave as mãos antes da retirada.

            {'\n\n'}

            Encontre a borda do disco com o dedo e
            puxe suavemente, mantendo o produto
            nivelado para evitar derramamentos.

            {'\n\n'}

            Retire devagar e descarte ou higienize
            conforme o tipo de produto.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quanto tempo pode ficar?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O tempo de uso depende do modelo e das
            orientações do fabricante.

            {'\n\n'}

            O disco deve ser retirado e esvaziado
            regularmente.

            {'\n\n'}

            Nunca ultrapasse o período máximo de uso
            indicado na embalagem.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Discos reutilizáveis
          </Text>

          <Text style={tipsDetailStyles.text}>
            Os discos reutilizáveis precisam ser
            higienizados corretamente após o uso.

            {'\n\n'}

            Durante a menstruação, siga as orientações
            do fabricante para limpeza.

            {'\n\n'}

            Ao final do ciclo, alguns modelos podem
            precisar de esterilização antes de serem
            armazenados.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Discos descartáveis
          </Text>

          <Text style={tipsDetailStyles.text}>
            Alguns discos são desenvolvidos para uma
            única utilização.

            {'\n\n'}

            Depois de retirados, devem ser descartados
            corretamente.

            {'\n\n'}

            Nunca reutilize um modelo descartável.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Pode dormir usando?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Alguns discos podem ser utilizados durante
            o sono.

            {'\n\n'}

            Entretanto, é necessário respeitar o tempo
            máximo de uso indicado pelo fabricante.

            {'\n\n'}

            Verifique também a capacidade do produto
            em relação ao seu fluxo menstrual.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            É possível sentir o disco?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Quando colocado corretamente, o disco não
            deve causar dor.

            {'\n\n'}

            Pode existir um período de adaptação para
            aprender a posicionar e retirar o produto.

            {'\n\n'}

            Dor persistente, desconforto intenso ou
            dificuldade para retirar o disco devem ser
            avaliados por um profissional de saúde.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Cuidados importantes
          </Text>

          <Text style={tipsDetailStyles.text}>
            • Lave as mãos antes de manipular o produto;

            {'\n'}

            • Respeite o tempo máximo de utilização;

            {'\n'}

            • Siga as orientações de higienização;

            {'\n'}

            • Não reutilize discos descartáveis;

            {'\n'}

            • Armazene discos reutilizáveis em local
            limpo e seco;

            {'\n'}

            • Nunca force a inserção ou retirada.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            O disco menstrual pode precisar de algumas
            tentativas até que você se acostume com a
            inserção e retirada. Sempre siga as instruções
            do fabricante.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}