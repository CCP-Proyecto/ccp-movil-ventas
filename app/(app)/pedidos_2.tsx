import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CrearPedidoScreen() {
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [productos, setProductos] = useState<string[]>([]);

  // Simulación: descomenta para pruebas
  // React.useEffect(() => {
  //   setProductos(["Arroz", "Frijoles", "Pan", "Leche", "Huevos"]);
  // }, []);

  return (
    <View style={styles.container}>
      {/* Header CCP */}
      <Text style={styles.logo}>CCP</Text>
      <View style={styles.sloganContainer}>
        <View style={styles.line} />
        <Text style={styles.slogan}>COMPRAS FÁCILES, ENVÍOS RÁPIDOS</Text>
        <View style={styles.line} />
      </View>

      {/* Título principal */}
      <Text style={styles.titulo}>Creación de pedidos</Text>

      {/* Dropdown de productos */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setMostrarOpciones((prev) => !prev)}
      >
        <Text style={styles.dropdownText}>
          Selecciona el producto que deseas agregar
        </Text>
        <Ionicons
          name={mostrarOpciones ? "chevron-up" : "chevron-down"}
          size={20}
          color="#567186"
        />
      </TouchableOpacity>

      {/* Lista de productos */}
      {mostrarOpciones && (
        <FlatList
          data={productos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.optionItem}>{item}</Text>
          )}
          contentContainerStyle={styles.optionList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  logo: {
    fontSize: 40,
    fontWeight: "600",
    color: "#567186",
    textAlign: "center",
    marginBottom: 4,
  },
  sloganContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  slogan: {
    fontSize: 12,
    color: "#567186",
    marginHorizontal: 10,
  },
  line: {
    height: 2,
    width: 30,
    backgroundColor: "#567186",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "500",
    marginBottom: 30,
    textAlign: "center",
  },
  dropdownButton: {
    backgroundColor: "#F2F2F2",
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
  },
  optionList: {
    marginTop: 20,
  },
  optionItem: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
