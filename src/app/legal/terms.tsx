import React from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Background } from '@/components/Background';

import {
  cycleColors,
} from '@/styles/calendar.styles';

import {
  termsStyles,
} from '@/styles/terms.styles';

export default function TermsScreen() {

  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: cycleColors.background,
      }}
    >

      <Background
        style={{
          flex: 1,
          backgroundColor: cycleColors.background,
        }}
      >

        <View
          style={[
            termsStyles.container,
            {
              backgroundColor:
                cycleColors.background,
            },
          ]}
        >

          {/* HEADER FIXO */}

          <View style={termsStyles.header}>

            <TouchableOpacity
              style={termsStyles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            <Text style={termsStyles.title}>
              Termos de Uso
            </Text>

          </View>

          {/* SOMENTE O TEXTO ROLA */}

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              termsStyles.scrollContent
            }
          >

            <Text style={termsStyles.text}>

              Bem-vinda ao SPIE.

              {'\n\n'}

              O SPIE é um aplicativo criado para auxiliar no acompanhamento do ciclo menstrual, registro de sintomas, observação de sinais do corpo e organização das informações relacionadas à saúde íntima.

              {'\n\n'}

              As informações fornecidas pela usuária são utilizadas para personalizar a experiência dentro do aplicativo e oferecer recursos de acompanhamento menstrual.

              {'\n\n'}

              O SPIE não substitui consultas médicas, diagnósticos profissionais ou tratamentos indicados por profissionais de saúde.

              {'\n\n'}

              As previsões menstruais, períodos férteis e demais estimativas são baseadas nos dados registrados pela própria usuária e podem variar de acordo com cada organismo.

              {'\n\n'}

              A usuária é responsável por manter seus registros atualizados para melhorar a experiência e a precisão das informações.

              {'\n\n'}

              Ao utilizar o SPIE, a usuária concorda com estes termos e com a utilização dos recursos disponibilizados pelo aplicativo.

            </Text>

          </ScrollView>

        </View>

      </Background>

    </View>
  );
}