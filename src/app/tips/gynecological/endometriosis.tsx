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

export default function EndometriosisScreen() {

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
            name="medkit-outline"
            size={55}
            color="#EC4899"
          />

          <Text style={tipsDetailStyles.title}>
            Endometriose
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda o que é a endometriose, seus possíveis
            sintomas e quando procurar avaliação.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            O que é endometriose?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A endometriose é uma condição em que um tecido
            semelhante ao endométrio cresce fora do local
            onde normalmente deveria estar.

            {'\n\n'}

            Essas alterações podem ocorrer em diferentes
            regiões da pelve e podem provocar inflamação
            e dor.

            {'\n\n'}

            A intensidade dos sintomas pode variar bastante
            de uma pessoa para outra.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Dor menstrual intensa
          </Text>

          <Text style={tipsDetailStyles.text}>
            Um dos sintomas mais conhecidos da endometriose
            é a dor associada à menstruação.

            {'\n\n'}

            A dor pode ser intensa, persistente e interferir
            nas atividades do dia a dia.

            {'\n\n'}

            Sentir muita dor durante a menstruação não deve
            ser considerado automaticamente algo normal
            que precisa ser suportado.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Outros possíveis sintomas
          </Text>

          <Text style={tipsDetailStyles.text}>
            A endometriose pode estar associada a:

            {'\n\n'}

            • Dor pélvica;

            {'\n'}

            • Dor durante ou após relações sexuais;

            {'\n'}

            • Dor ao evacuar, especialmente durante a
            menstruação;

            {'\n'}

            • Dor ao urinar em alguns casos;

            {'\n'}

            • Sangramento menstrual intenso;

            {'\n'}

            • Cansaço;

            {'\n'}

            • Dificuldade para engravidar.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            A intensidade da dor indica a gravidade?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Nem sempre.

            {'\n\n'}

            A intensidade da dor não determina sozinha
            a extensão da endometriose.

            {'\n\n'}

            Algumas pessoas podem apresentar lesões
            importantes com poucos sintomas, enquanto
            outras podem sentir dores intensas mesmo
            com alterações diferentes.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Endometriose e fertilidade
          </Text>

          <Text style={tipsDetailStyles.text}>
            A endometriose pode estar associada a
            dificuldades para engravidar em algumas
            pessoas.

            {'\n\n'}

            Isso não significa que toda pessoa com
            endometriose terá infertilidade.

            {'\n\n'}

            Quando existe desejo de engravidar e há
            dificuldades, o acompanhamento médico pode
            ajudar a avaliar a situação individualmente.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Como é feito o diagnóstico?
          </Text>

          <Text style={tipsDetailStyles.text}>
            O diagnóstico começa com a avaliação dos
            sintomas e do histórico da pessoa.

            {'\n\n'}

            O profissional pode solicitar exames de
            imagem, como ultrassonografia ou ressonância
            magnética, dependendo do caso.

            {'\n\n'}

            Nem sempre um único exame é suficiente para
            identificar todas as formas da doença.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Tratamento
          </Text>

          <Text style={tipsDetailStyles.text}>
            O tratamento depende dos sintomas, da extensão
            da doença e dos objetivos de cada pessoa.

            {'\n\n'}

            Pode envolver medicamentos para controle da
            dor e tratamentos hormonais.

            {'\n\n'}

            Em algumas situações, procedimentos cirúrgicos
            podem ser considerados.

            {'\n\n'}

            A escolha deve ser feita junto a um profissional
            de saúde.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure avaliação profissional se houver:

            {'\n\n'}

            • Cólicas muito fortes ou incapacitantes;

            {'\n'}

            • Dor pélvica persistente;

            {'\n'}

            • Dor durante as relações sexuais;

            {'\n'}

            • Dor ao evacuar ou urinar associada ao ciclo;

            {'\n'}

            • Sangramento menstrual muito intenso;

            {'\n'}

            • Dificuldade para engravidar;

            {'\n'}

            • Dor que interfere nas atividades cotidianas.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Cólicas menstruais podem acontecer normalmente,
            mas dores muito intensas ou que interferem na
            rotina merecem atenção. Não é necessário
            normalizar uma dor incapacitante.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}