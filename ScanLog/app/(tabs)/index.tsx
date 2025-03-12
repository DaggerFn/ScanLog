{
  /*import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
*/
}

import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { Input } from "@/components/input";
import React from "react";

export default function Index() {
  function handleMessage() {
    Alert.alert("No camera device found");
  }

  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestão de Materiais: {name}</Text>
      <View style={styles.dataArea}>
        <Input placeholder="Numero da Ordem" onChangeText={setName} />
        {/* <ButtonQR title="Scanner"  onPress={cameraPersmision} /> */}
      </View>
      {/*<Button title="Scanner" onPress={directPage} />*/}
      {/* <Button title="Tabela" onPress={tabelRouter} /> */}
      {/* <Button title="Post" onPress={handlePostData} /> */}
      {/* <Button title="Get" onPress={fetchPosts} /> */}
      {/*<Button title="test" onPress={directPage} />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    gap: 8,
  },
  dataArea: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    alignItems: "center",
    color: "blue",
    fontSize: 36,
    fontWeight: "bold",
    width: "100%",
  },
  CameraElement: {
    backgroundColor: "orange",
    flex: 2,
    height: 100,
    width: 150,
  },
});
