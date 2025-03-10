import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, TextInput } from "react-native";
import {
  getMateriais,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  searchMaterial,
} from "../../components/api/api";

export default function App() {
  const [materiais, setMateriais] = useState([]);
  const [id_material, setId] = useState("");
  const [local, setLocal] = useState("");
  const [description_material, setdescription_material] = useState("");
  const [quantidade, setQuantidade] = useState("");

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

  const handleUpdate = async () => {
    if (!id_material || !description_material || !local)
      return alert("Preencha todos os campos!");

    try {
      await updateMaterial(id_material, {
        locale_material: local,
        description_material: description_material,
      });
      alert("Material atualizado com sucesso!");
      fetchMateriais();
    } catch (error) {
      console.error("Erro ao atualizar material:", error);
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

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Materiais</Text>

      {/* Campos para criar/atualizar */}
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
        value={local}
        onChangeText={setQuantidade}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Descrição"
        value={description_material}
        onChangeText={setdescription_material}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Button title="Criar Material" onPress={handleCreate} />
      <Button title="Atualizar Material" onPress={handleUpdate} />
      <Button title="Console do data row" onPress={searchMaterial} />
      {/* Lista de materiais */}
      {/* <FlatList
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
            <Text>ID: {item.id_material}</Text>
            <Text>description_material: {item.description_material}</Text>
            <Text>Local: {item.locale_material}</Text>
            <Text>Qtd: {item.quantidade}</Text>
            <Button
              title="Deletar"
              onPress={() => handleDelete(item.id_material)}
            />
          </View>
        )}
      /> */}
    </View>
  );
}
