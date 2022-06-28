import { UserProvider } from '@entities/index';

export interface UserSignUpInterface {
  email: string;
  password?: string;
  userProviders?: UserProvider[];

  // Profile
  firstName?: string;
  lastName?: string;
}
