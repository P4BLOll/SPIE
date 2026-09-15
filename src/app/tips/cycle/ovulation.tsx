import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Background } from '../../../components/Background';
import { Colors } from '../../../constants/Colors';
import { tipsDetailStyles } from '../../../styles/tips-detail.styles';

export default function OvulationScreen() {
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
          <Ionicons name="egg-outline" size={55} color="#F59E0B" />
          <Text style={tipsDetailStyles.title}>Ovulation</Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand how this phase influences your fertility and cycle.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>What is ovulation?</Text>
          <Text style={tipsDetailStyles.text}>
            Ovulation is the release of a mature egg from an ovary into the fallopian tube, where it can be fertilized by sperm.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>When does it happen?</Text>
          <Text style={tipsDetailStyles.text}>
            In a typical 28-day cycle, ovulation usually occurs around day 14.
            {'\n\n'}
            However, cycle lengths vary, and ovulation generally takes place roughly 12 to 14 days before your next period begins.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Possible signs of ovulation</Text>
          <Text style={tipsDetailStyles.text}>
            You may notice:
            {'\n\n'}
            • Clear, stretchy, egg-white cervical mucus;
            {'\n'}
            • A slight rise in resting basal body temperature;
            {'\n'}
            • Mild one-sided lower abdominal twinges (mittelschmerz);
            {'\n'}
            • Increased libido and heightened senses.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>The fertile window</Text>
          <Text style={tipsDetailStyles.text}>
            Sperm can survive in fertile cervical mucus for up to 5 days, while an egg lives for 12 to 24 hours after release.
            {'\n\n'}
            Consequently, the fertile window spans the 5 days leading up to ovulation plus the day of ovulation itself.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Ovulation and calendar tracking</Text>
          <Text style={tipsDetailStyles.text}>
            Calendar estimations provide approximate guidelines based on historical cycle averages, but environmental factors can shift ovulation earlier or later.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons name="information-circle-outline" size={25} color="#F59E0B" />
          <Text style={tipsDetailStyles.infoText}>
            Recognizing ovulation patterns supports reproductive awareness, whether you are trying to conceive or learning to read your body's fertility signals.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
