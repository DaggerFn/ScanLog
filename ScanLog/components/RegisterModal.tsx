import React, { useEffect, useState } from "react";
import { Modal, View, Text, Button, StyleSheet, TextInput } from "react-native";
import { createMaterial, searchMaterial } from "./api/api";

interface RegisterModalProps {
  visible: boolean;
  scannedData: string;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  visible,
  scannedData,
  onClose,
}) => {
  const [materiais, setMateriais] = useState([]);
  const [id_material, setId] = useState("");
  const [local, setLocal] = useState("");
  const [description_material, setdescription_material] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const fetchMateriais = async () => {
    try {
      const data = await searchMaterial(scannedData);
      setMateriais(data);
    } catch (error) {
      console.error("Erro ao carregar materiais:", error);
    }
  };

  const handleCreate = async () => {
    if (!id_material || !description_material || !local)
      return alert("Preencha todos os campos!");

    try {
      await createMaterial({
        id_material: id_material,
        locale_material: local,
        quantidade: quantidade,
        description_material: description_material,
      });
      alert("Material criado com sucesso!");
      // fetchMateriais(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao criar material:", error);
    }
  };

  return (
    <Modal
      // onShow={fetchMateriais}
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>QR Code Escaneado:</Text>
          <Text style={styles.data}>{scannedData}</Text>
          <TextInput
            placeholder="N° do Material"
            value={id_material}
            onChangeText={setId}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          <TextInput
            placeholder="Local"
            value={local}
            onChangeText={setLocal}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          <TextInput
            placeholder="Quantidade"
            value={quantidade}
            onChangeText={setQuantidade}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          <TextInput
            placeholder="Descrição"
            value={description_material}
            onChangeText={setdescription_material}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          <Button title="Fechar" onPress={onClose} color="#007bff" />
          <Button title="Criar Material" onPress={handleCreate} />

          {/* <Button title="Criar Material" onPress={handleCreate} />
          <Button title="Atualizar Material" onPress={handleUpdate} />
          <Button title="Console do data row" onPress={searchMaterial} />
          <Button title="Fechar" onPress={onClose} /> */}
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

export default RegisterModal;
