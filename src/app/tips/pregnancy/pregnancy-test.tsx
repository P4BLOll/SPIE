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

export default function PregnancyTestScreen() {
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
            name="flask-outline"
            size={55}
            color="#EC4899"
          />
          <Text style={tipsDetailStyles.title}>
            Pregnancy Test
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand test types, optimal timing, and how to read results accurately.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            How pregnancy tests work
          </Text>
          <Text style={tipsDetailStyles.text}>
            Pregnancy tests detect the hormone human Chorionic Gonadotropin (hCG).
            {'\n\n'}
            hCG is produced by the placenta shortly after an embryo implants in the uterine wall.
            {'\n\n'}
            Levels double roughly every 48 to 72 hours in early gestation, becoming increasingly detectable in urine and blood.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Urine home tests
          </Text>
          <Text style={tipsDetailStyles.text}>
            At-home tests use a test strip or digital sensor to analyze urine.
            {'\n\n'}
            They are convenient, confidential, and over 99% accurate when used from the day of your expected period.
            {'\n\n'}
            Testing with your first morning urine yields the highest hCG concentration.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Blood laboratory tests
          </Text>
          <Text style={tipsDetailStyles.text}>
            Blood tests performed in clinical laboratories can detect minuscule amounts of hCG earlier than urine tests (approx. 7–10 days post-ovulation).
            {'\n\n'}
            Quantitative hCG blood tests measure exact hormone concentrations to track early pregnancy progression.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Interpreting results
          </Text>
          <Text style={tipsDetailStyles.text}>
            • Positive (+ or two lines): Indicates hCG detection and pregnancy. Even a faint second line is generally positive.
            {'\n\n'}
            • Negative (- or one line): No detectable hCG. If your period remains delayed, retest in 3 to 5 days.
            {'\n\n'}
            • Invalid: Neither control line nor test line appeared properly, usually due to insufficient sample or expiration. Retest with a new kit.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Avoiding false negatives
          </Text>
          <Text style={tipsDetailStyles.text}>
            Testing too early is the #1 cause of false negative results.
            {'\n\n'}
            Drinking excess fluids before testing can also dilute urine hCG levels.
            {'\n\n'}
            Always check the expiration date and read results strictly within the stated timeframe (usually 3 to 5 minutes).
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Always follow packaging instructions and respect reading windows. If positive or if uncertainties remain, consult a healthcare provider.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
