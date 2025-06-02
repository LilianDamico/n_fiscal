import React, { useEffect, useState } from "react";
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

        const agrupado = {};
        let total = 0;
        let tributos = 0;

        lista.forEach(nota => {
          const mes = nota.dataCompra.slice(0, 7); // YYYY-MM
          if (!agrupado[mes]) agrupado[mes] = [];
          agrupado[mes].push(nota);
          total += nota.totalNota || 0;
          tributos += nota.totalTributos || 0;
        });

        setNotasPorMes(agrupado);
        setTotalGeral(total);
        setTributosTotais(tributos);
      } catch (err) {
        console.error("Erro ao buscar notas:", err);
      }
    }

    fetchNotas();
  }, []);

  const deletarNota = async (id) => {
    if (!window.confirm("Deseja realmente deletar esta nota fiscal?")) return;
    try {
      await axios.delete(`http://localhost:8081/notas/${id}`);
      alert("Nota deletada com sucesso!");
      window.location.reload();
    } catch (err) {
      console.error("Erro ao deletar nota:", err);
      alert("Erro ao deletar nota.");
    }
  };

  const editarNota = (nota) => {
    alert(`Função de edição ainda não implementada. ID: ${nota.notaFiscalId}`);
    // Redirecionamento para formulário de edição pode ser feito aqui
  };

  return (
    <div className="container">
      <h1 className="titulo-principal">Notas Fiscais Expedidas</h1>

      {Object.entries(notasPorMes).map(([mes, notas]) => (
        <div className="mes-container" key={mes}>
          <h2 className="mes-titulo">Mês: {mes}</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>CPF/CNPJ</th>
                <th>Data</th>
                <th>Total</th>
                <th>Tributos</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {notas.map((nota) => (
                <tr key={nota.notaFiscalId}>
                  <td>{nota.notaFiscalId}</td>
                  <td>{nota.nomeCliente}</td>
                  <td>{nota.cpfCnpj}</td>
                  <td>{nota.dataCompra}</td>
                  <td className="total">R$ {nota.totalNota.toFixed(2)}</td>
                  <td className="tributos">R$ {nota.totalTributos.toFixed(2)}</td>
                  <td className="acoes">
                    <button className="editar" onClick={() => editarNota(nota)}>Editar</button>
                    <button className="deletar" onClick={() => deletarNota(nota.notaFiscalId)}>Deletar</button>
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
