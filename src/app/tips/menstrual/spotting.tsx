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

export default function SpottingScreen() {

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
            color="#F43F5E"
          />

          <Text style={tipsDetailStyles.title}>
            Sangramento entre menstruações
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda o que pode causar pequenos sangramentos
            fora do período menstrual.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é spotting?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Spotting é o nome usado para descrever um
            pequeno sangramento vaginal que acontece
            fora do período menstrual habitual.

            {'\n\n'}

            Ele pode aparecer como algumas gotas de sangue
            ou uma pequena quantidade de secreção rosada,
            avermelhada ou amarronzada.

            {'\n\n'}

            Nem sempre significa que existe algum problema,
            mas a causa depende do momento do ciclo e
            de outros fatores.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Possíveis causas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Existem várias causas possíveis para o
            sangramento fora da menstruação:

            {'\n\n'}

            • Alterações hormonais;

            {'\n'}

            • Ovulação;

            {'\n'}

            • Início ou mudança de anticoncepcional;

            {'\n'}

            • Esquecimento ou uso incorreto de
            anticoncepcionais hormonais;

            {'\n'}

            • Uso de contracepção de emergência;

            {'\n'}

            • Irritação ou pequenas lesões no colo do útero;

            {'\n'}

            • Infecções sexualmente transmissíveis;

            {'\n'}

            • Pólipos;

            {'\n'}

            • Miomas;

            {'\n'}

            • Outras condições ginecológicas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Sangramento durante a ovulação
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas pessoas podem apresentar um pequeno
            sangramento próximo ao período da ovulação.

            {'\n\n'}

            Geralmente é uma quantidade pequena e pode
            durar pouco tempo.

            {'\n\n'}

            Porém, nem todo sangramento no meio do ciclo
            está relacionado à ovulação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Anticoncepcionais podem causar escape?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Sim.

            {'\n\n'}

            Sangramentos irregulares podem acontecer
            principalmente nos primeiros meses após
            iniciar ou mudar alguns métodos hormonais.

            {'\n\n'}

            Esquecer doses ou utilizar o método de forma
            diferente da recomendada também pode
            aumentar a chance de sangramento irregular.

            {'\n\n'}

            Não interrompa o método por conta própria.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Pode estar relacionado a uma infecção?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Sim.

            {'\n\n'}

            Algumas infecções, incluindo determinadas
            infecções sexualmente transmissíveis, podem
            provocar sangramento fora do período menstrual.

            {'\n\n'}

            Se o sangramento estiver acompanhado de
            corrimento diferente, mau cheiro, dor pélvica,
            ardência ao urinar ou dor durante as relações,
            procure avaliação profissional.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            E durante a gravidez?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Sangramento durante a gravidez pode ter
            diferentes causas.

            {'\n\n'}

            Se houver possibilidade ou confirmação de
            gravidez, qualquer sangramento deve ser
            comunicado a um profissional de saúde,
            principalmente quando acompanhado de dor.

            {'\n\n'}

            Sangramento intenso ou dor forte durante uma
            possível gravidez precisa de avaliação urgente.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure avaliação profissional se:

            {'\n\n'}

            • O sangramento acontece frequentemente;

            {'\n'}

            • A quantidade está aumentando;

            {'\n'}

            • O sangramento aparece após relações
            sexuais repetidamente;

            {'\n'}

            • Existe dor pélvica;

            {'\n'}

            • Há corrimento ou odor diferente;

            {'\n'}

            • Existe possibilidade de gravidez;

            {'\n'}

            • O sangramento começou após a menopausa.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar atendimento urgente?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure atendimento rapidamente se houver:

            {'\n\n'}

            • Sangramento muito intenso;

            {'\n'}

            • Tontura intensa ou desmaio;

            {'\n'}

            • Dor abdominal ou pélvica forte;

            {'\n'}

            • Febre;

            {'\n'}

            • Sangramento durante uma possível gravidez
            acompanhado de dor ou fraqueza.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Pequenos escapes podem acontecer por diversos
            motivos. Observe quando aparecem, quanto
            duram e se existem outros sintomas. Sangramentos
            recorrentes devem ser avaliados.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}