import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { cycleColors } from '@/styles/calendar.styles';

import { loginUser } from '../../services/authService';
import { loginStyles } from '../../styles/login.styles';
import { Background } from '../../components/Background';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos.'
      );
      return;
    }

    try {
      setLoading(true);

      await loginUser({
        email,
        password,
      });

      router.replace('/(tabs)/calendar');
    } catch (error: any) {
      Alert.alert(
        'Erro ao entrar',
        'E-mail ou senha incorretos.'
      );

      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Background>
      <View
        style={{
          flex: 1,
          backgroundColor: cycleColors.background,
        }}
      >
        <KeyboardAvoidingView
          style={loginStyles.inner}
          behavior={
            Platform.OS === 'ios'
              ? 'padding'
              : 'height'
          }
          keyboardVerticalOffset={0}
        >
          <Image
            source={require('@/assets/logo.png')}
            style={loginStyles.logo}
          />

          <View style={loginStyles.header}>
            <Text style={loginStyles.title}>
              Bem-vinda de volta
            </Text>

            <Text style={loginStyles.subtitle}>
              Entre na sua conta para continuar usando o SPIE.
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
                placeholderTextColor={
                  cycleColors.textMuted
                }
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <Text style={loginStyles.label}>
              Senha
            </Text>

            <View style={loginStyles.inputContainer}>
              <TextInput
                style={loginStyles.input}
                placeholder="Digite sua senha"
                placeholderTextColor={
                  cycleColors.textMuted
                }
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                onPress={() =>
                  setShowPassword(!showPassword)
                }
              >
                <Ionicons
                  name={
                    showPassword
                      ? 'eye-off-outline'
                      : 'eye-outline'
                  }
                  size={23}
                  color={cycleColors.textMuted}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={loginStyles.forgotPassword}
              onPress={() =>
                router.push(
                  '/(auth)/forgot-password'
                )
              }
            >
              <Text style={loginStyles.forgotText}>
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              disabled={loading}
              style={loginStyles.buttonWrapper}
              onPress={handleLogin}
            >
              <LinearGradient
                colors={[
                  cycleColors.rose,
                  cycleColors.lavender,
                ]}
                start={{
                  x: 0,
                  y: 0,
                }}
                end={{
                  x: 1,
                  y: 0,
                }}
                style={loginStyles.button}
              >
                {loading ? (
                  <ActivityIndicator
                    color={cycleColors.white}
                  />
                ) : (
                  <Text style={loginStyles.buttonText}>
                    Entrar
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={loginStyles.footerLink}
            onPress={() =>
              router.push('/(auth)/register')
            }
          >
            <Text style={loginStyles.footerText}>
              Ainda não possui uma conta?{' '}

              <Text
                style={
                  loginStyles.footerTextAccent
                }
              >
                Criar conta
              </Text>
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </Background>
  );
}