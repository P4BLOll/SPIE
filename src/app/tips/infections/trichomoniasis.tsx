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

export default function TrichomoniasisScreen() {
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
            color="#F97316"
          />
          <Text style={tipsDetailStyles.title}>
            Trichomoniasis
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand this curable parasitic STI, typical symptoms, diagnosis, and treatment.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is trichomoniasis?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Trichomoniasis ("trich") is a common sexually transmitted infection caused by a microscopic single-celled protozoan parasite called Trichomonas vaginalis.
            {'\n\n'}
            It infects the vagina, urethra, and cervix in women and the urethra in men.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Common symptoms
          </Text>
          <Text style={tipsDetailStyles.text}>
            About 70% of infected individuals have no symptoms. When present, symptoms include:
            {'\n\n'}
            • Copious, frothy, yellowish-green vaginal discharge;
            {'\n'}
            • Foul or musty vaginal odor;
            {'\n'}
            • Vulvar itching, redness, and burning;
            {'\n'}
            • Discomfort during urination or intercourse;
            {'\n'}
            • Petechiae on the cervix (often called "strawberry cervix" during examination).
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Medical treatment
          </Text>
          <Text style={tipsDetailStyles.text}>
            Trichomoniasis is readily treated and cured with oral antiparasitic antibiotics (such as metronidazole or tinidazole).
            {'\n\n'}
            Both partners must be treated at the same time to prevent reinfection ("ping-pong" transmission).
            {'\n\n'}
            Avoid all alcohol consumption while taking metronidazole and for 48 hours afterward to avoid severe nausea and reactions.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Trichomoniasis is fully curable with prescription medication. Ensure all sexual partners complete treatment simultaneously to avoid reinfection.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
