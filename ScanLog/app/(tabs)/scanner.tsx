import { getMateriais } from "@/components/api/api";
import { CameraView } from "expo-camera";
import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import ScannerModal from "@/components/ScannerModal";
import React from "react";

export default function Home() {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  function handleBarcodeScanned({ data }: { data: string }) {
    console.log("QR Code escaneado:", data);
    setScannedData(data);
    setModalVisible(true);
  }

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />

      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        onBarcodeScanned={handleBarcodeScanned}
      />

      {/* Modal de exibição do QR Code */}
      <ScannerModal
        visible={modalVisible}
        scannedData={scannedData || ""}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}
