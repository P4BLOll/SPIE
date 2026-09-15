import React, {
  useEffect,
  useState,
} from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
  useRouter,
  useLocalSearchParams,
} from 'expo-router';

import { LinearGradient } from 'expo-linear-gradient';

import { SafeAreaView } from 'react-native-safe-area-context';

import { cycleColors } from '@/styles/calendar.styles';
import { useSecurity } from '@/modules/security-vault/contexts/SecurityContext';
import { secretStyles as styles } from '@/styles/secret.styles';
import { haptics } from '@/shared/utils/haptics';


// =====================================================
// TELA SECRET
// =====================================================

export default function SecretScreen() {

  const router = useRouter();

  const params =
    useLocalSearchParams();


  // =====================================================
  // DESTINO
  // =====================================================

  const destinoParam =
    typeof params.destino === 'string'
      ? params.destino
      : '/security';


  // =====================================================
  // ORIGEM
  // =====================================================

  const origemParam =
    typeof params.origem === 'string'
      ? params.origem
      : '/(tabs)/profile';


  // =====================================================
  // SECURITY
  // =====================================================

  const {
    senhaSalva,
    acessoLiberado,
    carregando,
    isDefaultPin,
    criarSenha,
    verificarSenha,
    bloquear,
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
  // AUTORIZAÇÃO DESTA ENTRADA
  //
  // Esse estado é diferente de acessoLiberado.
  //
  // Ele garante que o PIN seja digitado novamente
  // sempre que o SecretScreen for aberto.
  // =====================================================

  const [
    autorizadoNestaEntrada,
    setAutorizadoNestaEntrada,
  ] = useState(false);


  // =====================================================
  // BLOQUEAR AO ENTRAR NO SECRET
  //
  // Mesmo que o usuário tenha acabado de acessar
  // outra área protegida, uma nova entrada no Secret
  // deverá exigir o PIN novamente.
  // =====================================================

  useEffect(() => {

    bloquear();

    setAutorizadoNestaEntrada(false);

    setSenhaDigitada('');

  }, []);


  // =====================================================
  // VERIFICAR SE EXISTE PIN
  // =====================================================

  useEffect(() => {

    if (carregando) {
      return;
    }

    setCriandoSenha(
      !senhaSalva
    );

  }, [
    carregando,
    senhaSalva,
  ]);


  // =====================================================
  // REDIRECIONAR APÓS VALIDAR O PIN
  // =====================================================

  useEffect(() => {

    if (
      carregando ||
      !acessoLiberado ||
      !autorizadoNestaEntrada
    ) {
      return;
    }


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
    autorizadoNestaEntrada,
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
        'Invalid PIN',
        'Enter exactly 4 digits.'
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
        haptics.error();
        Alert.alert(
          'Error',
          'Could not create your PIN.'
        );

        return;

      }

      haptics.success();
      // -----------------------------------------------
      // PIN CRIADO E ESTA ENTRADA FOI AUTORIZADA
      // -----------------------------------------------

      setSenhaDigitada('');

      setAutorizadoNestaEntrada(true);

    } catch (error) {

      console.log(
        'Error creating PIN:',
        error
      );

      haptics.error();
      Alert.alert(
        'Error',
        'Could not create your PIN.'
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

      haptics.warning();
      Alert.alert(
        'Invalid PIN',
        'Enter your 4-digit PIN.'
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

        haptics.error();
        Alert.alert(
          'Incorrect PIN',
          'The PIN entered is incorrect.'
        );


        setSenhaDigitada('');

        return;

      }


      haptics.success();
      // -----------------------------------------------
      // PIN CORRETO
      // -----------------------------------------------

      setSenhaDigitada('');

      setAutorizadoNestaEntrada(true);

    } catch (error) {

      console.log(
        'Error verifying PIN:',
        error
      );

      haptics.error();
      Alert.alert(
        'Error',
        'Could not verify PIN.'
      );

    } finally {

      setProcessando(false);

    }

  }


  // =====================================================
  // VOLTAR
  // =====================================================

  function voltar() {

    // -----------------------------------------------
    // BLOQUEIA NOVAMENTE A ÁREA SEGURA
    // -----------------------------------------------

    bloquear();

    setAutorizadoNestaEntrada(false);

    setSenhaDigitada('');


    // -----------------------------------------------
    // VOLTA PARA A TELA QUE ABRIU O SECRET
    // -----------------------------------------------

    router.replace(
      origemParam as any
    );

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
            Loading...
          </Text>

        </View>

      </SafeAreaView>

    );

  }


  // =====================================================
  // AGUARDANDO REDIRECIONAMENTO
  // =====================================================

  if (
    acessoLiberado &&
    autorizadoNestaEntrada
  ) {

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

      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
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
            justifyContent: 'center',
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          <View
            style={styles.lockBox}
          >

            {/* =================================================
                BOTÃO VOLTAR
            ================================================= */}

            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 20,
                left: 20,
                width: 42,
                height: 42,
                borderRadius: 21,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  cycleColors.surfaceAlt,
              }}
              activeOpacity={0.7}
              onPress={voltar}
            >

              <Ionicons
                name="chevron-back"
                size={22}
                color={
                  cycleColors.text
                }
              />

            </TouchableOpacity>


            {/* =================================================
                ÍCONE
            ================================================= */}

            <View
              style={[
                styles.lockIconRing,
                { backgroundColor: cycleColors.rose },
              ]}
            >
              <Ionicons
                name="lock-closed"
                size={38}
                color="#FFFFFF"
              />
            </View>


            {/* =================================================
                TÍTULO
            ================================================= */}

            <Text
              style={
                styles.lockTitle
              }
            >

              {criandoSenha
                ? 'Create your secret PIN'
                : 'Enter your PIN'}

            </Text>


            {/* =================================================
                SUBTÍTULO
            ================================================= */}

            <Text
              style={
                styles.lockSubtitle
              }
            >

              {criandoSenha
                ? 'This PIN protects your emergency area. Use 4 digits you can easily remember.'
                : 'Enter your 4-digit PIN to access your secure area.'}

            </Text>


            {/* =================================================
                CAMPO PIN
            ================================================= */}

            <View
              style={
                styles.pinCard
              }
            >

              <TextInput
                style={
                  styles.pinInput
                }
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
                placeholder="••••"
                placeholderTextColor={
                  cycleColors.textMuted
                }
                value={
                  senhaDigitada
                }
                onChangeText={(text) => {
                  const cleaned = text.replace(/[^0-9]/g, '');
                  if (cleaned.length !== senhaDigitada.length) {
                    haptics.selection();
                  }
                  setSenhaDigitada(cleaned);
                }}
                autoFocus
                editable={
                  !processando
                }
              />

            </View>


            {/* =================================================
                BOTÃO
            ================================================= */}

            <TouchableOpacity
              activeOpacity={0.8}
              disabled={
                processando
              }
              onPress={
                criandoSenha
                  ? salvarSenha
                  : entrar
              }
            >
              <View
                style={[
                  styles.pinButton,
                  { backgroundColor: cycleColors.rose },
                ]}
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
                    ? 'PLEASE WAIT...'
                    : criandoSenha
                      ? 'CREATE PIN'
                      : 'UNLOCK'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* DICA DE RECUPERAÇÃO / ALTERAÇÃO DE PIN */}
            {!criandoSenha && (
              <View style={{ marginTop: 24, alignItems: 'center', width: '100%' }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => router.push('/security/change-pin')}
                  style={{ paddingVertical: 6 }}
                >
                  <Text style={{ fontSize: 13, color: cycleColors.gold, fontWeight: '700', textDecorationLine: 'underline' }}>
                    Forgot or want to change your PIN?
                  </Text>
                </TouchableOpacity>
              </View>
            )}

          </View>

        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>

  );

}