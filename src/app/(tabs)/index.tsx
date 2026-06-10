import { Redirect } from 'expo-router';

export default function Index() {
  // Redireciona automaticamente o usuário para a tela de login assim que o app abre
  return <Redirect href="/login" />;
}