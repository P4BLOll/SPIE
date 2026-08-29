import React, { useState } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Background } from '../../components/Background';
import RegisterHeader from '../../components/register/RegisterHeader';
import StepOne from '../../components/register/StepOne';
import StepTwo from '../../components/register/StepTwo';
import StepThree from '../../components/register/StepThree';
import StepFour from '../../components/register/StepFour';
import StepFive from '../../components/register/StepFive';

import { registerStyles } from '../../styles/register.styles';

export default function RegisterScreen() {

  const [step, setStep] = useState(1);

  // Etapa 1 - Dados pessoais
  const [fullName, setFullName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [phone, setPhone] = useState('');

  // Etapa 2 - Ciclo menstrual
  const [cycleType, setCycleType] = useState('');
  const [periodDuration, setPeriodDuration] = useState('');
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState('');

  // Etapa 3 - Objetivos
  const [goals, setGoals] = useState<string[]>([]);

  // Etapa 4 - Saúde
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [contraceptive, setContraceptive] = useState('');
  const [healthConditions, setHealthConditions] = useState<string[]>([]);

  // Etapa 5 - Conta
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function nextStep() {
    if (step < 5) {
      setStep(step + 1);
    }
  }

  function previousStep() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  function goToStep(number: number) {
    setStep(number);
  }

  return (
    <Background>
      <SafeAreaView style={registerStyles.screen} edges={['top', 'left', 'right']}>
        <KeyboardAvoidingView
          style={registerStyles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >

          {/* HEADER FIXO */}
          <RegisterHeader
            currentStep={step}
            totalSteps={5}
          />

          {/* APENAS O CONTEÚDO ROLA */}
          <ScrollView
            style={registerStyles.scroll}
            contentContainerStyle={registerStyles.container}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >

            {step === 1 && (
              <StepOne
                fullName={fullName}
                setFullName={setFullName}
                birthYear={birthYear}
                setBirthYear={setBirthYear}
                phone={phone}
                setPhone={setPhone}
                nextStep={nextStep}
              />
            )}

            {step === 2 && (
              <StepTwo
                cycleType={cycleType}
                setCycleType={setCycleType}
                periodDuration={periodDuration}
                setPeriodDuration={setPeriodDuration}
                lastPeriod={lastPeriod}
                setLastPeriod={setLastPeriod}
                cycleLength={cycleLength}
                setCycleLength={setCycleLength}
                nextStep={nextStep}
                previousStep={previousStep}
              />
            )}

            {step === 3 && (
              <StepThree
                goals={goals}
                setGoals={setGoals}
                nextStep={nextStep}
                previousStep={previousStep}
              />
            )}

            {step === 4 && (
              <StepFour
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                contraceptive={contraceptive}
                setContraceptive={setContraceptive}
                healthConditions={healthConditions}
                setHealthConditions={setHealthConditions}
                nextStep={nextStep}
                previousStep={previousStep}
              />
            )}

            {step === 5 && (
              <StepFive
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                previousStep={previousStep}
                goToStep={goToStep}
                fullName={fullName}
                phone={phone}
                birthYear={birthYear}
                cycleType={cycleType}
                periodDuration={periodDuration}
                lastPeriod={lastPeriod}
                cycleLength={cycleLength}
                goals={goals}
                weight={weight}
                height={height}
                contraceptive={contraceptive}
                healthConditions={healthConditions}
              />
            )}

          </ScrollView>

        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
}