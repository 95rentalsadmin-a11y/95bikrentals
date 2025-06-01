import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrivacyPolicy from "./components/PrivacyPolicy";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/privacy-policy" Component={PrivacyPolicy} />
    </Routes>
  );
}

export default App;
