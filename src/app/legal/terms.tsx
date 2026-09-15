import React from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: cycleColors.background,
      }}
      edges={['top', 'left', 'right']}
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
              Terms of Use
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

              Welcome to SPIE.

              {'\n\n'}

              SPIE is an application designed to assist in tracking the menstrual cycle, logging symptoms, observing body signals, and organizing personal intimate health records.

              {'\n\n'}

              The information provided by the user is used to personalize the in-app experience and provide menstrual tracking and safety features.

              {'\n\n'}

              SPIE does not replace medical consultations, clinical diagnoses, or treatments prescribed by healthcare professionals.

              {'\n\n'}

              Cycle predictions, fertile window estimates, and health forecasts are calculated based on data logged by the user and may naturally vary depending on individual biology.

              {'\n\n'}

              The user is responsible for keeping their logs accurate and up-to-date to ensure optimal tracking precision.

              {'\n\n'}

              By using SPIE, you agree to these terms and the use of the features provided by the application.

            </Text>

          </ScrollView>

        </View>
      </Background>
    </SafeAreaView>
  );
}