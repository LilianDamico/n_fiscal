import { useState } from "react";
import axios from "axios";
import './NotaFiscal.css';

export default function NotaFiscal() {
  const [idBusca, setIdBusca] = useState("");
  const [nota, setNota] = useState(null);
  const [erro, setErro] = useState("");

  const buscarNota = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/notas/${idBusca}`);
      const data = response.data;

      // Verificação segura dos itens (caso venha como string ou array)
      let itens = [];
      if (Array.isArray(data.itens)) {
        itens = data.itens;
      } else if (typeof data.itens === "string") {
        itens = JSON.parse(data.itens);
      }

      setNota({
        idNota: data.notaFiscalId,
        nomeCliente: data.nomeCliente,
        cpfCnpj: data.cpfCnpj,
        enderecoEntrega: data.enderecoEntrega,
        dataCompra: data.dataCompra,
        totalNota: data.totalNota || 0,
        totalTributos: data.totalTributos || 0,
        itens: itens
      });

      setErro("");
    } catch (err) {
      console.error("Erro ao buscar nota:", err);
      setNota(null);
      setErro("Nota não encontrada.");
    }
  };

  const imprimirNota = () => window.print();

  return (
    <div className="container">
      <h1 className="titulo-principal">Impressão de Nota Fiscal</h1>

      <div className="input-area">
        <input
          type="text"
          placeholder="ID da Nota"
          value={idBusca}
          onChange={(e) => setIdBusca(e.target.value)}
        />
        <button onClick={buscarNota}>Buscar Nota</button>
      </div>

      {erro && <p style={{ color: "red", textAlign: "center" }}>{erro}</p>}

      {nota && (
        <div className="nota-box">
          <h2>Nota Fiscal: {nota.idNota}</h2>
          <p><strong>Cliente:</strong> {nota.nomeCliente}</p>
          <p><strong>CPF/CNPJ:</strong> {nota.cpfCnpj}</p>
          <p><strong>Endereço:</strong> {nota.enderecoEntrega}</p>
          <p><strong>Data da Compra:</strong> {nota.dataCompra}</p>
          <p><strong>Total:</strong> R$ {nota.totalNota.toFixed(2)}</p>
          <p><strong>Tributos (ICMS 18%):</strong> R$ {nota.totalTributos.toFixed(2)}</p>

          <h3>Itens:</h3>
          <ul>
            {nota.itens.map((item, index) => (
              <li key={index}>
                <strong>{item.codProduto}</strong> - {item.nomeProduto} ({item.quantidade} x R$ {item.precoUnitario.toFixed(2)})
              </li>
            ))}
          </ul>

          <div className="botoes">
            <button className="print-button" onClick={imprimirNota}>Imprimir</button>
          </div>
        </div>
      )}
    </div>
  );
}
