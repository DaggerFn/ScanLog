import { CameraView } from "expo-camera";
import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import ScannerModal from "@/components/ScannerModal";
import RegisterModal from "@/components/RegisterModal";
import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function Home() {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleRegister, setModalVisibleRegister] = useState(false);
  const [isSelectedRegister, setSelectionRegister] = useState(false);
  const [isSelectedScanner, setSelectionScanner] = useState(false);
  const dataTest = "10161401";

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
    setModalVisibleRegister(true);
    setSelectionScanner(false);
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
        <BouncyCheckbox
          isChecked={modalVisibleRegister}
          onPress={handlerRegModal}
          text="Registrar"
          fillColor="#4CAF50"
          textStyle={styles.checkboxText}
          iconStyle={styles.checkboxIcon}
          innerIconStyle={styles.innerCheckboxIcon}
        />
        <BouncyCheckbox
          isChecked={isSelectedScanner}
          onPress={setSelectionScanner}
          text="Scannear"
          fillColor="#2196F3"
          textStyle={styles.checkboxText}
          iconStyle={styles.checkboxIcon}
          innerIconStyle={styles.innerCheckboxIcon}
        />
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
    top: 10, // Espaçamento do topo (pode ajustar conforme necessário)
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
  checkboxText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 28,
  },
  checkboxIcon: {
    borderColor: "white",
    borderWidth: 2,
  },
  innerCheckboxIcon: {
    borderWidth: 2,
    borderRadius: 4,
  },
});
