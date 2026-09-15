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

export default function MenstrualHygieneScreen() {
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
            name="sparkles-outline"
            size={55}
            color="#06B6D4"
          />
          <Text style={tipsDetailStyles.title}>
            Menstrual Hygiene
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Essential habits to stay comfortable, fresh, and healthy during your period.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Change period products regularly
          </Text>
          <Text style={tipsDetailStyles.text}>
            Regular changing prevents bacterial overgrowth, skin chafing, and unpleasant odors:
            {'\n\n'}
            • Sanitary pads: every 3 to 6 hours;
            {'\n'}
            • Tampons: every 4 to 8 hours (never exceed 8 hours);
            {'\n'}
            • Menstrual cups and discs: empty and rinse every 8 to 12 hours;
            {'\n'}
            • Period underwear: change when nearing absorbency capacity or feeling damp.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Hand hygiene
          </Text>
          <Text style={tipsDetailStyles.text}>
            Always wash your hands thoroughly with soap and water both before and after inserting or changing menstrual products.
            {'\n\n'}
            This prevents transferring bacteria from everyday surfaces directly into the genital tract.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Gentle vulvar cleansing
          </Text>
          <Text style={tipsDetailStyles.text}>
            Rinse the external vulva with warm water during your daily shower or between changes.
            {'\n\n'}
            Avoid harsh antiseptic soaps, perfumes, or internal douches, which irritate sensitive skin during menstruation.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Proper disposal
          </Text>
          <Text style={tipsDetailStyles.text}>
            Wrap disposable pads and tampons in their wrapper or toilet paper and dispose of them in a sanitary bin.
            {'\n\n'}
            Never flush menstrual products down the toilet, as they cause major plumbing blockages and environmental contamination.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Consistent changing intervals and clean hands keep you comfortable and safeguard against irritations throughout your menstrual cycle.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
