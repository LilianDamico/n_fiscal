// src/services/notaService.js
import axios from "axios";

const API_URL = "http://localhost:8081/notas";

/**
 * Envia uma nova nota fiscal ao backend.
 * @param {Object} nota Nota fiscal completa
 */
export async function salvarNota(nota) {
  try {
    const response = await axios.post(API_URL, nota);
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar nota fiscal:", error);
    throw error;
  }
}

/**
 * Lista todas as notas fiscais cadastradas.
 * @returns {Promise<Array>} Lista de notas fiscais
 */
export async function listarNotas() {
  try {
    const response = await axios.get(`${API_URL}/listar`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar notas fiscais:", error);
    throw error;
  }
}

/**
 * Busca estatísticas mensais de faturamento.
 * @returns {Promise<Object>} Objeto com estatísticas por mês
 */
export async function listarEstatisticas() {
  try {
    const response = await axios.get(`${API_URL}/estatisticas`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    throw error;
  }
}
