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

export default function PregnancySignsScreen() {
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
            name="thermometer-outline"
            size={55}
            color="#EC4899"
          />
          <Text style={tipsDetailStyles.title}>
            Pregnancy Signs
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Learn about common physical symptoms that can appear in early pregnancy.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Missed period
          </Text>
          <Text style={tipsDetailStyles.text}>
            For individuals with regular menstrual cycles, a missed period is often the first noticeable sign of pregnancy.
            {'\n\n'}
            However, periods can also be delayed by stress, hormonal imbalances, illness, or travel. A missed period alone is suggestive, but not definitive.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Nausea and morning sickness
          </Text>
          <Text style={tipsDetailStyles.text}>
            Nausea can emerge as early as 2 to 8 weeks after conception.
            {'\n\n'}
            Despite the nickname "morning sickness," it can occur at any time of the day or night. Some experience only mild food aversions, while others experience frequent vomiting.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Breast changes
          </Text>
          <Text style={tipsDetailStyles.text}>
            Surging hormones increase blood flow to breast tissue, leading to tenderness, swelling, heaviness, or darker areolas.
            {'\n\n'}
            These sensations are similar to premenstrual changes but tend to be more pronounced and persistent.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Fatigue and exhaustion
          </Text>
          <Text style={tipsDetailStyles.text}>
            Dramatic rises in progesterone levels, lower blood pressure, and increased metabolic demands can produce significant fatigue early on.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Frequent urination
          </Text>
          <Text style={tipsDetailStyles.text}>
            Hormonal changes stimulate kidney blood flow and efficiency, causing your bladder to fill more quickly even before the uterus physically presses against it.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            When to take a test?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Symptoms alone cannot confirm pregnancy.
            {'\n\n'}
            Taking an at-home urine test starting on the first day of your missed period provides accurate detection of hCG.
            {'\n\n'}
            If negative but your period does not arrive, repeat the test in 3 to 5 days or request a clinical blood test.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Early symptoms overlap significantly with PMS. A reliable pregnancy test is the only definitive way to confirm pregnancy.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
