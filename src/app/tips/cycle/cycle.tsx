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
      title: 'Menstruação',
      text:
        'Ocorre quando o revestimento interno do útero é eliminado, causando o sangramento menstrual. Essa fase marca o início de um novo ciclo.'
    },

    {
      icon: 'leaf-outline',
      title: 'Fase folicular',
      text:
        'Após a menstruação, o corpo começa a preparar um novo óvulo. Durante essa fase, os hormônios estimulam o desenvolvimento dos folículos nos ovários.'
    },

    {
      icon: 'sunny-outline',
      title: 'Ovulação',
      text:
        'É o momento em que o ovário libera um óvulo. Algumas pessoas percebem mudanças na secreção vaginal, temperatura corporal ou sensibilidade nos seios.'
    },

    {
      icon: 'moon-outline',
      title: 'Fase lútea',
      text:
        'Após a ovulação, o corpo se prepara para uma possível gravidez. Podem surgir sintomas como TPM, cólicas, inchaço e alterações de humor.'
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
            Entenda seu ciclo
          </Text>

          <Text style={cycleStyles.subtitle}>
            O ciclo menstrual possui diferentes fases
            e cada uma pode trazer mudanças no corpo.
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