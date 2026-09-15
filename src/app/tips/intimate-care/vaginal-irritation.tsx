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

export default function VaginalIrritationScreen() {
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
            name="alert-circle-outline"
            size={55}
            color="#F97316"
          />
          <Text style={tipsDetailStyles.title}>
            Itching & Vulvar Irritation
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand common triggers for intimate itching, soothing techniques, and when to seek medical care.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What causes intimate itching?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Itching and irritation in the vulvovaginal area can stem from non-infectious skin reactions, environmental irritants, or microbial infections.
            {'\n\n'}
            Not all itching is caused by a yeast infection, so determining the true underlying cause is important.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Non-infectious triggers (Contact Dermatitis)
          </Text>
          <Text style={tipsDetailStyles.text}>
            • Fragranced soaps, bubble baths, body washes, or bath bombs;
            {'\n'}
            • Scented laundry detergents or dryer sheets on underwear;
            {'\n'}
            • Fragranced sanitary pads or panty liners;
            {'\n'}
            • Synthetic underwear trapping heat and sweat;
            {'\n'}
            • Shaving irritation, razor burn, or waxing products;
            {'\n'}
            • Latex condoms, spermicides, or scented lubricants.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Infectious causes
          </Text>
          <Text style={tipsDetailStyles.text}>
            • Candidiasis (Yeast infection): hallmark curdy discharge and severe itching;
            {'\n'}
            • Bacterial Vaginosis (BV): thin discharge with fishy odor and mild irritation;
            {'\n'}
            • Trichomoniasis: copious frothy discharge and vulvar redness;
            {'\n'}
            • Genital herpes or pubic lice.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Immediate soothing steps
          </Text>
          <Text style={tipsDetailStyles.text}>
            • Wash gently with plain cool or lukewarm water only—no soap;
            {'\n'}
            • Apply a clean cold compress or gel ice pack wrapped in a cloth to soothe burning;
            {'\n'}
            • Wear loose-fitting 100% cotton underwear or sleep without underwear;
            {'\n'}
            • Resist the urge to scratch, which damages delicate skin and invites secondary bacterial infection.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            If itching persists for more than a couple of days, causes fissures, or is accompanied by unusual discharge, see a doctor rather than self-treating with over-the-counter creams.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
