import { CameraView } from "expo-camera";
import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import ScannerModal from "@/components/ScannerModal";
import RegisterModal from "@/components/RegisterModal";
import React from "react";
import { Button } from "@/components/button";

export default function Home() {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleRegister, setModalVisibleRegister] = useState(false);
  const dataTest = "10161401";

  // function handleBarcodeScanned({ data }: { data: string }) {
  //   console.log("QR Code escaneado:", data);
  //   setScannedData(data);
  //   setModalVisible(true);
  // }

  function handleBarcodeScanned({ data }: { data: string }) {
    console.log("QR Code escaneado:", data);
    setScannedData(data);
    setModalVisible(true);
  }

  function handlerRegModal() {
    setModalVisibleRegister(true);
  }

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />

      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        onBarcodeScanned={handleBarcodeScanned}
      />
      <Button
        title="QR"
        onPress={() => handleBarcodeScanned({ data: dataTest })}
      />
      <Button title="Registrar" onPress={() => handlerRegModal()} />

      {/* Modal de exibição do QR Code */}
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
