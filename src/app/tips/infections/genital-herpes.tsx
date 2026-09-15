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

export default function GenitalHerpesScreen() {
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
            color="#EC4899"
          />
          <Text style={tipsDetailStyles.title}>
            Genital Herpes
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand the herpes simplex virus, outbreak management, transmission, and prevention.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is genital herpes?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Genital herpes is a common viral sexually transmitted infection caused by Herpes Simplex Virus type 1 (HSV-1) or type 2 (HSV-2).
            {'\n\n'}
            After initial exposure, the virus resides in nearby nerve ganglia in a dormant state and can periodically reactivate.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Symptoms and outbreaks
          </Text>
          <Text style={tipsDetailStyles.text}>
            Many individuals experience mild or unrecognized symptoms. When an active outbreak occurs, signs typically include:
            {'\n\n'}
            • Tingling, itching, or shooting nerve sensations prior to lesion appearance (prodrome);
            {'\n'}
            • Small, painful blisters on the vulva, cervix, buttocks, or anus;
            {'\n'}
            • Blisters rupture into shallow, tender sores that crust and heal over 1 to 2 weeks;
            {'\n'}
            • Painful urination if urine touches active sores;
            {'\n'}
            • Flu-like symptoms (fever, swollen inguinal lymph nodes, body aches) during the initial outbreak.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            How is it transmitted?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Herpes spreads through direct skin-to-skin contact with infected secretions during vaginal, anal, or oral intercourse.
            {'\n\n'}
            HSV-1 (oral cold sores) can easily spread to the genitals via oral sex.
            {'\n\n'}
            Transmission can also occur via asymptomatic viral shedding when no visible blisters are present.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Management and treatment
          </Text>
          <Text style={tipsDetailStyles.text}>
            While there is no permanent cure that clears the virus, oral antiviral medications (acyclovir, valacyclovir) dramatically reduce outbreak severity, frequency, and viral shedding.
            {'\n\n'}
            Daily suppressive therapy is available for people with frequent recurrences.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Genital herpes is very manageable. Using barrier protection, avoiding intimacy during active outbreaks, and taking antivirals significantly protect partners.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
