import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/services/firebaseConfig';
import { UserRegisterData, UserLoginData } from '../types/auth.types';

export const avatarOptions = [
  'person',
  'person-circle',
  'happy',
  'happy-outline',
  'flower',
  'flower-outline',
  'heart',
  'heart-outline',
  'star',
  'star-outline',
  'moon',
  'moon-outline',
  'paw',
  'paw-outline',
  'sparkles',
  'sparkles-outline',
];

function generateAvatarId(uid: string): number {
  let hash = 0;
  for (let i = 0; i < uid.length; i++) {
    hash = uid.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % avatarOptions.length;
}

/**
 * Serviço responsável por autenticação, cadastro e recuperação de senha.
 */
export const authService = {
  /**
   * Cria nova conta de usuário no Firebase Auth e inicializa o documento no Firestore.
   */
  async register(data: UserRegisterData): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      const avatarId = generateAvatarId(user.uid);

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        avatarId,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        birthYear: data.birthYear,
        cycleType: data.cycleType,
        periodDuration: data.periodDuration,
        lastPeriod: data.lastPeriod,
        cycleLength: data.cycleLength,
        goals: data.goals,
        weight: data.weight,
        height: data.height,
        contraceptive: data.contraceptive,
        healthConditions: data.healthConditions,
        createdAt: new Date().toISOString(),
      });

      return user;
    } catch (error: any) {
      console.warn('[AuthService] Erro ao registrar:', error);
      throw new Error(error.message || 'Erro ao realizar o cadastro.');
    }
  },

  /**
   * Realiza login por e-mail e senha.
   */
  async login(data: UserLoginData): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      return userCredential.user;
    } catch (error: any) {
      console.warn('[AuthService] Erro ao fazer login:', error);
      throw new Error(error.message || 'Erro ao realizar o login.');
    }
  },

  /**
   * Envia e-mail de recuperação de senha com mensagens amigáveis.
   */
  async recoverPassword(email: string): Promise<void> {
    const emailLimpo = email.trim();
    if (!emailLimpo) {
      throw new Error('Por favor, digite seu e-mail.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailLimpo)) {
      throw new Error('Por favor, digite um e-mail válido.');
    }

    try {
      await sendPasswordResetEmail(auth, emailLimpo);
    } catch (error: any) {
      console.warn('[AuthService] Erro ao recuperar senha:', error);
      switch (error?.code) {
        case 'auth/invalid-email':
          throw new Error('O formato do e-mail informado é inválido.');
        case 'auth/user-not-found':
          throw new Error('Não encontramos nenhuma conta cadastrada com este e-mail.');
        case 'auth/missing-email':
          throw new Error('Por favor, informe um endereço de e-mail.');
        case 'auth/too-many-requests':
          throw new Error('Muitas tentativas em pouco tempo. Por favor, aguarde alguns instantes e tente novamente.');
        case 'auth/network-request-failed':
          throw new Error('Falha de conexão com a internet. Verifique sua rede e tente novamente.');
        case 'auth/invalid-credential':
          throw new Error('Não foi possível verificar os dados informados.');
        default:
          throw new Error(error?.message || 'Não foi possível enviar o e-mail de recuperação.');
      }
    }
  },

  /**
   * Encerra a sessão do usuário no aplicativo.
   */
  async logout(): Promise<void> {
    await signOut(auth);
  },
};

// Exporta funções legadas para compatibilidade direta
export const registerUser = authService.register.bind(authService);
export const loginUser = authService.login.bind(authService);
export const recoverPassword = authService.recoverPassword.bind(authService);
