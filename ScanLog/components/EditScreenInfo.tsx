import React, { useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { Text, View } from "./Themed";
import { defineApi, getMateriais } from "./api/api";

export default function EditScreenInfo({ path }: { path: string }) {
  const [valor, setValor] = useState<string>("");

  const passApiValue = () => {
    console.log("chamado a funçao");
    defineApi(valor);
    getMateriais();
  };

  return (
    <View>
      <Text>Alterar IP do banco de dados</Text>
      <TextInput
        placeholder="Digite IP"
        value={valor}
        onChangeText={setValor}
      />
      <Button title="Enviar" onPress={passApiValue} />
    </View>
  );
}

const styles = StyleSheet.create({});
("");
