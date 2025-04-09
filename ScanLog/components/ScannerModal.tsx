import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { searchMaterial } from "./api/api";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

interface ScannerModalProps {
  visible: boolean;
  scannedData: string;
  onClose: () => void;
}

const ScannerModal: React.FC<ScannerModalProps> = ({
  visible,
  scannedData,
  onClose,
}) => {
  const [materiais, setMateriais] = useState<dataTypes[] | null>(null);
  const [quantidade, setQuantidade] = useState("");
  const [error, setError] = useState<string | null>(null);

  interface dataTypes {
    id: string;
    id_material: number;
    locale_material: string;
    quantidade: Float;
    description_material: string;
  }

  const fetchMateriais = async () => {
    try {
      setError(null); // Reset error state
      const data = await searchMaterial(scannedData);
      if (data && data.length > 0) {
        setMateriais(data);
      } else {
        setMateriais(null); // Clear materiais if no data is found
        setError("Nenhum material encontrado.");
      }
    } catch (error) {
      setMateriais(null); // Clear materiais on error
      setError("Material não foi Registrado ou não existe.");
      // console.error("Erro ao carregar materiais:", error);
    }
  };

  useEffect(() => {
    if (scannedData) {
      fetchMateriais(); // Fetch data whenever scannedData changes
    }
  }, [scannedData]);

  return (
    <Modal
      onShow={fetchMateriais}
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>QR Code:</Text>
          <Text style={styles.scannedData}>{scannedData}</Text>
          {error ? (
            <Text
              style={{ color: "red", textAlign: "center", marginBottom: 10 }}
            >
              {error}
            </Text>
          ) : (
            <FlatList<dataTypes>
              data={materiais}
              keyExtractor={(item) => item.id.toString()}
              style={styles.list}
              contentContainerStyle={{ paddingBottom: 10 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.itemText}>ID: {item.id_material}</Text>
                  <Text style={styles.itemText}>
                    LOCAL: {item.locale_material}
                  </Text>
                  <View style={styles.quantityRow}>
                    <Text style={styles.itemText}>QUANTIDADE: {}</Text>
                    <TextInput
                      placeholder="Quantidade"
                      value={item.quantidade.toString()}
                      onChangeText={setQuantidade}
                      style={styles.quantityInput}
                      keyboardType="numeric"
                    />
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() =>
                        setQuantidade((prev) => (Number(prev) + 1).toString())
                      }
                    >
                      <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() =>
                        setQuantidade((prev) =>
                          Number(prev) > 0 ? (Number(prev) - 1).toString() : "0"
                        )
                      }
                    >
                      <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.itemText}>
                    DESCRIÇÃO: {item.description_material}
                  </Text>
                </View>
              )}
            />
          )}

          <View style={styles.buttonContainer}>
            <Button title="Fechar" onPress={onClose} color="#007bff" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end", // Fixa próximo ao rodapé
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: "100%",
    maxHeight: "60%", // Limita altura do modal
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 60, // Espaço em relação ao footer
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  scannedData: {
    fontSize: 22,
    color: "#555",
    marginBottom: 12,
    textAlign: "center",
  },
  list: {
    width: "100%",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  itemText: {
    fontSize: 24,
    color: "#333",
    marginBottom: 4,
  },
  buttonContainer: {
    marginTop: 8,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  quantityInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 22,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 5,
    width: 55,
  },
});

export default ScannerModal;
