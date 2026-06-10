import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          height: 64,
          paddingBottom: 0,
        },
      }}
    >
      {/* Aba 1: Painel SOS */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
          ),
        }}
      />

      {/* Aba 2: Contatos */}
      <Tabs.Screen
        name="contacts"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "people" : "people-outline"} size={24} color={color} />
          ),
        }}
      />

      {/* Aba 3: Dispositivo/Pulseira (Nova!) */}
      <Tabs.Screen
        name="device"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "watch" : "watch-outline"} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}