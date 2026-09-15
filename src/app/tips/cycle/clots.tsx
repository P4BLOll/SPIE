import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Background } from '../../../components/Background';
import { Colors } from '../../../constants/Colors';
import { tipsDetailStyles } from '../../../styles/tips-detail.styles';

export default function ClotsScreen() {
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
          <Ionicons name="arrow-back" size={25} color={Colors.text} />
        </TouchableOpacity>

        <View style={tipsDetailStyles.header}>
          <Ionicons name="ellipse-outline" size={55} color="#EC4899" />
          <Text style={tipsDetailStyles.title}>Menstrual Clots</Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand why clots can form during menstrual bleeding.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>What are menstrual clots?</Text>
          <Text style={tipsDetailStyles.text}>
            Menstrual clots are gel-like clumps of blood, tissue, and proteins expelled during your period.
            {'\n\n'}
            They are a natural byproduct of the body shedding the uterine lining.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Why do they appear?</Text>
          <Text style={tipsDetailStyles.text}>
            During heavy flow days, blood builds up in the uterus faster than anti-clotting enzymes can break it down.
            {'\n\n'}
            As a result, coagulation proteins bind the blood into small clusters before it is expelled.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Small clots</Text>
          <Text style={tipsDetailStyles.text}>
            Small, dime-sized clots that appear on the heaviest flow days are common and usually benign.
            {'\n\n'}
            They typically range from bright crimson to dark maroon.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>When do clots warrant attention?</Text>
          <Text style={tipsDetailStyles.text}>
            Contact a doctor if you observe:
            {'\n\n'}
            • Clots larger than a quarter (2.5 cm);
            {'\n'}
            • Clots accompanied by severe, debilitating pain;
            {'\n'}
            • Clots appearing continuously throughout the entire period;
            {'\n'}
            • Need to change pads/tampons every hour for two or more consecutive hours.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Clots and heavy flow</Text>
          <Text style={tipsDetailStyles.text}>
            Frequent large clots combined with very heavy flow (menorrhagia) can cause fatigue, dizziness, and iron-deficiency anemia.
            {'\n\n'}
            Underlying conditions such as uterine fibroids, adenomyosis, or hormonal imbalances may be responsible.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>What to observe?</Text>
          <Text style={tipsDetailStyles.text}>
            Keep track of:
            {'\n\n'}
            • Size and frequency of the clots;
            {'\n'}
            • Which days of the cycle they appear;
            {'\n'}
            • Associated pain or unusual fatigue.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons name="information-circle-outline" size={25} color="#F59E0B" />
          <Text style={tipsDetailStyles.infoText}>
            Occasional small clots are common. However, persistent large clots or bleeding accompanied by weakness warrant medical evaluation.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
