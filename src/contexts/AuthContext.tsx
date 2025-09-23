"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  userType: "student" | "instructor";
  // Optional profile fields
  firstName?: string;
  lastName?: string;
  phone?: string;
  languages?: string;
  dateOfBirth?: string;
  address?: string;
  bio?: string;
  avatarUrl?: string;
  city?: string;
  transmission?: "automatic" | "manual" | "";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    name: string,
    email: string,
    password: string,
    userType: "student" | "instructor"
  ) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  updateUser: (updates: Partial<User>) => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getPasswordKey = (userId: string) => `user_password_${userId}`;
  const getStoredPassword = (userId: string | null) => {
    if (!userId) return null;
    try {
      return localStorage.getItem(getPasswordKey(userId));
    } catch {
      return null;
    }
  };
  const setStoredPassword = (userId: string, pwd: string) => {
    try {
      localStorage.setItem(getPasswordKey(userId), pwd);
    } catch {}
  };

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Demo authentication - in real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

    // Demo users for testing
    const demoUsers: User[] = [
      {
        id: "1",
        name: "John Student",
        email: "student@demo.com",
        userType: "student",
      },
      {
        id: "2",
        name: "Sarah Instructor",
        email: "instructor@demo.com",
        userType: "instructor",
      },
    ];

    // Check if email exists and password is correct (support stored password or demo default: "password")
    const foundUser = demoUsers.find((u) => u.email === email);
    const storedPwd = foundUser ? getStoredPassword(foundUser.id) : null;
    if (
      foundUser && (password === storedPwd || password === "password")
    ) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      // Persist password for future validations if not yet stored
      if (!storedPwd) {
        setStoredPassword(foundUser.id, password);
      }
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    userType: "student" | "instructor"
  ): Promise<boolean> => {
    setIsLoading(true);

    // Demo signup - in real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      userType,
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  setStoredPassword(newUser.id, password);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const merged = { ...prev, ...updates } as User;
      localStorage.setItem("user", JSON.stringify(merged));
      return merged;
    });
  };

  const updatePassword = async (
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> => {
    if (!user) return false;
    const stored = getStoredPassword(user.id) || "password"; // default demo password
    const isValid = currentPassword === stored;
    if (!isValid) return false;
    setStoredPassword(user.id, newPassword);
    return true;
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading,
  updateUser,
  updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
