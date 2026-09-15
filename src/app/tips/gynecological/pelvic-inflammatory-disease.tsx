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

export default function PelvicInflammatoryDiseaseScreen() {
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
            name="medkit-outline"
            size={55}
            color="#EF4444"
          />
          <Text style={tipsDetailStyles.title}>
            Pelvic Inflammatory Disease (PID)
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand PID, warning symptoms, health risks, and the critical importance of early antibiotic treatment.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What is PID?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Pelvic Inflammatory Disease (PID) is an infection of the upper female reproductive tract, including the uterus, fallopian tubes, and ovaries.
            {'\n\n'}
            It typically arises when sexually transmitted bacteria (most frequently chlamydia or gonorrhea) migrate upward from the vagina and cervix into the pelvic cavity.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Symptoms to watch for
          </Text>
          <Text style={tipsDetailStyles.text}>
            PID symptoms can range from subtle to acute and severe:
            {'\n\n'}
            • Persistent pain in the lower abdomen and pelvis;
            {'\n'}
            • Heavy, abnormal vaginal discharge with an unpleasant odor;
            {'\n'}
            • Bleeding between menstrual cycles or during/after intercourse;
            {'\n'}
            • Pain or burning during urination;
            {'\n'}
            • Painful intercourse (dyspareunia);
            {'\n'}
            • Fever and chills in more advanced cases.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Why immediate treatment is critical
          </Text>
          <Text style={tipsDetailStyles.text}>
            Delaying treatment can cause permanent damage to the reproductive organs:
            {'\n\n'}
            • Fallopian tube scarring, causing tubal factor infertility;
            {'\n'}
            • Dramatically increased risk of life-threatening ectopic pregnancy;
            {'\n'}
            • Chronic, debilitating pelvic pain lasting years;
            {'\n'}
            • Formation of painful pelvic or tubo-ovarian abscesses.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Treatment
          </Text>
          <Text style={tipsDetailStyles.text}>
            PID requires prompt broad-spectrum antibiotic treatment prescribed by a doctor, often combining oral and injectable medications to cover multiple bacterial types.
            {'\n\n'}
            All sexual partners must also be evaluated and treated to prevent reinfection.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Early treatment prevents scarring and protects your future fertility. Never ignore lower abdominal pain accompanied by fever or abnormal discharge.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
