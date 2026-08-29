export { UserRegisterData, UserLoginData, UserProfile } from '@/modules/user/types/user.types';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  userEmail: string | null;
  userId: string | null;
}
