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

export default function PregnancyScreen() {
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
            name="heart-circle-outline"
            size={55}
            color="#EC4899"
          />
          <Text style={tipsDetailStyles.title}>
            Pregnancy
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand key changes that occur in the body throughout pregnancy.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is pregnancy?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Pregnancy begins when fertilization occurs and the resulting embryo implants and develops in the uterus.
            {'\n\n'}
            During this time, the body undergoes profound physiological changes to nurture and sustain fetal growth.
            {'\n\n'}
            Gestational age is commonly measured in weeks, calculated from the first day of the last menstrual period (LMP).
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            How it occurs
          </Text>
          <Text style={tipsDetailStyles.text}>
            During ovulation, a mature egg is released from an ovary.
            {'\n\n'}
            When a sperm fertilizes the egg in the fallopian tube, a zygote forms and begins dividing as it travels to the uterus.
            {'\n\n'}
            The blastocyst then embeds itself into the rich uterine lining—a milestone known as implantation.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Early changes
          </Text>
          <Text style={tipsDetailStyles.text}>
            In early pregnancy, many notice distinct physical signs:
            {'\n\n'}
            • Missed menstrual period;
            {'\n'}
            • Morning sickness or nausea at any time of day;
            {'\n'}
            • Marked fatigue and sleepiness;
            {'\n'}
            • Breast tenderness and fullness;
            {'\n'}
            • Increased urinary frequency;
            {'\n'}
            • Food cravings or sudden food aversions.
            {'\n\n'}
            Symptoms alone do not confirm pregnancy; testing is required.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            The three trimesters
          </Text>
          <Text style={tipsDetailStyles.text}>
            Pregnancy is divided into three trimesters:
            {'\n\n'}
            First trimester (weeks 1–12):
            {'\n'}
            Implantation and critical embryonic organ development.
            {'\n\n'}
            Second trimester (weeks 13–27):
            {'\n'}
            Rapid fetal growth, anatomical development, and the first flutter of movements (quickening).
            {'\n\n'}
            Third trimester (weeks 28–40+):
            {'\n'}
            Fetal weight gain, lung maturation, and the body preparing for labor and birth.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Prenatal care
          </Text>
          <Text style={tipsDetailStyles.text}>
            Routine prenatal visits are essential for maternal and fetal wellbeing.
            {'\n\n'}
            Clinicians monitor blood pressure, growth, laboratory screenings, and perform periodic ultrasounds to detect and address potential complications early.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Nutrition and care
          </Text>
          <Text style={tipsDetailStyles.text}>
            • Attend all scheduled prenatal visits;
            {'\n'}
            • Consume a balanced diet with adequate protein, fiber, and micronutrients;
            {'\n'}
            • Stay consistently hydrated;
            {'\n'}
            • Strictly avoid alcohol, tobacco, and recreational drugs;
            {'\n'}
            • Take only doctor-approved medications and supplements.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            If you suspect pregnancy, an at-home or clinical pregnancy test provides confirmation. In case of a positive result, schedule a prenatal appointment to begin care promptly.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
