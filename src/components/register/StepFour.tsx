import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { registerStyles } from '../../styles/register.styles';
import { Colors, cycleColors } from '../../constants/Colors';

type Props = {
  weight: string;
  setWeight: (value: string) => void;
  height: string;
  setHeight: (value: string) => void;
  contraceptive: string;
  setContraceptive: (value: string) => void;
  healthConditions: string[];
  setHealthConditions: (value: string[]) => void;
  nextStep: () => void;
  previousStep: () => void;
};

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

export default function StepFour({
  weight,
  setWeight,
  height,
  setHeight,
  contraceptive,
  setContraceptive,
  healthConditions,
  setHealthConditions,
  nextStep,
  previousStep,
}: Props) {

  const [heightError, setHeightError] = useState(false);
  const [weightError, setWeightError] = useState(false);
  const [contraceptiveError, setContraceptiveError] = useState(false);
  const [healthError, setHealthError] = useState(false);

  function toggleCondition(condition: string) {
    if (condition === 'None') {
      setHealthConditions(['None']);
      setHealthError(false);
      return;
    }

    let updated = healthConditions.filter(
      item => item !== 'None'
    );

    if (updated.includes(condition)) {
      updated = updated.filter(
        item => item !== condition
      );
    } else {
      updated.push(condition);
    }

    setHealthConditions(updated);
    setHealthError(false);
  }

  function handleNext() {
    let error = false;

    if (height === '' || weight === '') {
      if (height === '') setHeightError(true);
      if (weight === '') setWeightError(true);
      error = true;
    }

    if (contraceptive === '') {
      setContraceptiveError(true);
      error = true;
    }

    if (healthConditions.length === 0) {
      setHealthError(true);
      error = true;
    }

    if (error) {
      return;
    }

    nextStep();
  }

  return (
    <View style={registerStyles.form}>

      <Text style={registerStyles.stepTitle}>
        About your body
      </Text>

      <Text style={registerStyles.stepSubtitle}>
        This information helps SPIE personalize your experience.
      </Text>

      <Text style={registerStyles.label}>
        What is your height?
      </Text>

      <View
        style={[
          registerStyles.measureContainer,
          heightError && { borderColor: cycleColors.danger, borderWidth: 1 }
        ]}
      >
        <TextInput
          style={registerStyles.measureInput}
          placeholder="e.g. 1.65"
          placeholderTextColor={Colors.textMuted}
          keyboardType="decimal-pad"
          value={height}
          onChangeText={(text) => {
            setHeight(text);
            setHeightError(false);
          }}
        />

        <Text style={registerStyles.measureUnit}>
          meters
        </Text>
      </View>

      {heightError && (
        <Text style={{ color: cycleColors.danger, fontSize: 13, marginTop: 4 }}>
          Please enter your height or choose to skip
        </Text>
      )}

      <Text style={registerStyles.label}>
        What is your weight?
      </Text>

      <View
        style={[
          registerStyles.measureContainer,
          weightError && { borderColor: cycleColors.danger, borderWidth: 1 }
        ]}
      >
        <TextInput
          style={registerStyles.measureInput}
          placeholder="e.g. 60"
          placeholderTextColor={Colors.textMuted}
          keyboardType="decimal-pad"
          value={weight}
          onChangeText={(text) => {
            setWeight(text);
            setWeightError(false);
          }}
        />

        <Text style={registerStyles.measureUnit}>
          kg
        </Text>
      </View>

      {weightError && (
        <Text style={{ color: cycleColors.danger, fontSize: 13, marginTop: 4 }}>
          Please enter your weight or choose to skip
        </Text>
      )}

      <TouchableOpacity
        style={registerStyles.optionalButton}
        onPress={()=>{
          setWeight('Not specified');
          setHeight('Not specified');
          setWeightError(false);
          setHeightError(false);
        }}
      >
        <Text style={registerStyles.optionalText}>
          Prefer not to say right now
        </Text>
      </TouchableOpacity>

      <Text style={registerStyles.label}>
        Birth control method
      </Text>

      <View
        style={[
          registerStyles.chipsContainer,
          contraceptiveError && { borderColor: cycleColors.danger, borderWidth: 1 }
        ]}
      >
        {contraceptives.map(item => {

          const selected = contraceptive === item;

          return (
            <TouchableOpacity
              key={item}
              style={[
                registerStyles.chip,
                selected && registerStyles.chipSelected
              ]}
              onPress={() => {
                setContraceptive(item);
                setContraceptiveError(false);
              }}
            >
              <Text
                style={[
                  registerStyles.chipText,
                  selected && registerStyles.chipTextSelected
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {contraceptiveError && (
        <Text style={{ color: cycleColors.danger, fontSize: 13, marginTop: 4 }}>
          Please select an option
        </Text>
      )}

      <Text style={registerStyles.label}>
        Health conditions
      </Text>

      <View
        style={[
          registerStyles.chipsContainer,
          healthError && { borderColor: cycleColors.danger, borderWidth: 1 }
        ]}
      >
        {conditions.map(item => {

          const selected = healthConditions.includes(item);

          return (
            <TouchableOpacity
              key={item}
              style={[
                registerStyles.chip,
                selected && registerStyles.chipSelected
              ]}
              onPress={() => toggleCondition(item)}
            >
              <Text
                style={[
                  registerStyles.chipText,
                  selected && registerStyles.chipTextSelected
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {healthError && (
        <Text style={{ color: cycleColors.danger, fontSize: 13, marginTop: 4 }}>
          Please select an option
        </Text>
      )}

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
          style={registerStyles.nextButton}
          onPress={handleNext}
        >
          <Text style={registerStyles.nextButtonText}>
            Next
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}