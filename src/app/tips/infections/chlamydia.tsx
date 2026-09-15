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

export default function ChlamydiaScreen() {
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
            color="#3B82F6"
          />
          <Text style={tipsDetailStyles.title}>
            Chlamydia
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand this prevalent STI, its silent nature, diagnosis, and treatment.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is chlamydia?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Chlamydia is one of the most common sexually transmitted infections, caused by the bacterium Chlamydia trachomatis.
            {'\n\n'}
            It infects the cervix, urethra, rectum, and throat through unprotected vaginal, anal, or oral sexual contact.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            The silent infection
          </Text>
          <Text style={tipsDetailStyles.text}>
            Up to 70–80% of infected women and 50% of men show no symptoms at all.
            {'\n\n'}
            Because it is often asymptomatic, people unknowingly transmit it to partners, and the infection can remain undetected for months or years without regular screening.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Potential symptoms
          </Text>
          <Text style={tipsDetailStyles.text}>
            When symptoms do occur, they may include:
            {'\n\n'}
            • Abnormal, yellowish vaginal discharge;
            {'\n'}
            • Burning or stinging sensation while urinating;
            {'\n'}
            • Bleeding between periods or after sexual intercourse;
            {'\n'}
            • Deep pelvic or lower abdominal pain;
            {'\n'}
            • Painful sexual intercourse (dyspareunia).
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Risks of untreated chlamydia
          </Text>
          <Text style={tipsDetailStyles.text}>
            Left untreated, chlamydial infection can spread upward into the uterus and fallopian tubes, causing Pelvic Inflammatory Disease (PID).
            {'\n\n'}
            PID can result in chronic pelvic pain, fallopian tube scarring, ectopic pregnancy risks, and tubal infertility.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Testing and treatment
          </Text>
          <Text style={tipsDetailStyles.text}>
            Diagnosis is simple, painless, and accurate using a urine test or vaginal/cervical swab (NAAT testing).
            {'\n\n'}
            Chlamydia is easily cured with specific prescription antibiotics (such as azithromycin or doxycycline).
            {'\n\n'}
            All recent sexual partners must be treated simultaneously, and sexual activity should be paused for 7 days post-treatment.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Because chlamydia is usually silent, annual screening is recommended for all sexually active individuals under 25 or anyone with new or multiple partners.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
