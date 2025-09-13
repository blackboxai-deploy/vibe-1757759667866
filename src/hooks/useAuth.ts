"use client";

import { useState, useEffect } from "react";
import { User, getStoredUser, setStoredUser, removeStoredUser } from "@/lib/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // For demo purposes, create a mock user on successful "login"
      if (email.includes('@') && password.length >= 6) {
        const mockUser = {
          id: Date.now(),
          email,
          anonymousId: `Anonymous${Math.floor(Math.random() * 1000)}`,
          joinDate: new Date().toISOString()
        };
        
        setStoredUser(mockUser);
        setUser(mockUser);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid email or password. Please check your credentials.' };
      }
    } catch {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (email: string, password: string, confirmPassword: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validation
      if (!email || !password || !confirmPassword) {
        return { success: false, error: 'All fields are required' };
      }

      if (password !== confirmPassword) {
        return { success: false, error: 'Passwords do not match' };
      }

      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters long' };
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        return { success: false, error: 'Please enter a valid email address' };
      }

      // For demo purposes, create a new user
      const mockUser = {
        id: Date.now(),
        email,
        anonymousId: `Anonymous${Math.floor(Math.random() * 1000)}`,
        joinDate: new Date().toISOString()
      };

      setStoredUser(mockUser);
      setUser(mockUser);
      return { success: true };
    } catch {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    removeStoredUser();
    setUser(null);
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}