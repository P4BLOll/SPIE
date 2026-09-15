import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Background } from '../../../components/Background';
import { Colors } from '../../../constants/Colors';
import { tipsDetailStyles } from '../../../styles/tips-detail.styles';

export default function FollicularPhaseScreen() {
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
          <Ionicons name="leaf-outline" size={55} color="#10B981" />
          <Text style={tipsDetailStyles.title}>Follicular Phase</Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand what happens in your body before ovulation.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>What is the follicular phase?</Text>
          <Text style={tipsDetailStyles.text}>
            The follicular phase begins on day 1 of your period and continues until ovulation.
            {'\n\n'}
            During this window, your brain and ovaries coordinate to mature an egg for potential fertilization.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>What happens in the ovaries?</Text>
          <Text style={tipsDetailStyles.text}>
            Follicle-stimulating hormone (FSH) stimulates multiple ovarian follicles to develop.
            {'\n\n'}
            Eventually, one follicle becomes dominant, housing the egg that will be released during ovulation.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>What about hormones?</Text>
          <Text style={tipsDetailStyles.text}>
            Developing follicles produce estrogen, which steadily increases.
            {'\n\n'}
            Rising estrogen thickens the uterine lining (endometrium) to prepare a nourishing bed for a fertilized egg.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>What might you notice?</Text>
          <Text style={tipsDetailStyles.text}>
            As estrogen peaks:
            {'\n\n'}
            • Energy, motivation, and mental clarity often increase;
            {'\n'}
            • Skin looks clearer and more radiant;
            {'\n'}
            • Cervical mucus turns progressively wetter and more transparent.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Connection with ovulation</Text>
          <Text style={tipsDetailStyles.text}>
            When estrogen reaches its maximum threshold, the brain triggers a surge of luteinizing hormone (LH).
            {'\n\n'}
            This surge induces the dominant follicle to rupture, releasing the mature egg into the fallopian tube.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>Is the duration always the same?</Text>
          <Text style={tipsDetailStyles.text}>
            The follicular phase is the most variable part of the cycle.
            {'\n\n'}
            It typically lasts 10 to 18 days. Stress, illness, sleep, and nutrition can delay ovulation by extending this phase.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons name="information-circle-outline" size={25} color="#F59E0B" />
          <Text style={tipsDetailStyles.infoText}>
            Cycle lengths vary primarily because the follicular phase changes. Monitoring how you feel can help you plan your workouts, diet, and productivity.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
