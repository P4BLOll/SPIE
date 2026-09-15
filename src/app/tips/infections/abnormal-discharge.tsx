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

export default function AbnormalDischargeScreen() {
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
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.title}>
            Abnormal Vaginal Discharge
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Learn how to recognize changes in vaginal discharge and when to consult a clinician.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is normal vaginal discharge?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Vaginal discharge is a natural physiological fluid produced by cervical and vaginal glands.
            {'\n\n'}
            It cleanses the reproductive tract, protects against harmful pathogens, and naturally shifts in volume, consistency, and color throughout the menstrual cycle.
            {'\n\n'}
            Normal discharge is typically clear, white, or off-white, and carries a mild or unnoticeable scent.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Signs of abnormal discharge
          </Text>
          <Text style={tipsDetailStyles.text}>
            Discharge may warrant clinical evaluation when accompanied by:
            {'\n\n'}
            • Persistent itching, redness, or burning around the vulva;
            {'\n'}
            • Foul, fishy, or sour odors;
            {'\n'}
            • Unusual colors such as grayish, greenish, or frothy yellow;
            {'\n'}
            • Thick, clumpy cottage-cheese-like consistency;
            {'\n'}
            • Pain or irritation during urination or sexual intercourse;
            {'\n'}
            • Pelvic aching or bleeding between menstrual cycles.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Common underlying conditions
          </Text>
          <Text style={tipsDetailStyles.text}>
            Several conditions can alter discharge characteristics:
            {'\n\n'}
            • Yeast Infection (Candidiasis): Thick, white, curdy discharge with severe itching;
            {'\n'}
            • Bacterial Vaginosis (BV): Thin, grayish-white discharge with a distinct fishy odor;
            {'\n'}
            • Trichomoniasis: Frothy, yellowish-green discharge with vulvar soreness and odor;
            {'\n'}
            • Chlamydia or Gonorrhea: Increased, cloudy discharge often accompanied by pelvic discomfort.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Avoid self-diagnosis and douches
          </Text>
          <Text style={tipsDetailStyles.text}>
            Because symptoms of yeast infections and bacterial vaginosis overlap significantly, self-treating with over-the-counter creams can delay healing.
            {'\n\n'}
            Never use internal vaginal douches, perfumes, or scented soaps. They strip protective lactobacilli bacteria and exacerbate infections.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            When to seek medical care?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Visit a healthcare professional if:
            {'\n\n'}
            • You have never experienced these symptoms before;
            {'\n'}
            • Discharge has a strong, persistent odor or strange color;
            {'\n'}
            • Accompanied by pelvic pain, fever, or painful urination;
            {'\n'}
            • Symptoms recur after treatment;
            {'\n'}
            • You are pregnant or suspect an STI exposure.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Vaginal discharge is a normal health indicator. A clinical examination or swab is the most reliable way to identify causes and receive targeted treatment.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
