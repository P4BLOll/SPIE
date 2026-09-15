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

export default function UterinePolypsScreen() {
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
            color="#14B8A6"
          />
          <Text style={tipsDetailStyles.title}>
            Uterine Polyps
          </Text>
          <Text style={tipsDetailStyles.subtitle}>
            Learn what endometrial polyps are, their symptoms, impact on fertility, and removal options.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            What are uterine polyps?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Uterine polyps (endometrial polyps) are soft, finger-like growths attached to the inner wall of the uterus that extend into the uterine cavity.
            {'\n\n'}
            They form due to overgrowth of cells in the lining of the uterus (endometrium).
            {'\n\n'}
            The vast majority are benign, although a small percentage may be precancerous or malignant, particularly in postmenopausal individuals.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Typical symptoms
          </Text>
          <Text style={tipsDetailStyles.text}>
            Many polyps cause no symptoms at all. When symptoms are present, they commonly include:
            {'\n\n'}
            • Irregular menstrual bleeding or spotting between periods;
            {'\n'}
            • Unusually heavy menstrual flows;
            {'\n'}
            • Bleeding or spotting after sexual intercourse;
            {'\n'}
            • Vaginal bleeding or spotting after menopause;
            {'\n'}
            • Infertility or recurrent pregnancy loss.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            Diagnosis and hysteroscopy
          </Text>
          <Text style={tipsDetailStyles.text}>
            Polyps are diagnosed using transvaginal ultrasound, saline infusion sonography (sonohysterography), or hysteroscopy.
            {'\n\n'}
            Hysteroscopy allows a doctor to insert a thin illuminated scope through the cervix into the uterus to directly visualize and remove (polypectomy) polyps during a minor outpatient procedure.
          </Text>
        </View>

        <View style={tipsDetailStyles.card}>
          <Text style={tipsDetailStyles.sectionTitle}>
            When to seek medical attention?
          </Text>
          <Text style={tipsDetailStyles.text}>
            Seek a gynecological evaluation if you notice bleeding between periods, heavier bleeding than usual, or any vaginal bleeding after menopause.
          </Text>
        </View>

        <View style={tipsDetailStyles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#F59E0B"
          />
          <Text style={tipsDetailStyles.infoText}>
            Any bleeding between cycles or after menopause warrants evaluation. Hysteroscopy provides both clear diagnosis and gentle removal of endometrial polyps.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}
