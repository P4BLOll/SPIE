import {
  auth,
  db,
} from './firebaseConfig';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import {
  doc,
  setDoc,
} from 'firebase/firestore';

import {
  UserRegisterData,
  UserLoginData,
} from '@/types/user';


// =====================================================
// AVATARES DISPONÍVEIS
// =====================================================

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


// =====================================================
// GERAR AVATAR AUTOMATICAMENTE
// =====================================================

function generateAvatarId(
  uid: string
): number {

  let hash = 0;

  for (
    let i = 0;
    i < uid.length;
    i++
  ) {

    hash =
      uid.charCodeAt(i) +
      ((hash << 5) - hash);

  }

  return (
    Math.abs(hash) %
    avatarOptions.length
  );

}


// =====================================================
// CADASTRO
// =====================================================

export async function registerUser(
  data: UserRegisterData
) {

  try {

    // ===================================================
    // 1. CRIAR CONTA NO FIREBASE AUTH
    // ===================================================

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );


    const user =
      userCredential.user;


    // ===================================================
    // 2. GERAR AVATAR DO USUÁRIO
    // ===================================================

    const avatarId =
      generateAvatarId(
        user.uid
      );


    // ===================================================
    // 3. CRIAR PERFIL NO FIRESTORE
    // ===================================================

    await setDoc(
      doc(
        db,
        'users',
        user.uid
      ),
      {

        // -----------------------------------------------
        // IDENTIFICAÇÃO
        // -----------------------------------------------

        uid:
          user.uid,

        avatarId:


          avatarId,


        // -----------------------------------------------
        // DADOS PESSOAIS
        // -----------------------------------------------

        fullName:
          data.fullName,

        email:
          data.email,

        phone:
          data.phone,

        birthYear:
          data.birthYear,


        // -----------------------------------------------
        // CICLO MENSTRUAL
        // -----------------------------------------------

        cycleType:
          data.cycleType,

        periodDuration:
          data.periodDuration,

        lastPeriod:
          data.lastPeriod,

        cycleLength:
          data.cycleLength,


        // -----------------------------------------------
        // OBJETIVOS
        // -----------------------------------------------

        goals:
          data.goals,


        // -----------------------------------------------
        // CORPO E SAÚDE
        // -----------------------------------------------

        weight:
          data.weight,

        height:
          data.height,

        contraceptive:
          data.contraceptive,

        healthConditions:
          data.healthConditions,


        // -----------------------------------------------
        // DATA DE CRIAÇÃO
        // -----------------------------------------------

        createdAt:
          new Date().toISOString(),

      }
    );


    // ===================================================
    // 4. RETORNAR USUÁRIO
    // ===================================================

    return user;


  } catch (error: any) {

    console.log(
      'Erro ao realizar cadastro:',
      error
    );


    throw new Error(
      error.message ||
      'Erro ao realizar o cadastro.'
    );

  }

}


// =====================================================
// LOGIN
// =====================================================

export async function loginUser(
  data: UserLoginData
) {

  try {

    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );


    return userCredential.user;


  } catch (error: any) {

    console.log(
      'Erro ao realizar login:',
      error
    );


    throw new Error(
      error.message ||
      'Erro ao realizar o login.'
    );

  }

}