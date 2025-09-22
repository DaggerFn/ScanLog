import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { getMateriais, saveAndSetApiUrl } from "./api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IP_STORAGE_KEY = "@app_server_ip"; // Use a mesma chave

export default function EditScreenInfo() {
  const [valor, setValor] = useState<string>("");

  // Efeito para carregar o IP atual quando a tela abrir
  useEffect(() => {
    const getCurrentIp = async () => {
      const currentIp = await AsyncStorage.getItem(IP_STORAGE_KEY);
      if (currentIp) {
        setValor(currentIp);
      }
    };
    getCurrentIp();
  }, []);

  const handleSave = async () => {
    await saveAndSetApiUrl(valor);
    // Opcional: você pode querer testar a conexão aqui
    getMateriais();
    alert("Endereço IP salvo com sucesso!");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.settingGroup}>
        <Text style={styles.label}>Endereço IP da API</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o IP"
          value={valor}
          onChangeText={setValor}
          autoCapitalize="none"
          keyboardType="url"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
    color: "#333",
  },
  settingGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#555",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
