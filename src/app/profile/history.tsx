import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Background } from '@/components/Background';
import { cycleColors } from '@/styles/calendar.styles';
import { historyStyles as styles } from '@/styles/history.styles';

export default function History() {

  return (
    <Background>
      <View style={styles.screen}>
        <View style={styles.container}>

          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={cycleColors.text}
            />
          </TouchableOpacity>

          <Text style={styles.eyebrow}>
            SEGURANÇA
          </Text>

          <Text style={styles.title}>
            Histórico de alertas
          </Text>

          <View style={styles.card}>
            <View style={styles.iconRing}>
              <Ionicons
                name="shield-checkmark"
                size={40}
                color={cycleColors.teal}
              />
            </View>

            <Text style={styles.text}>
              Nenhum alerta registrado
            </Text>

            <Text style={styles.sub}>
              Quando ocorrer uma emergência, ela aparecerá aqui.
            </Text>
          </View>

        </View>
      </View>
    </Background>
  );
}