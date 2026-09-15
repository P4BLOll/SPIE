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

export default function PeriodUnderwearScreen() {
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
            name="shirt-outline"
            size={55}
            color="#EC4899"
          />
          <Text style={tipsDetailStyles.title}>
            Period Underwear
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Discover how leak-proof period underwear works, how to choose absorbencies, and washing instructions.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is period underwear?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Period underwear looks and feels like regular underwear but includes built-in layered fabric technology designed to absorb menstrual blood and prevent leaks.
            {'\n\n'}
            It can be worn as standalone period protection on light-to-medium days or as a backup with cups or tampons on heavy days.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            How does it work?
          </Text>
          <Text style={tipsDetailStyles.text}>
            The gusset features multiple technical fabric layers:
            {'\n\n'}
            • Moisture-wicking top layer: draws moisture away from the skin to keep you dry;
            {'\n'}
            • Super-absorbent core: locks fluid and minimizes odor;
            {'\n'}
            • Waterproof outer barrier: prevents fluid from leaking through to clothes.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            How to wash and care
          </Text>
          <Text style={tipsDetailStyles.text}>
            Proper washing extends product longevity:
            {'\n\n'}
            1. Rinse in cold water immediately after wearing until water runs clear;
            {'\n'}
            2. Machine wash on a gentle cold cycle with mild detergent;
            {'\n'}
            3. Do not use fabric softeners or bleach, as they coat the fibers and degrade absorbency;
            {'\n'}
            4. Hang dry thoroughly before storing.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Benefits
          </Text>
          <Text style={tipsDetailStyles.text}>
            • Completely reusable and sustainable;
            {'\n'}
            • Comfortable and non-intrusive without plastic pads;
            {'\n'}
            • Great for sleep, workouts, and unpredictable spotting;
            {'\n'}
            • Available in diverse styles, cuts, and absorbencies.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Period underwear provides reliable comfort and sustainability. Check absorbency ratings and always air dry to maintain the waterproof barrier.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
