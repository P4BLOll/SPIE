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

export default function IntimateCareDailyScreen() {
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
            name="heart-outline"
            size={55}
            color="#F43F5E"
          />
          <Text style={tipsDetailStyles.title}>
            Daily Intimate Care
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Simple, healthy habits to maintain natural vulvar balance and daily comfort.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Wash external areas only (the vulva)
          </Text>
          <Text style={tipsDetailStyles.text}>
            Intimate hygiene should focus exclusively on the external genital area (the vulva, labia, and clitoral hood).
            {'\n\n'}
            The internal vagina is a self-cleaning organ maintained by protective lactobacilli bacteria. It never requires internal washing.
            {'\n\n'}
            Gently cleanse the vulva with warm water and mild, unscented cleanser, without rough scrubbing.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Avoid douching completely
          </Text>
          <Text style={tipsDetailStyles.text}>
            Vaginal douches wash away protective bacteria, disrupt natural acidic pH, and push infections further up into the uterus and fallopian tubes.
            {'\n\n'}
            Medical guidelines unanimously recommend avoiding douches and internal washes.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Steer clear of scented products
          </Text>
          <Text style={tipsDetailStyles.text}>
            Fragrances, intimate sprays, scented wipes, and bubble baths contain allergens that can trigger chemical irritation, contact dermatitis, and yeast overgrowth.
            {'\n\n'}
            Opt for fragrance-free, hypoallergenic products designed for sensitive skin.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Wipe from front to back
          </Text>
          <Text style={tipsDetailStyles.text}>
            Always wipe from front to back after using the toilet.
            {'\n\n'}
            This simple technique prevents bacteria from the anal area from spreading to the urethra and vagina, lowering the risk of urinary tract and vaginal infections.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Post-workout and swimwear habits
          </Text>
          <Text style={tipsDetailStyles.text}>
            Change out of damp workout clothes and wet swimsuits promptly.
            {'\n\n'}
            Prolonged warmth and moisture create the ideal breeding ground for yeast and bacterial proliferation.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Less is more when it comes to intimate care. Warm water, gentle cleansing, and breathable fabrics protect your body's natural microbiome.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
