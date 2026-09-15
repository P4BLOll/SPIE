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

export default function OvarianCystsScreen() {
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
            name="medkit-outline"
            size={55}
            color="#06B6D4"
          />
          <Text style={tipsDetailStyles.title}>
            Ovarian Cysts
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Learn what ovarian cysts are, how they form, possible symptoms, and when to seek urgent care.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What are ovarian cysts?
          </Text>
          <Text style={tipsDetailStyles.text}>
            An ovarian cyst is a fluid-filled sac that develops on or inside an ovary.
            {'\n\n'}
            They are very common in menstruating individuals, and the vast majority are completely benign, harmless, and resolve on their own without medical intervention.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Functional cysts
          </Text>
          <Text style={tipsDetailStyles.text}>
            Most cysts are functional cysts that form as a natural part of ovulation:
            {'\n\n'}
            • Follicular cysts: Form when an ovarian follicle fails to rupture and release an egg, continuing to grow.
            {'\n\n'}
            • Corpus luteum cysts: Form when the sac that contained the released egg seals off and fluid accumulates inside.
            {'\n\n'}
            Both types usually vanish spontaneously within 1 to 3 menstrual cycles.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Symptoms
          </Text>
          <Text style={tipsDetailStyles.text}>
            While most cysts cause no symptoms and are detected incidentally on ultrasound, larger cysts can produce:
            {'\n\n'}
            • Dull, aching pain or pressure on one side of the lower abdomen;
            {'\n'}
            • Abdominal fullness, bloating, or heaviness;
            {'\n'}
            • Pain during bowel movements or intercourse;
            {'\n'}
            • Menstrual irregularities or unexpected spotting.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Emergency signs (Torsion or Rupture)
          </Text>
          <Text style={tipsDetailStyles.text}>
            Seek immediate emergency room care if you experience:
            {'\n\n'}
            • Sudden, excruciating, sharp lower abdominal pain;
            {'\n'}
            • Pain accompanied by high fever or recurrent vomiting;
            {'\n'}
            • Dizziness, weakness, rapid breathing, or fainting.
            {'\n\n'}
            These signs can indicate ovarian torsion (the ovary twisting on its blood supply) or a large ruptured cyst requiring urgent medical intervention.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Most ovarian cysts resolve on their own. Routine pelvic ultrasounds track their size, while sudden severe pain always calls for immediate emergency evaluation.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
