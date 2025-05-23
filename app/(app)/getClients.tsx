import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { fetchClient } from "@/services";
import { t } from "@/i18n";
import { colors } from "@/theme/colors";
import { Logo } from "@/components";

type Cliente = {
  address: string;
  createdAt: string;
  id: string;
  idType: string;
  name: string;
  phone: string;
  salespersonId: string;
  updatedAt: string;
};

const ConsultaClientesScreen = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const salespersonId = "1234567890";

  useEffect(() => {
    const loadClients = async () => {
      if (!salespersonId) {
        setError(
          "Error de autenticación. Por favor, inicie sesión nuevamente.",
        );
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        console.log("Cargando clientes para salesperson ID:", salespersonId);
        const { data } = await fetchClient.get("/api/customer");

        console.log("Clientes obtenidos de la API:", data);

        if (Array.isArray(data) && data.length > 0) {
          const clientesFiltrados = data.filter(
            (cliente: Cliente) => cliente.salespersonId === salespersonId,
          );

          console.log(
            "Clientes filtrados para este vendedor:",
            clientesFiltrados,
          );

          setClientes(clientesFiltrados);

          if (clientesFiltrados.length === 0) {
            console.log("No se encontraron clientes para este vendedor");
          }
        } else {
          setClientes([]);
          console.log("No se encontraron clientes en la API");
        }
      } catch (err: any) {
        console.error("Error al cargar clientes:", err);
        setError(
          err.response?.data?.message ||
            "No se pudieron cargar los clientes. Verifique su conexión e intente nuevamente.",
        );
        setClientes([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadClients();
  }, [salespersonId]);

  const renderItem = ({ item }: { item: Cliente }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.clientName}>{item.name}</Text>
        <Text style={styles.clientId}>{`ID: ${item.idType} ${item.id}`}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.infoText}>📍 {item.address}</Text>
        <Text style={styles.infoText}>📞 {item.phone}</Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>👥</Text>
      <Text style={styles.emptyTitle}>No hay clientes registrados</Text>
      <Text style={styles.emptySubtitle}>
        Aún no tienes clientes asignados en el sistema.
      </Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={styles.errorTitle}>Error al cargar clientes</Text>
      <Text style={styles.errorMessage}>{error}</Text>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        size="large"
        color={colors.primary}
      />
      <Text style={styles.loadingText}>Cargando clientes...</Text>
    </View>
  );

  const renderContent = () => {
    if (isLoading) {
      return renderLoadingState();
    }

    if (error) {
      return renderErrorState();
    }

    if (clientes.length === 0) {
      return renderEmptyState();
    }

    return (
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.title}>{t("clients.screenTitle")}</Text>
        <Text style={styles.subtitle}>
          {isLoading
            ? "Cargando..."
            : `${clientes.length} cliente${clientes.length !== 1 ? "s" : ""} registrado${clientes.length !== 1 ? "s" : ""}`}
        </Text>
      </View>

      <View style={styles.contentContainer}>{renderContent()}</View>
    </SafeAreaView>
  );
};

export default ConsultaClientesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#000",
    fontFamily: "Comfortaa-Bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: colors.secondary,
    fontFamily: "Comfortaa-Regular",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 20,
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
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  clientName: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Comfortaa-Bold",
    color: "#333",
    flex: 1,
  },
  clientId: {
    fontSize: 12,
    color: colors.secondary,
    fontFamily: "Comfortaa-Regular",
    backgroundColor: "#E8F0FE",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  cardContent: {
    gap: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Comfortaa-Regular",
    lineHeight: 20,
  },
  dateText: {
    fontSize: 12,
    color: colors.secondary,
    fontFamily: "Comfortaa-Light",
    marginTop: 8,
    fontStyle: "italic",
  },
  // Estados de loading, error y vacío
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.secondary,
    fontFamily: "Comfortaa-Regular",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Comfortaa-Bold",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.secondary,
    fontFamily: "Comfortaa-Regular",
    textAlign: "center",
    lineHeight: 22,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  errorIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#d32f2f",
    fontFamily: "Comfortaa-Bold",
    marginBottom: 8,
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Comfortaa-Regular",
    textAlign: "center",
    lineHeight: 22,
  },
});
