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

export default function EarlyPregnancyScreen() {
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
            name="heart-outline"
            size={55}
            color="#EC4899"
          />
          <Text style={tipsDetailStyles.title}>
            Early Pregnancy
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Learn what to expect during the crucial first weeks of pregnancy.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What happens in the early weeks?
          </Text>
          <Text style={tipsDetailStyles.text}>
            The first weeks involve transformative biological changes.
            {'\n\n'}
            Following fertilization, the blastocyst travels to the uterus and implants into the endometrium.
            {'\n\n'}
            Surges in human chorionic gonadotropin (hCG), progesterone, and estrogen rapidly begin remodeling the maternal body to support embryo growth.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Common early symptoms
          </Text>
          <Text style={tipsDetailStyles.text}>
            While some feel no symptoms at all, others experience:
            {'\n\n'}
            • Missed menstrual period;
            {'\n'}
            • Nausea, with or without vomiting;
            {'\n'}
            • Deep exhaustion or fatigue;
            {'\n'}
            • Breast tenderness, swelling, or tingling;
            {'\n'}
            • Frequent urination;
            {'\n'}
            • Heightened smell sensitivity;
            {'\n'}
            • Mild pelvic cramping or light implantation spotting.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Folic acid supplementation
          </Text>
          <Text style={tipsDetailStyles.text}>
            Folic acid (vitamin B9) is vital during the first weeks of gestation.
            {'\n\n'}
            Daily supplementation helps prevent major birth defects of the fetal brain and spine (neural tube defects).
            {'\n\n'}
            Healthcare professionals typically recommend 400 to 800 mcg daily, ideally started prior to conception.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Medications and substances
          </Text>
          <Text style={tipsDetailStyles.text}>
            Many medications cross the placenta and may impact organ development.
            {'\n\n'}
            Review all prescription drugs, over-the-counter remedies, and herbal supplements with your physician as soon as you know you are pregnant.
            {'\n\n'}
            Strictly avoid alcohol, tobacco, and nicotine products.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Warning signs
          </Text>
          <Text style={tipsDetailStyles.text}>
            Seek immediate medical attention if you experience:
            {'\n\n'}
            • Moderate to heavy vaginal bleeding;
            {'\n'}
            • Sharp, severe one-sided abdominal or pelvic pain;
            {'\n'}
            • Dizziness, fainting, or shoulder tip pain (potential ectopic pregnancy signs);
            {'\n'}
            • High fever or persistent, uncontrollable vomiting (hyperemesis gravidarum).
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            The early weeks establish the foundation for a healthy pregnancy. Start prenatal care promptly and consult your doctor regarding essential supplements and routines.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
