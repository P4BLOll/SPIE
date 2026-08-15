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

export default function VaginalOdorScreen() {

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
            name="flower-outline"
            size={55}
            color="#A855F7"
          />

          <Text style={tipsDetailStyles.title}>
            Alterações no odor
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda o que pode causar mudanças no odor
            da região íntima.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            É normal ter odor vaginal?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Sim. A região íntima pode apresentar um odor
            natural e característico.

            {'\n\n'}

            Esse odor pode variar ao longo do ciclo
            menstrual e também pode ser influenciado
            pelo suor, pela menstruação e por outros
            fatores.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando o odor pode indicar uma alteração?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Uma mudança persistente ou muito diferente
            do seu padrão habitual pode merecer atenção.

            {'\n\n'}

            O odor deve ser observado principalmente
            quando aparece junto com outras alterações,
            como corrimento, coceira, ardência ou dor.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Odor forte ou desagradável
          </Text>

          <Text style={tipsDetailStyles.text}>
            Um odor forte e persistente pode estar associado
            a diferentes condições.

            {'\n\n'}

            A vaginose bacteriana, por exemplo, pode causar
            alteração no odor vaginal e também pode estar
            acompanhada de mudanças na secreção.

            {'\n\n'}

            Porém, o odor sozinho não é suficiente para
            identificar uma condição específica.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O odor pode mudar durante a menstruação?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Sim.

            {'\n\n'}

            O sangue menstrual pode alterar temporariamente
            o odor da região íntima.

            {'\n\n'}

            Isso não significa necessariamente que exista
            uma infecção.

            {'\n\n'}

            Depois da menstruação, o odor normalmente
            retorna ao padrão habitual.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que pode influenciar o odor?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Algumas situações podem causar mudanças
            temporárias, como:

            {'\n\n'}

            • Menstruação;

            {'\n'}

            • Suor;

            {'\n'}

            • Atividade física;

            {'\n'}

            • Relações sexuais;

            {'\n'}

            • Alterações hormonais.

            {'\n\n'}

            Essas mudanças nem sempre significam um
            problema de saúde.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Evite mascarar o odor
          </Text>

          <Text style={tipsDetailStyles.text}>
            Produtos perfumados, sprays íntimos e duchas
            vaginais não são necessários para eliminar o
            odor natural da vagina.

            {'\n\n'}

            Além disso, esses produtos podem irritar a
            região ou alterar o equilíbrio natural da
            microbiota vaginal.

            {'\n\n'}

            A higiene deve ser suave e adequada à região
            externa.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure orientação profissional se houver:

            {'\n\n'}

            • Odor forte e persistente;

            {'\n'}

            • Corrimento diferente do habitual;

            {'\n'}

            • Coceira ou ardência;

            {'\n'}

            • Dor pélvica;

            {'\n'}

            • Dor ou ardência ao urinar;

            {'\n'}

            • Feridas ou lesões;

            {'\n'}

            • Alterações que não desaparecem.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            A região íntima possui um odor natural.
            Uma mudança persistente, especialmente quando
            acompanhada de outros sintomas, pode precisar
            de avaliação profissional.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}

