'use client'
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { AuthType } from "../types/AuthType";
import { User, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import app from "../firebase/firebase.config";

export const AuthContext = createContext<AuthType | undefined>(undefined);

export const auth = getAuth(app);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
            setUser(currentUser);
            setLoading(false); 
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const signIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUser = (profile: string): Promise<void> => {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, { displayName: profile });
        } else {
            return Promise.reject(new Error('No user is currently signed in'));
        }
    };

    const resetPassword = (email: string) => { 
        return sendPasswordResetEmail(auth, email);
      };

    const logOut = () => {
        return signOut(auth);
    };

    const value: AuthType = {
        user,
        signIn,
        signUp,
        updateUser,
        resetPassword,
        logOut, 
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
