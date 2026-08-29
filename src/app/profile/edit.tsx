import React, {
  useEffect,
  useRef,
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

import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Background } from '@/components/Background';

import { cycleColors } from '@/constants/Colors';

import { auth, db } from '@/services/firebaseConfig';

import {
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

import { styles } from '@/styles/editProfile.styles';
import { useSecurity } from '@/modules/security-vault/contexts/SecurityContext';


// =====================================================
// OPÇÕES — MESMAS DO CADASTRO
// =====================================================

const cycleTypeOptions = [
  {
    label: 'Regular',
    value: 'regular',
  },
  {
    label: 'Irregular',
    value: 'irregular',
  },
  {
    label: 'Não sei',
    value: 'unknown',
  },
];

const periodOptions = [
  '3',
  '4',
  '5',
  '6',
  '7',
  '8+',
  'Não sei',
];

const cycleOptions = [
  '21',
  '24',
  '26',
  '28',
  '30',
  '35',
  'Não sei',
];

const goalOptions = [
  'Monitorar meu ciclo',
  'Engravidar',
  'Acompanhar gravidez',
  'Conhecer meu corpo',
  'Entender minha secreção',
  'Melhorar minha vida sexual',
];

const conditions = [
  'Nenhuma',
  'SOP',
  'Endometriose',
  'Adenomiose',
  'Diabetes',
  'Hipertensão',
  'Tireoide',
];

const contraceptives = [
  'Nenhum',
  'Pílula',
  'DIU',
  'Implante',
  'Injeção',
  'Preservativo',
];


// =====================================================
// TELA
// =====================================================

export default function EditProfile() {

  // =====================================================
  // REFERÊNCIA DO SCROLL
  // =====================================================

  const scrollRef =
    useRef<ScrollView>(null);


  // =====================================================
  // SECURITY
  // =====================================================

  const {
    alterarSenha,
  } = useSecurity();


  // =====================================================
  // ESTADOS
  // =====================================================

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [showScrollTop, setShowScrollTop] =
    useState(false);


  // =====================================================
  // DADOS PESSOAIS
  // =====================================================

  const [fullName, setFullName] =
    useState('');

  const [birthYear, setBirthYear] =
    useState('');

  const [phone, setPhone] =
    useState('');


  // =====================================================
  // CICLO
  // =====================================================

  const [cycleType, setCycleType] =
    useState('');

  const [periodDuration, setPeriodDuration] =
    useState('');

  const [cycleLength, setCycleLength] =
    useState('');


  // =====================================================
  // SAÚDE
  // =====================================================

  const [weight, setWeight] =
    useState('');

  const [height, setHeight] =
    useState('');

  const [contraceptive, setContraceptive] =
    useState('');


  // =====================================================
  // OBJETIVOS
  // =====================================================

  const [goals, setGoals] =
    useState<string[]>([]);


  // =====================================================
  // CONDIÇÕES
  // =====================================================

  const [healthConditions, setHealthConditions] =
    useState<string[]>([]);


  // =====================================================
  // E-MAIL
  // =====================================================

  const [email, setEmail] =
    useState('');


  // =====================================================
  // SENHAS
  // =====================================================

  const [senhaAtual, setSenhaAtual] =
    useState('');

  const [novaSenha, setNovaSenha] =
    useState('');

  const [confirmarSenha, setConfirmarSenha] =
    useState('');

  const [alterandoSenha, setAlterandoSenha] =
    useState(false);

  const [mostrarSenhaAtual, setMostrarSenhaAtual] =
    useState(false);

  const [mostrarNovaSenha, setMostrarNovaSenha] =
    useState(false);

  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] =
    useState(false);


  // =====================================================
  // VERIFICA SE PESO E ALTURA ESTÃO COMO
  // "NÃO INFORMADO"
  // =====================================================

  const measurementsNotInformed =
    weight === 'Não informado' &&
    height === 'Não informado';


  // =====================================================
  // CARREGAR DADOS DO FIRESTORE
  // =====================================================

  useEffect(() => {

    async function carregarDados() {

      try {

        const user =
          auth.currentUser;


        if (!user) {

          Alert.alert(
            'Erro',
            'Usuário não autenticado.'
          );

          router.replace('/(auth)/login');

          return;

        }


        const userRef =
          doc(
            db,
            'users',
            user.uid
          );


        const snapshot =
          await getDoc(userRef);


        if (!snapshot.exists()) {

          Alert.alert(
            'Erro',
            'Não foi possível encontrar seus dados.'
          );

          return;

        }


        const data =
          snapshot.data();


        // =================================================
        // DADOS PESSOAIS
        // =================================================

        setFullName(
          typeof data.fullName === 'string'
            ? data.fullName
            : ''
        );


        setBirthYear(
          data.birthYear != null
            ? String(data.birthYear)
            : ''
        );


        setPhone(
          typeof data.phone === 'string'
            ? data.phone
            : ''
        );


        // =================================================
        // CICLO
        // =================================================

        setCycleType(
          typeof data.cycleType === 'string'
            ? data.cycleType
            : ''
        );


        setPeriodDuration(
          data.periodDuration != null
            ? String(data.periodDuration)
            : ''
        );


        setCycleLength(
          data.cycleLength != null
            ? String(data.cycleLength)
            : ''
        );


        // =================================================
        // OBJETIVOS
        // =================================================

        setGoals(
          Array.isArray(data.goals)
            ? data.goals
            : []
        );


        // =================================================
        // SAÚDE
        // =================================================

        setWeight(
          data.weight != null
            ? String(data.weight)
            : ''
        );


        setHeight(
          data.height != null
            ? String(data.height)
            : ''
        );


        setContraceptive(
          typeof data.contraceptive === 'string'
            ? data.contraceptive
            : ''
        );


        // =================================================
        // CONDIÇÕES
        // =================================================

        setHealthConditions(
          Array.isArray(data.healthConditions)
            ? data.healthConditions
            : []
        );


        // =================================================
        // E-MAIL
        // =================================================

        setEmail(
          typeof data.email === 'string'
            ? data.email
            : user.email ?? ''
        );

      } catch (error) {

        console.log(
          'Erro ao carregar perfil:',
          error
        );

        Alert.alert(
          'Erro',
          'Não foi possível carregar seus dados.'
        );

      } finally {

        setLoading(false);

      }

    }


    carregarDados();

  }, []);


  // =====================================================
  // CONTROLE DO SCROLL
  // =====================================================

  function handleScroll(
    event: any
  ) {

    const offsetY =
      event.nativeEvent.contentOffset.y;


    setShowScrollTop(
      offsetY > 250
    );

  }


  // =====================================================
  // BOTÃO FLUTUANTE
  // =====================================================

  function handleFloatingScroll() {

    if (showScrollTop) {

      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });

    } else {

      scrollRef.current?.scrollToEnd({
        animated: true,
      });

    }

  }


  // =====================================================
  // VOLTAR A INFORMAR PESO E ALTURA
  // =====================================================

  function informarMedidas() {

    setWeight('');
    setHeight('');

  }


  // =====================================================
  // NÃO INFORMAR PESO E ALTURA
  // =====================================================

  function naoInformarMedidas() {

    setWeight(
      'Não informado'
    );

    setHeight(
      'Não informado'
    );

  }


  // =====================================================
  // ALTERAR SENHA
  // =====================================================

  async function handleAlterarSenha() {

    if (
      !senhaAtual ||
      !novaSenha ||
      !confirmarSenha
    ) {

      Alert.alert(
        'Atenção',
        'Preencha todos os campos de senha.'
      );

      return;

    }


    if (
      !/^\d{4}$/.test(senhaAtual)
    ) {

      Alert.alert(
        'Senha atual inválida',
        'A senha atual deve possuir exatamente 4 números.'
      );

      return;

    }


    if (
      !/^\d{4}$/.test(novaSenha)
    ) {

      Alert.alert(
        'Nova senha inválida',
        'A nova senha deve possuir exatamente 4 números.'
      );

      return;

    }


    if (
      novaSenha !== confirmarSenha
    ) {

      Alert.alert(
        'Senhas diferentes',
        'A confirmação da nova senha não corresponde à nova senha.'
      );

      return;

    }


    if (
      senhaAtual === novaSenha
    ) {

      Alert.alert(
        'Atenção',
        'A nova senha deve ser diferente da senha atual.'
      );

      return;

    }


    try {

      setAlterandoSenha(true);


      const sucesso =
        await alterarSenha(
          senhaAtual,
          novaSenha
        );


      if (!sucesso) {

        Alert.alert(
          'Senha incorreta',
          'A senha atual informada está incorreta.'
        );

        setSenhaAtual('');

        return;

      }


      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');


      Alert.alert(
        'Senha alterada',
        'Sua senha foi alterada com sucesso.'
      );

    } catch (error) {

      console.log(
        'Erro ao alterar senha:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível alterar sua senha.'
      );

    } finally {

      setAlterandoSenha(false);

    }

  }


  // =====================================================
  // SALVAR ALTERAÇÕES
  // =====================================================

  async function salvarAlteracoes() {

    const user =
      auth.currentUser;


    if (!user) {

      Alert.alert(
        'Erro',
        'Usuário não autenticado.'
      );

      return;

    }


    if (!fullName.trim()) {

      Alert.alert(
        'Atenção',
        'Informe seu nome completo.'
      );

      return;

    }


    try {

      setSaving(true);


      const userRef =
        doc(
          db,
          'users',
          user.uid
        );


      await updateDoc(
        userRef,
        {

          fullName:
            fullName.trim(),

          birthYear:
            birthYear.trim(),

          phone:
            phone.trim(),

          cycleType,

          periodDuration,

          cycleLength,

          goals,

          weight:
            weight.trim(),

          height:
            height.trim(),

          contraceptive,

          healthConditions,

          email:
            email.trim(),

        }
      );


      Alert.alert(
        'Tudo certo!',
        'Seus dados foram atualizados com sucesso.',
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
        'Erro ao salvar perfil:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível salvar suas alterações.'
      );

    } finally {

      setSaving(false);

    }

  }


  // =====================================================
  // OBJETIVOS
  // =====================================================

  function toggleGoal(
    goal: string
  ) {

    if (goals.includes(goal)) {

      setGoals(
        goals.filter(
          item => item !== goal
        )
      );

    } else {

      setGoals([
        ...goals,
        goal,
      ]);

    }

  }


  // =====================================================
  // CONDIÇÕES DE SAÚDE
  // =====================================================

  function toggleCondition(
    condition: string
  ) {

    if (condition === 'Nenhuma') {

      setHealthConditions([
        'Nenhuma',
      ]);

      return;

    }


    let updated =
      healthConditions.filter(
        item =>
          item !== 'Nenhuma'
      );


    if (
      updated.includes(condition)
    ) {

      updated =
        updated.filter(
          item =>
            item !== condition
        );

    } else {

      updated.push(condition);

    }


    setHealthConditions(
      updated
    );

  }


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <Background>

        <View
          style={
            styles.loadingContainer
          }
        >

          <ActivityIndicator
            size="large"
            color={
              cycleColors.rose
            }
          />

          <Text
            style={
              styles.loadingText
            }
          >
            Carregando seus dados...
          </Text>

        </View>

      </Background>

    );

  }


  // =====================================================
  // TELA
  // =====================================================

  return (
    <Background>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={['top', 'left', 'right']}
      >
        <KeyboardAvoidingView
          style={styles.keyboard}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }
      >

        {/* =================================================
            HEADER FIXO
        ================================================= */}

        <View
          style={
            styles.fixedHeader
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
            style={
              styles.fixedHeaderTitle
            }
          >
            Editar perfil
          </Text>

        </View>


        {/* =================================================
            CONTEÚDO ROLÁVEL
        ================================================= */}

        <ScrollView
          ref={
            scrollRef
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            styles.scroll
          }
          onScroll={
            handleScroll
          }
          scrollEventThrottle={16}
        >

          {/* =================================================
              SUBTÍTULO
          ================================================= */}

          <View
            style={
              styles.headerText
            }
          >

            <Text
              style={
                styles.eyebrow
              }
            >
              SUA CONTA
            </Text>


            <Text
              style={
                styles.subtitle
              }
            >
              Atualize seus dados sempre que precisar.
            </Text>

          </View>


          {/* =================================================
              DADOS PESSOAIS
          ================================================= */}

          <Section
            icon="person-outline"
            title="Dados pessoais"
          >

            <Field
              label="Nome completo"
              value={
                fullName
              }
              onChangeText={
                setFullName
              }
              placeholder="Digite seu nome"
            />


            <Field
              label="Ano de nascimento"
              value={
                birthYear
              }
              onChangeText={
                (text) => {

                  const value =
                    text
                      .replace(
                        /[^0-9]/g,
                        ''
                      )
                      .slice(
                        0,
                        4
                      );

                  setBirthYear(
                    value
                  );

                }
              }
              placeholder="Ex: 2006"
              keyboardType="number-pad"
            />


            <Field
              label="Celular"
              value={
                phone
              }
              onChangeText={
                (text) => {

                  const numbers =
                    text.replace(
                      /[^0-9]/g,
                      ''
                    );


                  let formatted =
                    numbers;


                  if (
                    numbers.length <= 2
                  ) {

                    formatted =
                      `(${numbers}`;

                  } else if (
                    numbers.length <= 7
                  ) {

                    formatted =
                      `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;

                  } else {

                    formatted =
                      `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;

                  }


                  setPhone(
                    formatted
                  );

                }
              }
              placeholder="(11) 99999-9999"
              keyboardType="number-pad"
            />

          </Section>


          {/* =================================================
              CONTA
          ================================================= */}

          <Section
            icon="mail-outline"
            title="Conta"
          >

            <Field
              label="E-mail"
              value={
                email
              }
              onChangeText={
                setEmail
              }
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />


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
                Alterar este campo atualiza o
                e-mail salvo no perfil. O e-mail
                usado para autenticação no Firebase
                Authentication é separado.
              </Text>

            </View>

          </Section>


          {/* =================================================
              SEGURANÇA
          ================================================= */}

          <Section
            icon="lock-closed-outline"
            title="Segurança"
          >

            <Text
              style={
                styles.label
              }
            >
              Altere sua senha de acesso à área segura.
            </Text>


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
                Senha atual
              </Text>


              <View
                style={
                  styles.passwordContainer
                }
              >

                <TextInput
                  style={
                    styles.passwordInput
                  }
                  value={
                    senhaAtual
                  }
                  onChangeText={
                    (text) =>
                      setSenhaAtual(
                        text
                          .replace(
                            /[^0-9]/g,
                            ''
                          )
                          .slice(
                            0,
                            4
                          )
                      )
                  }
                  placeholder="Digite a senha atual"
                  placeholderTextColor={
                    cycleColors.textMuted
                  }
                  keyboardType="number-pad"
                  secureTextEntry={
                    !mostrarSenhaAtual
                  }
                  maxLength={4}
                  editable={
                    !alterandoSenha
                  }
                />


                <TouchableOpacity
                  style={
                    styles.passwordToggle
                  }
                  activeOpacity={0.7}
                  onPress={() =>
                    setMostrarSenhaAtual(
                      !mostrarSenhaAtual
                    )
                  }
                >

                  <Ionicons
                    name={
                      mostrarSenhaAtual
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={21}
                    color={
                      cycleColors.textMuted
                    }
                  />

                </TouchableOpacity>

              </View>

            </View>


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
                Nova senha
              </Text>


              <View
                style={
                  styles.passwordContainer
                }
              >

                <TextInput
                  style={
                    styles.passwordInput
                  }
                  value={
                    novaSenha
                  }
                  onChangeText={
                    (text) =>
                      setNovaSenha(
                        text
                          .replace(
                            /[^0-9]/g,
                            ''
                          )
                          .slice(
                            0,
                            4
                          )
                      )
                  }
                  placeholder="Digite a nova senha"
                  placeholderTextColor={
                    cycleColors.textMuted
                  }
                  keyboardType="number-pad"
                  secureTextEntry={
                    !mostrarNovaSenha
                  }
                  maxLength={4}
                  editable={
                    !alterandoSenha
                  }
                />


                <TouchableOpacity
                  style={
                    styles.passwordToggle
                  }
                  activeOpacity={0.7}
                  onPress={() =>
                    setMostrarNovaSenha(
                      !mostrarNovaSenha
                    )
                  }
                >

                  <Ionicons
                    name={
                      mostrarNovaSenha
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={21}
                    color={
                      cycleColors.textMuted
                    }
                  />

                </TouchableOpacity>

              </View>

            </View>


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
                Confirmar nova senha
              </Text>


              <View
                style={
                  styles.passwordContainer
                }
              >

                <TextInput
                  style={
                    styles.passwordInput
                  }
                  value={
                    confirmarSenha
                  }
                  onChangeText={
                    (text) =>
                      setConfirmarSenha(
                        text
                          .replace(
                            /[^0-9]/g,
                            ''
                          )
                          .slice(
                            0,
                            4
                          )
                      )
                  }
                  placeholder="Digite a nova senha novamente"
                  placeholderTextColor={
                    cycleColors.textMuted
                  }
                  keyboardType="number-pad"
                  secureTextEntry={
                    !mostrarConfirmarSenha
                  }
                  maxLength={4}
                  editable={
                    !alterandoSenha
                  }
                />


                <TouchableOpacity
                  style={
                    styles.passwordToggle
                  }
                  activeOpacity={0.7}
                  onPress={() =>
                    setMostrarConfirmarSenha(
                      !mostrarConfirmarSenha
                    )
                  }
                >

                  <Ionicons
                    name={
                      mostrarConfirmarSenha
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={21}
                    color={
                      cycleColors.textMuted
                    }
                  />

                </TouchableOpacity>

              </View>

            </View>


            <View
              style={
                styles.infoBox
              }
            >

              <Ionicons
                name="shield-checkmark-outline"
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
                Sua senha deve possuir exatamente
                4 números. A alteração será aplicada
                somente à senha da área segura.
              </Text>

            </View>


            <TouchableOpacity
              activeOpacity={0.8}
              disabled={
                alterandoSenha
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
                {alterandoSenha ? (
                  <ActivityIndicator
                    color={
                      cycleColors.white
                    }
                  />
                ) : (
                  <>
                    <Ionicons
                      name="key-outline"
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
                      Alterar senha
                    </Text>
                  </>
                )}
              </View>
            </TouchableOpacity>

          </Section>


          {/* =================================================
              CICLO
          ================================================= */}

          <Section
            icon="calendar-outline"
            title="Ciclo menstrual"
          >

            <Text
              style={
                styles.label
              }
            >
              Sua menstruação costuma ser:
            </Text>


            <View
              style={
                styles.chips
              }
            >

              {cycleTypeOptions.map(
                option => {

                  const selected =
                    cycleType ===
                    option.value;


                  return (

                    <TouchableOpacity
                      key={
                        option.value
                      }
                      style={[
                        styles.optionChip,
                        selected &&
                          styles.optionChipSelected,
                      ]}
                      onPress={() =>
                        setCycleType(
                          option.value
                        )
                      }
                    >

                      <Text
                        style={[
                          styles.optionChipText,
                          selected &&
                            styles.optionChipTextSelected,
                        ]}
                      >
                        {
                          option.label
                        }
                      </Text>

                    </TouchableOpacity>

                  );

                }
              )}

            </View>


            <Text
              style={
                styles.label
              }
            >
              Quantos dias costuma durar sua menstruação?
            </Text>


            <View
              style={
                styles.chips
              }
            >

              {periodOptions.map(
                option => {

                  const selected =
                    periodDuration ===
                    option;


                  return (

                    <TouchableOpacity
                      key={
                        option
                      }
                      style={[
                        styles.optionChip,
                        selected &&
                          styles.optionChipSelected,
                      ]}
                      onPress={() =>
                        setPeriodDuration(
                          option
                        )
                      }
                    >

                      <Text
                        style={[
                          styles.optionChipText,
                          selected &&
                            styles.optionChipTextSelected,
                        ]}
                      >
                        {
                          option
                        }
                      </Text>

                    </TouchableOpacity>

                  );

                }
              )}

            </View>


            <Text
              style={
                styles.label
              }
            >
              Quantos dias costuma durar seu ciclo?
            </Text>


            <View
              style={
                styles.chips
              }
            >

              {cycleOptions.map(
                option => {

                  const selected =
                    cycleLength ===
                    option;


                  return (

                    <TouchableOpacity
                      key={
                        option
                      }
                      style={[
                        styles.optionChip,
                        selected &&
                          styles.optionChipSelected,
                      ]}
                      onPress={() =>
                        setCycleLength(
                          option
                        )
                      }
                    >

                      <Text
                        style={[
                          styles.optionChipText,
                          selected &&
                            styles.optionChipTextSelected,
                        ]}
                      >
                        {
                          option
                        }
                      </Text>

                    </TouchableOpacity>

                  );

                }
              )}

            </View>

          </Section>


          {/* =================================================
              OBJETIVOS
          ================================================= */}

          <Section
            icon="flag-outline"
            title="Objetivos"
          >

            <Text
              style={
                styles.label
              }
            >
              Selecione tudo o que deseja acompanhar:
            </Text>


            <View
              style={
                styles.chips
              }
            >

              {goalOptions.map(
                goal => {

                  const selected =
                    goals.includes(
                      goal
                    );


                  return (

                    <TouchableOpacity
                      key={
                        goal
                      }
                      style={[
                        styles.optionChip,
                        selected &&
                          styles.optionChipSelected,
                      ]}
                      onPress={() =>
                        toggleGoal(
                          goal
                        )
                      }
                    >

                      <Text
                        style={[
                          styles.optionChipText,
                          selected &&
                            styles.optionChipTextSelected,
                        ]}
                      >
                        {
                          goal
                        }
                      </Text>

                    </TouchableOpacity>

                  );

                }
              )}

            </View>

          </Section>


          {/* =================================================
              SAÚDE
          ================================================= */}

          <Section
            icon="heart-outline"
            title="Saúde"
          >

            <Text
              style={
                styles.label
              }
            >
              Qual sua altura?
            </Text>


            <View
              style={
                styles.measureContainer
              }
            >

              <TextInput
                style={[
                  styles.measureInput,
                  measurementsNotInformed &&
                    styles.measureInputNotInformed,
                ]}
                value={
                  height
                }
                onChangeText={
                  setHeight
                }
                placeholder="Ex: 1,65"
                placeholderTextColor={
                  cycleColors.textMuted
                }
                keyboardType="decimal-pad"
                editable={
                  height !== 'Não informado'
                }
              />


              {height !== 'Não informado' && (

                <Text
                  style={
                    styles.measureUnit
                  }
                >
                  metros
                </Text>

              )}

            </View>


            <Text
              style={
                styles.label
              }
            >
              Qual seu peso?
            </Text>


            <View
              style={
                styles.measureContainer
              }
            >

              <TextInput
                style={[
                  styles.measureInput,
                  measurementsNotInformed &&
                    styles.measureInputNotInformed,
                ]}
                value={
                  weight
                }
                onChangeText={
                  setWeight
                }
                placeholder="Ex: 60"
                placeholderTextColor={
                  cycleColors.textMuted
                }
                keyboardType="decimal-pad"
                editable={
                  weight !== 'Não informado'
                }
              />


              {weight !== 'Não informado' && (

                <Text
                  style={
                    styles.measureUnit
                  }
                >
                  kg
                </Text>

              )}

            </View>


            {measurementsNotInformed ? (

              <TouchableOpacity
                style={
                  styles.optionalButton
                }
                onPress={
                  informarMedidas
                }
              >

                <Ionicons
                  name="create-outline"
                  size={17}
                  color={
                    cycleColors.rose
                  }
                />

                <Text
                  style={
                    styles.optionalText
                  }
                >
                  Informar peso e altura
                </Text>

              </TouchableOpacity>

            ) : (

              <TouchableOpacity
                style={
                  styles.optionalButton
                }
                onPress={
                  naoInformarMedidas
                }
              >

                <Text
                  style={
                    styles.optionalText
                  }
                >
                  Prefiro não informar agora
                </Text>

              </TouchableOpacity>

            )}


            <Text
              style={
                styles.label
              }
            >
              Método contraceptivo
            </Text>


            <View
              style={
                styles.chips
              }
            >

              {contraceptives.map(
                option => {

                  const selected =
                    contraceptive ===
                    option;


                  return (

                    <TouchableOpacity
                      key={
                        option
                      }
                      style={[
                        styles.optionChip,
                        selected &&
                          styles.optionChipSelected,
                      ]}
                      onPress={() =>
                        setContraceptive(
                          option
                        )
                      }
                    >

                      <Text
                        style={[
                          styles.optionChipText,
                          selected &&
                            styles.optionChipTextSelected,
                        ]}
                      >
                        {
                          option
                        }
                      </Text>

                    </TouchableOpacity>

                  );

                }
              )}

            </View>


            <Text
              style={
                styles.label
              }
            >
              Condições de saúde
            </Text>


            <View
              style={
                styles.chips
              }
            >

              {conditions.map(
                condition => {

                  const selected =
                    healthConditions.includes(
                      condition
                    );


                  return (

                    <TouchableOpacity
                      key={
                        condition
                      }
                      style={[
                        styles.optionChip,
                        selected &&
                          styles.optionChipSelected,
                      ]}
                      onPress={() =>
                        toggleCondition(
                          condition
                        )
                      }
                    >

                      <Text
                        style={[
                          styles.optionChipText,
                          selected &&
                            styles.optionChipTextSelected,
                        ]}
                      >
                        {
                          condition
                        }
                      </Text>

                    </TouchableOpacity>

                  );

                }
              )}

            </View>

          </Section>


          {/* =================================================
              SALVAR
          ================================================= */}

          <TouchableOpacity
            activeOpacity={0.8}
            disabled={
              saving
            }
            onPress={
              salvarAlteracoes
            }
          >
            <View
              style={[
                styles.saveButton,
                { backgroundColor: cycleColors.rose },
              ]}
            >
              {saving ? (
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
                    Salvar alterações
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


        {/* =================================================
            BOTÃO FLUTUANTE
        ================================================= */}

        <TouchableOpacity
          style={
            styles.floatingButton
          }
          activeOpacity={0.8}
          onPress={
            handleFloatingScroll
          }
        >

          <Ionicons
            name={
              showScrollTop
                ? 'arrow-up'
                : 'arrow-down'
            }
            size={24}
            color={
              cycleColors.white
            }
          />

        </TouchableOpacity>

      </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>

  );

}


// =====================================================
// SECTION
// =====================================================

function Section({
  icon,
  title,
  children,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  children: React.ReactNode;
}) {

  return (

    <View
      style={
        styles.section
      }
    >

      <View
        style={
          styles.sectionHeader
        }
      >

        <View
          style={
            styles.sectionIcon
          }
        >

          <Ionicons
            name={
              icon
            }
            size={19}
            color={
              cycleColors.rose
            }
          />

        </View>


        <Text
          style={
            styles.sectionTitle
          }
        >
          {
            title
          }
        </Text>

      </View>


      {
        children
      }

    </View>

  );

}


// =====================================================
// FIELD
// =====================================================

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize,
}: {
  label: string;
  value: string;
  onChangeText: (
    value: string
  ) => void;
  placeholder: string;
  keyboardType?: any;
  autoCapitalize?: any;
}) {

  return (

    <View
      style={
        styles.field
      }
    >

      {label !== '' && (

        <Text
          style={
            styles.label
          }
        >
          {
            label
          }
        </Text>

      )}


      <TextInput
        value={
          value
        }
        onChangeText={
          onChangeText
        }
        placeholder={
          placeholder
        }
        placeholderTextColor={
          cycleColors.textMuted
        }
        keyboardType={
          keyboardType
        }
        autoCapitalize={
          autoCapitalize
        }
        style={
          styles.input
        }
      />

    </View>

  );

}