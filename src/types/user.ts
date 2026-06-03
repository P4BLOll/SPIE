export interface UserRegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserProfile extends UserRegisterData {
  uid: string;
  createdAt: string;
}