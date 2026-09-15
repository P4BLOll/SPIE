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

export default function PregnancyWeeksScreen() {
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
            color="#EC4899"
          />
          <Text style={tipsDetailStyles.title}>
            Pregnancy Weeks
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand how gestational age is calculated and baby development milestones across 40 weeks.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            How pregnancy is counted
          </Text>
          <Text style={tipsDetailStyles.text}>
            A full-term pregnancy spans approximately 40 weeks (280 days).
            {'\n\n'}
            By international medical standard, weeks are calculated from the first day of your Last Menstrual Period (LMP), meaning conception actually happens around gestational week 2.
            {'\n\n'}
            First-trimester ultrasound measurements (crown-rump length) help verify or adjust the estimated due date.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            First trimester (Weeks 1 to 12)
          </Text>
          <Text style={tipsDetailStyles.text}>
            • Embryo cells divide and form fundamental organ systems;
            {'\n'}
            • The neural tube closes, and primitive heart contractions begin;
            {'\n'}
            • Facial features, tiny fingers, and toes develop;
            {'\n'}
            • By week 12, the fetus is fully formed and begins moving within the amniotic sac.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Second trimester (Weeks 13 to 27)
          </Text>
          <Text style={tipsDetailStyles.text}>
            • Often called the "honeymoon phase," as early nausea often wanes;
            {'\n'}
            • Maternal belly becomes visibly rounded;
            {'\n'}
            • Anatomy ultrasound (around week 20) evaluates structural organs and fetal growth;
            {'\n'}
            • Fetal kicks and hiccups become perceptible.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Third trimester (Weeks 28 to 40+)
          </Text>
          <Text style={tipsDetailStyles.text}>
            • Rapid brain and respiratory development and substantial weight gain;
            {'\n'}
            • Fetus typically assumes a head-down (cephalic) presentation;
            {'\n'}
            • Maternal physical demands increase with backaches and pelvic pressure;
            {'\n'}
            • Preparing for delivery from 37 weeks onward (early term to full term).
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Estimated due date (EDD)
          </Text>
          <Text style={tipsDetailStyles.text}>
            Your due date is an estimate—only about 5% of babies arrive on their exact predicted day.
            {'\n\n'}
            Birth typically occurs within two weeks before or after the estimated date.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Gestational age guides timing of critical screenings and milestones. Keep up with prenatal appointments to monitor your baby's individual growth curve.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
