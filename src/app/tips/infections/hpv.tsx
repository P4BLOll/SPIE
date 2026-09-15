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

export default function HPVScreen() {
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
            color="#8B5CF6"
          />
          <Text style={tipsDetailStyles.title}>
            HPV (Human Papillomavirus)
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand HPV transmission, cervical cancer screening, and vaccination protection.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is HPV?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Human Papillomavirus (HPV) is the most common sexually transmitted viral infection worldwide, encompassing over 100 strains.
            {'\n\n'}
            Nearly all sexually active individuals will contract at least one HPV strain at some point in their lives, though the vast majority clear the virus naturally within 1 to 2 years without health issues.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Low-risk vs. High-risk strains
          </Text>
          <Text style={tipsDetailStyles.text}>
            • Low-risk strains (such as HPV 6 and 11): Can cause benign genital warts (condylomas) that appear as flesh-colored, raised cauliflower-like bumps.
            {'\n\n'}
            • High-risk strains (notably HPV 16 and 18): Can cause cellular changes (dysplasia) in the cervix, vagina, vulva, anus, or throat that may slowly progress to cancer over decades if left unmonitored.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            The HPV vaccine
          </Text>
          <Text style={tipsDetailStyles.text}>
            The HPV vaccine (such as Gardasil 9) is exceptionally safe and protects against the 9 strains responsible for the majority of cervical cancers and genital warts.
            {'\n\n'}
            It is recommended for adolescents and young adults up to age 26, and can be given up to age 45 based on clinical discussion.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Screening and Pap smears
          </Text>
          <Text style={tipsDetailStyles.text}>
            Routine cervical cancer screening (Pap smear and HPV co-testing) identifies precancerous cell changes years before they turn into cancer.
            {'\n\n'}
            Early detection allows clinicians to remove abnormal cells with minor procedures, completely preventing cancer development.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            HPV is preventable. Keep up to date with your HPV vaccination and routine Pap tests to maintain lifelong cervical health.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
