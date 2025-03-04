{/*import { handlePostData } from "@/components/api/postApi";
import { fetchPosts } from "@/components/api/getAPi";
import { Button } from "@/components/button";
import { View, Text } from "@/components/Themed";
import { StyleSheet } from "react-native";

export default function Test() {
    
    return(
        <View style={styles.page}> 
            <Button title="Post" onPress={handlePostData}/>
            <Button title="Get" onPress={fetchPosts}/>
            <Button title="Update"/>
            <Button title="delete"/>
        </View>
)}


const styles = StyleSheet.create({
    page: {
     flex: 1,
     padding: 32,
     justifyContent: "center",
     gap: 8,
    }
})
*/}

import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, TextInput } from "react-native";
import { getMateriais, createMaterial, updateMaterial, deleteMaterial } from '../../components/api/api'

export default function App() {
  const [materiais, setMateriais] = useState([]);
  const [nome, setNome] = useState("");
  const [local, setLocal] = useState("");
  const [id, setId] = useState("");

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
    if (!id || !nome || !local) return alert("Preencha todos os campos!");

    try {
      await createMaterial({
        id_material: id,
        locale_material: local,
        description_material: nome,
      });
      alert("Material criado com sucesso!");
      fetchMateriais(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao criar material:", error);
    }
  };

  const handleUpdate = async () => {
    if (!id || !nome || !local) return alert("Preencha todos os campos!");

    try {
      await updateMaterial(id, { locale_material: local, description_material: nome });
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
      <TextInput placeholder="ID" value={id} onChangeText={setId} style={{ borderBottomWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={{ borderBottomWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Local" value={local} onChangeText={setLocal} style={{ borderBottomWidth: 1, marginBottom: 10 }} />
      
      <Button title="Criar Material" onPress={handleCreate} />
      <Button title="Atualizar Material" onPress={handleUpdate} />

      {/* Lista de materiais */}
      <FlatList
        data={materiais}
        keyExtractor={(item) => item.id_material.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}>
            <Text>ID: {item.id_material}</Text>
            <Text>Nome: {item.description_material}</Text>
            <Text>Local: {item.locale_material}</Text>
            <Button title="Deletar" onPress={() => handleDelete(item.id_material)} />
          </View>
        )}
      />
    </View>
  );
}
