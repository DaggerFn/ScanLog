import axios from "axios";

export const fetchPosts = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/posts"); // Alterado para Android
    console.log(response.data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
};