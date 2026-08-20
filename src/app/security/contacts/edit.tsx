import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
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

import { LinearGradient } from 'expo-linear-gradient';

import { Background } from '@/components/Background';

import { AnimatedPressable } from '@/components/AnimatedPressable';

import { cycleColors } from '@/styles/calendar.styles';

import {
  editContactStyles as styles,
} from '@/styles/edit-contact.styles';

import {
  db,
  auth,
} from '@/services/firebaseConfig';

import {
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';


// =====================================================
// EDITAR CONTATO
// =====================================================

export default function EditContact() {

  const params =
    useLocalSearchParams();

  const id =
    typeof params.id === 'string'
      ? params.id
      : '';


  // =====================================================
  // ESTADOS
  // =====================================================

  const [name, setName] =
    useState('');

  const [phone, setPhone] =
    useState('');

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);


  // =====================================================
  // VOLTAR
  // =====================================================

  function voltarParaContatos() {

    if (saving) {
      return;
    }

    router.back();

  }


  // =====================================================
  // CARREGAR CONTATO
  // =====================================================

  useEffect(() => {

    let ativo = true;

    async function carregarContato() {

      const user =
        auth.currentUser;

      if (!user) {

        if (!ativo) {
          return;
        }

        setLoading(false);

        Alert.alert(
          'Erro',
          'Usuário não autenticado.',
          [
            {
              text: 'OK',

              onPress: () => {
                router.replace('/login');
              },
            },
          ]
        );

        return;
      }

      if (!id) {

        if (!ativo) {
          return;
        }

        setLoading(false);

        Alert.alert(
          'Erro',
          'Contato não encontrado.',
          [
            {
              text: 'OK',
              onPress:
                voltarParaContatos,
            },
          ]
        );

        return;
      }

      try {

        const contactRef =
          doc(
            db,
            'users',
            user.uid,
            'emergency_contacts',
            id
          );

        const snapshot =
          await getDoc(
            contactRef
          );

        if (!ativo) {
          return;
        }

        if (snapshot.exists()) {

          const data =
            snapshot.data();

          setName(
            typeof data.name === 'string'
              ? data.name
              : ''
          );

          setPhone(
            typeof data.phone === 'string'
              ? data.phone
              : ''
          );

        } else {

          Alert.alert(
            'Contato não encontrado',
            'Esse contato não existe mais.',
            [
              {
                text: 'OK',
                onPress:
                  voltarParaContatos,
              },
            ]
          );
        }

      } catch (error) {

        if (!ativo) {
          return;
        }

        console.log(
          'Erro ao carregar contato:',
          error
        );

        Alert.alert(
          'Erro',
          'Não foi possível carregar o contato.'
        );

      } finally {

        if (ativo) {
          setLoading(false);
        }

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

    if (saving) {
      return;
    }

    const user =
      auth.currentUser;

    if (!user) {

      Alert.alert(
        'Erro',
        'Usuário não autenticado.'
      );

      return;
    }

    if (!id) {

      Alert.alert(
        'Erro',
        'Contato não encontrado.'
      );

      return;
    }

    const nomeLimpo =
      name.trim();

    const telefoneLimpo =
      phone.trim();

    if (
      !nomeLimpo ||
      !telefoneLimpo
    ) {

      Alert.alert(
        'Campos obrigatórios',
        'Preencha nome e telefone.'
      );

      return;
    }

    try {

      setSaving(true);

      const contactRef =
        doc(
          db,
          'users',
          user.uid,
          'emergency_contacts',
          id
        );

      await updateDoc(
        contactRef,
        {
          name: nomeLimpo,
          phone: telefoneLimpo,
        }
      );

      Alert.alert(
        'Atualizado',
        'Contato alterado com sucesso.',
        [
          {
            text: 'OK',

            onPress: () => {
              router.back();
            },
          },
        ]
      );

    } catch (error) {

      console.log(
        'Erro ao atualizar contato:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível atualizar o contato.'
      );

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
                    style={styles.button}
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
                          color:
                            '#FFFFFF',
                        },
                      ]}
                    >

                      {saving
                        ? 'Salvando...'
                        : 'Salvar alterações'}

                    </Text>

                  </LinearGradient>

                </TouchableOpacity>

              </View>

            </View>

          </ScrollView>

        </KeyboardAvoidingView>

      </Background>

    </View>
  );
}