import React, {useState} from 'react';
import {View,Text,TouchableOpacity,} from 'react-native';
import { registerStyles } from '../../styles/register.styles';
import { cycleColors } from '@/constants/Colors';

type Props = {
  goals: string[];
  setGoals: (goals: string[]) => void;
  nextStep: () => void;
  previousStep: () => void;
};

const options = [
  'Track my cycle',
  'Get pregnant',
  'Track pregnancy',
  'Understand my body',
  'Monitor cervical mucus',
  'Improve sexual health',
];

export default function StepThree({goals,setGoals,nextStep,previousStep,}: Props) {

  const [goalError, setGoalError] = useState(false);

  function toggleGoal(goal: string) {
    if(goals.includes(goal)){
      setGoals(goals.filter(item => item !== goal));
    } else {
      setGoals([...goals, goal]);
      setGoalError(false);
    }
  }

  function handleNext(){
    if(goals.length === 0){
      setGoalError(true);
      return;
    }
    nextStep();
  }

  return (
    <View style={registerStyles.form}>

      <Text style={registerStyles.stepTitle}>
        Goals
      </Text>

      <Text style={registerStyles.stepSubtitle}>
        Select everything you would like to track with SPIE.
      </Text>

      <View
        style={[
          registerStyles.chipsContainer,
          goalError && { borderColor: cycleColors.danger, borderWidth: 1 }
        ]}
      >
        {options.map(option => {

          const selected = goals.includes(option);

          return (
            <TouchableOpacity
              key={option}
              onPress={() => toggleGoal(option)}
              style={[
                registerStyles.chip,
                selected && registerStyles.chipSelected,
              ]}
            >
              <Text
                style={[
                  registerStyles.chipText,
                  selected && registerStyles.chipTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );

        })}
      </View>

      {goalError && (
        <Text style={{ color: cycleColors.danger, fontSize: 13, marginTop: 4 }}>
          Please select at least one goal
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