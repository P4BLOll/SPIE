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
  privacyStyles,
} from '@/styles/privacy.styles';

export default function PrivacyScreen() {

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
              Privacy Policy
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

              SPIE respects the privacy and security of all information provided by users.

              {'\n\n'}

              During the use of the app, information such as name, email, age, menstrual cycle logs, symptoms, intimate health records, and voluntarily provided details may be collected.

              {'\n\n'}

              This information is used to:

              {'\n\n'}

              • Personalize menstrual cycle tracking.

              {'\n'}

              • Improve cycle predictions and health analytics.

              {'\n'}

              • Deliver emergency safety features and menstrual health tools.

              {'\n\n'}

              Menstrual health records are classified as sensitive personal data and receive rigorous security protection measures.

              {'\n\n'}

              Safety & Geolocation Features (Protection of Life & Physical Safety):
              {'\n'}
              • When triggering the emergency SOS (on-screen button or hardware smartband), the application captures real-time GPS coordinates exclusively for the protection of life and physical safety.
              {'\n'}
              • Geolocation coordinates are transmitted immediately via SMS to the emergency contacts configured by the user.
              {'\n'}
              • Alert and location history records remain confidential and strictly protected by the user's private PIN.

              {'\n\n'}

              SPIE never sells personal data and does not share user information with third-party advertisers without explicit consent or strict statutory requirements.

              {'\n\n'}

              Users may request at any time:

              {'\n\n'}

              • Access to their personal data.

              {'\n'}

              • Correction of their information.

              {'\n'}

              • Permanent deletion of their account and all associated data.

            </Text>

          </ScrollView>

        </View>
      </Background>
    </SafeAreaView>
  );
}