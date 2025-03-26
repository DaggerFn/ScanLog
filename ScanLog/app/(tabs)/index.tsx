import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import {
  deleteMaterial,
  getMateriais,
  searchMaterial,
} from "@/components/api/api";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import EditModal from "@/components/EditModal";

export default function App() {
  const [materiais, setMateriais] = useState([]);
  const [stateModal, setModal] = useState(false);
  const [search, setSearch] = useState<string | string>("");
  let [valueEditModal, setValueForEdit] = useState("");

  let valor: string;

  interface dataTypes {
    id: number;
    id_material: string;
    description_material: string;
    locale_material: string;
    quantidade: Float;
    last_mod: string;
  }

  useEffect(() => {
    console.log(search);
  }, [search]);

  // Buscar materiais ao iniciar o app
  useEffect(() => {
    fetchMateriais();
  }, []);

  const fetchMateriais = async () => {
    try {
      const data = await getMateriais();
      setMateriais(data);
    } catch (error) {
      console.error("Erro ao carregar materiais:", error);
    }
  };

  const handleDelete = async (id_material: string) => {
    try {
      await deleteMaterial(id_material);
      alert("Material deletado!");
      fetchMateriais();
    } catch (error) {
      console.error("Erro ao deletar material:", error);
    }
  };

  function EditRegister(item: string) {
    setValueForEdit(item);
    setModal(true);
  }

  return (
    // <View style={{ padding: 20 }}>
    <View>
      <Button title="Update" onPress={fetchMateriais} />
      {/* <TextInput placeholder="Pesquisar Material" style={styles.title} /> */}
      <TextInput
        style={style.input}
        placeholder="Pesquisar Material"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList<dataTypes>
        data={materiais}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={style.styleBox}>
            <Text>N° do Material: {item.id_material}</Text>
            <Text>Descrição do Material: {item.description_material}</Text>
            <Text>Local: {item.locale_material}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
            <Text>Ultima modificação: {item.last_mod}</Text>

            <Button
              title="Editar"
              onPress={() => EditRegister((valor = item.id_material))}
            />
            <Button
              title="Deletar"
              onPress={() => handleDelete(item.id_material)}
            />
          </View>
        )}
      />
      <EditModal
        visible={stateModal}
        data={valueEditModal}
        onClose={() => setModal(false)}
      />
    </View>
  );
}

const style = StyleSheet.create({
  input: {
    height: 45,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // branco translúcido
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 22,
    paddingHorizontal: 15,
    color: "#333333", // cinza escuro para texto
    shadowColor: "#000", // sombra sutil
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // sombra Android
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)", // borda sutil
  },
  styleBox: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonStyle: {
    margin: 10,
  },
});
