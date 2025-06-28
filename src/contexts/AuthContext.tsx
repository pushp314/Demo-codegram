import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { currentUser, User } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  profile: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(currentUser); // Start with logged in user for demo
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - always succeed for demo
    setUser(currentUser);
    toast.success('Welcome back!');
    setLoading(false);
  };

  const signUp = async (email: string, password: string, username: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user creation
    const newUser: User = {
      ...currentUser,
      email,
      username,
      full_name: username,
    };
    
    setUser(newUser);
    toast.success('Account created successfully!');
    setLoading(false);
  };

  const signOut = async () => {
    setUser(null);
    toast.success('Signed out successfully');
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    toast.success('Profile updated successfully');
  };

  const value = {
    user,
    profile: user, // Same as user for simplicity
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};