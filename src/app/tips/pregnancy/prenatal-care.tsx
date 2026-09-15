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

export default function PrenatalCareScreen() {
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
            name="medical-outline"
            size={55}
            color="#EC4899"
          />
          <Text style={tipsDetailStyles.title}>
            Prenatal Care
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand the vital importance of healthcare visits and screenings throughout pregnancy.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is prenatal care?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Prenatal care encompasses comprehensive medical oversight and guidance provided during pregnancy.
            {'\n\n'}
            It protects the health of both parent and child, lowering risks of complications and ensuring healthy fetal development.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            When should prenatal care begin?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Schedule your first prenatal consultation as soon as you have a positive pregnancy test.
            {'\n\n'}
            Starting early allows your doctor to evaluate medical history, prescribe necessary vitamins, and order baseline blood and urine panels.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What happens during appointments?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Routine evaluations typically include:
            {'\n\n'}
            • Blood pressure and weight checks;
            {'\n'}
            • Measuring fundal height to track uterine growth;
            {'\n'}
            • Listening to the fetal heartbeat with a Doppler;
            {'\n'}
            • Screening for gestational diabetes and preeclampsia;
            {'\n'}
            • Reviewing vaccination status (e.g., Tdap, flu);
            {'\n'}
            • Addressing emotional health, sleep, and nutrition.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Ultrasound scans
          </Text>
          <Text style={tipsDetailStyles.text}>
            Obstetric ultrasounds use safe sound waves to visualize the baby.
            {'\n\n'}
            Common scans include the first-trimester dating scan, nuchal translucency screening, and the comprehensive 20-week mid-pregnancy anatomy survey.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Emotional wellbeing
          </Text>
          <Text style={tipsDetailStyles.text}>
            Hormonal changes combined with life transitions can induce emotional shifts.
            {'\n\n'}
            Perinatal depression and anxiety are common and highly treatable. Always share feelings of persistent sadness, panic, or overwhelm with your care team.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Consistent prenatal visits are the single most effective safeguard for maternal and infant health. Attend all scheduled visits and reach out to your provider with questions.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
