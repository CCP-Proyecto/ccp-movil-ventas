// File: app/entrega.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EntregaScreen() {
  // Listado de puntos de entrega. Se espera que el backend lo llene.
  const [puntosEntrega, setPuntosEntrega] = useState<string[]>([]);

  // Estado para mostrar u ocultar el dropdown
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setMostrarOpciones((prev) => !prev)}
      >
        <Text style={styles.dropdownText}>
          Selecciona los puntos de entrega
        </Text>
        <Ionicons
          name={mostrarOpciones ? "chevron-up" : "chevron-down"}
          size={20}
          color="#567186"
        />
      </TouchableOpacity>

      {mostrarOpciones && (
        <FlatList
          data={puntosEntrega}
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
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  dropdownButton: {
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#567186",
    borderWidth: 1,
  },
  dropdownText: {
    color: "#567186",
    fontSize: 16,
  },
  optionList: {
    marginTop: 20,
  },
  optionItem: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 10,
  },
});
