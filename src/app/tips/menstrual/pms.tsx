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

export default function PMSScreen() {
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
            name="heart-outline"
            size={55}
            color="#EC4899"
          />
          <Text style={tipsDetailStyles.title}>
            PMS (Premenstrual Syndrome)
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand physical and emotional changes that can emerge prior to menstruation.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is PMS?
          </Text>
          <Text style={tipsDetailStyles.text}>
            PMS stands for Premenstrual Syndrome.
            {'\n\n'}
            It refers to a combination of physical, emotional, and behavioral symptoms that emerge in the days or weeks leading up to menstruation.
            {'\n\n'}
            These symptoms are directly linked to normal hormonal shifts during the luteal phase of the menstrual cycle.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Physical symptoms
          </Text>
          <Text style={tipsDetailStyles.text}>
            Common physical signs of PMS include:
            {'\n\n'}
            • Abdominal bloating and fluid retention;
            {'\n'}
            • Breast tenderness or swelling;
            {'\n'}
            • Headaches or migraines;
            {'\n'}
            • Fatigue and low physical energy;
            {'\n'}
            • Food cravings, particularly for carbohydrates or sweets;
            {'\n'}
            • Muscle aches and joint discomfort.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Emotional symptoms
          </Text>
          <Text style={tipsDetailStyles.text}>
            Many individuals also notice mood variations:
            {'\n\n'}
            • Heightened irritability or mood swings;
            {'\n'}
            • Anxiety or feelings of restlessness;
            {'\n'}
            • Low mood or tearfulness;
            {'\n'}
            • Difficulty concentrating;
            {'\n'}
            • Sleep disturbances or insomnia.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            When do symptoms arise and resolve?
          </Text>
          <Text style={tipsDetailStyles.text}>
            PMS symptoms characteristically develop during the luteal phase (post-ovulation) and generally peak in the few days before your period starts.
            {'\n\n'}
            They typically diminish quickly once menstrual bleeding begins.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Healthy coping strategies
          </Text>
          <Text style={tipsDetailStyles.text}>
            Supportive lifestyle adjustments can significantly reduce symptom severity:
            {'\n\n'}
            • Eating balanced meals rich in whole grains, protein, and magnesium;
            {'\n'}
            • Limiting excess sodium, caffeine, and alcohol;
            {'\n'}
            • Engaging in regular moderate aerobic exercise;
            {'\n'}
            • Prioritizing 7–9 hours of quality sleep;
            {'\n'}
            • Practicing stress reduction techniques such as meditation or yoga.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            When to seek professional support?
          </Text>
          <Text style={tipsDetailStyles.text}>
            If emotional symptoms are severe, include feelings of despair, or disrupt relationships and daily life, you may be dealing with Premenstrual Dysphoric Disorder (PMDD).
            {'\n\n'}
            Consult a medical or mental health provider for targeted assessment and treatment options.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            PMS experiences vary greatly. Tracking your daily symptoms over several cycles helps identify personal patterns and guides effective self-care.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
