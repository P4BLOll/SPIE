import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import { DeviceProvider } from '@/modules/device/contexts/DeviceContext';
import { EmergencyProvider } from '@/modules/emergency/contexts/EmergencyContext';
import { CycleProvider } from '@/modules/cycle/contexts/CycleContext';
import { SecurityProvider } from '@/modules/security-vault/contexts/SecurityContext';
import { BLEProvider } from '@/context/BLEContext';
import { DialogProvider } from '@/context/DialogContext';

import { CustomDialogModal } from '@/components/common/CustomDialogModal';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />

      <DeviceProvider>
        <EmergencyProvider>
          <BLEProvider>
            <CycleProvider>
              <SecurityProvider>
                <DialogProvider>
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

                  <CustomDialogModal />
                </DialogProvider>
              </SecurityProvider>
            </CycleProvider>
          </BLEProvider>
        </EmergencyProvider>
      </DeviceProvider>
    </GestureHandlerRootView>
  );
}