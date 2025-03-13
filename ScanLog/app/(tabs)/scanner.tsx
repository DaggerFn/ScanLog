import { CameraView } from "expo-camera";
import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, SafeAreaView, Pressable } from "react-native";
import ScannerModal from "@/components/ScannerModal";
import RegisterModal from "@/components/RegisterModal";
import React from "react";
import { Button } from "@/components/button";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Home() {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleRegister, setModalVisibleRegister] = useState(false);
  const [isSelected, setSelection] = useState(false);
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
      <Pressable>
        {({ pressed }) => (
          <FontAwesome
            name="info-circle"
            size={25}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>

      <BouncyCheckbox
        isChecked={isSelected}
        onPress={setSelection}
        text="Registrar"
      />
      {/*
       Modal de exibição do QR Code 
      <ScannerModal
        visible={modalVisible}
        scannedData={scannedData || ""}
        onClose={() => setModalVisible(false)}
      />
       */}
      <RegisterModal
        visible={modalVisibleRegister}
        scannedData={scannedData || ""}
        onClose={() => setModalVisibleRegister(false)}
      />
    </SafeAreaView>
  );
}
