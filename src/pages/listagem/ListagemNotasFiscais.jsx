import { useEffect, useState } from "react";
import axios from "axios";
import "./ListagemNotasFiscais.css";

export default function ListagemNotasFiscais() {
  const [notas, setNotas] = useState([]);
  const [totalGeral, setTotalGeral] = useState(0);
  const [tributosTotais, setTributosTotais] = useState(0);

  useEffect(() => {
    async function fetchNotas() {
      try {
        const response = await axios.get("http://localhost:8081/notas/listar");
        const lista = response.data;

        // Calcula totais com base nos valores já processados no backend
        const total = lista.reduce((acc, nota) => acc + (nota.totalNota || 0), 0);
        const tributos = lista.reduce((acc, nota) => acc + (nota.totalTributos || 0), 0);

        setNotas(lista);
        setTotalGeral(total);
        setTributosTotais(tributos);
      } catch (err) {
        console.error("Erro ao buscar notas:", err);
      }
    }

    fetchNotas();
  }, []);

  return (
    <div className="container">
      <h1 className="titulo-principal">Notas Fiscais Expedidas</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>CPF/CNPJ</th>
            <th>Data</th>
            <th>Total</th>
            <th>Tributos</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota, index) => (
            <tr key={index}>
              <td>{nota.notaFiscalId}</td>
              <td>{nota.nomeCliente}</td>
              <td>{nota.cpfCnpj}</td>
              <td>{nota.dataCompra}</td>
              <td>R$ {nota.totalNota?.toFixed(2)}</td>
              <td style={{ color: "green", fontWeight: "bold" }}>R$ {nota.totalTributos?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="totais">
        <p><strong>Total Geral:</strong> R$ {totalGeral.toFixed(2)}</p>
        <p><strong>Tributos Totais:</strong> R$ {tributosTotais.toFixed(2)}</p>
      </div>
    </div>
  );
}
