import axios from "axios";

// URL base da API Flask
// const api_url = "http://127.0.0.1:4000"; // Altere se necessário

let api_url = "http://10.1.60.138:4000"; // Altere se necessário
// const api_url = "http://192.168.106.147:4000"; // Altere se necessário

// Criando uma instância do Axios
const api = axios.create({
  baseURL: api_url,
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
  quantidade: unknown;
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

export const searchMaterial = async (id: unknown) => {
  // const id: string = '123123f4'

  try {
    const response = await api.get(`/materiais/${id}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar materiais:", error);
    throw error;
  }
};

export const defineApi = (api_value: string) => {
  api_value == api_url;
};

export default api;
