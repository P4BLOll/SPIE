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
      title: 'O que é SOP?',
      text:
        'A Síndrome dos Ovários Policísticos (SOP) é uma condição hormonal que pode afetar a ovulação, os ciclos menstruais e outros aspectos do funcionamento do organismo.'
    },

    {
      icon: 'calendar-outline',
      title: 'Ciclos irregulares',
      text:
        'Algumas pessoas com SOP podem apresentar ciclos mais longos, atrasos menstruais ou períodos em que a ovulação não acontece regularmente.'
    },

    {
      icon: 'body-outline',
      title: 'Possíveis sinais',
      text:
        'Os sinais podem incluir acne, aumento de pelos, pele mais oleosa, alterações no peso e mudanças no padrão menstrual.'
    },

    {
      icon: 'water-outline',
      title: 'Alterações no ciclo',
      text:
        'A SOP pode influenciar a frequência da menstruação e a previsão da ovulação, tornando importante acompanhar os padrões do próprio corpo.'
    },

    {
      icon: 'medical-outline',
      title: 'Diagnóstico e acompanhamento',
      text:
        'O diagnóstico deve ser realizado por um profissional de saúde considerando sintomas, histórico e exames quando necessário.'
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
            Síndrome dos Ovários Policísticos
          </Text>

          <Text style={pcosStyles.subtitle}>
            Entenda a SOP, seus possíveis sinais
            e a importância do acompanhamento.
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
            Ter alguns desses sinais não significa
            necessariamente ter SOP.

            Somente uma avaliação profissional pode
            confirmar o diagnóstico.
          </Text>
        </View>

        <View style={pcosStyles.warningCard}>
          <Ionicons
            name="heart-outline"
            size={28}
            color={Colors.primary}
          />

          <Text style={pcosStyles.warningText}>
            Registrar sintomas e alterações do ciclo no SPIE
            pode ajudar você a observar padrões importantes
            para conversar com um profissional de saúde.
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}