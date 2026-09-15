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

export default function MenstrualDiscScreen() {
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
            name="radio-button-off-outline"
            size={55}
            color="#8B5CF6"
          />
          <Text style={tipsDetailStyles.title}>
            Menstrual Disc
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand how it functions, insertion technique, and key care instructions.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is a menstrual disc?
          </Text>
          <Text style={tipsDetailStyles.text}>
            A menstrual disc is an internal period product designed to sit in the vaginal fornix right below the cervix to collect menstrual fluid.
            {'\n\n'}
            It has a shallow, flexible basin and an elastic rim. Discs come in both disposable single-use and reusable silicone models.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Disc vs. Menstrual Cup
          </Text>
          <Text style={tipsDetailStyles.text}>
            While both collect blood, they differ in shape and placement:
            {'\n\n'}
            • A menstrual cup is bell-shaped, sits in the vaginal canal, and stays in place via suction.
            {'\n\n'}
            • A disc sits higher up in the vaginal fornix and is tucked securely behind the pubic bone without needing suction.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            How to insert
          </Text>
          <Text style={tipsDetailStyles.text}>
            Wash your hands thoroughly. Pinch the flexible rim in the center to make the disc slender and narrow.
            {'\n\n'}
            Slide the disc horizontally back and slightly downward into the vaginal canal. Once inserted deep, push the front edge upward to tuck it behind your pubic bone.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            How to remove
          </Text>
          <Text style={tipsDetailStyles.text}>
            Wash your hands, sit over the toilet, and bear down gently.
            {'\n\n'}
            Hook your clean index finger under the front rim to untuck it from behind the pubic bone, then pull it out slowly and horizontally to avoid spilling.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Wear duration
          </Text>
          <Text style={tipsDetailStyles.text}>
            Discs can generally be worn for up to 12 hours depending on flow volume and manufacturer specifications.
            {'\n\n'}
            Never exceed the recommended wear time. Dispose of single-use models properly or clean reusable models with warm water and soap.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Important precautions
          </Text>
          <Text style={tipsDetailStyles.text}>
            • Always handle with clean hands;
            {'\n'}
            • Never reuse disposable discs;
            {'\n'}
            • Boil reusable models between periods according to instructions;
            {'\n'}
            • If you have an IUD, consult your healthcare provider before using internal products.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Tucking the rim behind the pubic bone is key to preventing leaks. Take time to get familiar with your anatomy for comfortable placement.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
