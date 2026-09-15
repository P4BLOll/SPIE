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

export default function EndometriosisScreen() {
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
            name="medkit-outline"
            size={55}
            color="#EC4899"
          />
          <Text style={tipsDetailStyles.title}>
            Endometriosis
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand what endometriosis is, its symptoms, diagnostic paths, and treatment options.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is endometriosis?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Endometriosis is a chronic inflammatory disease where tissue similar to the lining of the uterus (endometrium) grows outside the uterine cavity.
            {'\n\n'}
            These implants most commonly develop on the ovaries, fallopian tubes, outer surface of the uterus, bowel, and pelvic lining (peritoneum).
            {'\n\n'}
            Like normal endometrium, this tissue bleeds each month, but with nowhere to exit, it causes chronic inflammation, scar tissue (adhesions), and pain.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Key symptoms
          </Text>
          <Text style={tipsDetailStyles.text}>
            Symptoms can vary widely in severity:
            {'\n\n'}
            • Severe, incapacitating menstrual cramps that disrupt daily living;
            {'\n'}
            • Chronic pelvic pain that persists throughout the month;
            {'\n'}
            • Deep pain during or after sexual intercourse (dyspareunia);
            {'\n'}
            • Painful bowel movements or painful urination, especially during menstruation;
            {'\n'}
            • Heavy periods or irregular spotting;
            {'\n'}
            • Digestive issues (bloating, diarrhea, nausea) during periods;
            {'\n'}
            • Infertility or subfertility.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Pain does not equal disease severity
          </Text>
          <Text style={tipsDetailStyles.text}>
            The amount of pain does not always correlate with the stage of endometriosis.
            {'\n\n'}
            Someone with mild, superficial implants may experience debilitating pain, while someone with extensive deep-infiltrating endometriosis might have very mild symptoms.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Diagnosis and care
          </Text>
          <Text style={tipsDetailStyles.text}>
            Diagnosis begins with a clinical history and specialized pelvic ultrasound or MRI performed by experienced endometriosis sonographers.
            {'\n\n'}
            Laparoscopic surgery remains the definitive method for direct visualization and histological confirmation.
            {'\n\n'}
            Treatments include anti-inflammatories, hormonal therapies (pills, progestins, GnRH modulators), and minimally invasive surgical excision of lesions.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Severe menstrual pain is never "just part of being a woman." If cramps force you to miss work, school, or activities, advocate for an endometriosis evaluation with a specialist.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
