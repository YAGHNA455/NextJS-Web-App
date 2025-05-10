"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  Auth
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { User } from '@/types';
import { useRouter } from 'next/navigation';

const firebaseAuth: Auth = auth;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    let unsubscribe = () => { };

    if (firebaseAuth) {
      unsubscribe = onAuthStateChanged(firebaseAuth, (firebaseUser) => {
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
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string) => {
    try {
      if (!firebaseAuth) throw new Error("Firebase authentication is not initialized");
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      router.push('/projects');
    } catch (error: any) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      if (!firebaseAuth) throw new Error("Firebase authentication is not initialized");
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      router.push('/projects');
    } catch (error: any) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (!firebaseAuth) throw new Error("Firebase authentication is not initialized");
      await signOut(firebaseAuth);
      router.push('/login');
    } catch (error: any) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      if (!firebaseAuth) throw new Error("Firebase authentication is not initialized");
      await sendPasswordResetEmail(firebaseAuth, email);
    } catch (error: any) {
      console.error("Error resetting password:", error);
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