import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { sendPasswordResetEmail } from 'firebase/auth';

import { Background } from '../../components/Background';
import { Colors } from '../../constants/Colors';
import { loginStyles } from '../../styles/login.styles';
import { auth } from '../../services/firebaseConfig';

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleReset() {
    if (!email) {
      Alert.alert(
        'Atenção',
        'Digite seu e-mail.'
      );
      return;
    }

    try {
      setLoading(true);

      await sendPasswordResetEmail(auth, email);

      Alert.alert(
        'E-mail enviado',
        'Enviamos um link para redefinir sua senha.',
        [
          {
            text: 'Voltar',
            onPress: () => router.replace('/(auth)/login'),
          },
        ]
      );
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível enviar o e-mail de recuperação.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Background>
      <View style={loginStyles.inner}>
        <Image
        source={require('@/assets/logo.png')}
        style={loginStyles.logo}
        />

        <View style={loginStyles.header}>
          <Text style={loginStyles.title}>
            Recuperar senha
          </Text>

          <Text style={loginStyles.subtitle}>
            Digite seu e-mail e enviaremos um link para criar uma nova senha.
          </Text>
        </View>

        <View style={loginStyles.form}>
          <Text style={loginStyles.label}>
            E-mail
          </Text>

          <View style={loginStyles.inputContainer}>
            <TextInput
              style={loginStyles.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor={Colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <TouchableOpacity
            style={loginStyles.buttonWrapper}
            disabled={loading}
            onPress={handleReset}
          >
            <LinearGradient
              colors={[
                Colors.primary,
                Colors.secondary,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={loginStyles.button}
            >
              {loading ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Text style={loginStyles.buttonText}>
                  Enviar link
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={loginStyles.footerLink}
            onPress={() => router.back()}
          >
            <Text style={loginStyles.footerText}>
              Lembrou sua senha?{' '}
              <Text style={loginStyles.footerTextAccent}>
                Entrar
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
}