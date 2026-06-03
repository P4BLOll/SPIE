import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';

interface BackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Background({ children, style }: BackgroundProps) {
  return (
    <LinearGradient
      colors={[Colors.background, '#060A12']} // Transição suave para o tom escuro premium
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});