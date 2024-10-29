import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("temporaryToken");

  return token ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
