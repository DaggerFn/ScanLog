import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

interface ScannerModalProps {
  visible: boolean;
  scannedData: string;
  onClose: () => void;
}

const ScannerModal: React.FC<ScannerModalProps> = ({ visible, scannedData, onClose }) => {
  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>QR Code Escaneado:</Text>
          <Text style={styles.data}>{scannedData}</Text>
          <Button title="Fechar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  data: {
    fontSize: 18,
    marginVertical: 10,
    color: "blue",
  },
});

export default ScannerModal;
