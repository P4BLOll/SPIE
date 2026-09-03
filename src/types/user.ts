// =====================================================
// DADOS UTILIZADOS NO CADASTRO
// =====================================================

export interface UserRegisterData {

  // Dados pessoais

  fullName: string;

  email: string;

  phone: string;

  password: string;

  birthYear: string;


  // Ciclo menstrual

  cycleType: string;

  periodDuration: string;

  lastPeriod: string;

  cycleLength: string;


  // Objetivos

  goals: string[];


  // Corpo e saúde

  weight: string;

  height: string;

  contraceptive: string;

  healthConditions: string[];

}


// =====================================================
// DADOS UTILIZADOS NO LOGIN
// =====================================================

export interface UserLoginData {

  email: string;

  password: string;

}


// =====================================================
// PERFIL SALVO NO FIRESTORE
// =====================================================

export interface UserProfile {
  uid: string;

  // Avatar e Foto
  avatarId: number;
  photoUrl?: string | null;

  // Dados pessoais
  fullName: string;
  email: string;
  phone: string;
  birthYear: string;

  // Ciclo menstrual
  cycleType: string;
  periodDuration: string;
  lastPeriod: string;
  cycleLength: string;

  // Objetivos
  goals: string[];

  // Corpo e saúde
  weight: string;
  height: string;
  contraceptive: string;
  healthConditions: string[];

  // Conta
  createdAt: string;
}