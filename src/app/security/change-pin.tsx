import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cycleColors } from '@/styles/calendar.styles';
import { useSecurity } from '@/modules/security-vault/contexts/SecurityContext';
import { changePinStyles as styles } from '@/styles/changePin.styles';

export default function ChangePinScreen() {
  const {
    alterarSenha,
    redefinirPinComSenhaDaConta,
    isDefaultPin,
  } = useSecurity();

  // Estados dos campos
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [processando, setProcessando] = useState(false);

  // Modo: Esqueceu o PIN (valida com senha da conta)
  const [modoEsqueciPin, setModoEsqueciPin] = useState(false);
  const [senhaConta, setSenhaConta] = useState('');
  const [mostrarSenhaConta, setMostrarSenhaConta] = useState(false);

  async function handleSalvar() {
    // 1. Validações do Novo PIN
    if (novaSenha.length !== 4 || !/^\d{4}$/.test(novaSenha)) {
      Alert.alert('Invalid new PIN', 'The new PIN must be exactly 4 digits.');
      return;
    }

    if (confirmarSenha.length !== 4 || !/^\d{4}$/.test(confirmarSenha)) {
      Alert.alert('Invalid confirmation', 'Please re-enter the 4-digit new PIN.');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert('PINs do not match', 'The new PIN and confirmation must match.');
      return;
    }

    // 2. Fluxo com Senha da Conta (Esqueci o PIN)
    if (modoEsqueciPin) {
      if (!senhaConta.trim()) {
        Alert.alert('Account password required', 'Enter your account password to authorize reset.');
        return;
      }

      try {
        setProcessando(true);
        const resultado = await redefinirPinComSenhaDaConta(senhaConta, novaSenha);

        if (!resultado.sucesso) {
          Alert.alert('Validation failed', resultado.mensagem || 'Incorrect account password.');
          return;
        }

        setSenhaConta('');
        setNovaSenha('');
        setConfirmarSenha('');

        Alert.alert(
          'PIN reset!',
          'Your security PIN was updated successfully.',
          [
            {
              text: 'Done',
              onPress: () => router.back(),
            },
          ]
        );
      } catch (error) {
        console.warn('[ChangePinScreen] Erro ao redefinir PIN:', error);
        Alert.alert('Error', 'Unable to reset PIN at this time.');
      } finally {
        setProcessando(false);
      }
      return;
    }

    // 3. Fluxo Normal com PIN Atual
    if (senhaAtual.length !== 4 || !/^\d{4}$/.test(senhaAtual)) {
      Alert.alert('Invalid current PIN', 'Enter your current 4-digit PIN.');
      return;
    }

    if (senhaAtual === novaSenha) {
      Alert.alert('Same PIN', 'The new PIN must be different from the current PIN.');
      return;
    }

    try {
      setProcessando(true);
      const sucesso = await alterarSenha(senhaAtual, novaSenha);

      if (!sucesso) {
        Alert.alert(
          'Incorrect PIN',
          'The current PIN is incorrect. If you forgot your PIN, use the account password recovery option.'
        );
        setSenhaAtual('');
        return;
      }

      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');

      Alert.alert(
        'PIN updated',
        'Your PIN was updated successfully.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      console.warn('[ChangePinScreen] Erro ao alterar PIN:', error);
      Alert.alert('Error', 'Unable to update PIN.');
    } finally {
      setProcessando(false);
    }
  }

  function renderPinField(
    label: string,
    value: string,
    setValue: (value: string) => void,
    placeholder: string
  ) {
    return (
      <View style={styles.field}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.pinContainer}>
          <Ionicons name="key-outline" size={20} color={cycleColors.rose} />
          <TextInput
            style={styles.pinInput}
            value={value}
            onChangeText={(text) => setValue(text.replace(/\D/g, '').slice(0, 4))}
            placeholder={placeholder}
            placeholderTextColor={cycleColors.textMuted}
            keyboardType="number-pad"
            maxLength={4}
            secureTextEntry
            editable={!processando}
          />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
            disabled={processando}
          >
            <Ionicons name="chevron-back" size={22} color={cycleColors.text} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            {modoEsqueciPin ? 'Recover PIN' : 'Change PIN'}
          </Text>
        </View>

        {/* CONTEÚDO */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}
        >
          {/* ÍCONE */}
          <View style={[styles.iconRing, { backgroundColor: cycleColors.rose }]}>
            <Ionicons
              name={modoEsqueciPin ? 'shield-checkmark-outline' : 'lock-closed-outline'}
              size={36}
              color={cycleColors.white}
            />
          </View>

          {/* TÍTULO E SUBTÍTULO */}
          <Text style={styles.title}>
            {modoEsqueciPin ? 'Recover with your Account' : 'Update your PIN'}
          </Text>

          <Text style={styles.subtitle}>
            {modoEsqueciPin
              ? 'Confirm your account password to set a new emergency PIN.'
              : 'Change the PIN used to protect your emergency vault.'}
          </Text>

          {/* FORMULÁRIO */}
          <View style={styles.card}>
            {/* MODO ESQUECI O PIN: CAMPO DE SENHA DA CONTA */}
            {modoEsqueciPin ? (
              <>
                <View
                  style={{
                    backgroundColor: 'rgba(255, 92, 141, 0.12)',
                    borderRadius: 14,
                    padding: 12,
                    marginBottom: 16,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 92, 141, 0.25)',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <Ionicons name="shield-checkmark" size={18} color={cycleColors.rose} />
                  <Text style={{ fontSize: 12, color: '#E0E0E0', flex: 1, lineHeight: 16 }}>
                    Enter your SPIE account login password to authorize the reset.
                  </Text>
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>Your SPIE account password</Text>
                  <View style={styles.pinContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color={cycleColors.rose} />
                    <TextInput
                      style={[
                        styles.pinInput,
                        { flex: 1, textAlign: 'left', paddingHorizontal: 12 },
                      ]}
                      value={senhaConta}
                      onChangeText={setSenhaConta}
                      placeholder="Account password"
                      placeholderTextColor={cycleColors.textMuted}
                      secureTextEntry={!mostrarSenhaConta}
                      autoCapitalize="none"
                      editable={!processando}
                    />
                    <TouchableOpacity
                      onPress={() => setMostrarSenhaConta(!mostrarSenhaConta)}
                      style={{ padding: 6 }}
                    >
                      <Ionicons
                        name={mostrarSenhaConta ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color={cycleColors.textMuted}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setModoEsqueciPin(false);
                    setSenhaConta('');
                  }}
                  style={{ alignSelf: 'flex-start', marginTop: -6, marginBottom: 16, paddingHorizontal: 4 }}
                >
                  <Text style={{ fontSize: 13, color: cycleColors.gold, fontWeight: '700' }}>
                    ← Back to current PIN
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              /* MODO NORMAL: CAMPO DE PIN ATUAL */
              <>
                {renderPinField(
                  'Current PIN',
                  senhaAtual,
                  setSenhaAtual,
                  'Enter current PIN'
                )}

                {/* Dica da senha padrão apenas enquanto o usuário ainda não tiver alterado */}
                {isDefaultPin && (
                  <View style={{ marginTop: -8, marginBottom: 12, paddingHorizontal: 4 }}>
                    <Text style={{ fontSize: 12, color: cycleColors.gold, fontWeight: '600' }}>
                      💡 First time changing? Your default initial PIN is 1234
                    </Text>
                  </View>
                )}

                {/* Opção para recuperar com senha da conta caso tenha esquecido */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setModoEsqueciPin(true);
                    setSenhaAtual('');
                  }}
                  style={{ alignSelf: 'flex-start', marginTop: -4, marginBottom: 16, paddingHorizontal: 4 }}
                >
                  <Text style={{ fontSize: 13, color: cycleColors.rose, fontWeight: '700' }}>
                    Forgot PIN? Use account password
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* NOVO PIN */}
            {renderPinField(
              'New PIN',
              novaSenha,
              setNovaSenha,
              'Enter new PIN (4 digits)'
            )}

            {/* CONFIRMAR NOVO PIN */}
            {renderPinField(
              'Confirm new PIN',
              confirmarSenha,
              setConfirmarSenha,
              'Re-enter new PIN'
            )}

            {/* INFORMAÇÃO */}
            <View style={styles.infoBox}>
              <Ionicons
                name="information-circle-outline"
                size={18}
                color={cycleColors.textMuted}
              />
              <Text style={styles.infoText}>
                The PIN must be exactly 4 digits and will be required to open your emergency area.
              </Text>
            </View>
          </View>

          {/* BOTÃO SALVAR */}
          <TouchableOpacity
            activeOpacity={0.85}
            disabled={processando}
            onPress={handleSalvar}
          >
            <View style={[styles.saveButton, { backgroundColor: cycleColors.rose }]}>
              {processando ? (
                <ActivityIndicator color={cycleColors.white} />
              ) : (
                <>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={21}
                    color={cycleColors.white}
                  />
                  <Text style={styles.saveButtonText}>
                    {modoEsqueciPin ? 'RESET PIN' : 'SAVE PIN'}
                  </Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}