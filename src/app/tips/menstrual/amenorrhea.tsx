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

export default function AmenorrheaScreen() {
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
            name="calendar-clear-outline"
            size={55}
            color="#6366F1"
          />
          <Text style={tipsDetailStyles.title}>
            Amenorrhea
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand the absence of menstruation, potential causes, and when to seek medical advice.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is amenorrhea?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Amenorrhea is the clinical term used to describe the absence of menstruation.
            {'\n\n'}
            It can occur in different situations and does not always indicate an underlying illness.
            {'\n\n'}
            It is essential to consider age, menstrual history, the possibility of pregnancy, current medications, and individual health characteristics.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Primary amenorrhea
          </Text>
          <Text style={tipsDetailStyles.text}>
            Primary amenorrhea refers to when someone has not had their first menstrual period by the expected age (typically around age 15 to 16).
            {'\n\n'}
            There are various potential reasons for this, including hormonal imbalances, genetic factors, and structural differences in the reproductive system.
            {'\n\n'}
            Whenever the first menstruation does not occur within the expected timeframe, a professional medical evaluation is recommended.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Secondary amenorrhea
          </Text>
          <Text style={tipsDetailStyles.text}>
            Secondary amenorrhea occurs when a person who previously had menstrual periods experiences an absence of menstruation for several consecutive cycles or months.
            {'\n\n'}
            In sexually active individuals, pregnancy is always one of the first possibilities to consider.
            {'\n\n'}
            Other frequent causes include significant hormonal shifts, intense emotional stress, drastic weight fluctuations, thyroid disorders, and certain medications.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Lifestyle and emotional factors
          </Text>
          <Text style={tipsDetailStyles.text}>
            The menstrual cycle is finely tuned and sensitive to overall bodily health.
            {'\n\n'}
            Factors that can temporarily halt or delay periods include:
            {'\n\n'}
            • Chronic emotional distress or acute psychological stress;
            {'\n'}
            • Rapid, drastic weight loss or severe caloric restriction;
            {'\n'}
            • Overtraining or high-intensity athletic conditioning;
            {'\n'}
            • Severe sleep deprivation or disruption of circadian rhythms.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Hormonal and health conditions
          </Text>
          <Text style={tipsDetailStyles.text}>
            Certain underlying medical conditions can disrupt normal ovulation and cycle regularity:
            {'\n\n'}
            • Polycystic Ovary Syndrome (PCOS);
            {'\n'}
            • Thyroid disorders (hypothyroidism or hyperthyroidism);
            {'\n'}
            • Hyperprolactinemia (elevated prolactin levels);
            {'\n'}
            • Premature ovarian insufficiency or perimenopause;
            {'\n'}
            • Use of hormonal birth control, which can naturally suppress bleeding.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            When to seek medical attention?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Consult a healthcare professional if:
            {'\n\n'}
            • You have reached age 15 or 16 without your first menstrual cycle;
            {'\n'}
            • Your periods were regular and have stopped for 3 or more months;
            {'\n'}
            • Your periods were irregular and have stopped for 6 or more months;
            {'\n'}
            • You experience accompanying symptoms like pelvic pain, unexplained hair growth, acne, headaches, vision changes, or nipple discharge;
            {'\n'}
            • There is a chance of pregnancy.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            The absence of menstruation should never be ignored. Tracking your cycles helps doctors identify causes and find the most suitable treatment for your wellbeing.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
