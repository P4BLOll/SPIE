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

export default function MenstrualCupScreen() {
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
            color="#A855F7"
          />
          <Text style={tipsDetailStyles.title}>
            Menstrual Cup
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Learn how it works, insertion and removal techniques, and essential hygiene practices.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is a menstrual cup?
          </Text>
          <Text style={tipsDetailStyles.text}>
            A menstrual cup is a reusable, flexible bell-shaped device typically made of medical-grade silicone, elastomer, or latex.
            {'\n\n'}
            It is inserted into the vagina during menstruation to collect, rather than absorb, menstrual fluid.
            {'\n\n'}
            Cups come in various sizes, firm levels, and capacities. Selecting the right one depends on pelvic anatomy, age, and childbirth history.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            How to insert
          </Text>
          <Text style={tipsDetailStyles.text}>
            Always wash your hands thoroughly with water and mild soap before handling.
            {'\n\n'}
            Fold the cup (common folds include the C-fold or punch-down fold) to make insertion compact.
            {'\n\n'}
            Gently guide the folded cup into the vagina. Once inside, release the fold so it pops open and forms a light suction seal against the vaginal walls.
            {'\n\n'}
            Never force insertion if you feel sharp pain.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            How to remove
          </Text>
          <Text style={tipsDetailStyles.text}>
            Wash your hands before removal.
            {'\n\n'}
            Never pull solely on the stem. Reach up to the base of the cup and gently pinch it to break the suction seal.
            {'\n\n'}
            Once the seal is released, gently wiggle the cup downward, keeping it upright to prevent spills, and empty it into the toilet.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Wear duration
          </Text>
          <Text style={tipsDetailStyles.text}>
            Menstrual cups can typically be worn for up to 8 to 12 hours depending on your flow and manufacturer instructions.
            {'\n\n'}
            On heavy flow days, you may need to empty and rinse it more frequently. Never exceed the recommended time limit.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Sanitization and care
          </Text>
          <Text style={tipsDetailStyles.text}>
            Between uses during your cycle, rinse the cup thoroughly with drinking water and fragrance-free, oil-free soap.
            {'\n\n'}
            At the end of your cycle, sterilize the cup by boiling it in water for 5 to 10 minutes according to manufacturer instructions, then store it in a breathable pouch.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Benefits
          </Text>
          <Text style={tipsDetailStyles.text}>
            • Reusable and durable for several years;
            {'\n'}
            • Eco-friendly, generating minimal waste;
            {'\n'}
            • Cost-effective over time;
            {'\n'}
            • Can be worn overnight safely when within recommended hours;
            {'\n'}
            • Preserves natural vaginal moisture balance.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            A learning curve is completely normal. It often takes 2–3 cycles to master insertion and removal. Always follow manufacturer safety guidelines.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
