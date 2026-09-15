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

export default function BleedingScreen() {
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
            color="#E91E63"
          />
          <Text style={tipsDetailStyles.title}>
            Menstrual Blood Color
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand the normal shade variations of menstrual blood throughout your cycle.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Bright red
          </Text>
          <Text style={tipsDetailStyles.text}>
            Generally indicates fresh blood flowing rapidly from the uterus.
            {'\n\n'}
            It is most common during the heaviest days at the beginning of your period when the uterine lining is shedding rapidly.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Dark red
          </Text>
          <Text style={tipsDetailStyles.text}>
            Occurs when blood has taken longer to exit the uterus and has begun to oxidize.
            {'\n\n'}
            This tone variation is entirely normal, especially in the morning after lying down or midway through your flow.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Brown or dark brown
          </Text>
          <Text style={tipsDetailStyles.text}>
            Typically indicates older blood that had time to oxidize before exiting.
            {'\n\n'}
            It frequently appears at the very beginning or end of your period, when the flow is much slower.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Pinkish
          </Text>
          <Text style={tipsDetailStyles.text}>
            Can happen when menstrual blood mixes with cervical fluid or vaginal discharge, diluting the color.
            {'\n\n'}
            It is common during spotting, light flow, or early pregnancy implantation.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            When to seek guidance?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Seek medical advice if the blood color appears grayish or orange, is accompanied by a foul odor, causes itching or pelvic pain, or if bleeding occurs post-menopause.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Color variations throughout your period are completely normal and reflect blood flow velocity and oxidation levels.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
