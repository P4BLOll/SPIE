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

export default function BacterialVaginosisScreen() {
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
            name="git-network-outline"
            size={55}
            color="#06B6D4"
          />
          <Text style={tipsDetailStyles.title}>
            Bacterial Vaginosis (BV)
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand the causes, distinctive symptoms, and treatment of bacterial vaginosis.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is bacterial vaginosis?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Bacterial vaginosis (BV) is a common condition caused by an imbalance of the natural bacteria in the vagina.
            {'\n\n'}
            Healthy vaginal flora is dominated by protective lactobacilli. When lactobacilli levels drop, anaerobic bacteria (such as Gardnerella vaginalis) overgrow, causing symptoms.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Key symptoms
          </Text>
          <Text style={tipsDetailStyles.text}>
            Up to 50% of people with BV experience no symptoms. When present, signs include:
            {'\n\n'}
            • Thin, watery, grayish-white vaginal discharge;
            {'\n'}
            • Distinct "fishy" odor, which is often more noticeable after sexual intercourse or during periods;
            {'\n'}
            • Mild vaginal irritation or burning during urination;
            {'\n'}
            • Unlike yeast infections, BV rarely causes intense itching or swelling.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Is BV a sexually transmitted infection?
          </Text>
          <Text style={tipsDetailStyles.text}>
            No, BV is not classified as an STI. It can develop in individuals who are not sexually active.
            {'\n\n'}
            However, having a new sexual partner, multiple partners, or having sex without condoms can disrupt the vaginal pH and increase susceptibility.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Common triggers
          </Text>
          <Text style={tipsDetailStyles.text}>
            Factors that alter vaginal acidity and trigger BV include:
            {'\n\n'}
            • Vaginal douching or internal cleansing;
            {'\n'}
            • Scented feminine hygiene washes, sprays, or bath additives;
            {'\n'}
            • Recent antibiotic usage;
            {'\n'}
            • Smoking.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Medical treatment
          </Text>
          <Text style={tipsDetailStyles.text}>
            BV is treated with prescription antibiotics such as metronidazole or clindamycin, available in oral pills or vaginal gels.
            {'\n\n'}
            Always complete the full prescribed antibiotic course, even if symptoms subside within a couple of days, to prevent recurrence.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            A fishy odor and thin discharge are characteristic of BV. Seek medical advice for an accurate prescription rather than attempting over-the-counter yeast remedies.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
