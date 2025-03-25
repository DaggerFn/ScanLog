import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
} from "react-native";
import { getMateriais, updateMaterial, searchMaterial } from "./api/api";

interface EditModalProps {
  visible: boolean;
  data: string;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ visible, data, onClose }) => {
  const [materiais, setMateriais] = useState([]);
  const [id_material, setId] = useState("");
  const [local, setLocal] = useState("");
  const [description_material, setdescription_material] = useState("");
  const [quantidade, setQuantidade] = useState("");

  useEffect(() => {
    fetchMateriais;
  });
  const fetchMateriais = async () => {
    try {
      const dataFetch = await searchMaterial(data);
      setMateriais(dataFetch);
      console.log(materiais);
    } catch (error) {
      console.error("Erro ao carregar materiais:", error);
    }
  };

  const mountValueData = () => {
    // setLocal()
  };

  const handleCreate = async () => {
    if (!id_material || !description_material || !local)
      return alert("Preencha todos os campos!");

    try {
      await updateMaterial(data, {
        locale_material: local,
        quantidade: quantidade,
        description_material: description_material,
      });
      alert("Material editado com sucesso!");
    } catch (error) {
      console.error("Erro ao editar material:", error);
    }
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.card}>
            <Text style={styles.title}>QR Code Escaneado:</Text>
            <Text style={styles.data}>{data}</Text>
            <TextInput
              placeholder="N° do Material <QR>"
              value={data}
              onChangeText={setId}
              style={styles.input}
            />
            <TextInput
              placeholder="Local  <QR>"
              value={local}
              onChangeText={setLocal}
              style={styles.input}
            />
            <View style={styles.quantityContainer}>
              <TextInput
                placeholder="Quantidade"
                value={quantidade}
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
            <TextInput
              placeholder="Descrição <API>"
              value={description_material}
              onChangeText={setdescription_material}
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Editar Material"
                onPress={handleCreate}
                color="#007bff"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Fechar" onPress={onClose} color="#007bff" />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: "100%",
    maxHeight: "73%",
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 60,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  data: {
    fontSize: 16,
    color: "#555",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  quantityInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditModal;
