import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Background } from '@/components/Background';
import { Colors } from '@/constants/Colors';
import { loginUser } from '@/services/authService';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const router = useRouter();
  
  // Estados para armazenar o que o usuário digita
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    // Validação básica para o TypeScript e para a UX
    if (!email || !password) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      // Chama a função do Firebase que criamos no authService
      await loginUser({ email, password });
      
      // Se der certo, navega para a Home (substituindo a rota para ele não voltar ao login no botão 'voltar')
      router.replace('/(tabs)/home'); 
    } catch (error: any) {
      Alert.alert('Erro ao entrar', 'E-mail ou senha incorretos.');
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Background style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.inner}
      >
        <View style={styles.header}>
          <Text style={styles.title}>SPIE</Text>
          <Text style={styles.subtitle}>Conecte-se ao seu sistema de segurança</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput 
            style={styles.input} 
            placeholder="seuemail@exemplo.com" 
            placeholderTextColor={Colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput 
            style={styles.input} 
            placeholder="••••••••" 
            placeholderTextColor={Colors.textMuted}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={setPassword}
          />

          {/* Botão de Entrar com o gradiente premium da identidade visual */}
          <TouchableOpacity onPress={handleLogin} activeOpacity={0.8} style={styles.buttonWrapper} disabled={loading}>
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              {loading ? (
                <ActivityIndicator color={Colors.text} />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Link para quem não tem conta */}
        <TouchableOpacity onPress={() => router.push('/register')} style={styles.footerLink}>
          <Text style={styles.footerText}>
            Não tem uma conta? <Text style={styles.footerTextAccent}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
  form: {
    backgroundColor: Colors.surface,
    padding: 24,
    borderRadius: 16,
    borderWidth: 0, // Design premium sem bordas pesadas
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingHorizontal: 16,
    color: Colors.text,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  buttonWrapper: {
    marginTop: 32,
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  footerLink: {
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  footerTextAccent: {
    color: Colors.accent,
    fontWeight: '600',
  },
});