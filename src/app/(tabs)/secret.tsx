import React, {
  useEffect,
  useState,
} from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  StatusBar,
  TextInput,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
  useRouter,
  useLocalSearchParams,
} from 'expo-router';

import { LinearGradient } from 'expo-linear-gradient';

import { SafeAreaView } from 'react-native-safe-area-context';

import { cycleColors } from '../../styles/calendar.styles';

import { useSecurity } from '../../context/SecurityContext';

import {
  secretStyles as styles,
} from '../../styles/secret.styles';


// =====================================================
// TELA SECRET
// =====================================================

export default function SecretScreen() {

  const router = useRouter();

  const params =
    useLocalSearchParams();


  // =====================================================
  // ROTA DE DESTINO
  // =====================================================

  const destinoParam =
    typeof params.destino === 'string'
      ? params.destino
      : '/security';


  // =====================================================
  // SECURITY
  // =====================================================

  const {
    senhaSalva,
    acessoLiberado,
    carregando,
    criarSenha,
    verificarSenha,
  } = useSecurity();


  // =====================================================
  // ESTADOS
  // =====================================================

  const [
    senhaDigitada,
    setSenhaDigitada,
  ] = useState('');


  const [
    criandoSenha,
    setCriandoSenha,
  ] = useState(false);


  const [
    processando,
    setProcessando,
  ] = useState(false);


  // =====================================================
  // VERIFICAR SE EXISTE PIN
  // =====================================================

  useEffect(() => {

    if (carregando) {
      return;
    }

    setCriandoSenha(!senhaSalva);

  }, [
    carregando,
    senhaSalva,
  ]);


  // =====================================================
  // REDIRECIONAR APÓS LIBERAR
  // =====================================================

  useEffect(() => {

    if (
      carregando ||
      !acessoLiberado
    ) {
      return;
    }


    /*
     * Depois que o PIN for validado,
     * abre exatamente a rota solicitada.
     *
     * Se veio do Perfil para contatos:
     *
     * /secret?destino=/security/contacts
     *
     * então abre:
     *
     * /security/contacts
     */

    const timer =
      setTimeout(() => {

        router.replace(
          destinoParam as any
        );

      }, 100);


    return () => {

      clearTimeout(timer);

    };

  }, [
    carregando,
    acessoLiberado,
    destinoParam,
  ]);


  // =====================================================
  // CRIAR PIN
  // =====================================================

  async function salvarSenha() {

    if (
      senhaDigitada.length !== 4 ||
      !/^\d{4}$/.test(senhaDigitada)
    ) {

      Alert.alert(
        'Senha inválida',
        'Digite exatamente 4 números.'
      );

      return;
    }


    try {

      setProcessando(true);


      const sucesso =
        await criarSenha(
          senhaDigitada
        );


      if (!sucesso) {

        Alert.alert(
          'Erro',
          'Não foi possível criar sua senha.'
        );

        return;

      }


      setSenhaDigitada('');

    } catch (error) {

      console.log(
        'Erro ao criar PIN:',
        error
      );


      Alert.alert(
        'Erro',
        'Não foi possível criar sua senha.'
      );

    } finally {

      setProcessando(false);

    }

  }


  // =====================================================
  // VERIFICAR PIN
  // =====================================================

  async function entrar() {

    if (
      senhaDigitada.length !== 4 ||
      !/^\d{4}$/.test(senhaDigitada)
    ) {

      Alert.alert(
        'Senha inválida',
        'Digite os 4 números do seu PIN.'
      );

      return;
    }


    try {

      setProcessando(true);


      const sucesso =
        await verificarSenha(
          senhaDigitada
        );


      if (!sucesso) {

        Alert.alert(
          'Senha incorreta',
          'O PIN informado está errado.'
        );


        setSenhaDigitada('');

        return;

      }


      setSenhaDigitada('');

    } catch (error) {

      console.log(
        'Erro ao verificar PIN:',
        error
      );


      Alert.alert(
        'Erro',
        'Não foi possível verificar o PIN.'
      );

    } finally {

      setProcessando(false);

    }

  }


  // =====================================================
  // CARREGANDO
  // =====================================================

  if (carregando) {

    return (

      <SafeAreaView
        style={styles.container}
        edges={[
          'top',
          'left',
          'right',
        ]}
      >

        <StatusBar
          barStyle="light-content"
        />


        <View
          style={styles.lockBox}
        >

          <Ionicons
            name="lock-closed"
            size={40}
            color={cycleColors.rose}
          />


          <Text
            style={styles.lockTitle}
          >
            Carregando...
          </Text>

        </View>

      </SafeAreaView>

    );

  }


  // =====================================================
  // AGUARDANDO REDIRECIONAMENTO
  // =====================================================

  if (acessoLiberado) {

    return null;

  }


  // =====================================================
  // TELA
  // =====================================================

  return (

    <SafeAreaView
      style={styles.container}
      edges={[
        'top',
        'left',
        'right',
      ]}
    >

      <StatusBar
        barStyle="light-content"
      />


      <View
        style={styles.lockBox}
      >

        {/* =================================================
            ÍCONE
        ================================================= */}

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
          style={styles.lockIconRing}
        >

          <Ionicons
            name="lock-closed"
            size={38}
            color="#FFFFFF"
          />

        </LinearGradient>


        {/* =================================================
            TÍTULO
        ================================================= */}

        <Text
          style={styles.lockTitle}
        >

          {criandoSenha
            ? 'Crie seu PIN secreto'
            : 'Digite seu PIN'}

        </Text>


        {/* =================================================
            SUBTÍTULO
        ================================================= */}

        <Text
          style={styles.lockSubtitle}
        >

          {criandoSenha
            ? 'Essa senha protege sua área de emergência. Use 4 números fáceis de lembrar.'
            : 'Digite o PIN de 4 números para acessar sua área segura.'}

        </Text>


        {/* =================================================
            CAMPO PIN
        ================================================= */}

        <View
          style={styles.pinCard}
        >

          <TextInput
            style={styles.pinInput}
            keyboardType="number-pad"
            maxLength={4}
            secureTextEntry
            placeholder="••••"
            placeholderTextColor={
              cycleColors.textMuted
            }
            value={senhaDigitada}
            onChangeText={
              setSenhaDigitada
            }
            autoFocus
            editable={!processando}
          />

        </View>


        {/* =================================================
            BOTÃO
        ================================================= */}

        <TouchableOpacity
          activeOpacity={0.85}
          disabled={processando}
          onPress={
            criandoSenha
              ? salvarSenha
              : entrar
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
            style={styles.pinButton}
          >

            <Ionicons
              name={
                criandoSenha
                  ? 'key-outline'
                  : 'lock-open-outline'
              }
              size={16}
              color="#FFFFFF"
            />


            <Text
              style={
                styles.pinButtonText
              }
            >

              {processando
                ? 'AGUARDE...'
                : criandoSenha
                  ? 'CRIAR SENHA'
                  : 'ENTRAR'}

            </Text>

          </LinearGradient>

        </TouchableOpacity>

      </View>

    </SafeAreaView>

  );

}
