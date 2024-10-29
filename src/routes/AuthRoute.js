import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const token = localStorage.getItem("temporaryToken");

  return token ? <Navigate to="/candidates" replace /> : <Outlet />;
};

export default AuthRoute;
