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

export default function PregnancyWarningSignsScreen() {
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
            name="warning-outline"
            size={55}
            color="#EF4444"
          />
          <Text style={tipsDetailStyles.title}>
            Pregnancy Warning Signs
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Recognize symptoms during pregnancy that require immediate professional medical attention.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Vaginal bleeding
          </Text>
          <Text style={tipsDetailStyles.text}>
            Any vaginal bleeding during pregnancy should be reported to your obstetric provider.
            {'\n\n'}
            Heavy bleeding, bright red flow, passage of tissue or clots, especially accompanied by cramping, demands urgent clinical evaluation.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Severe abdominal or pelvic pain
          </Text>
          <Text style={tipsDetailStyles.text}>
            While mild round ligament stretches can occur, sharp, severe, persistent, or one-sided cramping requires urgent medical assessment to rule out ectopic pregnancy or placental complications.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Fluid leakage
          </Text>
          <Text style={tipsDetailStyles.text}>
            A sudden gush or steady trickle of clear or greenish fluid from the vagina can indicate premature rupture of membranes (water breaking).
            {'\n\n'}
            Seek immediate hospital evaluation if this occurs before term.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            High fever and chills
          </Text>
          <Text style={tipsDetailStyles.text}>
            A fever of 38°C (100.4°F) or higher during pregnancy may signal a systemic or uterine infection. Contact your healthcare team promptly rather than self-medicating.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Severe headaches and vision changes
          </Text>
          <Text style={tipsDetailStyles.text}>
            Pounding headaches that don't respond to acetaminophen, visual disturbances (flashing lights, blurriness, dark spots), and sudden swelling of face and hands are hallmarks of preeclampsia.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Decreased fetal movement
          </Text>
          <Text style={tipsDetailStyles.text}>
            Once regular fetal movements are established (usually after week 24–28), a noticeable reduction or absence of kicks is a red flag. Contact your labor and delivery unit immediately for fetal monitoring.
          </Text>
        </View>

        <View
          style={[
            tipsDetailStyles.infoBox,
            {
              backgroundColor: 'rgba(239,68,68,0.15)',
            },
          ]}
        >
          <Ionicons
            name="alert-circle-outline"
            size={25}
            color="#EF4444"
          />
          <Text style={tipsDetailStyles.infoText}>
            Never wait or hesitate if you experience warning symptoms during pregnancy. Seek immediate emergency obstetrical care or go directly to the nearest hospital.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
