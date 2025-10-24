import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null); // cria o contexto

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

  const logout = () => {
    localStorage.removeItem('authToken')
    setToken(null)
    delete api.defaults.headers.common['Authorization']
  }

  const value = {
    token,
    isAuthenticated: !!token, // transforma o token em um boolean.
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
