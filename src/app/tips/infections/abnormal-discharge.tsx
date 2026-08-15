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

export default function AbnormalDischargeScreen() {

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
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.title}>
            Corrimento anormal
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Saiba quais alterações nas secreções podem
            merecer atenção.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é corrimento?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A vagina produz secreções naturalmente. Elas
            ajudam a manter a região protegida e podem
            mudar de quantidade, textura e aparência
            durante o ciclo menstrual.

            {'\n\n'}

            Nem toda secreção significa uma infecção ou
            algum problema de saúde.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando pode ser uma alteração?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Uma mudança pode merecer atenção quando
            acontece de forma diferente do seu padrão
            habitual, principalmente quando aparece junto
            com outros sintomas.

            {'\n\n'}

            Alguns sinais que podem acompanhar uma
            alteração são:

            {'\n\n'}

            • Coceira;

            {'\n'}

            • Ardência;

            {'\n'}

            • Dor;

            {'\n'}

            • Irritação;

            {'\n'}

            • Mau cheiro persistente.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Alteração na cor
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas alterações na aparência da secreção
            podem estar relacionadas a diferentes causas.

            {'\n\n'}

            Uma secreção amarelada, esverdeada, acinzentada
            ou acompanhada de sangue fora do período
            menstrual pode precisar de avaliação, especialmente
            quando existem outros sintomas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Alteração na textura
          </Text>

          <Text style={tipsDetailStyles.text}>
            A textura das secreções pode variar naturalmente
            durante o ciclo.

            {'\n\n'}

            Porém, mudanças importantes acompanhadas de
            coceira, ardência, dor ou odor forte podem estar
            relacionadas a infecções ou outras alterações
            e devem ser avaliadas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Alteração no odor
          </Text>

          <Text style={tipsDetailStyles.text}>
            A secreção vaginal pode apresentar um odor
            característico e natural.

            {'\n\n'}

            Um odor forte, desagradável ou diferente do
            habitual, principalmente quando acompanhado
            de alteração na secreção, pode ser um sinal
            de que é necessário procurar avaliação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Possíveis causas
          </Text>

          <Text style={tipsDetailStyles.text}>
            Alterações nas secreções podem ter diferentes
            causas.

            {'\n\n'}

            Entre elas estão:

            {'\n\n'}

            • Alterações naturais do ciclo;

            {'\n'}

            • Candidíase;

            {'\n'}

            • Vaginose bacteriana;

            {'\n'}

            • Tricomoníase;

            {'\n'}

            • Outras infecções ou condições ginecológicas.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Evite tentar diagnosticar sozinha
          </Text>

          <Text style={tipsDetailStyles.text}>
            A aparência da secreção, sozinha, não é
            suficiente para determinar a causa de uma
            alteração.

            {'\n\n'}

            Diferentes condições podem apresentar sintomas
            semelhantes.

            {'\n\n'}

            Por isso, evite utilizar medicamentos ou
            tratamentos por conta própria sem orientação
            profissional.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure orientação profissional se houver:

            {'\n\n'}

            • Corrimento com odor forte e persistente;

            {'\n'}

            • Coceira ou ardência;

            {'\n'}

            • Dor pélvica;

            {'\n'}

            • Dor ou ardência ao urinar;

            {'\n'}

            • Feridas ou lesões na região íntima;

            {'\n'}

            • Sangramento fora do período menstrual;

            {'\n'}

            • Alteração persistente na secreção.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Alterações nas secreções podem ter várias
            causas. A presença de sintomas não significa
            necessariamente uma infecção. Uma avaliação
            profissional é a melhor forma de identificar
            a causa.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}

