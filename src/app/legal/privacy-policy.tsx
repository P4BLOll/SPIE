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
  privacyStyles,
} from '@/styles/privacy.styles';

export default function PrivacyScreen() {

  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          cycleColors.background,
      }}
    >

      <Background
        style={{
          flex: 1,
          backgroundColor:
            cycleColors.background,
        }}
      >

        <View
          style={[
            privacyStyles.container,
            {
              backgroundColor:
                cycleColors.background,
            },
          ]}
        >

          {/* HEADER FIXO */}

          <View
            style={privacyStyles.header}
          >

            <TouchableOpacity
              style={
                privacyStyles.backButton
              }
              onPress={() =>
                router.back()
              }
            >

              <Ionicons
                name="arrow-back"
                size={24}
                color="#FFFFFF"
              />

            </TouchableOpacity>

            <Text
              style={
                privacyStyles.title
              }
            >
              Política de Privacidade
            </Text>

          </View>

          {/* SOMENTE O TEXTO ROLA */}

          <ScrollView
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={
              privacyStyles.scrollContent
            }
          >

            <Text
              style={privacyStyles.text}
            >

              O SPIE respeita a privacidade e a segurança das informações fornecidas pelas usuárias.

              {'\n\n'}

              Durante o uso do aplicativo podem ser coletadas informações como nome, e-mail, idade, dados relacionados ao ciclo menstrual, sintomas, registros de saúde íntima e informações fornecidas voluntariamente.

              {'\n\n'}

              Essas informações são utilizadas para:

              {'\n\n'}

              • Personalizar o acompanhamento do ciclo.

              {'\n'}

              • Melhorar previsões e análises.

              {'\n'}

              • Disponibilizar recursos de segurança e acompanhamento menstrual.

              {'\n\n'}

              Informações relacionadas à saúde menstrual são consideradas dados sensíveis e recebem medidas de proteção adequadas.

              {'\n\n'}

              O SPIE não vende dados pessoais e não compartilha informações das usuárias sem autorização ou sem uma base legal adequada.

              {'\n\n'}

              A usuária pode solicitar:

              {'\n\n'}

              • Acesso aos seus dados.

              {'\n'}

              • Correção de informações.

              {'\n'}

              • Exclusão da conta e dos dados associados.

            </Text>

          </ScrollView>

        </View>

      </Background>

    </View>
  );
}