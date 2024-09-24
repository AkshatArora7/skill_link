import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./authContext";
import SignUp from "./screens/Authentication/SignUp";
import SignIn from "./screens/Authentication/SignIn";
import Dashboard from "./screens/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Booking from "./screens/Booking/Booking";
import ErrorPage from "./components/ErrorPage/ErrorPage"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<SignIn/>} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/booking" element={<Booking />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
