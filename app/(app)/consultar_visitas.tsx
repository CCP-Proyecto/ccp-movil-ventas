import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

type Visita = {
  cliente: string;
  direccion: string;
  ciudad: string;
  vendedor: string;
  fecha: string;
};

const visitasIniciales: Visita[] = [
  {
    cliente: "Supermercado La 14",
    direccion: "Calle 10 #23-15",
    ciudad: "Bogotá",
    vendedor: "Carlos Ruiz",
    fecha: "2025-04-10",
  },
  {
    cliente: "Tienda Don Juan",
    direccion: "Carrera 15 #45-20",
    ciudad: "Medellín",
    vendedor: "Laura Torres",
    fecha: "2025-04-11",
  },
  {
    cliente: "Minimarket El Éxito",
    direccion: "Av. Siempre Viva 123",
    ciudad: "Cali",
    vendedor: "Andrés Mejía",
    fecha: "2025-04-12",
  },
  {
    cliente: "Cliente sin dirección",
    direccion: "",
    ciudad: "Barranquilla",
    vendedor: "María López",
    fecha: "2025-04-13",
  },
];

const ConsultaVisitasScreen = () => {
  const [visitas, setVisitas] = useState<Visita[]>(visitasIniciales);

  const renderItem = ({ item }: { item: Visita }) => {
    const direccionCompleta =
      item.direccion && item.ciudad
        ? `${item.direccion}, ${item.ciudad}`
        : item.direccion || item.ciudad || "Sin dirección";

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.cliente}</Text>
        <Text style={styles.text}>📍 {direccionCompleta}</Text>
        <Text style={styles.text}>📅 Fecha de visita: {item.fecha}</Text>
        <Text style={styles.text}>👤 Visitado por: {item.vendedor}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historial de Visitas</Text>
      <FlatList
        data={visitas}
        keyExtractor={(item, index) => `${item.cliente}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default ConsultaVisitasScreen;

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
