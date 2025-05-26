import "./FormularioNotaFiscal.css";
import React, { useState } from "react";
import axios from "axios";

function FormularioNotaFiscal() {
  const [nota, setNota] = useState({
    notaFiscalId: "",
    nomeCliente: "",
    cpfCnpj: "",
    enderecoEntrega: "",
    dataCompra: "",
    itens: [],
  });

  const [item, setItem] = useState({
    codProduto: "",
    nomeProduto: "",
    quantidade: 0,
    precoUnitario: 0,
  });

  const [total, setTotal] = useState(0);
  const [tributo, setTributo] = useState(0);

  const handleChange = (e) => {
    setNota({ ...nota, [e.target.name]: e.target.value });
  };

  const handleItemChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const adicionarItem = () => {
    const novoItem = {
      ...item,
      quantidade: parseInt(item.quantidade),
      precoUnitario: parseFloat(item.precoUnitario),
    };
    const novosItens = [...nota.itens, novoItem];
    const novoTotal = novosItens.reduce(
      (acc, curr) => acc + curr.quantidade * curr.precoUnitario,
      0
    );
    setNota({ ...nota, itens: novosItens });
    setTotal(novoTotal);
    setTributo(novoTotal * 0.18);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...nota,
      totalNota: total,
    };

    try {
      const response = await axios.post("http://localhost:8081/notas", payload);
      alert("Nota salva com sucesso!");
      console.log(response.data);
    } catch (err) {
      console.error("Erro ao salvar nota:", err);
      alert("Erro ao salvar nota.");
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Nota Fiscal</h2>
      <form className="nota-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="notaFiscalId"
          placeholder="ID da Nota"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nomeCliente"
          placeholder="Nome do Cliente"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cpfCnpj"
          placeholder="CPF/CNPJ"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="enderecoEntrega"
          placeholder="Endereço de Entrega"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dataCompra"
          onChange={handleChange}
          required
        />

        <h3>Itens</h3>
        <div className="item-grid">
          <input
            type="text"
            name="codProduto"
            placeholder="Código"
            onChange={handleItemChange}
          />
          <input
            type="text"
            name="nomeProduto"
            placeholder="Produto"
            onChange={handleItemChange}
          />
          <input
            type="number"
            name="quantidade"
            placeholder="Qtd"
            onChange={handleItemChange}
          />
          <input
            type="number"
            name="precoUnitario"
            placeholder="Preço Unitário"
            step={0.01}
            onChange={handleItemChange}
          />
        </div>
        <button type="button" onClick={adicionarItem} className="add-button">
          Adicionar
        </button>

        <div className="summary">
          <p><strong>Total:</strong> R$ {total.toFixed(2)}</p>
          <p>
            <strong>Informe de Tributos:</strong> ICMS (18%): R$ {tributo.toFixed(2)}
          </p>
        </div>

        <button type="submit" className="submit-button">
          Salvar Nota
        </button>
      </form>

      <div className="item-list">
        <h4>Itens Adicionados</h4>
        <ul>
          {nota.itens.map((i, idx) => (
            <li key={idx}>
              {i.codProduto} - {i.nomeProduto} ({i.quantidade} x R${" "}
              {i.precoUnitario})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FormularioNotaFiscal;
