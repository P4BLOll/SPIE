import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { registerStyles } from '../../styles/register.styles';
import { cycleColors } from '@/constants/Colors';

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
  lastPeriod,
  setLastPeriod,
  nextStep,
  previousStep,
}: Props) {

  const [cycleTypeError, setCycleTypeError] = useState(false);
  const [periodError, setPeriodError] = useState(false);
  const [cycleError, setCycleError] = useState(false);
  const [lastPeriodError, setLastPeriodError] = useState(false);

  const periodOptions = [
    '3',
    '4',
    '5',
    '6',
    '7',
    '8+',
    'Not sure'
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

  const lastPeriodOptions = [
    { label: 'This week', diasAtras: 3 },
    { label: '1 to 2 weeks ago', diasAtras: 10 },
    { label: 'About 1 month ago', diasAtras: 28 },
    { label: 'Over 1 month ago', diasAtras: 40 },
    { label: "Don't remember exactly", diasAtras: 0 },
  ];

  const handleNext = () => {
    let error = false;

    if (cycleType === '') {
      setCycleTypeError(true);
      error = true;
    }

    if (periodDuration === '') {
      setPeriodError(true);
      error = true;
    }

    if (cycleLength === '') {
      setCycleError(true);
      error = true;
    }

    if (lastPeriod === '') {
      setLastPeriodError(true);
      error = true;
    }

    if (error) {
      return;
    }

    nextStep();
  };

  return (
    <View style={registerStyles.form}>

      <Text style={registerStyles.stepTitle}>
        Menstrual cycle
      </Text>

      <Text style={registerStyles.stepSubtitle}>
        Don't know an answer? No problem! SPIE will learn about your cycle as you log your periods.
      </Text>

      <Text style={registerStyles.label}>
        Your periods are usually:
      </Text>

      <View
        style={[
          registerStyles.chipsContainer,
          cycleTypeError && { borderColor: cycleColors.danger, borderWidth: 1 }
        ]}
      >

        {[
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
        ].map((item) => (

          <TouchableOpacity
            key={item.value}
            style={[
              registerStyles.chip,
              cycleType === item.value &&
              registerStyles.chipSelected,
            ]}
            onPress={() => {
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
        <Text style={{ color: cycleColors.danger, fontSize: 13, marginTop: 4 }}>
          Please select an option
        </Text>
      )}

      <Text style={registerStyles.label}>
        How many days does your period usually last?
      </Text>

      <View
        style={[
          registerStyles.chipsContainer,
          periodError && { borderColor: cycleColors.danger, borderWidth: 1 }
        ]}
      >

        {periodOptions.map((item) => (

          <TouchableOpacity
            key={item}
            style={[
              registerStyles.chip,
              periodDuration === item &&
              registerStyles.chipSelected,
            ]}
            onPress={() => {
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
        <Text style={{ color: cycleColors.danger, fontSize: 13, marginTop: 4 }}>
          Please select an option
        </Text>
      )}

      <Text style={registerStyles.label}>
        How long is your typical menstrual cycle?
      </Text>

      <View
        style={[
          registerStyles.chipsContainer,
          cycleError && { borderColor: cycleColors.danger, borderWidth: 1 }
        ]}
      >

        {cycleOptions.map((item) => (

          <TouchableOpacity
            key={item}
            style={[
              registerStyles.chip,
              cycleLength === item &&
              registerStyles.chipSelected,
            ]}
            onPress={() => {
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
        <Text style={{ color: cycleColors.danger, fontSize: 13, marginTop: 4 }}>
          Please select an option
        </Text>
      )}

      {/* =================================================
          ÚLTIMA MENSTRUAÇÃO
      ================================================= */}

      <Text style={registerStyles.label}>
        When did your last period start?
      </Text>

      <View
        style={[
          registerStyles.chipsContainer,
          lastPeriodError && { borderColor: cycleColors.danger, borderWidth: 1 }
        ]}
      >
        {lastPeriodOptions.map((item) => {
          const dataCalculada = new Date(Date.now() - item.diasAtras * 86400000).toISOString().split('T')[0];
          const isSelected = lastPeriod === dataCalculada || (item.diasAtras === 0 && lastPeriod === 'unknown');

          return (
            <TouchableOpacity
              key={item.label}
              style={[
                registerStyles.chip,
                isSelected && registerStyles.chipSelected,
              ]}
              onPress={() => {
                setLastPeriod(item.diasAtras === 0 ? 'unknown' : dataCalculada);
                setLastPeriodError(false);
              }}
            >
              <Text
                style={[
                  registerStyles.chipText,
                  isSelected && registerStyles.chipTextSelected,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {lastPeriodError && (
        <Text style={{ color: cycleColors.danger, fontSize: 13, marginTop: 4 }}>
          Please select an option for your last period
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