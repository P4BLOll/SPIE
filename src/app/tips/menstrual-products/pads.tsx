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

export default function PadsScreen() {
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
            name="layers-outline"
            size={55}
            color="#EC4899"
          />
          <Text style={tipsDetailStyles.title}>
            Sanitary Pads
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Learn about different types of pads, absorption levels, and essential hygiene practices.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What are sanitary pads?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Sanitary pads (external pads) are absorbent products worn in underwear to absorb menstrual blood as it leaves the body.
            {'\n\n'}
            They feature an adhesive backing to secure them to fabric and require no internal insertion, making them widely accessible and easy to use.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Types of pads
          </Text>
          <Text style={tipsDetailStyles.text}>
            Common options include:
            {'\n\n'}
            • Regular flow pads;
            {'\n'}
            • Super / heavy flow pads;
            {'\n'}
            • Overnight pads (longer with wider back protection);
            {'\n'}
            • Pads with side wings to prevent side leakage;
            {'\n'}
            • Ultra-thin or thick maxi options;
            {'\n'}
            • Reusable cloth pads.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            When to change?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Change your pad every 3 to 6 hours, or sooner if your flow is heavy or the pad feels damp.
            {'\n\n'}
            Regular changing prevents bacterial growth, skin chafing, and unpleasant odors.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Hygiene and skin care
          </Text>
          <Text style={tipsDetailStyles.text}>
            Wash your hands before and after changing.
            {'\n\n'}
            Opt for unscented, breathable pads if you are prone to vulvar irritation or contact dermatitis.
            {'\n\n'}
            Clean the vulva with warm water only—avoid internal douches or heavily fragranced feminine washes.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Reusable cloth pads
          </Text>
          <Text style={tipsDetailStyles.text}>
            Reusable cloth pads are made from washable cotton, bamboo, or microfiber fabrics.
            {'\n\n'}
            They snap around underwear, reduce environmental waste, and are washed and air-dried between cycles following manufacturer instructions.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Choose the pad length and absorbency matching your daily flow, and change frequently to maintain fresh and comfortable vulvar skin.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
