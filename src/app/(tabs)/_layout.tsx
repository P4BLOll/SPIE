import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  cycleColors,
  TAB_BAR_BASE_HEIGHT,
} from '@/styles/calendar.styles';

import { AppTutorial } from '@/components/AppTutorial';
import { SecretPinFirstAccessModal } from '@/components/SecretPinFirstAccessModal';

// A tab bar é `position: absolute`, então toda tela com rolagem
// precisa reservar TAB_BAR_BASE_HEIGHT + insets.bottom no final do
// conteúdo (ver CalendarScreen.tsx) — senão o fim da lista some
// atrás dela.

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  const tabBarHeight =
    TAB_BAR_BASE_HEIGHT + insets.bottom;

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,

          tabBarActiveTintColor:
            cycleColors.rose,

          tabBarInactiveTintColor:
            cycleColors.textMuted,

          tabBarStyle: {
            backgroundColor:
              cycleColors.surface,

            borderTopWidth: 0,

            elevation: 10,

            shadowColor: '#000',

            shadowOffset: {
              width: 0,
              height: -4,
            },

            shadowOpacity: 0.2,

            shadowRadius: 8,

            height: tabBarHeight,

            paddingTop: 10,

            paddingBottom:
              insets.bottom,

            position: 'absolute',
          },

          tabBarItemStyle: {
            justifyContent: 'center',
            alignItems: 'center',
          },

          tabBarIconStyle: {
            marginTop: 0,
            marginBottom: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="calendar"
          options={{
            title: 'Calendário',

            tabBarIcon: ({
              color,
              focused,
            }) => (
              <Ionicons
                name={
                  focused
                    ? 'calendar'
                    : 'calendar-outline'
                }
                size={24}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="tips"
          options={{
            title: 'Dicas',

            tabBarIcon: ({
              color,
              focused,
            }) => (
              <Ionicons
                name={
                  focused
                    ? 'heart'
                    : 'heart-outline'
                }
                size={24}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="insights"
          options={{
            title: 'Estatísticas',

            tabBarIcon: ({
              color,
              focused,
            }) => (
              <Ionicons
                name={
                  focused
                    ? 'stats-chart'
                    : 'stats-chart-outline'
                }
                size={24}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="secret"
          options={{
            title: 'Secreto',

            tabBarIcon: ({
              color,
              focused,
            }) => (
              <Ionicons
                name={
                  focused
                    ? 'lock-closed'
                    : 'lock-closed-outline'
                }
                size={24}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',

            tabBarIcon: ({
              color,
              focused,
            }) => (
              <Ionicons
                name={
                  focused
                    ? 'person'
                    : 'person-outline'
                }
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>

      {/* 
        O tutorial fica aqui, fora do Tabs.

        Como este layout só é carregado na área autenticada,
        o tutorial não aparece na tela de login.
      */}
      <AppTutorial />
      <SecretPinFirstAccessModal />
    </>
  );
}