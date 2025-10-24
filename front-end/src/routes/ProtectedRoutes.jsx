import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace /> // Se o não estiver logado redericiona para /login
  }

  return <Outlet/> // Se o user estiver logado renderiza a página que ele tentou acessar.
}

export default ProtectedRoutes;