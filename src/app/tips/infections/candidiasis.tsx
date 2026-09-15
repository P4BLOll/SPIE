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

export default function CandidiasisScreen() {
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
            name="bug-outline"
            size={55}
            color="#A855F7"
          />
          <Text style={tipsDetailStyles.title}>
            Vaginal Candidiasis (Yeast Infection)
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Learn about yeast infections, characteristic symptoms, triggers, and effective relief.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is candidiasis?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Vaginal candidiasis, commonly known as a yeast infection, is caused by an overgrowth of Candida fungi, most often Candida albicans.
            {'\n\n'}
            Candida normally resides harmlessly in small amounts in the vagina, mouth, and digestive tract. When the natural microbiome or pH balance is disrupted, Candida can proliferate rapidly.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Common symptoms
          </Text>
          <Text style={tipsDetailStyles.text}>
            Hallmark symptoms include:
            {'\n\n'}
            • Intense itching and burning in the vulva and vagina;
            {'\n'}
            • Redness, swelling, and irritation of the vulvar skin;
            {'\n'}
            • Thick, white, odorless vaginal discharge resembling cottage cheese;
            {'\n'}
            • Burning sensation during urination or sexual intercourse;
            {'\n'}
            • Skin cracks or small fissures in severe cases.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What triggers yeast overgrowth?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Frequent predisposing factors include:
            {'\n\n'}
            • Broad-spectrum antibiotic therapy;
            {'\n'}
            • Elevated estrogen levels (pregnancy, high-dose oral contraceptives);
            {'\n'}
            • Uncontrolled diabetes or high blood sugar;
            {'\n'}
            • Wearing damp swimwear or tight synthetic clothing for prolonged hours;
            {'\n'}
            • Weakened immune function.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Treatment and care
          </Text>
          <Text style={tipsDetailStyles.text}>
            Yeast infections are effectively treated with antifungal medications, available as vaginal creams, suppositories, or single-dose oral tablets (such as fluconazole).
            {'\n\n'}
            If symptoms do not improve within a few days or recur more than 4 times a year, clinical reassessment is required to rule out resistant strains or underlying conditions.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Intense vulvar itching and cottage-cheese-like discharge point to a yeast infection. Wear breathable cotton underwear and consult your doctor for persistent symptoms.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
