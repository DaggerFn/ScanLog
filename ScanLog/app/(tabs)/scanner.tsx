import { CameraView } from "expo-camera";
import { Stack } from "expo-router";
import { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  View,
} from "react-native";
import ScannerModal from "@/components/ScannerModal/ScannerModal";
import RegisterModal from "@/components/RegisterModal/RegisterModal";
import React from "react";
import { getApiMaterialInfo } from "@/components/api/get_api_material";
import { Button } from "@/components/button";

export default function Home() {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleRegister, setModalVisibleRegister] = useState(false);
  const [isSelectedScanner, setSelectionScanner] = useState(false);

  // function handleBarcodeScanned({ data }: { data: string }) {
  //   console.log("QR Code escaneado:", data);
  //   setScannedData(data);
  //   setModalVisible(true);
  // }

  function handleBarcodeScanned({ data }: { data: string }) {
    // console.log("QR Code escaneado:", data);
    if (isSelectedScanner == true) {
      setScannedData(data);
      setModalVisible(true);
    } else if (modalVisibleRegister == true) {
      setScannedData(data);
    }
  }

  function handlerRegModal() {
    setSelectionScanner(false);
    setModalVisibleRegister(true);
  }

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen options={{ title: "Scanner", headerShown: false }} />

      {/* Câmera */}
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        onBarcodeScanned={handleBarcodeScanned}
      />

      {/* Wrapper dos Checkboxes */}
      <View style={styles.checkboxWrapper}>
        <TouchableOpacity
          style={[
            styles.button,
            modalVisibleRegister && styles.buttonActive, // aplica o estilo ativo se modalVisibleRegister for true
          ]}
          onPress={handlerRegModal}
        >
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        {/* Botão para Scannear */}
        {/* <TouchableOpacity
          style={[
            styles.button,
            isSelectedScanner && styles.buttonActive, // aplica o estilo ativo se isSelectedScanner for true
          ]}
          onPress={() => {
            // Define um valor de teste para o modal
            const testValue = "10121169";
            setScannedData(testValue); // Define o valor de teste
            setModalVisible(true); // Exibe o modal
          }}
        >
          <Text style={styles.buttonText}>Consultar</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={[
            styles.button,
            isSelectedScanner && styles.buttonActive, // aplica o estilo ativo se isSelectedScanner for true
          ]}
          onPress={() => setSelectionScanner((prev) => !prev)}
        >
          <Text style={styles.buttonText}>Consultar</Text>
        </TouchableOpacity>

        {/* <View>
          <TouchableOpacity style={styles.button} onPress={getApiMaterialInfo}>
            <Text style={styles.buttonText}>teste</Text>
          </TouchableOpacity>
        </View> */}
      </View>

      {/* Modais */}
      <ScannerModal
        visible={modalVisible}
        scannedData={scannedData || ""}
        onClose={() => setModalVisible(false)}
      />
      <RegisterModal
        visible={modalVisibleRegister}
        scannedData={scannedData || ""}
        onClose={() => setModalVisibleRegister(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  checkboxWrapper: {
    position: "absolute",
    top: 800, // Espaçamento do topo (pode ajustar conforme necessário)
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo translúcido
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 10,
  },
  container: {
    padding: 16,
  },
  button: {
    backgroundColor: "#ddd",
    padding: 12,
    marginBottom: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "#4CAF50", // cor quando ativo; ajuste conforme necessário
  },
  buttonText: {
    color: "#000",
    fontSize: 22,
  },
});
