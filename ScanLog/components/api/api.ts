import axios from "axios";

// URL base da API Flask
// const API_URL = "http://127.0.0.1:4000"; // Altere se necessário
const API_URL = "http://192.168.106.147:4000"; // Altere se necessário

// Criando uma instância do Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Função GET - Buscar todos os materiais
export const getMateriais = async () => {
  try {
    const response = await api.get("/materiais");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar materiais:", error);
    throw error;
  }
};

// Função POST - Criar um novo material
export const createMaterial = async (material: {
  id_material: string;
  locale_material: string;
  description_material: string;
}) => {
  try {
    const response = await api.post("/materiais", material);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar material:", error);
    throw error;
  }
};

// Função PUT - Atualizar um material
export const updateMaterial = async (
  id: string,
  updatedData: { locale_material: string; description_material: string }
) => {
  try {
    const response = await api.put(`/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar material:", error);
    throw error;
  }
};

// Função DELETE - Deletar um material
export const deleteMaterial = async (id: string) => {
  try {
    const response = await api.delete(`/materiais/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar material:", error);
    throw error;
  }
};

export default api;
