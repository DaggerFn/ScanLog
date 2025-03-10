import React, { useEffect, useState } from "react";
import { Modal, View, Text, Button, StyleSheet, FlatList } from "react-native";
import { searchMaterial } from "./api/api";

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
  const [materiais, setMateriais] = useState([]);
  const [nome, setNome] = useState("");
  const [local, setLocal] = useState("");
  const [id, setId] = useState("");
  let id_material = undefined;

  const fetchMateriais = async () => {
    try {
      const data = await searchMaterial(scannedData);
      setMateriais(data);
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
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>QR Code Escaneado:</Text>
          <Text style={styles.data}>{scannedData}</Text>
          <FlatList
            data={materiais}
            keyExtractor={(item) => item.id_material.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  marginVertical: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                }}
              >
                <Text style={styles.textData}>ID:: {item.id_material}</Text>
                <Text style={styles.textData}>
                  Local:: {item.locale_material}
                </Text>
                <Text style={styles.textData}>
                  Quantidade:: {item.quantidade}
                </Text>
                <Text style={styles.textData}>
                  Descrição:: {item.description_material}
                </Text>
              </View>
            )}
          />
          <Button title="Fechar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: "95%",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textData: {
    fontSize: 18,
    fontWeight: "800",
  },
  data: {
    fontSize: 18,
    marginVertical: 5,
    color: "blue",
  },
});

export default ScannerModal;
