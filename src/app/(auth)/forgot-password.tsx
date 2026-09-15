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

import { useDialog } from '@/context/DialogContext';

export default function ForgotPassword() {
  const router = useRouter();
  const { showAlert } = useDialog();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // ==========================================================
  // DISPARAR RECUPERAÇÃO DE SENHA
  // ==========================================================
  async function handleReset() {
    const emailLimpo = email.trim();

    if (!emailLimpo) {
      showAlert({
        title: 'Attention',
        message: 'Please enter your registered email address.',
        type: 'warning',
      });
      return;
    }

    try {
      setLoading(true);

      // Envia o link de redefinição de senha via Firebase Auth
      await recoverPassword(emailLimpo);

      showAlert({
        title: 'Email Sent!',
        message: `We sent password reset instructions to ${emailLimpo}. Please check your inbox and spam folder.`,
        type: 'success',
        buttonText: 'Go to Login',
        onDismiss: () => router.replace('/(auth)/login'),
      });
    } catch (error: any) {
      console.log('Erro ao recuperar senha:', error);

      let msg = 'Unable to send recovery email. Please verify the email address.';
      if (error?.code === 'auth/user-not-found') {
        msg = 'No registered account found with this email.';
      } else if (error?.code === 'auth/invalid-email') {
        msg = 'The entered email format is invalid.';
      }

      showAlert({
        title: 'Reset Error',
        message: msg,
        type: 'error',
      });
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
              Reset password
            </Text>

            <Text style={loginStyles.subtitle}>
              Enter your email and we'll send you a link to create a new password.
            </Text>
          </View>

          <View style={loginStyles.form}>
            <Text style={loginStyles.label}>
              Email
            </Text>

            <View style={loginStyles.inputContainer}>
              <TextInput
                style={loginStyles.input}
                placeholder="Enter your email"
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
                    Send link
                  </Text>
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={loginStyles.footerLink}
              onPress={() => router.back()}
            >
              <Text style={loginStyles.footerText}>
                Remember your password?{' '}
                <Text style={loginStyles.footerTextAccent}>
                  Log In
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