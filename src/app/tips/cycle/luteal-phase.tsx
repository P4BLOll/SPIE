import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Background } from '../../../components/Background';
import { Colors } from '../../../constants/Colors';
import { tipsDetailStyles } from '../../../styles/tips-detail.styles';

export default function LutealPhaseScreen() {
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
          <Ionicons name="moon-outline" size={55} color="#8B5CF6" />
          <Text style={tipsDetailStyles.title}>Luteal Phase</Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand what happens in your body after ovulation.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>What is the luteal phase?</Text>
          <Text style={tipsDetailStyles.text}>
            The luteal phase spans the time between ovulation and the start of your next period.
            {'\n\n'}
            It typically lasts around 12 to 14 days and is governed by progesterone.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>What happens in the ovary?</Text>
          <Text style={tipsDetailStyles.text}>
            The ruptured follicle transforms into a temporary endocrine gland called the corpus luteum.
            {'\n\n'}
            The corpus luteum secretes high amounts of progesterone and moderate estrogen.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Preparing the uterus</Text>
          <Text style={tipsDetailStyles.text}>
            Progesterone stabilizes and enriches the endometrial lining with blood vessels and nutrients, creating an ideal environment for implantation.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Symptoms that may appear</Text>
          <Text style={tipsDetailStyles.text}>
            As progesterone levels rise, you might experience:
            {'\n\n'}
            • Slight increase in basal body temperature;
            {'\n'}
            • Breast tenderness or fullness;
            {'\n'}
            • Thicker, drier cervical mucus;
            {'\n'}
            • Changes in appetite, digestion, or sleep patterns.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Connection with PMS</Text>
          <Text style={tipsDetailStyles.text}>
            In the final days of this phase, hormone levels decline sharply if pregnancy has not occurred.
            {'\n\n'}
            This hormonal drop can trigger premenstrual syndrome (PMS) symptoms such as mood swings, irritability, and bloating.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>When menstruation starts</Text>
          <Text style={tipsDetailStyles.text}>
            When the corpus luteum breaks down and progesterone drops, the uterine lining sheds, initiating day 1 of your next period.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons name="information-circle-outline" size={25} color="#F59E0B" />
          <Text style={tipsDetailStyles.infoText}>
            A consistent luteal phase of 11 to 16 days indicates healthy ovulation and progesterone production. Tracking your symptoms helps you navigate this phase comfortably.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
