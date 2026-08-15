import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { BLEProvider } from '../context/BLEContext';
import { CycleProvider } from '@/context/CycleContext';
import { SecurityProvider } from '@/context/SecurityContext';
import { AlertModal } from '../components/AlertModal';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BLEProvider>

        <CycleProvider>

          <SecurityProvider>

            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >

              <Stack.Screen name="(auth)" />

              <Stack.Screen name="(tabs)" />

              <Stack.Screen name="security" />

              <Stack.Screen name="legal" />

            </Stack>

            <AlertModal />

          </SecurityProvider>

        </CycleProvider>

      </BLEProvider>
    </GestureHandlerRootView>
  );
}