import axios from "axios";

let apiUrl = "http://10.0.68.114:5000/completo/10017946";

// Função GET - Buscar dadaos da api
export const getApiMaterialInfo = async () => {
  try {
    const response = await axios.get(apiUrl);
    console.log("Dados recebidos da API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw error;
  }
};
