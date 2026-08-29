export interface UserRegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  birthYear: string;
  cycleType: string;
  periodDuration: string;
  lastPeriod: string;
  cycleLength: string;
  goals: string[];
  weight: string;
  height: string;
  contraceptive: string;
  healthConditions: string[];
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserProfile {
  uid: string;
  avatarId: number;
  fullName: string;
  email: string;
  phone: string;
  birthYear: string;
  cycleType: string;
  periodDuration: string;
  lastPeriod: string;
  cycleLength: string;
  goals: string[];
  weight: string;
  height: string;
  contraceptive: string;
  healthConditions: string[];
  createdAt: string;
}
