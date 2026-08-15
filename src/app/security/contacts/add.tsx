import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { router } from 'expo-router';

import { LinearGradient } from 'expo-linear-gradient';

import { Background } from '@/components/Background';

import { cycleColors } from '@/constants/Colors';

import {
  addContactStyles as styles,
} from '@/styles/add-contact.styles';

import {
  db,
  auth,
} from '@/services/firebaseConfig';

import {
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';


// =====================================================
// ADICIONAR CONTATO
// =====================================================

export default function AddContact() {

  // ===================================================
  // ESTADOS
  // ===================================================

  const [name, setName] = useState('');

  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);


  // ===================================================
  // VOLTAR PARA CONTATOS
  // ===================================================

  function voltarParaContatos() {

    if (loading) {
      return;
    }

    router.replace('/security/contacts');

  }


  // ===================================================
  // SALVAR CONTATO
  // ===================================================

  async function salvar() {

    // ================================================
    // VALIDAR CAMPOS
    // ================================================

    const nomeLimpo = name.trim();
    const telefoneLimpo = phone.trim();

    if (
      !nomeLimpo ||
      !telefoneLimpo
    ) {

      Alert.alert(
        'Campos obrigatórios',
        'Preencha o nome e o telefone.'
      );

      return;
    }


    // ================================================
    // USUÁRIO
    // ================================================

    const user = auth.currentUser;

    if (!user) {

      Alert.alert(
        'Erro',
        'Usuário não autenticado.'
      );

      return;
    }


    // ================================================
    // EVITAR DUPLO CLIQUE
    // ================================================

    if (loading) {
      return;
    }


    // ================================================
    // SALVAR
    // ================================================

    try {

      setLoading(true);


      const contactsRef = collection(
        db,
        'users',
        user.uid,
        'emergency_contacts'
      );


      await addDoc(
        contactsRef,
        {
          name: nomeLimpo,
          phone: telefoneLimpo,
          createdAt: serverTimestamp(),
        }
      );


      Keyboard.dismiss();


      // ==============================================
      // LIMPAR CAMPOS
      // ==============================================

      setName('');
      setPhone('');


      // ==============================================
      // SUCESSO
      // ==============================================

      Alert.alert(
        'Contato salvo',
        'Contato adicionado com sucesso.',
        [
          {
            text: 'OK',

            onPress: () => {

              router.replace(
                '/security/contacts'
              );

            },
          },
        ]
      );


    } catch (error) {

      console.log(
        'Erro ao salvar contato:',
        error
      );


      Alert.alert(
        'Erro',
        'Não foi possível salvar o contato.'
      );


    } finally {

      setLoading(false);

    }

  }


  // =====================================================
  // TELA
  // =====================================================

  return (

    <Background>

      <View style={styles.screen}>

        <View style={styles.container}>


          {/* =================================================
              TOPO
          ================================================= */}

          <View style={styles.topBar}>

            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.7}
              onPress={voltarParaContatos}
              disabled={loading}
            >

              <Ionicons
                name="arrow-back"
                size={22}
                color={cycleColors.text}
              />

            </TouchableOpacity>


            <Text style={styles.topBarTitle}>
              Novo contato
            </Text>

          </View>


          {/* =================================================
              CABEÇALHO
          ================================================= */}

          <View style={styles.header}>

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
                y: 1,
              }}
              style={styles.iconRing}
            >

              <Ionicons
                name="person-add-outline"
                size={34}
                color="#FFFFFF"
              />

            </LinearGradient>


            <Text style={styles.title}>
              Contato de emergência
            </Text>


            <Text style={styles.subtitle}>
              Essa pessoa poderá receber alertas quando você precisar de ajuda.
            </Text>

          </View>


          {/* =================================================
              FORMULÁRIO
          ================================================= */}

          <View style={styles.card}>

            {/* =================================================
                NOME
            ================================================= */}

            <TextInput
              placeholder="Nome completo"
              placeholderTextColor={
                cycleColors.textMuted
              }
              value={name}
              onChangeText={setName}
              style={styles.input}
              editable={!loading}
              autoCapitalize="words"
              autoCorrect={false}
            />


            {/* =================================================
                TELEFONE
            ================================================= */}

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
              ]}
              editable={!loading}
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

              {!loading && (

                <Ionicons
                  name="checkmark"
                  size={18}
                  color="#FFFFFF"
                />

              )}


              <Text style={styles.buttonText}>

                {loading
                  ? 'Salvando...'
                  : 'Salvar contato'}

              </Text>

            </LinearGradient>

          </TouchableOpacity>

        </View>

      </View>

    </Background>

  );

}