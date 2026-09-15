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

export default function IrregularPeriodScreen() {
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
            name="calendar-outline"
            size={55}
            color="#8B5CF6"
          />
          <Text style={tipsDetailStyles.title}>
            Irregular Periods
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand what causes cycle fluctuations and when to seek medical evaluation.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is an irregular cycle?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Menstrual cycles naturally vary among individuals and can shift slightly throughout life.
            {'\n\n'}
            A cycle is considered irregular when there is frequent or significant variability in the interval between periods, duration, or flow volume.
            {'\n\n'}
            An isolated late or early cycle is common and does not necessarily indicate a health condition.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Common causes of irregularity
          </Text>
          <Text style={tipsDetailStyles.text}>
            Multiple factors can alter cycle timing:
            {'\n\n'}
            • Hormonal fluctuations;
            {'\n'}
            • High physical or emotional stress;
            {'\n'}
            • Significant weight loss or gain;
            {'\n'}
            • Rigorous or intense athletic training;
            {'\n'}
            • Polycystic Ovary Syndrome (PCOS);
            {'\n'}
            • Thyroid gland dysfunction;
            {'\n'}
            • Starting, changing, or discontinuing hormonal contraceptives;
            {'\n'}
            • Pregnancy or breastfeeding;
            {'\n'}
            • Perimenopause transition.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Adolescence
          </Text>
          <Text style={tipsDetailStyles.text}>
            During the first few years after menarche (first period), irregular cycles are very common.
            {'\n\n'}
            The hypothalamic-pituitary-ovarian hormonal axis is still maturing, often leading to anovulatory cycles.
            {'\n\n'}
            However, extremely prolonged bleeding, severe pain, or bleeding intervals exceeding 90 days warrant medical review.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Can contraceptives affect regularity?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Yes. Hormonal birth control methods (pills, implants, hormonal IUDs, injections) alter bleeding patterns.
            {'\n\n'}
            Some methods reduce flow, cause light irregular spotting, or eliminate periods entirely, which is often expected.
            {'\n\n'}
            Discuss any concerning or persistent breakthrough bleeding with your prescribing provider.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            How to monitor your cycle
          </Text>
          <Text style={tipsDetailStyles.text}>
            Logging your cycle consistently provides valuable clarity:
            {'\n\n'}
            • First and last day of menstrual bleeding;
            {'\n'}
            • Flow intensity and color;
            {'\n'}
            • Associated symptoms (cramps, mood, fatigue);
            {'\n'}
            • Spotting or bleeding between cycles;
            {'\n'}
            • Changes from month to month.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            When to see a doctor?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Consult a healthcare professional if:
            {'\n\n'}
            • Your cycles suddenly become unpredictable for several consecutive months;
            {'\n'}
            • Periods stop for more than 90 days (and you are not pregnant);
            {'\n'}
            • Bleeding lasts longer than 7 to 8 days;
            {'\n'}
            • Flow is excessively heavy, soaking pads hourly;
            {'\n'}
            • You experience severe pain or symptoms like excess hair growth or significant weight changes.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Understanding your baseline cycle helps you detect meaningful changes. Logging symptoms provides accurate data for clinical consultations.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
