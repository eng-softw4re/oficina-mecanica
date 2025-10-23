import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null); // cria o contexto

export function AuthProvider({ children }){ // cria o provider
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Token ${token}`; // configura o token no header
    }
  }, [token])

  const login = (newToken) => {
    localStorage.setItem('authToken', newToken)

    setToken(newToken)
    api.defaults.headers.common['Authorization'] = `Token ${token}`
  }

  const value = {
    token,
    isAuthenticated: !!token, // transforma o token em um boolean.
    login,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext)
}