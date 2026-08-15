import React from 'react';
import { View, Text } from 'react-native';
import { registerStyles } from '../../styles/register.styles';

type Props = {
  currentStep: number;
  totalSteps: number;
};

export default function StepIndicator({currentStep,totalSteps,}: Props) {
  return (
    <View style={registerStyles.stepContainer}>

      {Array.from({ length: totalSteps }).map((_, index) => {

        const step = index + 1;
        const completed = step < currentStep;
        const active = step === currentStep;

        return (
          <React.Fragment key={step}>

            <View
              style={[
                registerStyles.stepCircle,
                completed && registerStyles.stepCompleted,
                active && registerStyles.stepActive,
              ]}
            >
              <Text
                style={[
                  registerStyles.stepNumber,
                  (completed || active) &&
                    registerStyles.stepNumberActive,
                ]}
              >
                {completed ? '✓' : step}
              </Text>
            </View>

            {step !== totalSteps && (
              <View
                style={[
                  registerStyles.stepLine,
                  completed && registerStyles.stepLineActive,
                ]}
              />
            )}

          </React.Fragment>
        );

      })}

    </View>
  );
}