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

export default function GonorrheaScreen() {
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
            name="shield-outline"
            size={55}
            color="#EF4444"
          />
          <Text style={tipsDetailStyles.title}>
            Gonorrhea
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand gonorrhea symptoms, transmission routes, health risks, and antibiotic treatment.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is gonorrhea?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Gonorrhea is a sexually transmitted bacterial infection caused by Neisseria gonorrhoeae.
            {'\n\n'}
            It infects the warm, moist mucous membranes of the cervix, uterus, fallopian tubes, urethra, mouth, throat, and rectum.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Signs and symptoms
          </Text>
          <Text style={tipsDetailStyles.text}>
            Many women experience mild or no symptoms, frequently mistaking them for a bladder or vaginal infection. Symptoms may include:
            {'\n\n'}
            • Increased, cloudy, or greenish-yellow vaginal discharge;
            {'\n'}
            • Painful or burning sensation when urinating;
            {'\n'}
            • Bleeding between menstrual cycles or after intercourse;
            {'\n'}
            • Lower abdominal or pelvic pain;
            {'\n'}
            • Rectal itching, discharge, or soreness in rectal infections.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Potential complications
          </Text>
          <Text style={tipsDetailStyles.text}>
            If not treated early, gonorrhea can cause serious reproductive harm:
            {'\n\n'}
            • Pelvic Inflammatory Disease (PID) leading to chronic pelvic pain and fallopian tube blockages;
            {'\n'}
            • Increased risk of life-threatening ectopic pregnancy;
            {'\n'}
            • Infertility;
            {'\n'}
            • Disseminated Gonococcal Infection (DGI), spreading via the bloodstream to joints and skin.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Antibiotic treatment
          </Text>
          <Text style={tipsDetailStyles.text}>
            Gonorrhea is curable with appropriate prescription antibiotics (typically an intramuscular injection of ceftriaxone).
            {'\n\n'}
            Because antimicrobial resistance has increased worldwide, taking only specifically prescribed medical regimens is crucial.
            {'\n\n'}
            Sexual partners must also be evaluated and treated simultaneously.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Gonorrhea requires prompt clinical treatment to prevent permanent reproductive damage. Practice safer sex with condoms and get screened regularly.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
