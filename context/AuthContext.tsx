"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { User } from '@/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let unsubscribe = () => { };

    if (auth) {
      unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          const userData: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          };
          setUser(userData);
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    } else {
      setAuthError("Firebase authentication is not initialized properly. Check your configuration.");
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string) => {
    try {
      if (!auth) throw new Error("Firebase authentication is not initialized");
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/projects');
    } catch (error: any) {
      console.error("Error signing up:", error);
      setAuthError(error.message);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      if (!auth) throw new Error("Firebase authentication is not initialized");
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/projects');
    } catch (error: any) {
      console.error("Error logging in:", error);
      setAuthError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (!auth) throw new Error("Firebase authentication is not initialized");
      await signOut(auth);
      router.push('/login');
    } catch (error: any) {
      console.error("Error logging out:", error);
      setAuthError(error.message);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      if (!auth) throw new Error("Firebase authentication is not initialized");
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error("Error resetting password:", error);
      setAuthError(error.message);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    authError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}