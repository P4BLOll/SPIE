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

export default function TamponsScreen() {
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
            name="ellipse-outline"
            size={55}
            color="#EC4899"
          />
          <Text style={tipsDetailStyles.title}>
            Tampons
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand how tampons work, safe usage practices, and how to prevent Toxic Shock Syndrome (TSS).
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is a tampon?
          </Text>
          <Text style={tipsDetailStyles.text}>
            A tampon is an internal menstrual product made of compressed cotton or rayon designed to absorb menstrual fluid inside the vagina.
            {'\n\n'}
            They come in various absorbencies (regular, super, super plus). Always select the lowest absorbency necessary for your flow.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            How to insert and remove
          </Text>
          <Text style={tipsDetailStyles.text}>
            Always wash your hands before and after handling.
            {'\n\n'}
            Relax your pelvic muscles and insert the tampon angled slightly toward your lower back. The removal string should remain outside your body.
            {'\n\n'}
            When inserted correctly, a tampon should not be felt. If it feels painful or uncomfortable, it may not be inserted deep enough.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Changing frequency
          </Text>
          <Text style={tipsDetailStyles.text}>
            Change your tampon every 4 to 8 hours. Never leave a single tampon in place for longer than 8 hours.
            {'\n\n'}
            For overnight sleep exceeding 8 hours, external pads or period underwear are safer choices.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Toxic Shock Syndrome (TSS)
          </Text>
          <Text style={tipsDetailStyles.text}>
            Toxic Shock Syndrome is a rare but life-threatening bacterial condition associated with tampon use, especially high-absorbency tampons left in place too long.
            {'\n\n'}
            Warning signs include sudden high fever, vomiting, diarrhea, dizziness, fainting, or a sunburn-like rash. If these symptoms occur, remove the tampon immediately and seek emergency medical care.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Can a tampon get lost inside?
          </Text>
          <Text style={tipsDetailStyles.text}>
            No. The cervix at the top of the vagina only has a tiny opening through which an egg or sperm passes—it is physically impossible for a tampon to travel further into the body.
            {'\n\n'}
            If the string is hard to reach, relax your pelvic muscles, sit on the toilet, and gently sweep a clean finger inside to find the string or base.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Use the lowest absorbency for your flow and never exceed 8 hours of wear time. When sleeping longer periods, opt for external pads.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
