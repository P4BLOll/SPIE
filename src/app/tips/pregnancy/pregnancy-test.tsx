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

export default function PregnancyTestScreen() {

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
            name="flask-outline"
            size={55}
            color="#EC4899"
          />

          <Text style={tipsDetailStyles.title}>
            Teste de gravidez
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda os tipos de teste, quando fazer e
            como interpretar o resultado.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como o teste funciona?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Os testes de gravidez procuram identificar
            a presença do hormônio hCG, que é produzido
            durante a gravidez.

            {'\n\n'}

            Esse hormônio pode ser detectado na urina
            ou no sangue, dependendo do tipo de exame.

            {'\n\n'}

            Quanto mais tempo passa após o início da
            gravidez, maior tende a ser a quantidade
            de hCG detectável.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Teste de farmácia
          </Text>

          <Text style={tipsDetailStyles.text}>
            O teste de farmácia normalmente utiliza
            uma amostra de urina para detectar o hCG.

            {'\n\n'}

            Ele pode ser realizado em casa e deve ser
            utilizado de acordo com as instruções da
            embalagem.

            {'\n\n'}

            Existem diferentes marcas e modelos, por
            isso o modo de utilização pode variar.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Exame de sangue
          </Text>

          <Text style={tipsDetailStyles.text}>
            O exame de sangue também pode detectar
            o hCG.

            {'\n\n'}

            Ele é realizado em um laboratório e pode
            detectar quantidades menores do hormônio
            dependendo do momento da gestação.

            {'\n\n'}

            O profissional de saúde pode solicitar
            esse exame quando considerar necessário.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando fazer?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O momento adequado depende do tipo de teste
            e das orientações do fabricante.

            {'\n\n'}

            Fazer o teste muito cedo pode aumentar a
            possibilidade de um resultado falso negativo,
            porque o nível de hCG ainda pode estar baixo.

            {'\n\n'}

            Para testes de farmácia, siga cuidadosamente
            as instruções presentes na embalagem.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Resultado positivo
          </Text>

          <Text style={tipsDetailStyles.text}>
            Um resultado positivo geralmente indica
            gravidez.

            {'\n\n'}

            Nesse caso, procure um serviço de saúde
            para confirmar a gestação e iniciar o
            acompanhamento pré-natal.

            {'\n\n'}

            Caso esteja utilizando medicamentos ou tenha
            alguma condição de saúde, informe o
            profissional sobre a possibilidade de
            gravidez.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Resultado negativo
          </Text>

          <Text style={tipsDetailStyles.text}>
            Um resultado negativo significa que o teste
            não detectou hCG naquele momento.

            {'\n\n'}

            Se o teste foi realizado muito cedo, pode
            ocorrer um falso negativo.

            {'\n\n'}

            Se a menstruação continuar atrasada e ainda
            houver possibilidade de gravidez, siga as
            orientações do teste sobre quando repetir
            o exame ou procure orientação profissional.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Resultado inválido
          </Text>

          <Text style={tipsDetailStyles.text}>
            Alguns testes apresentam um resultado
            inválido quando não funcionam corretamente.

            {'\n\n'}

            Isso pode acontecer, por exemplo, quando
            a quantidade de urina utilizada não é
            adequada ou quando o teste está danificado.

            {'\n\n'}

            Nesse caso, utilize outro teste seguindo
            corretamente as instruções do fabricante.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que pode interferir no resultado?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Um dos principais fatores que pode levar
            a um resultado negativo incorreto é realizar
            o teste muito cedo.

            {'\n\n'}

            Também é importante verificar:

            {'\n\n'}

            • Validade do teste;

            {'\n'}

            • Instruções de utilização;

            {'\n'}

            • Tempo indicado para leitura;

            {'\n'}

            • Forma correta de armazenamento.

            {'\n\n'}

            Leia sempre as informações da embalagem.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            E se eu estiver com sintomas?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Sintomas como atraso menstrual, náuseas,
            cansaço e sensibilidade nas mamas podem
            acontecer durante uma gravidez.

            {'\n\n'}

            Porém, esses sintomas também podem ter
            outras causas.

            {'\n\n'}

            Por isso, os sintomas sozinhos não são
            suficientes para confirmar uma gravidez.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Sempre confira as instruções e o prazo de
            validade do teste. Em caso de resultado
            positivo ou dúvida sobre o resultado,
            procure orientação de um profissional de saúde.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}