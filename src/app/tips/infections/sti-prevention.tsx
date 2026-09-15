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

export default function STIPreventionScreen() {
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
            name="shield-checkmark-outline"
            size={55}
            color="#22C55E"
          />
          <Text style={tipsDetailStyles.title}>
            STI Prevention & Sexual Health
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Essential guidelines for prevention, screening, and protecting your sexual wellbeing.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What are STIs?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Sexually Transmitted Infections (STIs) are infections transmitted predominantly through sexual activity (vaginal, anal, or oral).
            {'\n\n'}
            They are caused by bacteria (chlamydia, gonorrhea, syphilis), viruses (HPV, herpes, HIV, hepatitis B), or parasites (trichomoniasis).
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Core prevention strategies
          </Text>
          <Text style={tipsDetailStyles.text}>
            • Consistent and correct use of condoms (external or internal);
            {'\n'}
            • Vaccination against HPV and Hepatitis B;
            {'\n'}
            • Regular sexual health screenings with your provider;
            {'\n'}
            • Open and honest conversations with sexual partners;
            {'\n'}
            • Prompt medical evaluation following unprotected intercourse.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            When should you get tested?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Testing is recommended:
            {'\n\n'}
            • Annually if you are sexually active and under 25;
            {'\n'}
            • Before starting a sexual relationship with a new partner;
            {'\n'}
            • After any condom failure or unprotected encounter;
            {'\n'}
            • If a partner tests positive for any STI;
            {'\n'}
            • Whenever you notice unusual discharge, sores, burning, or pelvic pain.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Break the stigma
          </Text>
          <Text style={tipsDetailStyles.text}>
            STIs are very common and nothing to be ashamed of.
            {'\n\n'}
            Most STIs are easily cured with antibiotics or effectively managed with antivirals.
            {'\n\n'}
            Taking charge of your sexual health by testing regularly is a responsible and empowering choice.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Knowledge and prevention empower healthy relationships. Use condoms and get screened regularly to keep yourself and your partners protected.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
