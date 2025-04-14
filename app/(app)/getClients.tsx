import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

type Cliente = {
  nombre: string;
  direccion: string;
  telefono: string;
  ciudad: string;
};

const clientesIniciales: Cliente[] = [
  {
    nombre: "Supermercado La 14",
    direccion: "Calle 10 #23-15",
    telefono: "310 555 1234",
    ciudad: "Bogotá",
  },
  {
    nombre: "Tienda Don Juan",
    direccion: "Carrera 15 #45-20",
    telefono: "311 222 3344",
    ciudad: "Medellín",
  },
  {
    nombre: "Minimarket El Éxito",
    direccion: "Av. Siempre Viva 123",
    telefono: "312 333 4455",
    ciudad: "Cali",
  },
];

const ConsultaClientesScreen = () => {
  const [clientes] = useState<Cliente[]>(clientesIniciales);

  const renderItem = ({ item }: { item: Cliente }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nombre}</Text>
      <Text style={styles.text}>
        📍 {item.direccion}, {item.ciudad}
      </Text>
      <Text style={styles.text}>📞 {item.telefono}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Clientes Registrados</Text>
      <FlatList
        data={clientes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default ConsultaClientesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#F2F6FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    marginTop: 4,
  },
});
