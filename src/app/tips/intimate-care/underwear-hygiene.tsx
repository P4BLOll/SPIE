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

export default function UnderwearHygieneScreen() {
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
            color="#8B5CF6"
          />
          <Text style={tipsDetailStyles.title}>
            Underwear Hygiene & Fabric Choices
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            How selecting and caring for your underwear supports vaginal health and daily comfort.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Choose breathable natural fabrics
          </Text>
          <Text style={tipsDetailStyles.text}>
            Pure cotton and bamboo fibers are highly breathable and absorbent, allowing air circulation and wicking moisture away from delicate vulvar skin.
            {'\n\n'}
            Synthetic materials like nylon, polyester, and spandex trap heat and perspiration, creating a damp environment where yeast and bacteria thrive.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Change daily and after workouts
          </Text>
          <Text style={tipsDetailStyles.text}>
            Put on clean underwear at least once a day, and change immediately after vigorous exercise, sweating, or swimming.
            {'\n\n'}
            Sleeping without underwear or in loose cotton pajama bottoms allows the vulva to air out, reducing friction and moisture accumulation.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Laundering tips
          </Text>
          <Text style={tipsDetailStyles.text}>
            • Wash intimate apparel with hypoallergenic, fragrance-free detergents;
            {'\n'}
            • Avoid heavily scented fabric softeners or dryer sheets, which leave chemical residues on fibers;
            {'\n'}
            • Rinse thoroughly and ensure garments are 100% dry before storing to prevent mildew.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Breathable cotton underwear and gentle, fragrance-free laundering protect sensitive vulvar skin and prevent recurrent infections.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
