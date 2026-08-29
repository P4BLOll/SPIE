import React, {
  useState,
} from 'react';

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

import {
  router,
} from 'expo-router';

import {
  LinearGradient,
} from 'expo-linear-gradient';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import { cycleColors } from '@/styles/calendar.styles';
import { useSecurity } from '@/modules/security-vault/contexts/SecurityContext';
import { changePinStyles as styles } from '@/styles/changePin.styles';


// =====================================================
// TELA ALTERAR PIN
// =====================================================

export default function ChangePinScreen() {

  // =====================================================
  // SECURITY
  // =====================================================

  const {
    alterarSenha,
  } = useSecurity();


  // =====================================================
  // ESTADOS
  // =====================================================

  const [
    senhaAtual,
    setSenhaAtual,
  ] = useState('');


  const [
    novaSenha,
    setNovaSenha,
  ] = useState('');


  const [
    confirmarSenha,
    setConfirmarSenha,
  ] = useState('');


  const [
    processando,
    setProcessando,
  ] = useState(false);


  // =====================================================
  // ALTERAR PIN
  // =====================================================

  async function handleAlterarSenha() {

    // ===================================================
    // VALIDAR PIN ATUAL
    // ===================================================

    if (
      senhaAtual.length !== 4 ||
      !/^\d{4}$/.test(senhaAtual)
    ) {

      Alert.alert(
        'PIN inválido',
        'Digite o seu PIN atual com 4 números.'
      );

      return;

    }


    // ===================================================
    // VALIDAR NOVO PIN
    // ===================================================

    if (
      novaSenha.length !== 4 ||
      !/^\d{4}$/.test(novaSenha)
    ) {

      Alert.alert(
        'Novo PIN inválido',
        'O novo PIN deve ter exatamente 4 números.'
      );

      return;

    }


    // ===================================================
    // VERIFICAR CONFIRMAÇÃO
    // ===================================================

    if (
      confirmarSenha.length !== 4 ||
      !/^\d{4}$/.test(confirmarSenha)
    ) {

      Alert.alert(
        'Confirmação inválida',
        'Digite novamente o novo PIN.'
      );

      return;

    }


    // ===================================================
    // VERIFICAR SE OS PINs SÃO IGUAIS
    // ===================================================

    if (
      novaSenha !== confirmarSenha
    ) {

      Alert.alert(
        'PINs diferentes',
        'O novo PIN e a confirmação precisam ser iguais.'
      );

      return;

    }


    // ===================================================
    // IMPEDIR MESMO PIN
    // ===================================================

    if (
      senhaAtual === novaSenha
    ) {

      Alert.alert(
        'PIN igual',
        'O novo PIN precisa ser diferente do PIN atual.'
      );

      return;

    }


    // ===================================================
    // ALTERAR
    // ===================================================

    try {

      setProcessando(true);


      const sucesso =
        await alterarSenha(
          senhaAtual,
          novaSenha
        );


      // =================================================
      // ERRO
      // =================================================

      if (!sucesso) {

        Alert.alert(
          'PIN incorreto',
          'O PIN atual informado está incorreto.'
        );

        setSenhaAtual('');

        return;

      }


      // =================================================
      // SUCESSO
      // =================================================

      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');


      Alert.alert(
        'PIN alterado',
        'Seu PIN foi alterado com sucesso.',
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
        'Erro ao alterar PIN:',
        error
      );


      Alert.alert(
        'Erro',
        'Não foi possível alterar seu PIN.'
      );

    } finally {

      setProcessando(false);

    }

  }


  // =====================================================
  // CAMPO PIN
  // =====================================================

  function renderPinField(
    label: string,
    value: string,
    setValue: (
      value: string
    ) => void,
    placeholder: string
  ) {

    return (

      <View
        style={
          styles.field
        }
      >

        <Text
          style={
            styles.label
          }
        >
          {label}
        </Text>


        <View
          style={
            styles.pinContainer
          }
        >

          <Ionicons
            name="key-outline"
            size={20}
            color={
              cycleColors.rose
            }
          />


          <TextInput
            style={
              styles.pinInput
            }
            value={
              value
            }
            onChangeText={
              (text) => {

                const somenteNumeros =
                  text
                    .replace(
                      /[^0-9]/g,
                      ''
                    )
                    .slice(
                      0,
                      4
                    );

                setValue(
                  somenteNumeros
                );

              }
            }
            keyboardType="number-pad"
            maxLength={4}
            secureTextEntry
            placeholder={
              placeholder
            }
            placeholderTextColor={
              cycleColors.textMuted
            }
            editable={
              !processando
            }
          />

        </View>

      </View>

    );

  }


  // =====================================================
  // TELA
  // =====================================================

  return (

    <SafeAreaView
      style={
        styles.container
      }
      edges={[
        'top',
        'left',
        'right',
      ]}
    >

      <KeyboardAvoidingView
        style={
          styles.keyboard
        }
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <View
          style={
            styles.header
          }
        >

          <TouchableOpacity
            style={
              styles.backButton
            }
            activeOpacity={0.7}
            onPress={() =>
              router.back()
            }
            disabled={
              processando
            }
          >

            <Ionicons
              name="chevron-back"
              size={22}
              color={
                cycleColors.text
              }
            />

          </TouchableOpacity>


          <Text
            style={
              styles.headerTitle
            }
          >
            Alterar PIN
          </Text>

        </View>


        {/* =================================================
            CONTEÚDO
        ================================================= */}

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            styles.scroll
          }
        >

          {/* =================================================
              ÍCONE
          ================================================= */}

          <View
            style={[
              styles.iconRing,
              { backgroundColor: cycleColors.rose },
            ]}
          >
            <Ionicons
              name="lock-closed-outline"
              size={36}
              color={
                cycleColors.white
              }
            />
          </View>


          {/* =================================================
              TÍTULO
          ================================================= */}

          <Text
            style={
              styles.title
            }
          >
            Atualize seu PIN
          </Text>


          <Text
            style={
              styles.subtitle
            }
          >
            Altere o PIN usado para proteger
            sua área de emergência.
          </Text>


          {/* =================================================
              FORMULÁRIO
          ================================================= */}

          <View
            style={
              styles.card
            }
          >

            {renderPinField(
              'PIN atual',
              senhaAtual,
              setSenhaAtual,
              'Digite seu PIN atual'
            )}


            {renderPinField(
              'Novo PIN',
              novaSenha,
              setNovaSenha,
              'Digite o novo PIN'
            )}


            {renderPinField(
              'Confirmar novo PIN',
              confirmarSenha,
              setConfirmarSenha,
              'Digite novamente o novo PIN'
            )}


            {/* =================================================
                INFORMAÇÃO
            ================================================= */}

            <View
              style={
                styles.infoBox
              }
            >

              <Ionicons
                name="information-circle-outline"
                size={18}
                color={
                  cycleColors.textMuted
                }
              />


              <Text
                style={
                  styles.infoText
                }
              >
                O PIN deve conter exatamente
                4 números e será usado para
                acessar sua área segura.
              </Text>

            </View>

          </View>


          {/* =================================================
              BOTÃO
          ================================================= */}

          <TouchableOpacity
            activeOpacity={0.85}
            disabled={
              processando
            }
            onPress={
              handleAlterarSenha
            }
          >

            <View
              style={[
                styles.saveButton,
                { backgroundColor: cycleColors.rose },
              ]}
            >
              {processando ? (
                <ActivityIndicator
                  color={
                    cycleColors.white
                  }
                />
              ) : (
                <>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={21}
                    color={
                      cycleColors.white
                    }
                  />

                  <Text
                    style={
                      styles.saveButtonText
                    }
                  >
                    Alterar PIN
                  </Text>
                </>
              )}
            </View>
          </TouchableOpacity>


          <View
            style={
              styles.bottomSpace
            }
          />

        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>

  );

}