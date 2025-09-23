import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { getMateriais, saveAndSetApiUrl } from "./api/api"; // Mantenha suas funções de API
import AsyncStorage from "@react-native-async-storage/async-storage";

// --- Ícones Simples (SVG ou Componentes) ---
// Para um projeto real, considere usar uma biblioteca como react-native-vector-icons
const IconCheck = () => <Text style={{ color: "green" }}>✓</Text>;
const IconError = () => <Text style={{ color: "red" }}>✗</Text>;

const IP_STORAGE_KEY = "@app_server_ip";
const RECENT_IPS_KEY = "@app_recent_ips";

export default function EditScreenInfo() {
  const [currentIp, setCurrentIp] = useState<string>("");
  const [recentIps, setRecentIps] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "success" | "error" | "idle"
  >("idle");

  // Carrega o IP atual e a lista de IPs recentes ao iniciar a tela
  useEffect(() => {
    const loadData = async () => {
      const savedIp = await AsyncStorage.getItem(IP_STORAGE_KEY);
      if (savedIp) {
        setCurrentIp(savedIp);
      }

      const savedRecentIps = await AsyncStorage.getItem(RECENT_IPS_KEY);
      if (savedRecentIps) {
        setRecentIps(JSON.parse(savedRecentIps));
      }
    };
    loadData();
  }, []);

  // Função para salvar o novo IP e testar a conexão
  const handleSaveAndTest = async () => {
    if (!currentIp) {
      Alert.alert("Erro", "O endereço IP não pode estar vazio.");
      return;
    }

    setIsLoading(true);
    setConnectionStatus("idle");

    // Salva o IP e atualiza a API
    await saveAndSetApiUrl(currentIp);

    // Testa a conexão
    try {
      await getMateriais(); // Tenta fazer uma chamada de teste
      setConnectionStatus("success");
      Alert.alert("Sucesso", "O novo endereço IP foi salvo e conectado!");

      // Adiciona o IP à lista de recentes
      updateRecentIps(currentIp);
    } catch (error) {
      setConnectionStatus("error");
      Alert.alert(
        "Falha na Conexão",
        "Não foi possível conectar ao servidor. Verifique o endereço IP e sua conexão."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Atualiza a lista de IPs recentes, mantendo apenas os 5 últimos
  const updateRecentIps = async (ip: string) => {
    const updatedIps = [ip, ...recentIps.filter((item) => item !== ip)].slice(
      0,
      5
    );
    setRecentIps(updatedIps);
    await AsyncStorage.setItem(RECENT_IPS_KEY, JSON.stringify(updatedIps));
  };

  const renderRecentIp = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.recentIpItem}
      onPress={() => setCurrentIp(item)}
    >
      <Text style={styles.recentIpText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.modalContent}>
        <Text style={styles.title}>Configurar Servidor</Text>

        <View style={styles.settingGroup}>
          <Text style={styles.label}>Endereço IP do Servidor</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ex: http://192.168.1.100:3000"
              value={currentIp}
              onChangeText={setCurrentIp}
              autoCapitalize="none"
              keyboardType="url"
              placeholderTextColor="#999"
            />
            {connectionStatus === "success" && <IconCheck />}
            {connectionStatus === "error" && <IconError />}
          </View>
        </View>

        {recentIps.length > 0 && (
          <View style={styles.recentIpsContainer}>
            <Text style={styles.label}>IPs Recentes</Text>
            <FlatList
              data={recentIps}
              renderItem={renderRecentIp}
              keyExtractor={(item, index) => `${item}-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSaveAndTest}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Salvar e Testar Conexão</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escurecido para modal
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    boxShadow: "#000",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  settingGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#555",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#a9a9a9",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  recentIpsContainer: {
    marginBottom: 20,
  },
  recentIpItem: {
    backgroundColor: "#eef2f9",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#d1d9e6",
  },
  recentIpText: {
    color: "#007AFF",
    fontSize: 14,
  },
});
