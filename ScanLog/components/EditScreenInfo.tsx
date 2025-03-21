import React, { useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { Text, View } from "./Themed";
import { defineApi } from "./api/api";

export default function EditScreenInfo({ path }: { path: string }) {
  const [valor, setValor] = useState<string>("");

  const passApiValue = () => {
    defineApi(valor);
    console.log("chamado a funçao");
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
