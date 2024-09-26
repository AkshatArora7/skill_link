import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./authContext";
import SignUp from "./Screens/Authentication/SignUp";
import SignIn from "./Screens/Authentication/SignIn";
import Dashboard from "./Screens/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Booking from "./Screens/Booking/Booking";
import ErrorPage from "./Components/ErrorPage/ErrorPage"
import Profile from "./Screens/Profile/Profile";
import History from "./Screens/History/History";

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
            <Route path="/bookings" element={<Booking />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
