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

export default function CrampsScreen() {
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
            name="pulse-outline"
            size={55}
            color="#F97316"
          />
          <Text style={tipsDetailStyles.title}>
            Menstrual Cramps
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand why cramps happen, effective relief strategies, and when they require medical evaluation.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What are menstrual cramps?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Menstrual cramps (dysmenorrhea) are aching or throbbing pains in the lower abdomen that occur just before or during menstruation.
            {'\n\n'}
            They are primarily caused by uterine muscle contractions that help shed the uterine lining during your period.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Why does the uterus contract?
          </Text>
          <Text style={tipsDetailStyles.text}>
            During menstruation, the body produces chemical messengers called prostaglandins.
            {'\n\n'}
            Prostaglandins trigger uterine muscle contractions to expel menstrual fluid. Higher levels of prostaglandins are directly associated with more severe cramping.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            How do cramps feel?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Intensity varies greatly from person to person. While some feel mild tension, others may experience:
            {'\n\n'}
            • Aching pain or deep pressure in the lower abdomen;
            {'\n'}
            • Pain radiating to the lower back and thighs;
            {'\n'}
            • Nausea or digestive upset;
            {'\n'}
            • Headaches or dizziness;
            {'\n'}
            • Fatigue and overall malaise.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What can help relieve cramps?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Several everyday strategies can soothe discomfort:
            {'\n\n'}
            • Applying a warm heating pad or hot water bottle to the abdomen;
            {'\n'}
            • Getting adequate rest and gentle stretching;
            {'\n'}
            • Staying well hydrated with warm teas or water;
            {'\n'}
            • Engaging in light physical activity or walking if comfortable;
            {'\n'}
            • Seeking medical advice regarding over-the-counter anti-inflammatory medications.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            When are cramps a warning sign?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Cramps should be medically evaluated when:
            {'\n\n'}
            • The pain is severe, debilitating, or prevents daily activities;
            {'\n'}
            • Pain worsens progressively cycle after cycle;
            {'\n'}
            • Standard pain relievers provide little or no relief;
            {'\n'}
            • Accompanied by unusually heavy menstrual flow or large clots;
            {'\n'}
            • Cramping occurs outside of your period or during intercourse.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Could severe cramps have a medical cause?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Severe or chronic pelvic pain can sometimes be linked to underlying conditions such as endometriosis, adenomyosis, or uterine fibroids.
            {'\n\n'}
            If your cramps interfere with your quality of life, discussing your symptoms with a gynecologist is essential.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Mild discomfort during your period can be normal, but severe pain that disrupts your life should never be normalized. Tracking symptoms helps your doctor pinpoint the cause.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
