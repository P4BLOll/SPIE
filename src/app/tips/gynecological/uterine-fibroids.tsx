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

export default function UterineFibroidsScreen() {
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
            color="#F97316"
          />
          <Text style={tipsDetailStyles.title}>
            Uterine Fibroids
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Understand what fibroids are, common symptoms, locations, and therapeutic approaches.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What are uterine fibroids?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Uterine fibroids (leiomyomas) are non-cancerous (benign) growths that develop in or on the muscular wall of the uterus.
            {'\n\n'}
            They are extremely common, affecting up to 70–80% of women by age 50, though many never know they have them because they cause no symptoms.
            {'\n\n'}
            Fibroids are not cancer and almost never become malignant.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Common symptoms
          </Text>
          <Text style={tipsDetailStyles.text}>
            When symptoms occur, they often include:
            {'\n\n'}
            • Heavy or prolonged menstrual bleeding, sometimes leading to anemia;
            {'\n'}
            • Pelvic pressure, fullness, or pain;
            {'\n'}
            • Frequent urination or difficulty emptying the bladder;
            {'\n'}
            • Constipation or rectal pressure;
            {'\n'}
            • Lower backaches or leg pains;
            {'\n'}
            • Pain during sexual intercourse.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Types based on location
          </Text>
          <Text style={tipsDetailStyles.text}>
            • Submucosal fibroids: Grow into the inner cavity of the uterus, commonly causing heavy bleeding and fertility difficulties.
            {'\n\n'}
            • Intramural fibroids: Grow within the muscular uterine wall, causing fullness and bleeding.
            {'\n\n'}
            • Subserosal fibroids: Project on the outer surface of the uterus, pressing against bladder or bowel.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Treatment options
          </Text>
          <Text style={tipsDetailStyles.text}>
            Treatment is tailored to symptoms, fibroid size, and fertility goals:
            {'\n\n'}
            • Watchful waiting for asymptomatic fibroids;
            {'\n'}
            • Medications (hormonal therapies, tranexamic acid, GnRH agonists);
            {'\n'}
            • Non-invasive procedures like Uterine Artery Embolization (UAE);
            {'\n'}
            • Surgical options (myomectomy to remove fibroids while keeping the uterus, or hysterectomy).
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Fibroids are benign and very common. If you have heavy bleeding or pelvic pressure, consult your gynecologist to review personalized treatment options.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
