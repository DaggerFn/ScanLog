import axios from "axios";

// URL base da API Flask
let api_url = "http://192.168.136.147:4000";
// let api_url = "http://127.0.0.1:5000";

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
    // console.log("ip na chamada de <getMaterial>", api_url);
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
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar material:", error);
    throw error;
  }
};

// Função PUT - Atualizar um material
export const updateMaterial = async (
  id: number,
  updatedData: {
    locale_material: string;
    quantidade: string;
    description_material: string;
  }
) => {
  try {
    // Note a rota /materiais aqui
    const response = await api.put(`/materiais/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.log("item/id recebido pela fun da api :", id);
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

export const searchMaterial = async (id: string) => {
  // id = "123123123"; // Para teste

  try {
    const response = await api.get(`/materiais/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error("Erro ao buscar materiais:", error);
    throw error;
  }
};

// Função que altera o ip, fornecido pelo usuario
export const defineApi = (api_value: string) => {
  api_url = api_value;
  api.defaults.baseURL = api_url; // Update the Axios instance baseURL
  console.log("valor da api atual", api_url);
};

export default api;
