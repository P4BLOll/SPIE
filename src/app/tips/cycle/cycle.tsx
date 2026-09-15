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
import { cycleStyles } from '../../../styles/cycle.styles';

export default function CycleTipsScreen() {

  const fases = [

    {
      icon: 'water-outline',
      title: 'Menstruation',
      text:
        'Occurs when the inner lining of the uterus sheds, causing menstrual bleeding. This phase marks the start of a new cycle.'
    },

    {
      icon: 'leaf-outline',
      title: 'Follicular phase',
      text:
        'After menstruation, the body prepares a new egg. During this phase, hormones stimulate the development of follicles in the ovaries.'
    },

    {
      icon: 'sunny-outline',
      title: 'Ovulation',
      text:
        'The moment an ovary releases a mature egg. You may notice shifts in cervical mucus, basal body temperature, or breast sensitivity.'
    },

    {
      icon: 'moon-outline',
      title: 'Luteal phase',
      text:
        'After ovulation, the body prepares for potential pregnancy. Symptoms such as PMS, mild cramping, bloating, and mood fluctuations may arise.'
    },
  ];

  return (

    <Background>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          cycleStyles.container
        }
      >

        <TouchableOpacity
          style={cycleStyles.backButton}
          onPress={() => router.back()}
        >

          <Ionicons
            name="arrow-back"
            size={26}
            color={Colors.text}
          />
        </TouchableOpacity>

        <View style={cycleStyles.header}>
          <Ionicons
            name="calendar-outline"
            size={55}
            color={Colors.primary}
          />

          <Text style={cycleStyles.title}>
            Understand your cycle
          </Text>

          <Text style={cycleStyles.subtitle}>
            The menstrual cycle has distinct phases, each bringing natural changes to your body and energy.
          </Text>
        </View>

        {
          fases.map((fase, index) => (
            <View
              key={index}
              style={cycleStyles.card}
            >

              <View style={cycleStyles.iconBox}>
                <Ionicons
                  name={fase.icon as any}
                  size={28}
                  color={Colors.primary}
                />
              </View>

              <View style={cycleStyles.textArea}>
                <Text style={cycleStyles.cardTitle}>
                  {fase.title}
                </Text>
                <Text style={cycleStyles.cardText}>
                  {fase.text}
                </Text>
              </View>
            </View>


          ))
        }

        <View style={cycleStyles.alertCard}>
          <Ionicons
            name="heart-outline"
            size={28}
            color={Colors.primary}
          />

          <Text style={cycleStyles.alertText}>

            Cada pessoa possui um ciclo único.
            Registrar menstruação, sintomas e mudanças
            ajuda o SPIE a criar estimativas mais
            personalizadas.

          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}