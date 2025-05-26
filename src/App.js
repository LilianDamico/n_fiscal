// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import FormularioNotaFiscal from "./pages/formularionotafiscal/FormularioNotaFiscal";
import NotaFiscal from "./pages/notafiscal/NotaFiscal";
import ListagemNotasFiscais from "./pages/listagem/ListagemNotasFiscais";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/cadastro" element={<FormularioNotaFiscal />} />
        <Route path="/notafiscal" element={<NotaFiscal />} />
        <Route path="/listagem" element={<ListagemNotasFiscais />} />
      </Routes>
    </Router>
  );
}

export default App;
