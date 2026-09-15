import React, {useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { registerUser } from '@/modules/auth/services/authService';
import { registerStyles } from '@/styles/register.styles';
import { Colors, cycleColors } from '@/constants/Colors';
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

    const emailLimpo = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailLimpo || !emailRegex.test(emailLimpo)) {
      setEmailError(true);
      showAlert({
        title: 'Invalid Email',
        message: 'Please enter a valid email address.',
        type: 'warning',
      });
      return;
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      showAlert({
        title: 'Invalid Password',
        message: 'Your password must be at least 6 characters.',
        type: 'warning',
      });
      return;
    }

    if (!confirmPassword) {
      setConfirmError(true);
      showAlert({
        title: 'Confirmation Required',
        message: 'Please confirm your password.',
        type: 'warning',
      });
      return;
    }

    if (password !== confirmPassword) {
      showAlert({
        title: 'Attention',
        message: 'The passwords entered do not match. Please verify.',
        type: 'warning',
      });
      return;
    }

    if (!acceptedTerms) {
      showAlert({
        title: 'Terms of Use',
        message: 'Please accept the Terms of Use and Privacy Policy to continue.',
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
        title: 'Success!',
        message: 'Registration completed successfully. Please log in to continue.',
        type: 'success',
        buttonText: 'Log In',
        onDismiss: () => router.replace('/(auth)/login'),
      });

    }catch(error:any){
      showAlert({
        title: 'Registration Error',
        message: error.message || 'Unable to complete registration.',
        type: 'error',
      });
    }finally{
      setLoading(false);
    }

  }

  return(
    <View style={registerStyles.form}>

      <Text style={registerStyles.stepTitle}>
        Create account
      </Text>

      <Text style={registerStyles.stepSubtitle}>
        Your account is almost ready. Set up your login to start your journey with SPIE.
      </Text>

      <Text style={registerStyles.label}>
        Email
      </Text>

      <View>

        <TextInput
          style={[
            registerStyles.input,
            emailError && { borderColor: cycleColors.danger, borderWidth: 1 }
          ]}
          placeholder="Enter your email"
          placeholderTextColor={Colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError(false);
          }}
        />

        {emailError && (
          <Text style={{ color: cycleColors.danger, fontSize: 13, marginTop: 4 }}>
            Enter a valid email
          </Text>
        )}

      </View>

      <Text style={registerStyles.label}>
        Password
      </Text>

      <View
        style={[
          registerStyles.passwordContainer,
          passwordError && { borderColor: cycleColors.danger, borderWidth: 1 }
        ]}
      >

        <TextInput
          style={registerStyles.passwordInput}
          placeholder="Enter your password"
          placeholderTextColor={Colors.textMuted}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError(false);
          }}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
        >

          <Ionicons
            name={
              showPassword
                ? 'eye-off-outline'
                : 'eye-outline'
            }
            size={22}
            color={Colors.textMuted}
          />

        </TouchableOpacity>

      </View>

      {passwordError && (
        <Text style={{ color: cycleColors.danger, fontSize: 13, marginTop: 4 }}>
          Password must be at least 6 characters
        </Text>
      )}
      <Text style={registerStyles.label}>
        Confirm password
      </Text>

      <View
        style={[
          registerStyles.passwordContainer,
          confirmError && { borderColor: cycleColors.danger, borderWidth: 1 }
        ]}
      >

        <TextInput
          style={registerStyles.passwordInput}
          placeholder="Re-enter your password"
          placeholderTextColor={Colors.textMuted}
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setConfirmError(false);
          }}
        />

        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >

          <Ionicons
            name={
              showConfirmPassword
                ? 'eye-off-outline'
                : 'eye-outline'
            }
            size={22}
            color={Colors.textMuted}
          />

        </TouchableOpacity>

      </View>

      {confirmError && (
        <Text style={{ color: cycleColors.danger, fontSize: 13, marginTop: 4 }}>
          Please confirm your password
        </Text>
      )}

      <View style={registerStyles.summaryContainer}>

            <Text style={registerStyles.summaryTitle}>
                Review details
            </Text>

            <View style={registerStyles.summaryHeader}>
                <Text style={registerStyles.summaryTitle}>
                Personal information
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
                Edit
                </Text>
          </TouchableOpacity>

        </View>

        <Text style={registerStyles.summaryItem}>
          Name: {fullName || 'Not specified'}
        </Text>

        <Text style={registerStyles.summaryItem}>
          Birth year: {birthYear || 'Not specified'}
        </Text>

        <Text style={registerStyles.summaryItem}>
          Phone: {phone || 'Not specified'}
        </Text>


        <View style={registerStyles.summaryHeader}>

          <Text style={registerStyles.summaryTitle}>
            Menstrual cycle
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
                Edit
                </Text>
          </TouchableOpacity>

        </View>

        <Text style={registerStyles.summaryItem}>
          Type:
          {
            cycleType === 'regular'
            ?
            ' Regular'
            :
            cycleType === 'irregular'
            ?
            ' Irregular'
            :
            ' Not specified'
          }
        </Text>

        <Text style={registerStyles.summaryItem}>
          Duration:
          {
            periodDuration
            ?
            ` ${periodDuration} days`
            :
            ' Not specified'
          }
        </Text>

        <Text style={registerStyles.summaryItem}>
          Cycle length:
          {
            cycleLength
            ?
            ` ${cycleLength} days`
            :
            ' Not specified'
          }
        </Text>


        <View style={registerStyles.summaryHeader}>

          <Text style={registerStyles.summaryTitle}>
            Goals
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
                Edit
                </Text>
          </TouchableOpacity>

        </View>

        <Text style={registerStyles.summaryItem}>
          {
            goals.length > 0
            ?
            goals.join(', ')
            :
            'Not specified'
          }
        </Text>


        <View style={registerStyles.summaryHeader}>

          <Text style={registerStyles.summaryTitle}>
            Body and health
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
                Edit
                </Text>
          </TouchableOpacity>

        </View>

        <Text style={registerStyles.summaryItem}>
          Height: {height || 'Not specified'}
        </Text>

        <Text style={registerStyles.summaryItem}>
          Weight: {weight || 'Not specified'}
        </Text>

        <Text style={registerStyles.summaryItem}>
          Contraceptive: {contraceptive || 'Not specified'}
        </Text>

        <Text style={registerStyles.summaryItem}>
          Health conditions:
          {
            healthConditions.length > 0
            ?
            healthConditions.join(', ')
            :
            ' Not specified'
          }
        </Text>

      </View>


      <View style={[registerStyles.checkboxContainer, { alignItems: 'flex-start' }]}>
        <TouchableOpacity
          onPress={() => setAcceptedTerms(!acceptedTerms)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={{ marginRight: 10, marginTop: 2 }}
          activeOpacity={0.7}
        >
          <Ionicons
            name={
              acceptedTerms
                ? 'checkbox'
                : 'square-outline'
            }
            size={24}
            color={Colors.primary}
          />
        </TouchableOpacity>

        <Text style={[registerStyles.checkboxText, { flex: 1 }]}>
          <Text onPress={() => setAcceptedTerms(!acceptedTerms)}>
            I have read and agree to the{' '}
          </Text>

          <Text
            style={registerStyles.linkText}
            onPress={() => router.push('/legal/terms')}
          >
            Terms of Use
          </Text>

          <Text onPress={() => setAcceptedTerms(!acceptedTerms)}>
            {' '}and{' '}
          </Text>

          <Text
            style={registerStyles.linkText}
            onPress={() => router.push('/legal/privacy-policy')}
          >
            Privacy Policy
          </Text>
        </Text>
      </View>


      <View style={registerStyles.buttonRow}>

        <TouchableOpacity
          style={registerStyles.backButton}
          onPress={previousStep}
        >

          <Text style={registerStyles.backButtonText}>
            Back
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
                Create account
              </Text>
            )
          }

        </TouchableOpacity>

      </View>

    </View>
  );
}