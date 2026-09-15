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
    label: 'Not sure',
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
  'Not sure',
];

const cycleOptions = [
  '21',
  '24',
  '26',
  '28',
  '30',
  '35',
  'Not sure',
];

const goalOptions = [
  'Track my cycle',
  'Get pregnant',
  'Track pregnancy',
  'Understand my body',
  'Monitor cervical mucus',
  'Improve sexual health',
];

const conditions = [
  'None',
  'PCOS',
  'Endometriosis',
  'Adenomyosis',
  'Diabetes',
  'Hypertension',
  'Thyroid',
];

const contraceptives = [
  'None',
  'Birth control pill',
  'IUD',
  'Implant',
  'Injection',
  'Condom',
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
    (weight === 'Não informado' || weight === 'Not specified') &&
    (height === 'Não informado' || height === 'Not specified');


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
            'Error',
            'User not authenticated.'
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
            'Error',
            'Could not find your profile data.'
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
          'Error loading profile:',
          error
        );

        Alert.alert(
          'Error',
          'Could not load your profile data.'
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
      'Not specified'
    );

    setHeight(
      'Not specified'
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
        'Attention',
        'Please fill in all PIN fields.'
      );

      return;

    }


    if (
      !/^\d{4}$/.test(senhaAtual)
    ) {

      Alert.alert(
        'Invalid current PIN',
        'Current PIN must be exactly 4 digits.'
      );

      return;

    }


    if (
      !/^\d{4}$/.test(novaSenha)
    ) {

      Alert.alert(
        'Invalid new PIN',
        'New PIN must be exactly 4 digits.'
      );

      return;

    }


    if (
      novaSenha !== confirmarSenha
    ) {

      Alert.alert(
        'PINs do not match',
        'The confirmation PIN does not match the new PIN.'
      );

      return;

    }


    if (
      senhaAtual === novaSenha
    ) {

      Alert.alert(
        'Attention',
        'The new PIN must be different from current PIN.'
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
          'Incorrect PIN',
          'The current PIN provided is incorrect.'
        );

        setSenhaAtual('');

        return;

      }


      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');


      Alert.alert(
        'PIN changed',
        'Your PIN has been changed successfully.'
      );

    } catch (error) {

      console.log(
        'Error changing PIN:',
        error
      );

      Alert.alert(
        'Error',
        'Could not change your PIN.'
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
        'Error',
        'User not authenticated.'
      );

      return;

    }


    if (!fullName.trim()) {

      Alert.alert(
        'Attention',
        'Please enter your full name.'
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
        'All set!',
        'Your details have been updated successfully.',
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
        'Error saving profile:',
        error
      );

      Alert.alert(
        'Error',
        'Could not save your changes.'
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

    if (condition === 'None' || condition === 'Nenhuma') {

      setHealthConditions([
        'None',
      ]);

      return;

    }


    let updated =
      healthConditions.filter(
        item =>
          item !== 'None' && item !== 'Nenhuma'
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
            Loading your data...
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
            Edit profile
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
              YOUR ACCOUNT
            </Text>


            <Text
              style={
                styles.subtitle
              }
            >
              Update your details whenever you need to.
            </Text>

          </View>


          {/* =================================================
              DADOS PESSOAIS
          ================================================= */}

          <Section
            icon="person-outline"
            title="Personal details"
          >

            <Field
              label="Full name"
              value={
                fullName
              }
              onChangeText={
                setFullName
              }
              placeholder="Enter your full name"
            />


            <Field
              label="Birth year"
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
              placeholder="e.g. 2006"
              keyboardType="number-pad"
            />


            <Field
              label="Phone"
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
              placeholder="(555) 000-0000"
              keyboardType="number-pad"
            />

          </Section>


          {/* =================================================
              CONTA
          ================================================= */}

          <Section
            icon="mail-outline"
            title="Account"
          >

            <Field
              label="Email"
              value={
                email
              }
              onChangeText={
                setEmail
              }
              placeholder="Enter your email"
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
                Changing this field updates the email saved in your profile. The email used for Firebase Authentication sign-in remains separate.
              </Text>

            </View>

          </Section>


          {/* =================================================
              SEGURANÇA
          ================================================= */}

          <Section
            icon="lock-closed-outline"
            title="Security"
          >

            <Text
              style={
                styles.label
              }
            >
              Change your PIN for access to the secret vault.
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
                Current PIN
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
                  placeholder="Enter current PIN"
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
                New PIN
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
                  placeholder="Enter new PIN"
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
                Confirm new PIN
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
                  placeholder="Confirm new PIN"
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
                Your PIN must be exactly 4 digits. This change only applies to your secret vault access.
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
                      Change PIN
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
            title="Menstrual cycle"
          >

            <Text
              style={
                styles.label
              }
            >
              Your period tends to be:
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
              How many days does your period usually last?
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
              How many days does your cycle usually last?
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
            title="Goals"
          >

            <Text
              style={
                styles.label
              }
            >
              Select everything you would like to track:
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
            title="Health"
          >

            <Text
              style={
                styles.label
              }
            >
              What is your height?
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
                placeholder="e.g. 1.65"
                placeholderTextColor={
                  cycleColors.textMuted
                }
                keyboardType="decimal-pad"
                editable={
                  height !== 'Não informado' && height !== 'Not specified'
                }
              />


              {height !== 'Não informado' && height !== 'Not specified' && (

                <Text
                  style={
                    styles.measureUnit
                  }
                >
                  meters
                </Text>

              )}

            </View>


            <Text
              style={
                styles.label
              }
            >
              What is your weight?
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
                placeholder="e.g. 60"
                placeholderTextColor={
                  cycleColors.textMuted
                }
                keyboardType="decimal-pad"
                editable={
                  weight !== 'Não informado' && weight !== 'Not specified'
                }
              />


              {weight !== 'Não informado' && weight !== 'Not specified' && (

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
                  Enter weight and height
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
                  Prefer not to say right now
                </Text>

              </TouchableOpacity>

            )}


            <Text
              style={
                styles.label
              }
            >
              Contraceptive method
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
              Health conditions
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
                    Save changes
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