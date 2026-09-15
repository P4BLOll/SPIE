import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Background } from '../../../components/Background';
import { Colors } from '../../../constants/Colors';
import { tipsDetailStyles } from '../../../styles/tips-detail.styles';

export default function FlowScreen() {
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
          <Ionicons name="water-outline" size={55} color="#F43F5E" />
          <Text style={tipsDetailStyles.title}>Menstrual Flow</Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand bleeding volume variations during your period.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>What is menstrual flow?</Text>
          <Text style={tipsDetailStyles.text}>
            Menstrual flow refers to the volume and intensity of blood and tissue expelled during menstruation.
            {'\n\n'}
            On average, a person loses between 30 to 80 milliliters of fluid throughout an entire period.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Light flow</Text>
          <Text style={tipsDetailStyles.text}>
            Characterized by minimal blood loss, often requiring only panty liners or regular pads changed less frequently.
            {'\n\n'}
            Common at the very start or end of a period, or when using hormonal contraception.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Moderate flow</Text>
          <Text style={tipsDetailStyles.text}>
            The typical flow level for most people on peak days, requiring pad or tampon changes every 3 to 4 hours.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Heavy flow</Text>
          <Text style={tipsDetailStyles.text}>
            Blood loss is substantial, requiring high-absorbency products changed frequently.
            {'\n\n'}
            Often seen during the first 1 to 2 days of menstruation.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Can flow fluctuate during the cycle?</Text>
          <Text style={tipsDetailStyles.text}>
            Yes. Flow usually starts light, peaks on days 1–2, and gradually tapers off until it stops completely.
            {'\n\n'}
            Stress, travel, diet, exercise, and hormonal changes can also cause month-to-month variations.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>When does flow warrant attention?</Text>
          <Text style={tipsDetailStyles.text}>
            Seek medical guidance if:
            {'\n\n'}
            • You soak through a pad or tampon every hour for two consecutive hours;
            {'\n'}
            • Your period lasts longer than 7 days;
            {'\n'}
            • You pass large clots frequently;
            {'\n'}
            • You experience dizziness, shortness of breath, or pale skin.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Tracking your flow</Text>
          <Text style={tipsDetailStyles.text}>
            Logging your daily flow intensity in SPIE helps you establish a baseline and identify changes that may be worth discussing with your doctor.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons name="information-circle-outline" size={25} color="#F59E0B" />
          <Text style={tipsDetailStyles.infoText}>
            Every body is unique. Paying attention to your individual pattern is the most reliable way to monitor your reproductive wellness.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
