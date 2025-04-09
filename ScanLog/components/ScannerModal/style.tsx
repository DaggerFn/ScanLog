import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end", // Fixa próximo ao rodapé
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: "100%",
    maxHeight: "60%", // Limita altura do modal
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 60, // Espaço em relação ao footer
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  scannedData: {
    fontSize: 22,
    color: "#555",
    marginBottom: 12,
    textAlign: "center",
  },
  list: {
    width: "100%",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  itemText: {
    fontSize: 24,
    color: "#333",
    marginBottom: 4,
  },
  buttonContainer: {
    marginTop: 8,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  quantityInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 22,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 5,
    width: 55,
  },
});
