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

export default function MenstrualPadsCareScreen() {
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
            name="water-outline"
            size={55}
            color="#EC4899"
          />
          <Text style={tipsDetailStyles.title}>
            Sanitary Pad Care & Comfort
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Best practices for wearing, changing, and preventing chafing with sanitary pads.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Select the right absorbency
          </Text>
          <Text style={tipsDetailStyles.text}>
            Choose pads matching your flow: regular for light days, super or maxi for heavy flow, and extended overnight pads with wings for sleeping.
            {'\n\n'}
            Wearing the right size prevents leaks and reduces bulkiness and friction against inner thighs.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Change before saturation
          </Text>
          <Text style={tipsDetailStyles.text}>
            Change pads every 3 to 5 hours, even on lighter days.
            {'\n\n'}
            Trapped moisture and warm menstrual blood encourage rapid bacterial proliferation, which can lead to skin irritation and strong odors.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Preventing pad rash (contact dermatitis)
          </Text>
          <Text style={tipsDetailStyles.text}>
            If you experience chafing, redness, or itching from pads:
            {'\n\n'}
            • Switch to 100% organic unbleached cotton topsheets;
            {'\n'}
            • Avoid scented pads and artificial odor-neutralizing chemicals;
            {'\n'}
            • Ensure underwear fits snugly so the pad does not shift and rub against groin creases;
            {'\n'}
            • Consider alternating with period underwear or reusable cloth pads.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Gentle cotton pads and frequent changes prevent skin rashes and ensure a fresh, dry feeling all day long.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
