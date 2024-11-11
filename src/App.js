import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./authContext";
import SignUp from "./screens/Authentication/SignUp";
import SignIn from "./screens/Authentication/SignIn";
import Dashboard from "./screens/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Booking from "./screens/Booking/Booking";
import ErrorPage from "./components/ErrorPage/ErrorPage"
import Profile from "./screens/Profile/Profile";
import History from "./screens/History/History";
import Review from "./screens/Review/Review";

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
            <Route
              path="/review/:bookingId"
              element={<Review />}
            />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
