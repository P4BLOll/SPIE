import React, {useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,} from 'react-native';
import { registerStyles } from '../../styles/register.styles';
import { Colors } from '../../constants/Colors';

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

  const [heightError,setHeightError] = useState(false);
  const [weightError,setWeightError] = useState(false);
  const [contraceptiveError,setContraceptiveError] = useState(false);
  const [healthError,setHealthError] = useState(false);

  function toggleCondition(condition: string){

    if(condition === 'Nenhuma'){
      setHealthConditions(['Nenhuma']);
      setHealthError(false);
      return;
    }

    let updated = healthConditions.filter(
      item => item !== 'Nenhuma'
    );

    if(updated.includes(condition)){
      updated = updated.filter(
        item => item !== condition
      );
    }else{
      updated.push(condition);
    }

    setHealthConditions(updated);
    setHealthError(false);
  }

  function handleNext(){

    let error = false;

    if(height === '' && weight === ''){
      setHeightError(true);
      setWeightError(true);
      error = true;
    }

    if(contraceptive === ''){
      setContraceptiveError(true);
      error = true;
    }

    if(healthConditions.length === 0){
      setHealthError(true);
      error = true;
    }

    if(error){
      return;
    }

    nextStep();
  }

  return (
    <View style={registerStyles.form}>

      <Text style={registerStyles.stepTitle}>
        Sobre seu corpo
      </Text>

      <Text style={registerStyles.stepSubtitle}>
        Essas informações ajudam o SPIE a personalizar sua experiência.
      </Text>

      <Text style={registerStyles.label}>
        Qual sua altura?
      </Text>

      <View
        style={[
          registerStyles.measureContainer,
          heightError && {borderColor:'red',borderWidth:1}
        ]}
      >
        <TextInput
          style={registerStyles.measureInput}
          placeholder="Ex: 1,65"
          placeholderTextColor={Colors.textMuted}
          keyboardType="decimal-pad"
          value={height}
          onChangeText={(text)=>{
            setHeight(text);
            setHeightError(false);
          }}
        />

        <Text style={registerStyles.measureUnit}>
          metros
        </Text>
      </View>

      {heightError && (
        <Text style={{color:'red'}}>
          Preencha sua altura ou escolha não informar
        </Text>
      )}

      <Text style={registerStyles.label}>
        Qual seu peso?
      </Text>

      <View
        style={[
          registerStyles.measureContainer,
          weightError && {borderColor:'red',borderWidth:1}
        ]}
      >
        <TextInput
          style={registerStyles.measureInput}
          placeholder="Ex: 60"
          placeholderTextColor={Colors.textMuted}
          keyboardType="decimal-pad"
          value={weight}
          onChangeText={(text)=>{
            setWeight(text);
            setWeightError(false);
          }}
        />

        <Text style={registerStyles.measureUnit}>
          kg
        </Text>
      </View>

      {weightError && (
        <Text style={{color:'red'}}>
          Preencha seu peso ou escolha não informar
        </Text>
      )}

      <TouchableOpacity
        style={registerStyles.optionalButton}
        onPress={()=>{
          setWeight('Não informado');
          setHeight('Não informado');
          setWeightError(false);
          setHeightError(false);
        }}
      >
        <Text style={registerStyles.optionalText}>
          Prefiro não informar agora
        </Text>
      </TouchableOpacity>

      <Text style={registerStyles.label}>
        Método contraceptivo
      </Text>

      <View
        style={[
          registerStyles.chipsContainer,
          contraceptiveError && {borderColor:'red',borderWidth:1}
        ]}
      >
        {contraceptives.map(item=>{

          const selected = contraceptive === item;

          return(
            <TouchableOpacity
              key={item}
              style={[
                registerStyles.chip,
                selected && registerStyles.chipSelected
              ]}
              onPress={()=>{
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
        <Text style={{color:'red'}}>
          Selecione uma opção
        </Text>
      )}

      <Text style={registerStyles.label}>
        Condições de saúde
      </Text>

      <View
        style={[
          registerStyles.chipsContainer,
          healthError && {borderColor:'red',borderWidth:1}
        ]}
      >
        {conditions.map(item=>{

          const selected = healthConditions.includes(item);

          return(
            <TouchableOpacity
              key={item}
              style={[
                registerStyles.chip,
                selected && registerStyles.chipSelected
              ]}
              onPress={()=>toggleCondition(item)}
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