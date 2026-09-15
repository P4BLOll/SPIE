import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Background } from '../../../components/Background';
import { Colors } from '../../../constants/Colors';
import { tipsDetailStyles } from '../../../styles/tips-detail.styles';

export default function CervicalMucusScreen() {
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
          <Ionicons name="water-outline" size={55} color="#14B8A6" />
          <Text style={tipsDetailStyles.title}>Cervical Mucus</Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand how mucus changes throughout the menstrual cycle.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>What is cervical mucus?</Text>
          <Text style={tipsDetailStyles.text}>
            Cervical mucus is a fluid produced by the cervix.
            {'\n\n'}
            It protects the vaginal canal, provides natural lubrication, and undergoes distinct changes across the menstrual cycle.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Right after menstruation</Text>
          <Text style={tipsDetailStyles.text}>
            In the days following your period, you may notice very little discharge or a sensation of dryness.
            {'\n\n'}
            This is a normal part of the cycle's natural rhythm.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Approaching ovulation</Text>
          <Text style={tipsDetailStyles.text}>
            As ovulation draws near, mucus becomes more abundant, clear, and stretchy.
            {'\n\n'}
            Often described as similar to raw egg whites, this texture creates an optimal environment for sperm survival and mobility.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>After ovulation</Text>
          <Text style={tipsDetailStyles.text}>
            Once ovulation passes, progesterone causes mucus to thicken, turn creamy or cloudy, and decrease in volume.
            {'\n\n'}
            These changes reflect healthy hormonal shifts during the luteal phase.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>What is considered normal?</Text>
          <Text style={tipsDetailStyles.text}>
            Mucus naturally varies in:
            {'\n\n'}
            • Volume;
            {'\n'}
            • Texture;
            {'\n'}
            • Color (from clear to creamy white);
            {'\n'}
            • Stretchiness.
            {'\n\n'}
            These shifts occur naturally and typically reflect healthy hormone fluctuations.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>When to seek medical advice?</Text>
          <Text style={tipsDetailStyles.text}>
            Consult a healthcare provider if you notice:
            {'\n\n'}
            • Persistent foul or fishy odor;
            {'\n'}
            • Unusual greenish, grayish, or clumpy texture;
            {'\n'}
            • Itching, burning, or redness;
            {'\n'}
            • Pain during intercourse or urination;
            {'\n'}
            • Changes that persist across multiple cycles.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons name="information-circle-outline" size={25} color="#F59E0B" />
          <Text style={tipsDetailStyles.infoText}>
            Observing cervical mucus helps you understand your fertility patterns, but should not be relied upon as your sole method of contraception or diagnosis.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
