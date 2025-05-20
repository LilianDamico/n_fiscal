import React, { useState } from "react";
import axios from "axios";
import './NotaFiscal.css';

export default function NotaFiscal() {
  const [notaId, setNotaId] = useState("");
  const [nota, setNota] = useState(null);
  const [tributo, setTributo] = useState(null);

  const buscarNota = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/notas/${notaId}`);
      setNota(response.data);
      setTributo(null); // limpa tributo ao buscar nova nota
    } catch (error) {
      console.error("Erro ao buscar nota:", error);
      alert("Nota não encontrada");
    }
  };

  const calcularTributos = async () => {
    try {
      const payload = {
        ufOrigem: nota.UfOrigem,
        ufDestino: nota.UfDestino,
        valorOperacao: nota.TotalNota
      };

      const response = await axios.post("http://localhost:8081/calcular-tributos", payload);
      setTributo(response.data.totalTributos);
    } catch (error) {
      console.error("Erro ao calcular tributos:", error);
      alert("Erro ao calcular tributos");
    }
  };

  const imprimir = () => {
    window.print();
  };

  return (
    <div className="container">
      <h1 className="titulo-principal">Impressão de Nota Fiscal</h1>

      <div className="input-area">
        <input
          placeholder="Digite o ID da nota"
          value={notaId}
          onChange={(e) => setNotaId(e.target.value)}
        />
        <button onClick={buscarNota}>Buscar Nota</button>
      </div>

      {nota && (
        <div className="nota-box" id="nota-visual">
          <h2>Nota Fiscal: {nota.NotaFiscalId}</h2>
          <p><strong>Cliente:</strong> {nota.NomeCliente}</p>
          <p><strong>CPF/CNPJ:</strong> {nota.CPF_CNPJ}</p>
          <p><strong>Endereço:</strong> {nota.EnderecoEntrega}</p>
          <p><strong>Data da Compra:</strong> {nota.DataCompra}</p>
          <p><strong>Total:</strong> R$ {nota.TotalNota}</p>
          <p><strong>UF Origem:</strong> {nota.UfOrigem}</p>
          <p><strong>UF Destino:</strong> {nota.UfDestino}</p>

          <div>
            <h3><strong>Itens:</strong></h3>
            <ul>
              {nota.Itens.map((item, index) => (
                <li key={index}>
                  {item.DescrProduto} - R$ {item.ValorUnitario} ({item.CodProduto})
                </li>
              ))}
            </ul>
          </div>

          {tributo !== null && (
            <p><strong>Total de Tributos:</strong> R$ {tributo.toFixed(2)}</p>
          )}

          <div className="botoes">
            <button onClick={calcularTributos}>Calcular Tributos</button>
            <button className="print-button" onClick={imprimir}>
              Imprimir Nota
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
