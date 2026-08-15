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

export default function PregnancySignsScreen() {

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
            name="thermometer-outline"
            size={55}
            color="#EC4899"
          />

          <Text style={tipsDetailStyles.title}>
            Sinais de gravidez
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Conheça alguns sinais que podem aparecer
            no início da gravidez.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Atraso menstrual
          </Text>

          <Text style={tipsDetailStyles.text}>
            Para pessoas que possuem ciclos regulares,
            o atraso da menstruação pode ser um dos
            primeiros sinais percebidos.

            {'\n\n'}

            Porém, a menstruação pode atrasar por
            diferentes motivos, como alterações hormonais,
            estresse, mudanças de rotina ou outras
            condições.

            {'\n\n'}

            Por isso, o atraso sozinho não confirma uma
            gravidez.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Náuseas e vômitos
          </Text>

          <Text style={tipsDetailStyles.text}>
            Náuseas podem aparecer durante a gravidez,
            principalmente nas primeiras semanas.

            {'\n\n'}

            Apesar de serem frequentemente chamadas
            de "enjoo matinal", elas podem acontecer
            em diferentes horários do dia.

            {'\n\n'}

            Algumas pessoas não apresentam esse sintoma.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Sensibilidade nas mamas
          </Text>

          <Text style={tipsDetailStyles.text}>
            As alterações hormonais da gravidez podem
            provocar aumento da sensibilidade, sensação
            de peso ou desconforto nas mamas.

            {'\n\n'}

            Entretanto, sintomas semelhantes também
            podem acontecer antes da menstruação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Cansaço
          </Text>

          <Text style={tipsDetailStyles.text}>
            O aumento da progesterona e outras mudanças
            que acontecem no início da gravidez podem
            contribuir para uma sensação maior de cansaço
            ou sonolência.

            {'\n\n'}

            Esse sintoma também pode ter diversas outras
            causas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Alterações no apetite
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas pessoas podem perceber mudanças
            no apetite durante o início da gravidez.

            {'\n\n'}

            Podem ocorrer maior fome, redução do apetite,
            desejos alimentares ou aversão a determinados
            alimentos e cheiros.

            {'\n\n'}

            Essas alterações variam bastante entre as
            pessoas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Maior vontade de urinar
          </Text>

          <Text style={tipsDetailStyles.text}>
            Alterações hormonais e o aumento do fluxo
            sanguíneo podem fazer com que algumas
            pessoas urinem com maior frequência.

            {'\n\n'}

            Esse sintoma também pode ocorrer por outros
            motivos, como aumento da ingestão de líquidos
            ou infecções urinárias.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Alterações de humor
          </Text>

          <Text style={tipsDetailStyles.text}>
            As mudanças hormonais podem contribuir para
            alterações emocionais durante a gravidez.

            {'\n\n'}

            Algumas pessoas podem apresentar maior
            sensibilidade, irritabilidade ou mudanças
            de humor.

            {'\n\n'}

            Esses sintomas também podem acontecer
            durante a TPM.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Pode haver sangramento?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas pessoas podem apresentar um pequeno
            sangramento no início da gravidez.

            {'\n\n'}

            Porém, qualquer sangramento durante uma
            gravidez confirmada ou suspeita merece atenção,
            principalmente quando é intenso ou acompanhado
            de dor.

            {'\n\n'}

            Procure orientação profissional para avaliar
            a situação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Sintomas não confirmam gravidez
          </Text>

          <Text style={tipsDetailStyles.text}>
            Muitos sintomas iniciais da gravidez também
            podem acontecer antes da menstruação ou por
            outras razões.

            {'\n\n'}

            Por isso, não é possível confirmar uma gravidez
            apenas observando os sintomas.

            {'\n\n'}

            Um teste de gravidez é necessário para ajudar
            a confirmar a gestação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando fazer um teste?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Se houver possibilidade de gravidez, o teste
            deve ser realizado seguindo as orientações
            do fabricante.

            {'\n\n'}

            Testes realizados muito cedo podem apresentar
            um resultado negativo mesmo quando existe
            uma gravidez.

            {'\n\n'}

            Caso o resultado seja negativo e a menstruação
            continue atrasada, pode ser necessário repetir
            o teste ou procurar orientação profissional.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Os sintomas variam muito entre as pessoas.
            A única maneira de confirmar uma gravidez
            é por meio de um teste apropriado e, quando
            necessário, avaliação profissional.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}