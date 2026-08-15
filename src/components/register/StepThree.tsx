import React, {useState} from 'react';
import {View,Text,TouchableOpacity,} from 'react-native';
import { registerStyles } from '../../styles/register.styles';

type Props = {
  goals: string[];
  setGoals: (goals: string[]) => void;
  nextStep: () => void;
  previousStep: () => void;
};

const options = [
  'Monitorar meu ciclo',
  'Engravidar',
  'Acompanhar gravidez',
  'Conhecer meu corpo',
  'Entender minha secreção',
  'Melhorar minha vida sexual',
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
        Objetivos
      </Text>

      <Text style={registerStyles.stepSubtitle}>
        Selecione tudo o que deseja acompanhar no SPIE.
      </Text>

      <View
        style={[
          registerStyles.chipsContainer,
          goalError && {borderColor:'red', borderWidth:1}
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
        <Text style={{color:'red'}}>
          Selecione pelo menos um objetivo
        </Text>
      )}

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
          style={registerStyles.nextButton}
          onPress={handleNext}
        >
          <Text style={registerStyles.nextButtonText}>
            Próximo
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}