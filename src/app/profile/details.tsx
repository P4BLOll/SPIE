import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import {router} from 'expo-router';
import {Background} from '@/components/Background';
import {Colors} from '@/constants/Colors';

export default function ProfileDetails() {

  return (

    <Background>
      <ScrollView
        contentContainerStyle={styles.container}
      >

        <TouchableOpacity
          style={styles.back}
          onPress={() => router.back()}
        >

          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.text}
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          Meus dados
        </Text>

        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={55}
            color="#fff"
          />
        </View>

        <View style={styles.card}>
          <Info
            icon="person-outline"
            title="Nome"
            value="Usuária"
          />

          <Info
            icon="mail-outline"
            title="Email"
            value="usuario@email.com"
          />

          <Info
            icon="calendar-outline"
            title="Nascimento"
            value="01/01/2000"
          />

          <Info
            icon="water-outline"
            title="Última menstruação"
            value="Não informado"
          />
        </View>
      </ScrollView>
    </Background>
  );
}


function Info({
  icon,
  title,
  value
}: any) {

  return (

    <View style={styles.row}>
      <Ionicons
        name={icon}
        size={22}
        color={Colors.primary}
      />

      <View>
        <Text style={styles.label}>
          {title}
        </Text>

        <Text style={styles.value}>
          {value}

        </Text>
      </View>
    </View>
  )
}


const styles = {

  container: {
    padding: 24,
  },

  back: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: 25
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 25,
    padding: 20
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 25
  },

  label: {
    color: Colors.textMuted,
    fontSize: 13
  },

  value: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '700'
  }
}