import React from 'react';
import { View, Text } from 'react-native';
import StepIndicator from './StepIndicator';
import { registerStyles } from '../../styles/register.styles';

type Props = {
    currentStep: number;
    totalSteps: number;
};

export default function RegisterHeader({
    currentStep,
    totalSteps,
}: Props) {
    return (
        <View style={registerStyles.headerContainer}>

            <Text style={registerStyles.registerTitle}>
                Create Account
            </Text>

            <Text style={registerStyles.registerSubtitle}>
                Step {currentStep} of {totalSteps}
            </Text>

            <StepIndicator
                currentStep={currentStep}
                totalSteps={totalSteps}
            />

        </View>
    );
}