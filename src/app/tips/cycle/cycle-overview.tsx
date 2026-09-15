
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

export default function CycleOverviewScreen() {

  return (

    <Background>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          tipsDetailStyles.container
        }
      >

        <TouchableOpacity
          style={tipsDetailStyles.backButton}
          onPress={() =>
            router.back()
          }
        >
          <Ionicons
            name="arrow-back"
            size={25}
            color={Colors.text}
          />
        </TouchableOpacity>

        <View style={tipsDetailStyles.header}>

          <Ionicons
            name="sync-outline"
            size={55}
            color="#7C4DFF"
          />

          <Text style={tipsDetailStyles.title}>
            The Complete Cycle
          </Text>

          <Text style={tipsDetailStyles.subtitle}>
            Understand how each phase of the menstrual cycle connects.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            What is the menstrual cycle?
          </Text>

          <Text style={tipsDetailStyles.text}>
            The menstrual cycle is a dynamic sequence of hormonal and physical changes that takes place in the body over time.

            {'\n\n'}

            These changes primarily involve the ovaries and uterus, preparing the body for potential pregnancy.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            1. Menstrual phase
          </Text>

          <Text style={tipsDetailStyles.text}>
            The period when menstrual bleeding occurs.

            {'\n\n'}

            The endometrium, which thickened during the previous cycle, sheds when pregnancy has not occurred.

            {'\n\n'}

            This phase marks day 1 and the start of a new cycle.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            2. Follicular phase
          </Text>

          <Text style={tipsDetailStyles.text}>
            During this phase, follicles inside the ovaries begin developing under the influence of FSH.

            {'\n\n'}

            One follicle typically becomes dominant and continues maturing until ovulation.

            {'\n\n'}

            Estrogen levels rise steadily throughout this process, boosting energy and rebuilding the uterine lining.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            3. Ovulation
          </Text>

          <Text style={tipsDetailStyles.text}>
            Ovulation occurs when a mature egg is released from an ovary.

            {'\n\n'}

            The exact day of ovulation varies between people and across cycles.

            {'\n\n'}

            This is the window of peak fertility, with the highest probability of pregnancy occurring from unprotected intercourse.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            4. Luteal phase
          </Text>

          <Text style={tipsDetailStyles.text}>
            After ovulation, the luteal phase begins.

            {'\n\n'}

            The corpus luteum secretes progesterone to maintain the uterine lining prepared for possible implantation.

            {'\n\n'}

            If conception does not occur, hormone levels drop, triggering menstruation and a new cycle.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            The cycle repeats
          </Text>

          <Text style={tipsDetailStyles.text}>
            After the luteal phase, absent pregnancy, the endometrial lining is shed, and bleeding begins anew.

            {'\n\n'}

            The cycle starts over and progresses through the four distinct phases in sequence.

            {'\n\n'}

            Every person experiences a unique cycle rhythm with natural variations in length and symptoms.
          </Text>

        </View>

        <View style={tipsDetailStyles.card}>

          <Text style={tipsDetailStyles.sectionTitle}>
            Cycles vary for everyone
          </Text>

          <Text style={tipsDetailStyles.text}>
            Cycle length can vary from person to person and even month to month for the same individual.

            {'\n\n'}

            It is completely natural for phases not to fall on the exact same calendar day every month.

            {'\n\n'}

            Observing your personal trends helps you better understand and support your body.
          </Text>

        </View>

        <View style={tipsDetailStyles.infoBox}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />

          <Text style={tipsDetailStyles.infoText}>
            The menstrual cycle is continuous and experiences natural fluctuations. Understanding these phases helps you navigate your wellness, but should not replace professional medical guidance or be used as sole contraception.
          </Text>

        </View>

      </ScrollView>
    </Background>
  );
}

