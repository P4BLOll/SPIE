import { Stack } from 'expo-router';
import { BLEProvider } from '../context/BLEContext';
import { AlertModal } from '../components/AlertModal'; // 👈 Importa o componente visual isolado

export default function RootLayout() {
  return (
    <BLEProvider>
      {/* O Stack cuida da navegação entre as páginas nativas */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
      </Stack>

      {/* 🚨 O Alerta fica injetado aqui na raiz. Ele fica invisível, mas se o estado mudar, ele cobre qualquer tela instantaneamente! */}
      <AlertModal />
    </BLEProvider>
  );
}