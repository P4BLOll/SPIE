import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Background } from '../../../components/Background';
import { Colors } from '../../../constants/Colors';
import { tipsDetailStyles } from '../../../styles/tips-detail.styles';

export default function PmddScreen() {
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
          <Ionicons name="warning-outline" size={55} color="#8B5CF6" />
          <Text style={tipsDetailStyles.title}>PMDD</Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand Premenstrual Dysphoric Disorder, symptoms, and when to seek support.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>What is PMDD?</Text>
          <Text style={tipsDetailStyles.text}>
            Premenstrual Dysphoric Disorder (PMDD) is a severe, chronic medical condition where the brain reacts with heightened sensitivity to normal hormonal fluctuations during the luteal phase.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>PMDD vs. PMS</Text>
          <Text style={tipsDetailStyles.text}>
            While PMS involves mild to moderate physical and emotional symptoms, PMDD causes intense emotional distress and functional impairment that interferes with work, relationships, and daily life.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Emotional symptoms</Text>
          <Text style={tipsDetailStyles.text}>
            Key emotional symptoms include:
            {'\n\n'}
            • Intense irritability, anger, or interpersonal conflicts;
            {'\n'}
            • Severe mood swings, sudden sadness, or crying spells;
            {'\n'}
            • Overwhelming anxiety, tension, or panic;
            {'\n'}
            • Feelings of hopelessness or severe self-criticism.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Physical symptoms</Text>
          <Text style={tipsDetailStyles.text}>
            Physical symptoms may include extreme fatigue, brain fog, food cravings, insomnia, breast tenderness, and severe headaches.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Do symptoms occur all month long?</Text>
          <Text style={tipsDetailStyles.text}>
            No. Symptoms strictly emerge during the luteal phase (1–2 weeks before your period) and dissipate within a few days of full menstrual flow.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>How is PMDD diagnosed?</Text>
          <Text style={tipsDetailStyles.text}>
            Diagnosis requires prospectively tracking symptoms across at least two consecutive menstrual cycles to confirm their timing aligns with the luteal phase.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Treatment and care</Text>
          <Text style={tipsDetailStyles.text}>
            Effective medical approaches include lifestyle adjustments, cognitive behavioral therapy, selective serotonin reuptake inhibitors (SSRIs), and hormonal therapies prescribed by specialists.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>When to seek help?</Text>
          <Text style={tipsDetailStyles.text}>
            Seek immediate medical and psychiatric support if you experience persistent despair or thoughts of self-harm. PMDD is treatable, and compassionate help is available.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons name="information-circle-outline" size={25} color="#F59E0B" />
          <Text style={tipsDetailStyles.infoText}>
            PMDD is a genuine neurobiological condition, not a personality flaw or weakness. Seeking medical support is a vital step toward reclaiming your quality of life.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
