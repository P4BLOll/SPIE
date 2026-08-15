import React, { useRef } from 'react';
import { Pressable, Animated } from 'react-native';

// =====================================
// BOTÃO ANIMADO (feedback de toque)
// =====================================
// Encolhe suavemente ao ser pressionado. Mesmo componente usado
// na tela de calendário — centralizado aqui pra não duplicar em
// cada tela.

export function AnimatedPressable({
  style,
  onPress,
  disabled,
  children,
}: {
  style?: any;
  onPress?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  function handlePressIn() {
    if (disabled) return;
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  }

  function handlePressOut() {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  }

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}