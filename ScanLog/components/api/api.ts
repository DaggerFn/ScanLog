import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// ===================================================================
// ARQUIVO DE CONFIGURAÇÃO E SERVIÇOS DA API
// ===================================================================

// --- Ponto Único de Configuração Inicial ---

/**
 * A chave usada para salvar e buscar a URL da API no armazenamento
 * persistente do dispositivo.
 */
const API_URL_STORAGE_KEY = "@app_server_url";

/**
 * A URL padrão da API.
 * Será usada APENAS se o usuário nunca tiver salvado uma URL personalizada.
 * IMPORTANTE: Deve incluir o protocolo (http:// ou https://).
 */
const DEFAULT_API_URL = "http://192.168.27.186:4000";

/**
 * Cria a instância do Axios que será usada em todo o aplicativo.
 * A `baseURL` é iniciada com o valor padrão e será atualizada dinamicamente
 * pelas funções `loadApiConfig` e `saveAndSetApiUrl`.
 */
const api = axios.create({
  baseURL: DEFAULT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Funções de Gerenciamento da Configuração da API ---

/**
 * Carrega a URL da API do armazenamento persistente.
 * Esta função DEVE ser chamada uma vez quando o aplicativo é iniciado (no App.tsx).
 */
export const loadApiConfig = async () => {
  try {
    const storedUrl = await AsyncStorage.getItem(API_URL_STORAGE_KEY);

    if (storedUrl) {
      // Se encontrou uma URL salva, atualiza a instância do Axios para usá-la.
      api.defaults.baseURL = storedUrl;
      console.log("✅ URL da API carregada do armazenamento:", storedUrl);
    } else {
      // Senão, a instância do Axios continuará usando a DEFAULT_API_URL.
      console.log(
        "ℹ️ Nenhuma URL salva encontrada. Usando o padrão:",
        DEFAULT_API_URL
      );
    }
  } catch (error) {
    console.error("❌ Erro ao carregar a URL da API do AsyncStorage:", error);
  }
};

/**
 * Salva a nova URL da API no armazenamento persistente E atualiza
 * a instância do Axios para uso imediato.
 * Esta função deve ser chamada pela sua tela de configurações.
 * @param apiUrlValue A nova URL fornecida pelo usuário.
 */
export const saveAndSetApiUrl = async (apiUrlValue: string) => {
  if (!apiUrlValue || apiUrlValue.trim() === "") {
    console.warn("Tentativa de salvar uma URL vazia.");
    return;
  }

  // Garante que a URL tenha um protocolo (http://) para evitar Network Errors.
  let fullUrl = apiUrlValue.trim();
  if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://")) {
    fullUrl = `http://${fullUrl}`;
  }

  try {
    await AsyncStorage.setItem(API_URL_STORAGE_KEY, fullUrl);
    api.defaults.baseURL = fullUrl; // Atualiza a instância do Axios em tempo de execução.
    console.log("✅ Nova URL da API salva e definida com sucesso:", fullUrl);
  } catch (error) {
    console.error("❌ Erro ao salvar a URL da API no AsyncStorage:", error);
  }
};

// ===================================================================
// FUNÇÕES DE REQUISIÇÃO PARA OS ENDPOINTS DA API
// (Nenhuma mudança necessária aqui, elas usam a instância `api` já configurada)
// ===================================================================

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
    const response = await api.put(`/materiais/${id}`, updatedData);
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

// Função GET - Buscar um material específico
export const searchMaterial = async (id: string) => {
  try {
    const response = await api.get(`/materiais/${id}`);
    return response.data;
  } catch (error) {
    // console.error("Erro ao buscar material específico:", error); // Descomente se precisar de log detalhado
    throw error;
  }
};

/**
 * Testa se a nova URL da API está acessível fazendo uma requisição GET em /materiais.
 * Retorna true se conseguir acessar, false caso contrário.
 */
const testApiUrl = async (url: string): Promise<boolean> => {
  try {
    // Garante que a URL tenha protocolo
    let fullUrl = url.trim();
    if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://")) {
      fullUrl = `http://${fullUrl}`;
    }
    // Cria uma instância temporária do axios para testar
    const tempApi = axios.create({
      baseURL: fullUrl,
      timeout: 4000,
      headers: { "Content-Type": "application/json" },
    });
    await tempApi.get("/materiais");
    return true;
  } catch {
    return false;
  }
};

/**
 * Busca um JSON de configuração remota e, se houver instrução, testa e altera a URL da API.
 */
export const checkAndUpdateApiUrlFromRemoteConfig = async () => {
  try {
    // Usa a baseURL atual para buscar o config.json
    const response = await api.get("/config");
    const config = response.data;

    if (config.change_server && config.new_server_url) {
      const isValid = await testApiUrl(config.new_server_url);
      if (isValid) {
        await saveAndSetApiUrl(config.new_server_url);
        console.log(
          "🔄 URL da API alterada via configuração remota:",
          config.new_server_url
        );
      } else {
        console.warn(
          "❌ Novo servidor informado no config.json está inacessível. Mantendo o servidor atual."
        );
      }
    }
  } catch (error) {
    // Não faz nada se não encontrar o arquivo ou der erro
    console.warn("Não foi possível buscar configuração remota:", error);
  }
};

// Exporta a instância configurada do Axios para ser usada em outras partes do app.
export default api;
