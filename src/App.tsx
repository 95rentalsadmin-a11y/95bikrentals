import React from "react";
// @ts-ignore: allow CSS side-effect import without type declarations
import './App.css'
import { Routes, Route } from "react-router-dom";
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
