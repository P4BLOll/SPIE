import React, {useState} from 'react';
import {View,Text,TouchableOpacity,} from 'react-native';
import { registerStyles } from '../../styles/register.styles';

type Props = {
  cycleType: string;
  setCycleType: (value: string) => void;
  periodDuration: string;
  setPeriodDuration: (value: string) => void;
  cycleLength: string;
  setCycleLength: (value: string) => void;
  lastPeriod: string;
  setLastPeriod: (value: string) => void;
  nextStep: () => void;
  previousStep: () => void;
};

export default function StepTwo({
  cycleType,
  setCycleType,
  periodDuration,
  setPeriodDuration,
  cycleLength,
  setCycleLength,
  nextStep,
  previousStep,
}: Props) {

  const [cycleTypeError, setCycleTypeError] = useState(false);
  const [periodError, setPeriodError] = useState(false);
  const [cycleError, setCycleError] = useState(false);

  const periodOptions = [
    '3',
    '4',
    '5',
    '6',
    '7',
    '8+',
    'Não sei'
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

  const handleNext = () => {

    let error = false;

    if(cycleType === ''){
      setCycleTypeError(true);
      error = true;
    }

    if(periodDuration === ''){
      setPeriodError(true);
      error = true;
    }

    if(cycleLength === ''){
      setCycleError(true);
      error = true;
    }

    if(error){
      return;
    }

    nextStep();
  };

  return (
    <View style={registerStyles.form}>

      <Text style={registerStyles.stepTitle}>
        Ciclo menstrual
      </Text>

      <Text style={registerStyles.stepSubtitle}>
        Não sabe alguma resposta? Sem problemas! O SPIE aprenderá sobre seu ciclo conforme você registrar suas menstruações.
      </Text>

      <Text style={registerStyles.label}>
        Sua menstruação costuma ser:
      </Text>

      <View
        style={[
          registerStyles.chipsContainer,
          cycleTypeError && {borderColor:'red', borderWidth:1}
        ]}
      >

        {[
          {
            label:'Regular',
            value:'regular',
          },
          {
            label:'Irregular',
            value:'irregular',
          },
          {
            label:'Não sei',
            value:'unknown',
          },
        ].map((item)=>(

          <TouchableOpacity
            key={item.value}
            style={[
              registerStyles.chip,
              cycleType === item.value &&
              registerStyles.chipSelected,
            ]}
            onPress={()=>{

              setCycleType(item.value);
              setCycleTypeError(false);

            }}
          >

            <Text
              style={[
                registerStyles.chipText,
                cycleType === item.value &&
                registerStyles.chipTextSelected,
              ]}
            >
              {item.label}
            </Text>

          </TouchableOpacity>

        ))}

      </View>

      {cycleTypeError && (
        <Text style={{color:'red'}}>
          Selecione uma opção
        </Text>
      )}

      <Text style={registerStyles.label}>
        Quantos dias costuma durar sua menstruação?
      </Text>

      <View
        style={[
          registerStyles.chipsContainer,
          periodError && {borderColor:'red', borderWidth:1}
        ]}
      >

        {periodOptions.map((item)=>(

          <TouchableOpacity
            key={item}
            style={[
              registerStyles.chip,
              periodDuration === item &&
              registerStyles.chipSelected,
            ]}
            onPress={()=>{

              setPeriodDuration(item);
              setPeriodError(false);

            }}
          >

            <Text
              style={[
                registerStyles.chipText,
                periodDuration === item &&
                registerStyles.chipTextSelected,
              ]}
            >
              {item}
            </Text>

          </TouchableOpacity>

        ))}

      </View>

      {periodError && (
        <Text style={{color:'red'}}>
          Selecione uma opção
        </Text>
      )}

      <Text style={registerStyles.label}>
        Quantos dias costuma durar seu ciclo?
      </Text>

      <View
        style={[
          registerStyles.chipsContainer,
          cycleError && {borderColor:'red', borderWidth:1}
        ]}
      >

        {cycleOptions.map((item)=>(

          <TouchableOpacity
            key={item}
            style={[
              registerStyles.chip,
              cycleLength === item &&
              registerStyles.chipSelected,
            ]}
            onPress={()=>{

              setCycleLength(item);
              setCycleError(false);

            }}
          >

            <Text
              style={[
                registerStyles.chipText,
                cycleLength === item &&
                registerStyles.chipTextSelected,
              ]}
            >
              {item}
            </Text>

          </TouchableOpacity>

        ))}

      </View>

      {cycleError && (
        <Text style={{color:'red'}}>
          Selecione uma opção
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