import { User } from 'firebase/auth';

export type AuthType = {
    user: User | null;
    signIn: (email: string, password: string) => void;
    signUp: (email: string, password: string) => void;
    updateUser: (profile: string) => void;
    resetPassword: (email: string) => void;
    logOut: () => void;
    loading: boolean;
};