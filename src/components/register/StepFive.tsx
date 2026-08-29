import React, {useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { registerUser } from '@/modules/auth/services/authService';
import { registerStyles } from '@/styles/register.styles';
import { Colors } from '@/constants/Colors';
import { useDialog } from '@/context/DialogContext';

type Props = {
  email: string;
  setEmail: (value:string)=>void;
  password: string;
  setPassword: (value:string)=>void;
  confirmPassword: string;
  setConfirmPassword: (value:string)=>void;
  previousStep: ()=>void;
  goToStep: (step:number)=>void;
  fullName: string;
  phone: string;
  birthYear: string;
  cycleType: string;
  periodDuration: string;
  lastPeriod: string;
  cycleLength: string;
  goals: string[];
  weight: string;
  height: string;
  contraceptive: string;
  healthConditions: string[];
};

export default function StepFive({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  previousStep,
  goToStep,
  fullName,
  phone,
  birthYear,
  cycleType,
  periodDuration,
  lastPeriod,
  cycleLength,
  goals,
  weight,
  height,
  contraceptive,
  healthConditions,
}:Props){

  const router = useRouter();
  const { showAlert } = useDialog();

  const [loading,setLoading] = useState(false);
  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);
  const [acceptedTerms,setAcceptedTerms] = useState(false);

  const [emailError,setEmailError] = useState(false);
  const [passwordError,setPasswordError] = useState(false);
  const [confirmError,setConfirmError] = useState(false);

  async function handleRegister(){

    let error = false;

    if(!email){
      setEmailError(true);
      error = true;
    }

    if(!password){
      setPasswordError(true);
      error = true;
    }

    if(!confirmPassword){
      setConfirmError(true);
      error = true;
    }

    if(error){
      return;
    }

    if(password !== confirmPassword){
      showAlert({
        title: 'Atenção',
        message: 'As senhas digitadas não coincidem. Por favor, verifique.',
        type: 'warning',
      });
      return;
    }

    if(!acceptedTerms){
      showAlert({
        title: 'Termos de Uso',
        message: 'Por favor, aceite os Termos de Uso e a Política de Privacidade para continuar.',
        type: 'warning',
      });
      return;
    }

    try{
      setLoading(true);

      await registerUser({
        fullName,
        email,
        phone,
        password,
        birthYear,
        cycleType,
        periodDuration,
        lastPeriod,
        cycleLength,
        goals,
        weight,
        height,
        contraceptive,
        healthConditions,
      });

      showAlert({
        title: 'Sucesso!',
        message: 'Cadastro realizado com sucesso. Faça login para continuar.',
        type: 'success',
        buttonText: 'Entrar',
        onDismiss: () => router.replace('/(auth)/login'),
      });

    }catch(error:any){
      showAlert({
        title: 'Erro no Cadastro',
        message: error.message || 'Não foi possível concluir o cadastro.',
        type: 'error',
      });
    }finally{
      setLoading(false);
    }

  }

  return(
    <View style={registerStyles.form}>

      <Text style={registerStyles.stepTitle}>
        Criar conta
      </Text>

      <Text style={registerStyles.stepSubtitle}>
        Sua conta está quase pronta. Crie seu acesso para começar sua jornada com o SPIE.
      </Text>

      <Text style={registerStyles.label}>
        E-mail
      </Text>

      <View>

        <TextInput
          style={[
            registerStyles.input,
            emailError && {borderColor:'red',borderWidth:1}
          ]}
          placeholder="Digite seu e-mail"
          placeholderTextColor={Colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text)=>{
            setEmail(text);
            setEmailError(false);
          }}
        />

        {emailError && (
          <Text style={{color:'red'}}>
            Preencha seu e-mail
          </Text>
        )}

      </View>

      <Text style={registerStyles.label}>
        Senha
      </Text>

      <View
        style={[
          registerStyles.passwordContainer,
          passwordError && {borderColor:'red',borderWidth:1}
        ]}
      >

        <TextInput
          style={registerStyles.passwordInput}
          placeholder="Digite sua senha"
          placeholderTextColor={Colors.textMuted}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text)=>{
            setPassword(text);
            setPasswordError(false);
          }}
        />

        <TouchableOpacity
          onPress={()=>setShowPassword(!showPassword)}
        >

          <Ionicons
            name={
              showPassword
              ?
              'eye-off-outline'
              :
              'eye-outline'
            }
            size={22}
            color={Colors.textMuted}
          />

        </TouchableOpacity>

      </View>

      {passwordError && (
        <Text style={{color:'red'}}>
          Preencha sua senha
        </Text>
      )}
            <Text style={registerStyles.label}>
        Confirmar senha
      </Text>

      <View
        style={[
          registerStyles.passwordContainer,
          confirmError && {borderColor:'red',borderWidth:1}
        ]}
      >

        <TextInput
          style={registerStyles.passwordInput}
          placeholder="Digite novamente sua senha"
          placeholderTextColor={Colors.textMuted}
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={(text)=>{
            setConfirmPassword(text);
            setConfirmError(false);
          }}
        />

        <TouchableOpacity
          onPress={()=>setShowConfirmPassword(!showConfirmPassword)}
        >

          <Ionicons
            name={
              showConfirmPassword
              ?
              'eye-off-outline'
              :
              'eye-outline'
            }
            size={22}
            color={Colors.textMuted}
          />

        </TouchableOpacity>

      </View>

      {confirmError && (
        <Text style={{color:'red'}}>
          Confirme sua senha
        </Text>
      )}

      <View style={registerStyles.summaryContainer}>

            <Text style={registerStyles.summaryTitle}>
                Verificar dados
            </Text>

            <View style={registerStyles.summaryHeader}>
                <Text style={registerStyles.summaryTitle}>
                Dados pessoais
                </Text>

          <TouchableOpacity
            onPress={()=>goToStep(1)}
          >
           <Text
                style={{
                    color: Colors.primary,
                    fontWeight:'bold',
                }}
                >
                Editar
                </Text>
          </TouchableOpacity>

        </View>

        <Text style={registerStyles.summaryItem}>
          Nome: {fullName || 'Não informado'}
        </Text>

        <Text style={registerStyles.summaryItem}>
          Ano de nascimento: {birthYear || 'Não informado'}
        </Text>

        <Text style={registerStyles.summaryItem}>
          Celular: {phone || 'Não informado'}
        </Text>


        <View style={registerStyles.summaryHeader}>

          <Text style={registerStyles.summaryTitle}>
            Ciclo menstrual
          </Text>

          <TouchableOpacity
            onPress={()=>goToStep(2)}
          >
            <Text
                style={{
                    color: Colors.primary,
                    fontWeight:'bold',
                }}
                >
                Editar
                </Text>
          </TouchableOpacity>

        </View>

        <Text style={registerStyles.summaryItem}>
          Tipo:
          {
            cycleType === 'regular'
            ?
            ' Regular'
            :
            cycleType === 'irregular'
            ?
            ' Irregular'
            :
            ' Não informado'
          }
        </Text>

        <Text style={registerStyles.summaryItem}>
          Duração:
          {
            periodDuration
            ?
            ` ${periodDuration} dias`
            :
            ' Não informado'
          }
        </Text>

        <Text style={registerStyles.summaryItem}>
          Ciclo:
          {
            cycleLength
            ?
            ` ${cycleLength} dias`
            :
            ' Não informado'
          }
        </Text>


        <View style={registerStyles.summaryHeader}>

          <Text style={registerStyles.summaryTitle}>
            Objetivos
          </Text>

          <TouchableOpacity
            onPress={()=>goToStep(3)}
          >
            <Text
                style={{
                    color: Colors.primary,
                    fontWeight:'bold',
                }}
                >
                Editar
                </Text>
          </TouchableOpacity>

        </View>

        <Text style={registerStyles.summaryItem}>
          {
            goals.length > 0
            ?
            goals.join(', ')
            :
            'Não informado'
          }
        </Text>


        <View style={registerStyles.summaryHeader}>

          <Text style={registerStyles.summaryTitle}>
            Corpo e saúde
          </Text>

          <TouchableOpacity
            onPress={()=>goToStep(4)}
          >
            <Text
                style={{
                    color: Colors.primary,
                    fontWeight:'bold',
                }}
                >
                Editar
                </Text>
          </TouchableOpacity>

        </View>

        <Text style={registerStyles.summaryItem}>
          Altura: {height || 'Não informado'}
        </Text>

        <Text style={registerStyles.summaryItem}>
          Peso: {weight || 'Não informado'}
        </Text>

        <Text style={registerStyles.summaryItem}>
          Contraceptivo: {contraceptive || 'Não informado'}
        </Text>

        <Text style={registerStyles.summaryItem}>
          Saúde:
          {
            healthConditions.length > 0
            ?
            healthConditions.join(', ')
            :
            'Não informado'
          }
        </Text>

      </View>


      <TouchableOpacity
        style={registerStyles.checkboxContainer}
        onPress={()=>setAcceptedTerms(!acceptedTerms)}
      >

        <Ionicons
          name={
            acceptedTerms
            ?
            'checkbox'
            :
            'square-outline'
          }
          size={24}
          color={Colors.primary}
        />

        <Text style={registerStyles.checkboxText}>

          Li e aceito os{' '}

          <Text
            style={registerStyles.linkText}
            onPress={()=>router.push('/legal/terms')}
          >
            Termos de Uso
          </Text>

          {' '}e a{' '}

          <Text
            style={registerStyles.linkText}
            onPress={()=>router.push('/legal/privacy-policy')}
          >
            Política de Privacidade
          </Text>

        </Text>

      </TouchableOpacity>


      <View style={registerStyles.buttonRow}>

        <TouchableOpacity
          style={registerStyles.backButton}
          onPress={previousStep}
        >

          <Text style={registerStyles.backButtonText}>
            Voltar
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={[
            registerStyles.nextButton,
            !acceptedTerms && {
              opacity:0.5
            }
          ]}
          disabled={!acceptedTerms || loading}
          onPress={handleRegister}
        >

          {
            loading
            ?
            (
              <ActivityIndicator
                color={Colors.white}
              />
            )
            :
            (
              <Text style={registerStyles.nextButtonText}>
                Criar conta
              </Text>
            )
          }

        </TouchableOpacity>

      </View>

    </View>
  );
}