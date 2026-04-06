"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  auth: string | null;
  username: string | null;
  login: (user: string, pass: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const login = (user: string, pass: string) => {
    const encoded = btoa(`${user}:${pass}`);
    setAuth(encoded);
    setUsername(user);
  };

  const logout = () => {
    setAuth(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ auth, username, login, logout, isAuthenticated: !!auth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
