import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cycleColors } from '@/styles/calendar.styles';
import { loginUser } from '@/modules/auth/services/authService';
import { loginStyles } from '@/styles/login.styles';
import { Background } from '@/components/Background';
import { useDialog } from '@/context/DialogContext';

export default function LoginScreen() {
  const router = useRouter();
  const { showAlert } = useDialog();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      showAlert({
        title: 'Attention',
        message: 'Please enter your email and password to log in.',
        type: 'warning',
      });
      return;
    }

    try {
      setLoading(true);

      await loginUser({
        email: email.trim(),
        password: password.trim(),
      });

      router.replace('/(tabs)/calendar');
    } catch (error: any) {
      console.log('[Login Error]', error?.code, error?.message);
      let mensagem = 'Incorrect email or password. Please check your credentials and try again.';

      if (
        error?.code === 'auth/network-request-failed' ||
        error?.message?.includes('network')
      ) {
        mensagem = 'No internet connection. Please check your network and try again.';
      } else if (error?.code === 'auth/too-many-requests') {
        mensagem = 'Access temporarily blocked due to multiple consecutive attempts. Please try again later or reset your password.';
      } else if (error?.code === 'auth/user-disabled') {
        mensagem = 'This account has been disabled. Please contact support.';
      } else if (error?.code === 'auth/invalid-email') {
        mensagem = 'The entered email address is not in a valid format.';
      }

      showAlert({
        title: 'Unable to log in',
        message: mensagem,
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
              Welcome back
            </Text>

            <Text style={loginStyles.subtitle}>
              Sign in to your account to continue using SPIE.
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
              Password
            </Text>

            <View style={loginStyles.inputContainer}>
              <TextInput
                style={loginStyles.input}
                placeholder="Enter your password"
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
                Forgot your password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              disabled={loading}
              style={[loginStyles.buttonWrapper, { backgroundColor: cycleColors.rose }]}
              onPress={handleLogin}
            >
              <View style={loginStyles.button}>
                {loading ? (
                  <ActivityIndicator
                    color={cycleColors.white}
                  />
                ) : (
                  <Text style={loginStyles.buttonText}>
                    Log In
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={loginStyles.footerLink}
            onPress={() =>
              router.push('/(auth)/register')
            }
          >
            <Text style={loginStyles.footerText}>
              Don't have an account yet?{' '}

              <Text
                style={
                  loginStyles.footerTextAccent
                }
              >
                Sign up
              </Text>
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
}