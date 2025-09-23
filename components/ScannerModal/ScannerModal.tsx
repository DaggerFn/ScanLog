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
import { searchMaterial, updateMaterial } from "../api/api";
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
    quantidade: number;
    description_material: string;
  }

  function alterarQuantidade(itemId: number, novoTexto: string) {
    // Converte o texto em número; se não for número, usa 0 ou mantém o anterior
    const novoValor = parseInt(novoTexto, 10) || 0;

    setMateriais((old) =>
      old
        ? old.map((mat) =>
            Number(mat.id) === itemId ? { ...mat, quantidade: novoValor } : mat
          )
        : []
    );
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

  const incrementarQuantidade = (id: string) => {
    const novaLista = materiais?.map((item) => {
      if (item.id === id) {
        const novaQuantidade = Number(item.quantidade || 0) + 1;
        return { ...item, quantidade: novaQuantidade };
      }
      return item;
    });
    setMateriais(novaLista || []);
  };

  const decrementarQuantidade = (id: string) => {
    const novaLista = materiais?.map((item) => {
      if (item.id === id) {
        const novaQuantidade = Math.max(0, Number(item.quantidade || 0) - 1);
        return { ...item, quantidade: novaQuantidade };
      }
      return item;
    });
    setMateriais(novaLista || []);
  };

  const handleSalvarMaterial = async (item: dataTypes) => {
    try {
      await updateMaterial(item.id_material, {
        locale_material: item.locale_material,
        quantidade: item.quantidade.toString(),
        description_material: item.description_material,
      });
      alert("Baixa de material realizada com sucesso!");
    } catch (error) {
      console.log("item ou id :", item.id);
      alert("Erro");
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
                    <Text style={styles.itemText}>QUANTIDADE:</Text>
                    <TextInput
                      placeholder=""
                      value={item.quantidade?.toString() || ""}
                      style={styles.quantityInput}
                      keyboardType="numeric"
                      onChangeText={(text) => alterarQuantidade(item.id, text)}
                    />
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => incrementarQuantidade(item.id)}
                    >
                      <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => decrementarQuantidade(item.id)}
                    >
                      <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>{" "}
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
            <TouchableOpacity
              onPress={() =>
                materiais?.forEach((item) => handleSalvarMaterial(item))
              }
            >
              <Text style={styles.buttonEdit}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ScannerModal;
