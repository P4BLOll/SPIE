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


      // -----------------------------------------------
      // PIN CRIADO E ESTA ENTRADA FOI AUTORIZADA
      // -----------------------------------------------

      setSenhaDigitada('');

      setAutorizadoNestaEntrada(true);

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


      // -----------------------------------------------
      // PIN CORRETO
      // -----------------------------------------------

      setSenhaDigitada('');

      setAutorizadoNestaEntrada(true);

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
            Carregando...
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
                ? 'Crie seu PIN secreto'
                : 'Digite seu PIN'}

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
                ? 'Essa senha protege sua área de emergência. Use 4 números fáceis de lembrar.'
                : 'Digite o PIN de 4 números para acessar sua área segura.'}

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
                onChangeText={
                  setSenhaDigitada
                }
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
                    ? 'AGUARDE...'
                    : criandoSenha
                      ? 'CRIAR SENHA'
                      : 'ENTRAR'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* DICA DE PRIMEIRO ACESSO E ALTERAÇÃO DE PIN */}
            {!criandoSenha && (
              <View style={{ marginTop: 24, alignItems: 'center', width: '100%' }}>
                {isDefaultPin && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                      backgroundColor: 'rgba(255, 92, 141, 0.12)',
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 20,
                      marginBottom: 14,
                      borderWidth: 1,
                      borderColor: 'rgba(255, 92, 141, 0.25)',
                    }}
                  >
                    <Ionicons name="key-outline" size={16} color={cycleColors.rose} />
                    <Text style={{ fontSize: 13, color: cycleColors.rose, fontWeight: '700' }}>
                      Senha padrão inicial: <Text style={{ fontWeight: '900', color: '#FFFFFF' }}>1234</Text>
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => router.push('/security/change-pin')}
                  style={{ paddingVertical: 6 }}
                >
                  <Text style={{ fontSize: 13, color: cycleColors.gold, fontWeight: '700', textDecorationLine: 'underline' }}>
                    Esqueceu ou deseja alterar seu PIN?
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