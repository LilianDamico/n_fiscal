import React, { useState } from "react";
import axios from "axios";
import '../notafiscal/NotaFiscal.css';

export default function FormularioNotaFiscal() {
  const [nota, setNota] = useState({
    NotaFiscalId: "",
    NomeCliente: "",
    CPF_CNPJ: "",
    EnderecoEntrega: "",
    DataCompra: "",
    TotalNota: "",
    Itens: [],
  });

  const [novoItem, setNovoItem] = useState({
    CodProduto: "",
    DescrProduto: "",
    ValorUnitario: "",
  });

  const adicionarItem = () => {
    setNota({
      ...nota,
      Itens: [...nota.Itens, novoItem]
    });
    setNovoItem({ CodProduto: "", DescrProduto: "", ValorUnitario: "" });
  };

  const handleChange = (e) => {
    setNota({ ...nota, [e.target.name]: e.target.value });
  };

  const handleItemChange = (e) => {
    setNovoItem({ ...novoItem, [e.target.name]: e.target.value });
  };

  const enviarNota = async () => {
    try {
      await axios.post("http://localhost:8081/notas", nota);
      alert("Nota fiscal enviada com sucesso!");
      setNota({
        NotaFiscalId: "",
        NomeCliente: "",
        CPF_CNPJ: "",
        EnderecoEntrega: "",
        DataCompra: "",
        TotalNota: "",
        Itens: [],
      });
    } catch (error) {
      console.error("Erro ao enviar nota:", error);
      alert("Erro ao enviar nota fiscal.");
    }
  };

  return (
    <div className="container">
      <h1 className="titulo-principal">Cadastrar Nova Nota Fiscal</h1>

      <input name="NotaFiscalId" placeholder="ID da Nota" value={nota.NotaFiscalId} onChange={handleChange} />
      <input name="NomeCliente" placeholder="Nome do Cliente" value={nota.NomeCliente} onChange={handleChange} />
      <input name="CPF_CNPJ" placeholder="CPF/CNPJ" value={nota.CPF_CNPJ} onChange={handleChange} />
      <input name="EnderecoEntrega" placeholder="Endereço de Entrega" value={nota.EnderecoEntrega} onChange={handleChange} />
      <input name="DataCompra" type="date" value={nota.DataCompra} onChange={handleChange} />
      <input name="TotalNota" placeholder="Total (R$)" value={nota.TotalNota} onChange={handleChange} />

      <h3 className="subtitulo">Adicionar Item</h3>
      <input name="CodProduto" placeholder="Código" value={novoItem.CodProduto} onChange={handleItemChange} />
      <input name="DescrProduto" placeholder="Descrição" value={novoItem.DescrProduto} onChange={handleItemChange} />
      <input name="ValorUnitario" placeholder="Valor" value={novoItem.ValorUnitario} onChange={handleItemChange} />
      <button onClick={adicionarItem}>Adicionar Item</button>

      <ul>
        {nota.Itens.map((item, index) => (
          <li key={index}>
            {item.DescrProduto} - R$ {item.ValorUnitario} ({item.CodProduto})
          </li>
        ))}
      </ul>

      <button className="print-button" onClick={enviarNota}>Enviar Nota</button>
    </div>
  );
}
