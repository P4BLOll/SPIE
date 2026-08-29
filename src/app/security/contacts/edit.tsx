import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Background } from '@/components/Background';

import { AnimatedPressable } from '@/components/AnimatedPressable';

import { cycleColors } from '@/styles/calendar.styles';

import {
  editContactStyles as styles,
} from '@/styles/edit-contact.styles';

import { useDialog } from '@/context/DialogContext';
import { emergencyRepository } from '@/modules/emergency/services/emergencyRepository';

// =====================================================
// EDITAR CONTATO
// =====================================================

export default function EditContact() {
  const { showAlert } = useDialog();
  const params = useLocalSearchParams();
  const id = typeof params.id === 'string' ? params.id : '';

  // =====================================================
  // ESTADOS
  // =====================================================

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =====================================================
  // VOLTAR
  // =====================================================

  function voltarParaContatos() {
    if (saving) return;
    router.back();
  }

  // =====================================================
  // CARREGAR CONTATO
  // =====================================================

  useEffect(() => {
    let ativo = true;

    async function carregarContato() {
      if (!id) {
        if (ativo) setLoading(false);
        showAlert({
          title: 'Erro',
          message: 'Contato não encontrado.',
          type: 'error',
          onDismiss: voltarParaContatos,
        });
        return;
      }

      try {
        const contacts = await emergencyRepository.getContacts();
        const found = contacts.find((c) => c.id === id);

        if (!ativo) return;

        if (found) {
          setName(found.nome || '');
          setPhone(found.telefone || '');
        } else {
          showAlert({
            title: 'Contato Não Encontrado',
            message: 'Esse contato não existe mais.',
            type: 'warning',
            onDismiss: voltarParaContatos,
          });
        }
      } catch (error) {
        if (!ativo) return;
        console.log('Erro ao carregar contato:', error);
        showAlert({
          title: 'Erro',
          message: 'Não foi possível carregar o contato.',
          type: 'error',
        });
      } finally {
        if (ativo) setLoading(false);
      }
    }

    carregarContato();

    return () => {
      ativo = false;
    };
  }, [id]);

  // =====================================================
  // SALVAR ALTERAÇÕES
  // =====================================================

  async function salvar() {
    if (saving) return;

    if (!id) {
      showAlert({
        title: 'Erro',
        message: 'Contato não encontrado.',
        type: 'error',
      });
      return;
    }

    const nomeLimpo = name.trim();
    const telefoneLimpo = phone.trim();

    if (!nomeLimpo || !telefoneLimpo) {
      showAlert({
        title: 'Campos Obrigatórios',
        message: 'Por favor, preencha o nome e o telefone.',
        type: 'warning',
      });
      return;
    }

    try {
      setSaving(true);

      await emergencyRepository.updateContact(id, {
        nome: nomeLimpo,
        telefone: telefoneLimpo,
      });

      showAlert({
        title: 'Atualizado',
        message: 'Contato alterado com sucesso.',
        type: 'success',
        buttonText: 'Concluir',
        onDismiss: () => {
          router.back();
        },
      });
    } catch (error) {
      console.log('Erro ao atualizar contato:', error);
      showAlert({
        title: 'Erro',
        message: 'Não foi possível atualizar o contato.',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  }


  // =====================================================
  // CARREGANDO
  // =====================================================

  if (loading) {

    return (

      <View
        style={{
          flex: 1,
          backgroundColor:
            cycleColors.background,
        }}
      >

        <Background
          style={{
            flex: 1,
            backgroundColor:
              cycleColors.background,
          }}
        >

          <View
            style={[
              styles.screen,
              styles.centered,
              {
                backgroundColor:
                  cycleColors.background,
              },
            ]}
          >

            <ActivityIndicator
              size="large"
              color={
                cycleColors.rose
              }
            />

          </View>

        </Background>

      </View>
    );
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

                  <AnimatedPressable
                    style={[
                      styles.backButton,
                      {
                        backgroundColor:
                          cycleColors.surface,
                      },
                    ]}
                    onPress={
                      voltarParaContatos
                    }
                    disabled={saving}
                  >

                    <Ionicons
                      name="arrow-back"
                      size={22}
                      color={
                        cycleColors.text
                      }
                    />

                  </AnimatedPressable>


                  <Text
                    style={[
                      styles.topBarTitle,
                      {
                        color:
                          cycleColors.text,
                      },
                    ]}
                  >
                    Editar contato
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
                    value={name}
                    onChangeText={setName}
                    placeholder="Nome completo"
                    placeholderTextColor={
                      cycleColors.textMuted
                    }
                    style={[
                      styles.input,
                      {
                        color:
                          cycleColors.text,
                      },
                    ]}
                    editable={!saving}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />


                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Telefone"
                    placeholderTextColor={
                      cycleColors.textMuted
                    }
                    keyboardType="phone-pad"
                    style={[
                      styles.input,
                      styles.inputLast,
                      {
                        color:
                          cycleColors.text,
                      },
                    ]}
                    editable={!saving}
                  />

                </View>


                {/* =================================================
                    BOTÃO SALVAR
                ================================================= */}

                <TouchableOpacity
                  activeOpacity={0.85}
                  disabled={saving}
                  onPress={salvar}
                  style={
                    saving
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
                    {!saving && (
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
                      {saving
                        ? 'Salvando...'
                        : 'Salvar alterações'}
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