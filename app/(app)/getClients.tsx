import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { authClient, fetchClient } from "@/services";
import { t } from "@/i18n";
import { colors } from "@/theme/colors";

type Cliente = {
  nombre: string;
  direccion: string;
  telefono: string;
  ciudad: string;
};

// Datos estáticos para mostrar como fallback
const clientesIniciales: Cliente[] = [
  {
    nombre: "Supermercado La 14",
    direccion: "Calle 10 #23-15",
    telefono: "310 567 2387",
    ciudad: "Bogotá",
  },
  {
    nombre: "Tienda Don Juan",
    direccion: "Carrera 15 #45-20",
    telefono: "311 222 3344",
    ciudad: "Bogotá",
  },
  {
    nombre: "Minimarket El Éxito",
    direccion: "Av. Siempre Viva 123",
    telefono: "312 333 4455",
    ciudad: "Bogotá",
  },
  {
    nombre: "Almacén Central",
    direccion: "Calle 80 # 20-45",
    telefono: "313 444 5566",
    ciudad: "Bogotá",
  },
];

const ConsultaClientesScreen = () => {
  const [clientes, setClientes] = useState<Cliente[]>(clientesIniciales);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const customerId = authClient.useSession().data?.user?.userId?.toString();

  useEffect(() => {
    const loadClients = async () => {
      if (!customerId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const { data } = await fetchClient.get(
          "/api/customer/salesperson/" + customerId,
        );

        if (Array.isArray(data) && data.length > 0) {
          const clientesAPI = data.map((cliente) => ({
            nombre: cliente.name || cliente.nombre,
            direccion: cliente.address || cliente.direccion,
            telefono: cliente.phone || cliente.telefono,
            ciudad: cliente.city || cliente.ciudad,
          }));
          setClientes(clientesAPI);
        } else {
          console.log("No se encontraron clientes en la API");
        }
      } catch (err) {
        console.error("Error al cargar clientes:", err);
        setError("No se pudieron cargar los clientes. Intente nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    loadClients();
  }, [customerId]);

  const renderItem = ({ item }: { item: Cliente }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nombre}</Text>
      <Text style={styles.text}>
        📍 {item.direccion}, {item.ciudad}
      </Text>
      <Text style={styles.text}>📞 {item.telefono}</Text>
    </View>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />
          <Text style={styles.loadingText}>Cargando clientes...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    if (clientes.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No hay clientes disponibles</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={clientes}
        keyExtractor={(item, index) => `${item.nombre}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t("clients.screenTitle")}</Text>
      {renderContent()}
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
    fontFamily: "Comfortaa-Bold",
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
    fontFamily: "Comfortaa-Bold",
  },
  text: {
    fontSize: 14,
    marginTop: 4,
    fontFamily: "Comfortaa-Regular",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.secondary,
    fontFamily: "Comfortaa-Regular",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    fontFamily: "Comfortaa-Regular",
  },
  emptyText: {
    fontSize: 16,
    color: colors.secondary,
    textAlign: "center",
    fontFamily: "Comfortaa-Regular",
  },
});
