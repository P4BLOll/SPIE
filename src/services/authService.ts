import { auth, db } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { UserRegisterData, UserLoginData } from '@/types/user';

// 1. Função de Cadastro (Cria no Auth e salva dados adicionais no Firestore)
export async function registerUser(data: UserRegisterData) {
  try {
    // Cria o usuário no Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;

    // Salva os dados complementares do perfil no Firestore atrelando ao ID do Auth
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      createdAt: new Date().toISOString(),
    });

    return user;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao realizar o cadastro.');
  }
}

// 2. Função de Login
export async function loginUser(data: UserLoginData) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao realizar o login.');
  }
}