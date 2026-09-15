import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Background } from '../../../components/Background';
import { Colors } from '../../../constants/Colors';
import { tipsDetailStyles } from '../../../styles/tips-detail.styles';

export default function MenstrualPhaseScreen() {
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
          <Ionicons name="arrow-back" size={25} color={Colors.text} />
        </TouchableOpacity>

        <View style={tipsDetailStyles.header}>
          <Ionicons name="water-outline" size={55} color="#E11D48" />
          <Text style={tipsDetailStyles.title}>Menstrual Phase</Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand what happens in your body during menstruation.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>What is the menstrual phase?</Text>
          <Text style={tipsDetailStyles.text}>
            The menstrual phase marks the beginning of each cycle, characterized by the shedding of blood and tissue through the vagina.
            {'\n\n'}
            Day 1 of full flow is considered day 1 of your menstrual cycle.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>What happens in the body?</Text>
          <Text style={tipsDetailStyles.text}>
            When pregnancy does not occur, estrogen and progesterone levels reach their lowest point.
            {'\n\n'}
            This drop signals the uterus to break down and eliminate the thickened endometrial lining.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Common symptoms</Text>
          <Text style={tipsDetailStyles.text}>
            Common experiences include:
            {'\n\n'}
            • Mild to moderate uterine cramps;
            {'\n'}
            • Fatigue and desire for rest;
            {'\n'}
            • Low back discomfort;
            {'\n'}
            • Light digestive changes.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>How long does it last?</Text>
          <Text style={tipsDetailStyles.text}>
            Bleeding typically lasts between 3 and 7 days.
            {'\n\n'}
            The heaviest flow is usually concentrated during the first 2 to 3 days, gradually tapering off.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Care during menstruation</Text>
          <Text style={tipsDetailStyles.text}>
            Support your body by:
            {'\n\n'}
            • Changing pads, tampons, or cups regularly to prevent irritation and infection;
            {'\n'}
            • Prioritizing restful sleep and light restorative movement;
            {'\n'}
            • Staying hydrated and eating iron- and magnesium-rich foods.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>When to seek help?</Text>
          <Text style={tipsDetailStyles.text}>
            Speak with a healthcare provider if bleeding lasts longer than 7 days, requires changing protection every hour, or causes severe, debilitating pain.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons name="information-circle-outline" size={25} color="#F59E0B" />
          <Text style={tipsDetailStyles.infoText}>
            Menstruation is a natural vital sign of reproductive health. Keeping track of your cycle dates and flow helps identify your personal baseline.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
