import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { registerStyles } from '../../styles/register.styles';
import { cycleColors } from '../../constants/Colors';

type Props = {
  fullName: string;
  setFullName: (value: string) => void;

  birthYear: string;
  setBirthYear: (value: string) => void;

  phone: string;
  setPhone: (value: string) => void;

  nextStep: () => void;
};

// só letras (incluindo acentos), espaços, apóstrofos e hífens
const REGEX_NOME = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

const ANO_ATUAL = new Date().getFullYear();
const ANO_MINIMO = 1900;

function validarNome(nome: string) {
  const nomeLimpo = nome.trim();
  return nomeLimpo.length >= 2 && REGEX_NOME.test(nomeLimpo);
}

function validarAnoNascimento(ano: string) {
  if (ano.length !== 4) return false;

  const anoNum = Number(ano);
  if (Number.isNaN(anoNum)) return false;

  return anoNum >= ANO_MINIMO && anoNum <= ANO_ATUAL;
}

export default function StepOne({
  fullName,
  setFullName,
  birthYear,
  setBirthYear,
  phone,
  setPhone,
  nextStep,
}: Props) {

  const router = useRouter();

  const [nameError, setNameError] = useState(false);
  const [birthError, setBirthError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleNext = () => {

    let error = false;

    if (!validarNome(fullName)) {
      setNameError(true);
      error = true;
    }

    if (!validarAnoNascimento(birthYear)) {
      setBirthError(true);
      error = true;
    }

    if (phone.replace(/[^0-9]/g, '').length !== 11) {
      setPhoneError(true);
      error = true;
    }

    if (error) {
      return;
    }

    nextStep();
  };

  return (
    <View style={registerStyles.form}>

      <TouchableOpacity
        style={registerStyles.loginLink}
        onPress={() => router.replace('/(auth)/login')}
      >
        <Text style={registerStyles.loginLinkText}>
          Back to login
        </Text>
      </TouchableOpacity>

      <Text style={registerStyles.stepTitle}>
        Personal information
      </Text>

      <Text style={registerStyles.stepSubtitle}>
        Let's start by getting to know you.
      </Text>

      <Text style={registerStyles.label}>
        Full name
      </Text>

      <TextInput
        style={[
          registerStyles.input,
          nameError && { borderColor: cycleColors.danger },
        ]}
        placeholder="Enter your full name"
        placeholderTextColor={cycleColors.textMuted}
        value={fullName}
        onChangeText={(text) => {
          // remove numbers and symbols while typing
          const somenteLetras = text.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '');
          setFullName(somenteLetras);
          setNameError(false);
        }}
      />

      {nameError && (
        <Text style={{ color: cycleColors.danger }}>
          Please enter a valid name (letters only)
        </Text>
      )}

      <Text style={registerStyles.label}>
        Birth year
      </Text>

      <TextInput
        style={[
          registerStyles.input,
          birthError && { borderColor: cycleColors.danger },
        ]}
        placeholder="e.g. 2002"
        placeholderTextColor={cycleColors.textMuted}
        keyboardType="number-pad"
        maxLength={4}
        value={birthYear}
        onChangeText={(text) => {
          const somenteNumeros = text.replace(/[^0-9]/g, '').slice(0, 4);
          setBirthYear(somenteNumeros);
          setBirthError(false);
        }}
      />

      {birthError && (
        <Text style={{ color: cycleColors.danger }}>
          Please enter a valid year (between {ANO_MINIMO} and {ANO_ATUAL})
        </Text>
      )}

      <Text style={registerStyles.label}>
        Phone number
      </Text>

      <TextInput
        style={[
          registerStyles.input,
          phoneError && { borderColor: cycleColors.danger },
        ]}
        placeholder="(11) 99999-9999"
        placeholderTextColor={cycleColors.textMuted}
        keyboardType="number-pad"
        maxLength={15}
        value={phone}
        onChangeText={(text) => {

          const numbers = text.replace(/[^0-9]/g, '');

          let formatted = numbers;

          if (numbers.length <= 2) {
            formatted = `(${numbers}`;
          }
          else if (numbers.length <= 7) {
            formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
          }
          else {
            formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
          }

          setPhone(formatted);
          setPhoneError(false);

        }}
      />

      {phoneError && (
        <Text style={{ color: cycleColors.danger }}>
          Please enter your phone number with area code (11 digits)
        </Text>
      )}

      <TouchableOpacity
        style={[
          registerStyles.nextButton,
          registerStyles.stepOneButton,
        ]}
        onPress={handleNext}
      >
        <Text style={registerStyles.nextButtonText}>
          Next
        </Text>
      </TouchableOpacity>

    </View>
  );
}