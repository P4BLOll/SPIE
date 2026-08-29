import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { cycleColors } from '@/styles/calendar.styles';
import { indexStyles } from '@/styles/index.styles';

export default function Index() {

  const router = useRouter();

  return (
    <View style={indexStyles.container}>

      <Image
        source={require('@/assets/logo.png')}
        style={indexStyles.logo}
      />

      <Text style={indexStyles.subtitle}>
        Seja bem-vindo(a) ao SPIE
      </Text>

      <Text style={indexStyles.description}>
        Sua segurança começa aqui. Conecte sua pulseira e proteja quem mais importa.
      </Text>

      <TouchableOpacity
        activeOpacity={0.85}
        style={indexStyles.buttonWrapper}
        onPress={() => router.push('/(auth)/register')}
      >
        <View style={[indexStyles.button, { backgroundColor: cycleColors.rose }]}>
          <Ionicons name="person-add-outline" size={18} color="#FFFFFF" />
          <Text style={indexStyles.buttonText}>
            Criar conta
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        style={indexStyles.loginButton}
        onPress={() => router.push('/(auth)/login')}
      >
        <Text style={indexStyles.loginText}>
          Já tenho uma conta —{' '}
          <Text style={indexStyles.loginTextHighlight}>
            Entrar
          </Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
}