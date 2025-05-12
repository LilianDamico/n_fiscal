import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Sistema de Notas Fiscais</h1>
      <div className="navbar-links">
        <Link to="/notafiscal" className="nav-link">Consultar Nota</Link>
        <Link to="/cadastrar" className="nav-link">Cadastrar Nota</Link>
      </div>
    </nav>
  );
}
