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

export default function AdenomyosisScreen() {
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
            color="#A855F7"
          />
          <Text style={tipsDetailStyles.title}>
            Adenomyosis
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand this uterine condition, its distinctive symptoms, and when to seek medical evaluation.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is adenomyosis?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Adenomyosis is a gynecological condition in which tissue resembling the inner uterine lining (endometrium) grows into the muscular wall of the uterus (myometrium).
            {'\n\n'}
            This misplaced tissue continues to thicken, break down, and bleed during each menstrual cycle, causing localized inflammation, uterine enlargement, and pain.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Common symptoms
          </Text>
          <Text style={tipsDetailStyles.text}>
            • Severe, sharp, or throbbing menstrual cramps (dysmenorrhea);
            {'\n'}
            • Heavy menstrual bleeding (menorrhagia) with large clots;
            {'\n'}
            • Prolonged menstrual bleeding lasting over a week;
            {'\n'}
            • Chronic pelvic aching or lower back pressure;
            {'\n'}
            • Pain during or after sexual intercourse (dyspareunia);
            {'\n'}
            • Enlarged, tender uterus causing a swollen or tender lower abdomen.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Adenomyosis vs. Endometriosis
          </Text>
          <Text style={tipsDetailStyles.text}>
            While both involve endometrial-like tissue, their location differs:
            {'\n\n'}
            • In adenomyosis, the tissue invades the uterine muscle wall itself.
            {'\n\n'}
            • In endometriosis, the tissue grows outside the uterus entirely (on ovaries, fallopian tubes, or bowel).
            {'\n\n'}
            It is possible to have both conditions simultaneously.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Risk of anemia
          </Text>
          <Text style={tipsDetailStyles.text}>
            Heavy, prolonged blood loss from adenomyosis can lead to iron deficiency anemia.
            {'\n\n'}
            If you experience chronic exhaustion, lightheadedness, pale skin, or shortness of breath alongside heavy periods, request a blood panel and ferritin check.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Diagnosis and management
          </Text>
          <Text style={tipsDetailStyles.text}>
            Diagnosis involves a pelvic examination and high-resolution transvaginal ultrasound or pelvic MRI.
            {'\n\n'}
            Management options range from anti-inflammatory pain medications to hormonal treatments (such as a levonorgestrel-releasing IUD or birth control pills) that suppress bleeding.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Severe cramps and flooding menstrual flow are not things you simply have to endure. Consult a gynecologist to evaluate whether adenomyosis may be the cause.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
