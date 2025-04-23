import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import {
  deleteMaterial,
  getMateriais,
  searchMaterial,
} from "@/components/api/api";
import EditModal from "@/components/EditModal";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

// Interface para os dados de material
interface Material {
  id: number;
  id_material: number;
  description_material: string;
  locale_material: string;
  quantidade: number;
  last_mod: string;
}

// Interface para a ordenação
interface SortOrderState {
  date: "asc" | "desc" | null;
  quantity: "asc" | "desc" | null;
}

export default function App() {
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [filteredMateriais, setFilteredMateriais] = useState<Material[]>([]);
  const [stateModal, setModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [valueEditModal, setValueForEdit] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<SortOrderState>({
    date: null,
    quantity: null,
  });

  // Atualiza a lista filtrada sempre que a pesquisa ou o sort mudar
  useEffect(() => {
    if (search.trim() === "" && !sortOrder.date && !sortOrder.quantity) {
      setFilteredMateriais(materiais);
    } else {
      let filtered = [...materiais];

      // Aplicar pesquisa
      if (search.trim() !== "") {
        filtered = filtered.filter(
          (item) =>
            item.description_material
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            String(item.id_material).includes(search)
        );
      }

      // Aplicar ordenação por data
      if (sortOrder.date === "asc") {
        filtered.sort((a, b) => {
          // Tentando lidar com diferentes formatos de data
          const dateA = new Date(
            a.last_mod.replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$2-$1")
          );
          const dateB = new Date(
            b.last_mod.replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$2-$1")
          );
          return dateA.getTime() - dateB.getTime();
        });
      } else if (sortOrder.date === "desc") {
        filtered.sort((a, b) => {
          const dateA = new Date(
            a.last_mod.replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$2-$1")
          );
          const dateB = new Date(
            b.last_mod.replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$2-$1")
          );
          return dateB.getTime() - dateA.getTime();
        });
      }

      // Aplicar ordenação por quantidade
      if (sortOrder.quantity === "asc") {
        filtered.sort((a, b) => a.quantidade - b.quantidade);
      } else if (sortOrder.quantity === "desc") {
        filtered.sort((a, b) => b.quantidade - a.quantidade);
      }

      setFilteredMateriais(filtered);
    }
  }, [search, materiais, sortOrder]);

  // Buscar materiais ao iniciar o app
  useEffect(() => {
    fetchMateriais();
  }, []);

  const fetchMateriais = async () => {
    try {
      setLoading(true);
      const data = await getMateriais();
      setMateriais(data);
      setFilteredMateriais(data);
    } catch (error) {
      console.error("Erro ao carregar materiais:", error);
      Alert.alert("Erro", "Erro ao carregar materiais. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      if (search.trim() === "") {
        fetchMateriais();
        return;
      }

      setLoading(true);
      const result = await searchMaterial(search);
      if (result && result.length > 0) {
        setMateriais(result);
        setFilteredMateriais(result);
      } else {
        setFilteredMateriais([]);
        Alert.alert(
          "Informação",
          "Nenhum material encontrado com esse termo de pesquisa."
        );
      }
    } catch (error) {
      console.error("Erro na pesquisa:", error);
      Alert.alert("Erro", "Falha ao realizar a pesquisa. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id_material: number) => {
    try {
      await deleteMaterial(String(id_material));
      Alert.alert("Sucesso", "Material deletado com sucesso!");
      fetchMateriais();
    } catch (error) {
      console.error("Erro ao deletar material:", error);
      Alert.alert("Erro", "Erro ao deletar material. Tente novamente.");
    }
  };

  const toggleSortDate = () => {
    setSortOrder((prev) => ({
      quantity: null,
      date: prev.date === "desc" ? "asc" : "desc",
    }));
  };

  const toggleSortQuantity = () => {
    setSortOrder((prev) => ({
      date: null,
      quantity: prev.quantity === "desc" ? "asc" : "desc",
    }));
  };

  const EditRegister = (item: number) => {
    setValueForEdit(item);
    setModal(true);
  };

  const formatDate = (dateString: string) => {
    // Tentando lidar com diferentes formatos de data
    try {
      if (dateString.includes("/")) {
        // Formato DD/MM/YYYY
        const [day, month, year] = dateString.split("/");
        return `${day}/${month}/${year.trim()}`;
      } else {
        // Formato YYYY-MM-DD HH:MM:SS
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, "0")}/${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${date.getFullYear()} ${date
          .getHours()
          .toString()
          .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
      }
    } catch (error) {
      return dateString; // Retorna o original se falhar
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("pt-BR");
  };

  const renderItem = ({ item }: { item: Material }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Material #{item.id_material}</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => EditRegister(item.id_material)}
          >
            <Ionicons name="pencil" size={18} color="white" />
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDelete(item.id_material)}
          >
            <Ionicons name="trash" size={18} color="white" />
            <Text style={styles.buttonText}>Deletar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Descrição:</Text>
          <Text style={styles.infoValue}>
            {item.description_material !== "None"
              ? item.description_material
              : "Sem descrição"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Local:</Text>
          <Text style={styles.infoValue}>{item.locale_material}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Quantidade:</Text>
          <Text style={styles.infoValue}>{formatNumber(item.quantidade)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Última modificação:</Text>
          <Text style={styles.infoValue}>{formatDate(item.last_mod)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* 
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Controle de Materiais</Text>
      </View> */}

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar Material..."
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={22} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filtrar por:</Text>
        <TouchableOpacity
          style={[styles.filterButton, sortOrder.date && styles.activeFilter]}
          onPress={toggleSortDate}
        >
          <MaterialIcons
            name={sortOrder.date === "asc" ? "arrow-upward" : "arrow-downward"}
            size={16}
            color={sortOrder.date ? "white" : "#333"}
          />
          <Text
            style={[
              styles.filterText,
              sortOrder.date && styles.activeFilterText,
            ]}
          >
            Data {sortOrder.date === "asc" ? "(Antigos)" : "(Recentes)"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            sortOrder.quantity && styles.activeFilter,
          ]}
          onPress={toggleSortQuantity}
        >
          <MaterialIcons
            name={
              sortOrder.quantity === "asc" ? "arrow-upward" : "arrow-downward"
            }
            size={16}
            color={sortOrder.quantity ? "white" : "#333"}
          />
          <Text
            style={[
              styles.filterText,
              sortOrder.quantity && styles.activeFilterText,
            ]}
          >
            Qtd {sortOrder.quantity === "asc" ? "(Menor)" : "(Maior)"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.refreshButton} onPress={fetchMateriais}>
          <Ionicons name="refresh" size={18} color="white" />
          <Text style={styles.refreshText}>Atualizar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary || "#2196F3"} />
          <Text style={styles.loadingText}>Carregando materiais...</Text>
        </View>
      ) : (
        <>
          {filteredMateriais.length > 0 ? (
            <FlatList
              data={filteredMateriais}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="alert-circle-outline" size={60} color="#ccc" />
              <Text style={styles.emptyText}>Nenhum material encontrado</Text>
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={fetchMateriais}
              >
                <Text style={styles.emptyButtonText}>
                  Exibir todos os materiais
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      {valueEditModal !== null && (
        <EditModal
          visible={stateModal}
          data={String(valueEditModal)}
          onClose={() => {
            setModal(false);
            setValueForEdit(null);
            fetchMateriais(); // Atualiza a lista após edição
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: Colors.primary || "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchButton: {
    width: 48,
    backgroundColor: Colors.primary || "#2196F3",
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexWrap: "wrap",
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 8,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#eee",
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  activeFilter: {
    backgroundColor: Colors.primary || "#2196F3",
  },
  filterText: {
    fontSize: 12,
    marginLeft: 4,
  },
  activeFilterText: {
    color: "white",
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.primary || "#2196F3",
    borderRadius: 16,
    marginLeft: "auto",
  },
  refreshText: {
    fontSize: 12,
    marginLeft: 4,
    color: "white",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100, // Espaço extra no final da lista
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardHeader: {
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  actionsContainer: {
    flexDirection: "row",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    marginLeft: 4,
  },
  cardContent: {
    padding: 16,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  infoLabel: {
    width: 120,
    fontWeight: "bold",
    color: "#555",
  },
  infoValue: {
    flex: 1,
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginTop: 16,
    textAlign: "center",
  },
  emptyButton: {
    marginTop: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.primary || "#2196F3",
    borderRadius: 8,
  },
  emptyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
