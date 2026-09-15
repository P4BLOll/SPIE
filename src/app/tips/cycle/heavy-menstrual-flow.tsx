import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Background } from '../../../components/Background';
import { Colors } from '../../../constants/Colors';
import { tipsDetailStyles } from '../../../styles/tips-detail.styles';

export default function HeavyMenstrualFlowScreen() {
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
          <Ionicons name="trending-up-outline" size={55} color="#EF4444" />
          <Text style={tipsDetailStyles.title}>Heavy Menstrual Flow</Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand when bleeding is considered abnormally heavy and when to seek care.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>What is heavy menstrual flow?</Text>
          <Text style={tipsDetailStyles.text}>
            Clinically known as menorrhagia, heavy menstrual bleeding involves blood loss exceeding 80 ml per cycle or bleeding that interferes with daily living.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>How to identify it?</Text>
          <Text style={tipsDetailStyles.text}>
            Common signs include:
            {'\n\n'}
            • Soaking through one or more pads or tampons every hour for multiple hours;
            {'\n'}
            • Needing double protection (e.g., tampon plus pad);
            {'\n'}
            • Waking up during the night to change protection;
            {'\n'}
            • Bleeding for more than 7 days continuously.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Menstrual clots</Text>
          <Text style={tipsDetailStyles.text}>
            Passing blood clots larger than a coin (2.5 cm) frequently during your period is a strong indicator of heavy bleeding.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Potential causes</Text>
          <Text style={tipsDetailStyles.text}>
            Heavy bleeding may be caused by:
            {'\n\n'}
            • Hormonal imbalances (anovulation, thyroid disorders);
            {'\n'}
            • Uterine fibroids or polyps;
            {'\n'}
            • Adenomyosis or endometriosis;
            {'\n'}
            • Copper IUD use;
            {'\n'}
            • Bleeding disorders or anticoagulant medications.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Can heavy bleeding cause anemia?</Text>
          <Text style={tipsDetailStyles.text}>
            Yes. Chronic heavy blood loss often depletes iron reserves, leading to iron-deficiency anemia with symptoms of chronic fatigue, dizziness, shortness of breath, and pale skin.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>How is it investigated?</Text>
          <Text style={tipsDetailStyles.text}>
            A gynecologist may evaluate your condition using pelvic ultrasound, complete blood counts, ferritin levels, and hormonal assays.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>When to seek medical advice?</Text>
          <Text style={tipsDetailStyles.text}>
            Schedule an appointment if heavy bleeding occurs across multiple consecutive cycles or causes profound fatigue.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>When to seek emergency care?</Text>
          <Text style={tipsDetailStyles.text}>
            Seek emergency medical care immediately if you soak two or more pads per hour for more than two hours, experience fainting, extreme dizziness, or chest tightness.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons name="information-circle-outline" size={25} color="#F59E0B" />
          <Text style={tipsDetailStyles.infoText}>
            Heavy periods should not be normalized as just 'part of being a woman.' Safe, effective medical treatments are available to restore your health and comfort.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
