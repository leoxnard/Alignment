import React from 'react';
import './App.css';
import Home from './LandingPage/Home';
import AlgorithmPage from './LandingPage/AlgorithmPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/algorithm/:id" element={<AlgorithmPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
