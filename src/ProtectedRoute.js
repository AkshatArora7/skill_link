import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {auth} from './firebaseConfig'

const ProtectedRoute = () => {

  const storedAuth = localStorage.getItem("isAuthenticated");

  if (auth.currentUser && storedAuth == 'true') {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;