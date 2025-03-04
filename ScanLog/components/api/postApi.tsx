import axios from "axios";

export const handlePostData = async () => {

  try {
    const response = await axios.post("http://127.0.0.1:5000/posts", {
      title: "Meu Post",
      body: "Conteúdo do post",
      userId: 1,
    });

    console.log("Resposta da API:", response.data);
  } catch (error) {
    console.error("REDE DESCONECTADA OU SERVIDOR FORA DO AR:", error);
  }
};

