import React, { useEffect, useState, useRef } from "react";
import { Modal, View, Text, Button, StyleSheet, FlatList } from "react-native";
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
  const [materiais, setMateriais] = useState();
  const valorAnterior = useRef<undefined | null>(null);

  useEffect(() => {
    if (valorAnterior.current !== null) {
      if (materiais !== valorAnterior.current) {
        console.log("Valor mudou!");
        console.log("Valor anterior:", valorAnterior.current);
        console.log("Valor atual:", materiais);
        // Aqui você pode chamar a função que quiser baseado nessa diferença
        fetchMateriais();
      }
    }

    // Atualizar a ref com o valor atual para a próxima comparação
    valorAnterior.current = materiais;
  }, [materiais]); // Sempre que 'materiais' mudar

  interface dataTypes {
    id: string;
    id_material: number;
    locale_material: string;
    quantidade: Float;
    description_material: string;
  }

  const fetchMateriais = async () => {
    try {
      const data = await searchMaterial(scannedData);
      setMateriais(data);
      // console.log("data:", data);
    } catch (error) {
      console.error("Erro ao carregar materiais:", error);
    }
  };

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
                  Local: {item.locale_material}
                </Text>
                <Text style={styles.itemText}>Qtd: {item.quantidade}</Text>
                <Text style={styles.itemText}>
                  Descrição: {item.description_material}
                </Text>
              </View>
            )}
          />

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
    backgroundColor: "rgba(0,0,0,0.5)",
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  scannedData: {
    fontSize: 16,
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
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  buttonContainer: {
    marginTop: 8,
  },
});

export default ScannerModal;
