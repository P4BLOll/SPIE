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

export default function VaginalOdorScreen() {
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
            name="flower-outline"
            size={55}
            color="#A855F7"
          />
          <Text style={tipsDetailStyles.title}>
            Vaginal Odor & Health
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand what is normal, what triggers odor changes, and when to seek clinical guidance.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Every vagina has a natural scent
          </Text>
          <Text style={tipsDetailStyles.text}>
            It is completely normal and healthy for the vagina to have a mild, subtle scent.
            {'\n\n'}
            A healthy vagina is naturally acidic (pH 3.8 to 4.5), which can impart a slightly tangy or musky aroma that shifts across your cycle, after sweating, or post-intercourse.
            {'\n\n'}
            Vaginas are not meant to smell like flowers, fruits, or perfumes.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Normal fluctuations
          </Text>
          <Text style={tipsDetailStyles.text}>
            • During menstruation: Blood contains iron, often imparting a temporary metallic scent;
            {'\n'}
            • After exercise: Apocrine sweat glands in the groin produce normal body perspiration;
            {'\n'}
            • After intercourse: Semen has an alkaline pH that temporarily alters vaginal scent.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            When odor signals an infection
          </Text>
          <Text style={tipsDetailStyles.text}>
            A pronounced, persistent, or unpleasant smell often points to an infection:
            {'\n\n'}
            • Strong fishy odor: Hallmark sign of Bacterial Vaginosis (BV) or Trichomoniasis;
            {'\n'}
            • Foul, rotting odor: Can occur if a tampon was accidentally forgotten inside;
            {'\n'}
            • Accompanied by burning, itching, pelvic pain, or abnormal discharge.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What NOT to do
          </Text>
          <Text style={tipsDetailStyles.text}>
            Never attempt to mask odor using feminine deodorants, scented washes, perfumes, or internal douches.
            {'\n\n'}
            These products strip healthy bacteria, worsen the underlying cause, and trigger painful contact dermatitis.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            A natural subtle scent is healthy and normal. A persistent fishy or foul odor is a medical sign that is easily treated with a clinician's prescription.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
