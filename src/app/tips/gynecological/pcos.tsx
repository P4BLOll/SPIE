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
import { pcosStyles } from '../../../styles/pcos.styles';

export default function PcosScreen() {

  const informacoes = [

    {
      icon: 'information-circle-outline',
      title: 'What is PCOS?',
      text:
        'Polycystic Ovary Syndrome (PCOS) is a hormonal condition that can affect ovulation, menstrual cycles, and other aspects of bodily function.'
    },

    {
      icon: 'calendar-outline',
      title: 'Irregular cycles',
      text:
        'Some people with PCOS may experience longer cycles, delayed periods, or cycles where ovulation does not occur regularly.'
    },

    {
      icon: 'body-outline',
      title: 'Common signs',
      text:
        'Signs may include acne, excess facial/body hair, oilier skin, weight fluctuations, and changes in menstrual frequency.'
    },

    {
      icon: 'water-outline',
      title: 'Cycle variations',
      text:
        'PCOS can influence period predictability and ovulation timing, making it valuable to track your personal patterns.'
    },

    {
      icon: 'medical-outline',
      title: 'Diagnosis and care',
      text:
        'Diagnosis should be evaluated by a healthcare professional based on medical history, clinical symptoms, and lab tests.'
    },
  ];

  return (

    <Background>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          pcosStyles.container
        }
      >

        <TouchableOpacity
          style={pcosStyles.backButton}
          onPress={() => router.back()}
        >

          <Ionicons
            name="arrow-back"
            size={26}
            color={Colors.text}
          />
        </TouchableOpacity>

        <View style={pcosStyles.header}>
          <Ionicons
            name="medical-outline"
            size={55}
            color={Colors.primary}
          />

          <Text style={pcosStyles.title}>
            Polycystic Ovary Syndrome
          </Text>

          <Text style={pcosStyles.subtitle}>
            Learn about PCOS, common signs, and the importance of medical evaluation.
          </Text>
        </View>

        {
          informacoes.map((item, index) => (

            <View
              key={index}
              style={pcosStyles.card}
            >

              <View style={pcosStyles.iconBox}>
                <Ionicons
                  name={item.icon as any}
                  size={28}
                  color={Colors.primary}
                />
              </View>

              <View style={pcosStyles.content}>
                <Text style={pcosStyles.cardTitle}>
                  {item.title}
                </Text>
                <Text style={pcosStyles.cardText}>
                  {item.text}
                </Text>
              </View>
            </View>
          ))
        }

        <View style={pcosStyles.warningCard}>
          <Ionicons
            name="warning-outline"
            size={28}
            color="#E53935"
          />

          <Text style={pcosStyles.warningText}>
            Experiencing some of these signs does not necessarily mean you have PCOS.

            Only a comprehensive evaluation by a doctor can confirm a diagnosis.
          </Text>
        </View>

        <View style={pcosStyles.warningCard}>
          <Ionicons
            name="heart-outline"
            size={28}
            color={Colors.primary}
          />

          <Text style={pcosStyles.warningText}>
            Logging symptoms and cycle changes in SPIE helps you identify meaningful patterns to share with your healthcare provider.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}