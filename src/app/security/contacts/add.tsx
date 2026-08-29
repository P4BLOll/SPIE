import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Background } from '@/components/Background';

import { cycleColors } from '@/styles/calendar.styles';

import {
  addContactStyles as styles,
} from '@/styles/add-contact.styles';

import { useDialog } from '@/context/DialogContext';
import { emergencyRepository } from '@/modules/emergency/services/emergencyRepository';

// =====================================================
// ADICIONAR CONTATO
// =====================================================

export default function AddContact() {
  const { showAlert } = useDialog();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  // =====================================================
  // VOLTAR
  // =====================================================

  function voltarParaContatos() {
    if (loading) return;
    router.back();
  }

  // =====================================================
  // SALVAR
  // =====================================================

  async function salvar() {
    const nomeLimpo = name.trim();
    const telefoneLimpo = phone.trim();

    if (!nomeLimpo || !telefoneLimpo) {
      showAlert({
        title: 'Campos Obrigatórios',
        message: 'Por favor, preencha o nome e o telefone do contato.',
        type: 'warning',
      });
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      await emergencyRepository.addContact({
        nome: nomeLimpo,
        telefone: telefoneLimpo,
      });

      Keyboard.dismiss();
      setName('');
      setPhone('');

      showAlert({
        title: 'Contato Salvo',
        message: 'Contato de emergência adicionado com sucesso.',
        type: 'success',
        buttonText: 'Concluir',
        onDismiss: () => {
          router.back();
        },
      });
    } catch (error) {
      console.log('Erro ao salvar contato:', error);
      showAlert({
        title: 'Erro',
        message: 'Não foi possível salvar o contato.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }


  // =====================================================
  // TELA
  // =====================================================

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: cycleColors.background,
      }}
      edges={['top', 'left', 'right']}
    >
      <Background
        style={{
          flex: 1,
          backgroundColor: cycleColors.background,
        }}
      >

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={
            Platform.OS === 'ios'
              ? 'padding'
              : 'height'
          }
          keyboardVerticalOffset={0}
        >

          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >

            <View
              style={[
                styles.screen,
                {
                  backgroundColor:
                    cycleColors.background,
                },
              ]}
            >

              <View style={styles.container}>

                {/* =================================================
                    TOPO
                ================================================= */}

                <View style={styles.topBar}>

                  <TouchableOpacity
                    style={[
                      styles.backButton,
                      {
                        backgroundColor:
                          cycleColors.surface,
                      },
                    ]}
                    activeOpacity={0.7}
                    onPress={
                      voltarParaContatos
                    }
                    disabled={loading}
                  >

                    <Ionicons
                      name="arrow-back"
                      size={22}
                      color={
                        cycleColors.text
                      }
                    />

                  </TouchableOpacity>


                  <Text
                    style={[
                      styles.topBarTitle,
                      {
                        color:
                          cycleColors.text,
                      },
                    ]}
                  >
                    Novo contato
                  </Text>

                </View>


                {/* =================================================
                    CABEÇALHO
                ================================================= */}

                <View style={styles.header}>

                  <View
                    style={[styles.iconRing, { backgroundColor: cycleColors.rose }]}
                  >
                    <Ionicons
                      name="person-add-outline"
                      size={34}
                      color="#FFFFFF"
                    />
                  </View>


                  <Text
                    style={[
                      styles.title,
                      {
                        color:
                          cycleColors.text,
                      },
                    ]}
                  >
                    Contato de emergência
                  </Text>


                  <Text
                    style={[
                      styles.subtitle,
                      {
                        color:
                          cycleColors.textMuted,
                      },
                    ]}
                  >
                    Essa pessoa poderá receber alertas
                    quando você precisar de ajuda.
                  </Text>

                </View>


                {/* =================================================
                    FORMULÁRIO
                ================================================= */}

                <View
                  style={[
                    styles.card,
                    {
                      backgroundColor:
                        cycleColors.surface,
                    },
                  ]}
                >

                  <TextInput
                    placeholder="Nome completo"
                    placeholderTextColor={
                      cycleColors.textMuted
                    }
                    value={name}
                    onChangeText={setName}
                    style={[
                      styles.input,
                      {
                        color:
                          cycleColors.text,
                      },
                    ]}
                    editable={!loading}
                    autoCapitalize="words"
                    autoCorrect={false}
                    returnKeyType="next"
                  />


                  <TextInput
                    placeholder="Telefone com DDD"
                    placeholderTextColor={
                      cycleColors.textMuted
                    }
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    style={[
                      styles.input,
                      styles.inputLast,
                      {
                        color:
                          cycleColors.text,
                      },
                    ]}
                    editable={!loading}
                    returnKeyType="done"
                    onSubmitEditing={salvar}
                  />

                </View>


                {/* =================================================
                    BOTÃO SALVAR
                ================================================= */}

                <TouchableOpacity
                  activeOpacity={0.85}
                  disabled={loading}
                  onPress={salvar}
                  style={
                    loading
                      ? styles.buttonDisabled
                      : undefined
                  }
                >

                  <View
                    style={[
                      styles.button,
                      { backgroundColor: cycleColors.rose },
                    ]}
                  >
                    {!loading && (
                      <Ionicons
                        name="checkmark"
                        size={18}
                        color="#FFFFFF"
                      />
                    )}

                    <Text
                      style={[
                        styles.buttonText,
                        {
                          color: '#FFFFFF',
                        },
                      ]}
                    >
                      {loading
                        ? 'Salvando...'
                        : 'Salvar contato'}
                    </Text>
                  </View>
                </TouchableOpacity>

              </View>

            </View>

          </ScrollView>

        </KeyboardAvoidingView>
      </Background>
    </SafeAreaView>
  );
}