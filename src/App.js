import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotaFiscal from "./pages/notafiscal/NotaFiscal";
import FormularioNotaFiscal from "./pages/formularionotafiscal/FormularioNotaFiscal";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/notafiscal" element={<NotaFiscal />} />
        <Route path="/cadastrar" element={<FormularioNotaFiscal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;