import React, { useEffect, useState } from "react";
import { TouchableOpacity, Modal, View, Text, Button } from "react-native";
import { styles } from "./style";
import { getMateriais, createMaterial } from "../api/api";
import { HighlightedInput } from "../HighlightedInput/HighlightedInput";

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

  useEffect(() => {
    // console.log(scannedData);
    verificarCaractere(scannedData, "-");
  });
  const fetchMateriais = async () => {
    try {
      const data = await getMateriais();
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
      fetchMateriais(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao criar material:", error);
    }
  };

  function verificarCaractere(str: string, caractere: string) {
    if (str !== "") {
      if (str.includes(caractere)) {
        console.log(`A string: "${str}" contém o caractere "${caractere}".`);
        setLocal(str);
      } else {
        console.log(
          `A string: "${str}" NÃO contém o caractere "${caractere}".`
        );
        setId(str);
      }
    }
  }

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
            <Text style={styles.scannedData}>{scannedData}</Text>
            <HighlightedInput
              placeholder="N° do Material <QR>"
              value={id_material}
              onChangeText={setId}
              style={styles.input}
              keyboardType="numeric"
            />
            <HighlightedInput
              placeholder="Local  <QR>"
              value={local}
              onChangeText={setLocal}
              style={styles.input}
              keyboardType="numeric"
            />
            <View style={styles.quantityContainer}>
              <HighlightedInput
                placeholder="Quantidade"
                value={quantidade}
                onChangeText={setQuantidade}
                style={styles.input}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  setQuantidade((prev) => (Number(prev) + 1).toString())
                }
              >
                <Text style={styles.buttonText}> + </Text>
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
            <HighlightedInput
              placeholder="Descrição <API>"
              value={description_material}
              onChangeText={setdescription_material}
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <Button title="Fechar" onPress={onClose} color="#007bff" />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Criar Material"
                onPress={handleCreate}
                color="#4CAF50"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RegisterModal;
