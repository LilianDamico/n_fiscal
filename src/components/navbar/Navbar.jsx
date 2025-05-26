// src/components/navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">N-Fiscal</h1>
        <ul className="navbar-links">
          <li><Link to="/notafiscal">Consulta</Link></li>
          <li><Link to="/cadastro">Cadastro</Link></li>
          <li><Link to="/listagem">Listagem</Link></li>
        </ul>
      </div>
    </nav>
  );
}
