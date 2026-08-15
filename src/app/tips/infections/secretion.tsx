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

export default function SecretionScreen() {

  return (

    <Background>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          tipsDetailStyles.container
        }
      >

        <TouchableOpacity
          style={tipsDetailStyles.backButton}
          onPress={() =>
            router.back()
          }
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
            color={Colors.primary}
          />

          <Text style={tipsDetailStyles.title}>
            Secreção vaginal
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Entenda como o muco vaginal muda durante o ciclo menstrual.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            O que é secreção vaginal?
          </Text>

          <Text style={tipsDetailStyles.text}>
            A secreção vaginal é uma produção natural do corpo
            que ajuda a manter a região íntima limpa, protegida
            e saudável.

            Durante o ciclo menstrual ela pode mudar de cor,
            quantidade e textura por causa das alterações hormonais.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Tipos de secreção normal
          </Text>

          <Text style={tipsDetailStyles.text}>
            Transparente e elástica:

            {'\n'}
            Pode aparecer próximo da ovulação.
            É conhecida como muco fértil e pode lembrar clara de ovo.

            {'\n\n'}

            Branca ou leitosa:

            {'\n'}
            Pode acontecer antes ou depois da menstruação
            sem representar um problema.

            {'\n\n'}

            Cremosa ou mais espessa:

            {'\n'}
            Pode aparecer em algumas fases do ciclo,
            principalmente após a ovulação.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Secreção e período fértil
          </Text>

          <Text style={tipsDetailStyles.text}>
            Próximo da ovulação, o aumento do estrogênio
            pode deixar a secreção mais transparente,
            escorregadia e elástica.

            Esse tipo de muco facilita a movimentação dos
            espermatozoides e indica uma fase de maior fertilidade.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Quando procurar ajuda?
          </Text>

          <Text style={tipsDetailStyles.text}>
            Procure orientação profissional se houver:

            {'\n\n'}

            • cheiro forte ou desagradável;

            {'\n'}

            • coceira ou ardência;

            {'\n'}

            • dor na região íntima;

            {'\n'}

            • secreção verde, cinza ou com aspecto diferente do habitual.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="bulb-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            Registrar mudanças na secreção junto com seu ciclo
            pode ajudar você a entender melhor seu corpo.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}