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

export default function SpottingScreen() {
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
            color="#F43F5E"
          />
          <Text style={tipsDetailStyles.title}>
            Intermenstrual Bleeding (Spotting)
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand what causes light bleeding between menstrual periods.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is spotting?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Spotting refers to light vaginal bleeding or staining that occurs outside of your regular menstrual period.
            {'\n\n'}
            It typically appears as a few drops of blood or pinkish, brownish discharge that only requires a panty liner.
            {'\n\n'}
            While often harmless, the significance of spotting depends on your cycle phase and health history.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Common causes
          </Text>
          <Text style={tipsDetailStyles.text}>
            Possible reasons for spotting between periods include:
            {'\n\n'}
            • Mid-cycle ovulation bleeding;
            {'\n'}
            • Starting or adjusting hormonal contraceptives;
            {'\n'}
            • Missed or delayed contraceptive pills;
            {'\n'}
            • Emergency contraception use;
            {'\n'}
            • Early pregnancy implantation bleeding;
            {'\n'}
            • Cervical or vaginal irritation following sex or an exam;
            {'\n'}
            • Sexually transmitted infections (STIs);
            {'\n'}
            • Cervical or uterine polyps and fibroids.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Ovulation spotting
          </Text>
          <Text style={tipsDetailStyles.text}>
            Some individuals experience very light spotting around the midpoint of their cycle when an egg is released.
            {'\n\n'}
            This occurs due to a brief dip in estrogen levels right around ovulation and generally resolves in 1 to 2 days.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Contraceptive breakthrough bleeding
          </Text>
          <Text style={tipsDetailStyles.text}>
            Starting a new birth control pill, implant, or IUD commonly triggers breakthrough bleeding during the first 3 to 6 months of adaptation.
            {'\n\n'}
            Missing a pill or taking it late can also cause sudden spotting. Do not discontinue contraceptives without consulting your doctor.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            When to seek medical evaluation?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Consult a healthcare professional if:
            {'\n\n'}
            • Spotting occurs frequently or progressively increases;
            {'\n'}
            • Bleeding occurs consistently after sexual intercourse;
            {'\n'}
            • Accompanied by pelvic pain, foul-smelling discharge, or burning during urination;
            {'\n'}
            • There is a chance of pregnancy;
            {'\n'}
            • Any bleeding occurs after menopause.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Light occasional spotting can be benign, but recurring or unexplained bleeding between periods should always be evaluated by a healthcare professional.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
