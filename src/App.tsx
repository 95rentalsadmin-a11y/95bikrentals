import React from "react";
// @ts-ignore: allow CSS side-effect import without type declarations
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyBookings from "./pages/MyBookings";
import PrivacyPolicy from "./components/PrivacyPolicy";
import { BookingProvider } from "./context/BookingContext";
import BikeAvailability from "./pages/booking/BikeAvailability";
import BookingSummary from "./pages/booking/BookingSummary";
import BookingSuccess from "./pages/booking/BookingSuccess";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BookingProvider>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/booking" element={<ProtectedRoute><BikeAvailability /></ProtectedRoute>} />
        <Route path="/booking/summary" element={<ProtectedRoute><BookingSummary /></ProtectedRoute>} />
        <Route path="/booking/success" element={<ProtectedRoute><BookingSuccess /></ProtectedRoute>} />
        <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
        <Route path="/privacy-policy" Component={PrivacyPolicy} />
      </Routes>
    </BookingProvider>
  );
}

export default App;
