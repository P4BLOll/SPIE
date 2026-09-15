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

export default function SecretionScreen() {
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
            name="water-outline"
            size={55}
            color={Colors.primary}
          />
          <Text style={tipsDetailStyles.title}>
            Vaginal Fluid & Mucus
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand how healthy cervical mucus changes naturally across your menstrual cycle.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is vaginal secretion?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Vaginal secretion is a natural fluid produced to keep internal tissues lubricated, clean, and protected against harmful microbes.
            {'\n\n'}
            Under the influence of changing estrogen and progesterone levels, its color, stretchiness, and volume shift across each cycle.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Normal mucus variations
          </Text>
          <Text style={tipsDetailStyles.text}>
            Clear and stretchy (egg-white):
            {'\n'}
            Appears right around ovulation. Known as fertile mucus, it facilitates sperm mobility.
            {'\n\n'}
            White or creamy:
            {'\n'}
            Common in the early follicular phase or after ovulation during the luteal phase.
            {'\n\n'}
            Sticky or thick:
            {'\n'}
            Occurs right after your period ends and just before menstruation starts.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            When to seek advice?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Consult a healthcare provider if you notice:
            {'\n\n'}
            • Foul, fishy, or pungent odor;
            {'\n'}
            • Greenish, grayish, or clumpy texture;
            {'\n'}
            • Itching, redness, burning, or vulvar soreness;
            {'\n'}
            • Unexplained spotting or pelvic pain.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="bulb-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Tracking your cervical mucus daily helps you pinpoint your fertile window and recognize deviations from your normal pattern.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
