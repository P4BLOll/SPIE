import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
        onPress={() => router.push('/register')}
      >
        <LinearGradient
          colors={[cycleColors.rose, cycleColors.lavender]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={indexStyles.button}
        >
          <Ionicons name="person-add-outline" size={18} color="#FFFFFF" />
          <Text style={indexStyles.buttonText}>
            Criar conta
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        style={indexStyles.loginButton}
        onPress={() => router.push('/login')}
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