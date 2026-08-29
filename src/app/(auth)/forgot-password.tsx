import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Background } from '@/components/Background';
import { Colors } from '@/constants/Colors';
import { cycleColors } from '@/styles/calendar.styles';
import { loginStyles } from '@/styles/login.styles';
import { recoverPassword } from '@/modules/auth/services/authService';

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // ==========================================================
  // DISPARAR RECUPERAÇÃO DE SENHA
  // ==========================================================
  async function handleReset() {
    const emailLimpo = email.trim();

    if (!emailLimpo) {
      Alert.alert('Atenção', 'Digite seu endereço de e-mail.');
      return;
    }

    try {
      setLoading(true);

      // Envia o link de redefinição de senha via Firebase Auth
      await recoverPassword(emailLimpo);

      Alert.alert(
        'E-mail enviado!',
        `Enviamos um link para ${emailLimpo}. Verifique sua caixa de entrada ou pasta de spam para redefinir sua senha.`,
        [
          {
            text: 'Ir para Login',
            onPress: () => router.replace('/(auth)/login'),
          },
        ]
      );
    } catch (error: any) {
      console.log('Erro ao recuperar senha:', error);

      Alert.alert(
        'Erro na recuperação',
        error?.message || 'Não foi possível enviar o e-mail de recuperação.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Background>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: cycleColors.background,
        }}
        edges={['top', 'left', 'right']}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={loginStyles.inner}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

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
              style={[loginStyles.buttonWrapper, { backgroundColor: Colors.primary }]}
              disabled={loading}
              onPress={handleReset}
            >
              <View style={loginStyles.button}>
                {loading ? (
                  <ActivityIndicator color={Colors.white} />
                ) : (
                  <Text style={loginStyles.buttonText}>
                    Enviar link
                  </Text>
                )}
              </View>
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

        </ScrollView>
      </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
}