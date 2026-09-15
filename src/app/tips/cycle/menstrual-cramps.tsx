import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Background } from '../../../components/Background';
import { Colors } from '../../../constants/Colors';
import { tipsDetailStyles } from '../../../styles/tips-detail.styles';

export default function MenstrualCrampsScreen() {
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
          <Ionicons name="flash-outline" size={55} color="#E11D48" />
          <Text style={tipsDetailStyles.title}>Menstrual Cramps</Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand why cramps happen, how to relieve discomfort, and when to seek care.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>What are menstrual cramps?</Text>
          <Text style={tipsDetailStyles.text}>
            Known medically as dysmenorrhea, menstrual cramps are throbbing or aching pains in the lower abdomen that occur before or during menstruation.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Why does the uterus contract?</Text>
          <Text style={tipsDetailStyles.text}>
            To shed its lining, the uterine muscle must contract.
            {'\n\n'}
            Hormone-like chemicals called prostaglandins trigger these contractions. Higher prostaglandin levels are associated with more intense cramps.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Accompanying symptoms</Text>
          <Text style={tipsDetailStyles.text}>
            Cramps are often accompanied by:
            {'\n\n'}
            • Lower back and inner thigh ache;
            {'\n'}
            • Mild nausea or loose stools;
            {'\n'}
            • Headaches and fatigue.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>What can help?</Text>
          <Text style={tipsDetailStyles.text}>
            Proven strategies include:
            {'\n\n'}
            • Applying a heating pad to the lower abdomen;
            {'\n'}
            • Gentle physical exercise and light yoga;
            {'\n'}
            • Staying hydrated and sipping chamomile or ginger tea;
            {'\n'}
            • Over-the-counter anti-inflammatory medications (NSAIDs), when approved by your doctor.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>When should cramps not be normalized?</Text>
          <Text style={tipsDetailStyles.text}>
            Pain that prevents you from working, studying, or carrying out daily routines, or that does not respond to common pain relievers, warrants thorough medical investigation.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Could cramps indicate an underlying condition?</Text>
          <Text style={tipsDetailStyles.text}>
            Severe or worsening cramps may be caused by secondary dysmenorrhea, linked to conditions like endometriosis, adenomyosis, pelvic inflammatory disease, or uterine fibroids.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>When to seek rapid care?</Text>
          <Text style={tipsDetailStyles.text}>
            Seek immediate medical attention if cramping is sudden and unbearable, accompanied by fever, vomiting, or abnormal, foul-smelling discharge.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons name="information-circle-outline" size={25} color="#F59E0B" />
          <Text style={tipsDetailStyles.infoText}>
            Severe pain is never something you simply have to endure. Consult a gynecologist to evaluate causes and discover effective pain management options.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
