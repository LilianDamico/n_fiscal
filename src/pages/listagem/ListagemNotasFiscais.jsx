import { useEffect, useState } from "react";
import axios from "axios";
import "./ListagemNotasFiscais.css";

export default function ListagemNotasFiscais() {
  const [notasPorMes, setNotasPorMes] = useState({});
  const [totalGeral, setTotalGeral] = useState(0);
  const [tributosTotais, setTributosTotais] = useState(0);

  useEffect(() => {
    async function fetchNotas() {
      try {
        const response = await axios.get("http://localhost:8081/notas/listar");
        const lista = response.data;

        const agrupadas = {};
        let total = 0;
        let tributos = 0;

        lista.forEach((nota) => {
          const data = new Date(nota.dataCompra);
          const chaveMes = data.toLocaleDateString("pt-BR", {
            month: "2-digit",
            year: "numeric",
          });

          if (!agrupadas[chaveMes]) agrupadas[chaveMes] = [];
          agrupadas[chaveMes].push(nota);

          total += nota.totalNota || 0;
          tributos += nota.totalTributos || 0;
        });

        setNotasPorMes(agrupadas);
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

      {Object.keys(notasPorMes).map((mes) => (
        <div key={mes} className="bloco-mensal">
          <h2 className="titulo-mes">Mês: {mes}</h2>
          <table className="tabela-notas">
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
              {notasPorMes[mes].map((nota, idx) => (
                <tr key={idx}>
                  <td>{nota.notaFiscalId}</td>
                  <td>{nota.nomeCliente}</td>
                  <td>{nota.cpfCnpj}</td>
                  <td>{nota.dataCompra}</td>
                  <td>R$ {nota.totalNota?.toFixed(2)}</td>
                  <td style={{ color: "green", fontWeight: "bold" }}>
                    R$ {nota.totalTributos?.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <div className="totais">
        <p><strong>Total Geral:</strong> R$ {totalGeral.toFixed(2)}</p>
        <p><strong>Tributos Totais:</strong> R$ {tributosTotais.toFixed(2)}</p>
      </div>
    </div>
  );
}
