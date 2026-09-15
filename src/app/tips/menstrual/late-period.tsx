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

export default function LatePeriodScreen() {
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
            Late Period
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Explore potential causes of delayed menstruation and when to seek medical advice.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What does a late period mean?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Menstruation does not always arrive on the exact same day each cycle.
            {'\n\n'}
            Slight variations of a few days are normal and do not automatically indicate a problem.
            {'\n\n'}
            However, when a delay extends beyond your regular pattern or recurs frequently, looking into potential triggers is recommended.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Pregnancy
          </Text>
          <Text style={tipsDetailStyles.text}>
            For sexually active individuals, pregnancy is one of the most common causes of a delayed or missed period.
            {'\n\n'}
            A home urine pregnancy test or clinical blood hCG test can clarify your status.
            {'\n\n'}
            Testing is most accurate from the first day of your expected missed period onwards.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Stress and lifestyle shifts
          </Text>
          <Text style={tipsDetailStyles.text}>
            Intense stress, sudden routine changes, travel, and sleep deprivation can temporarily suppress the hormonal signals that trigger ovulation.
            {'\n\n'}
            Because menstruation occurs about two weeks after ovulation, delayed ovulation will naturally push back your period.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Hormonal fluctuations
          </Text>
          <Text style={tipsDetailStyles.text}>
            Several hormonal imbalances can lead to delayed cycles:
            {'\n\n'}
            • Polycystic Ovary Syndrome (PCOS);
            {'\n'}
            • Thyroid disorders (hypo- or hyperthyroidism);
            {'\n'}
            • Elevated prolactin levels;
            {'\n'}
            • Recent contraceptive discontinuation.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Exercise and weight changes
          </Text>
          <Text style={tipsDetailStyles.text}>
            Significant weight loss or gain can disrupt endocrine signaling.
            {'\n\n'}
            Intense endurance training with low energy availability can trigger hypothalamic amenorrhea, delaying or halting cycles.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            When to seek medical evaluation?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Reach out to a healthcare provider if:
            {'\n\n'}
            • Delays happen regularly cycle after cycle;
            {'\n'}
            • Your period is more than 7–10 days late and pregnancy tests are negative;
            {'\n'}
            • Accompanied by severe pelvic pain, fever, or unusual discharge;
            {'\n'}
            • You suspect pregnancy and need clinical confirmation.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            A delayed period has many potential causes. Take a pregnancy test if relevant, and consult a doctor if delays become frequent.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
