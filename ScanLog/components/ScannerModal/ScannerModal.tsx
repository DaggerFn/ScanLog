import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Button,
  FlatList,
  TextInput,
} from "react-native";
import { searchMaterial } from "../api/api";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { styles } from "./style";

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

export default ScannerModal;
