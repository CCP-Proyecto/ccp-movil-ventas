import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import { Button } from "@/components";
import { colors } from "@/theme/colors";
import Toast from "react-native-toast-message";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Logo } from "@/components";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { t } from "@/i18n";
import { fetchClient } from "@/services";

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

export default function RegisterVisit() {
  const [visitDate, setVisitDate] = useState<Date | null>(null);
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
  const [comments, setComments] = useState<string>("");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isRegisterSent, setIsRegisterSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const salespersonId = "1234567890";

  useEffect(() => {
    const loadClients = async () => {
      if (!salespersonId) {
        setError(
          "Error de autenticación. Por favor, inicie sesión nuevamente.",
        );
        setIsLoadingClients(false);
        return;
      }

      try {
        setIsLoadingClients(true);
        setError(null);

        const { data } = await fetchClient.get("/api/customer");

        if (Array.isArray(data) && data.length > 0) {
          const clientesFiltrados = data.filter(
            (cliente: Cliente) => cliente.salespersonId === salespersonId,
          );

          setClientes(clientesFiltrados);

          if (clientesFiltrados.length === 0) {
            setError("No tienes clientes asignados para registrar visitas.");
          }
        } else {
          setClientes([]);
          setError("No se encontraron clientes en el sistema.");
        }
      } catch (err: any) {
        console.error("Error al cargar clientes:", err);
        setError(
          err.response?.data?.message ||
            "No se pudieron cargar los clientes. Verifique su conexión e intente nuevamente.",
        );
        setClientes([]);
      } finally {
        setIsLoadingClients(false);
      }
    };

    loadClients();
  }, [salespersonId]);

  const handleSubmit = async () => {
    // Validaciones
    if (!visitDate || !selectedClient || !comments.trim()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Todos los campos son obligatorios",
      });
      return;
    }

    if (!salespersonId) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error de autenticación. Por favor, inicie sesión nuevamente.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const visitDateISO = visitDate.toISOString();

      const visitData = {
        visitDate: visitDateISO,
        comments: comments.trim(),
        customerId: selectedClient.id,
        salespersonId: salespersonId,
      };

      const response = await fetchClient.post("/api/visit", visitData);

      console.log("Respuesta de la API:", response.data);

      Toast.show({
        type: "success",
        text1: "Registro exitoso",
        text2: "La visita ha sido registrada correctamente",
      });

      setIsRegisterSent(true);

      // Limpiar formulario
      setVisitDate(null);
      setSelectedClient(null);
      setComments("");

      // Navegar de vuelta al home después de un breve delay
      setTimeout(() => {
        router.replace("/(app)/home");
      }, 1500);
    } catch (error: any) {
      console.error("Error al registrar visita:", error);

      let errorMessage = "No se pudo registrar la visita. Inténtalo de nuevo.";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setVisitDate(selectedDate);
    }
  };

  const formattedDate = visitDate ? visitDate.toLocaleDateString() : "";
  const minimumDate = new Date();
  minimumDate.setDate(minimumDate.getDate() + 1);

  const renderClientPicker = () => {
    if (isLoadingClients) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="small"
            color={colors.primary}
          />
          <Text style={styles.loadingText}>Cargando clientes...</Text>
        </View>
      );
    }

    if (error || clientes.length === 0) {
      return (
        <View style={styles.noClientsContainer}>
          <Text style={styles.noClientsTitle}>
            {error || "No hay clientes disponibles"}
          </Text>
          <Text style={styles.noClientsText}>
            {clientes.length === 0
              ? "No tienes clientes asignados para registrar visitas."
              : "Intenta recargar la aplicación o contacta soporte técnico."}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedClient?.id || ""}
          onValueChange={(itemValue) => {
            const cliente = clientes.find((c) => c.id === itemValue);
            setSelectedClient(cliente || null);
          }}
          style={styles.picker}
        >
          <Picker.Item
            label={`${t("visits.visitClientPlaceholder")}`}
            value=""
          />
          {clientes.map((cliente) => (
            <Picker.Item
              key={cliente.id}
              label={cliente.name}
              value={cliente.id}
            />
          ))}
        </Picker>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{t("visits.screenTitle")}</Text>
        <Text style={styles.subtitle}>{t("visits.subTitle")}</Text>

        {/* Campo de fecha */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("visits.visitDate")}</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateInput}
          >
            <Text
              style={[
                styles.dateText,
                !formattedDate && styles.placeholderText,
              ]}
            >
              {formattedDate || `${t("visits.visitDatePlaceholder")}`}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={visitDate || minimumDate}
              mode="date"
              display="calendar"
              minimumDate={minimumDate}
              onChange={onDateChange}
            />
          )}
        </View>

        {/* Campo de cliente */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("visits.visitClient")}</Text>
          {renderClientPicker()}

          {selectedClient && (
            <View style={styles.clientDetailsContainer}>
              <Text style={styles.clientDetailTitle}>
                {selectedClient.name}
              </Text>
              <Text style={styles.clientDetail}>
                📍 {selectedClient.address}
              </Text>
              <Text style={styles.clientDetail}>📞 {selectedClient.phone}</Text>
              <Text style={styles.clientDetail}>
                🆔 {selectedClient.idType}: {selectedClient.id}
              </Text>
            </View>
          )}
        </View>

        {/* Campo de comentarios */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            {t("visits.comments") || "Comentarios"}
          </Text>
          <TextInput
            style={styles.textInput}
            value={comments}
            onChangeText={setComments}
            placeholder={
              t("visits.commentsPlaceholder") ||
              "Ingrese comentarios sobre la visita..."
            }
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <Button
          title={
            isLoading ? `${t("visits.buttonLoading")}` : `${t("visits.button")}`
          }
          onPress={handleSubmit}
          style={styles.submitButton}
          disabled={
            isLoading ||
            isRegisterSent ||
            isLoadingClients ||
            clientes.length === 0
          }
        />

        {isLoading && (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={styles.loader}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Comfortaa-Bold",
    fontSize: 24,
    color: colors.black,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "Comfortaa-Regular",
    fontSize: 14,
    color: colors.secondary,
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontFamily: "Comfortaa-Regular",
    fontSize: 14,
    color: colors.black,
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    padding: 10,
    fontFamily: "Comfortaa-Regular",
    fontSize: 14,
    color: colors.black,
    backgroundColor: "#fff",
    minHeight: 80,
  },
  clientDetailsContainer: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#F2F6FA",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  clientDetailTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Comfortaa-Bold",
    color: colors.black,
  },
  clientDetail: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: "Comfortaa-Regular",
    color: colors.secondary,
  },
  clientDetailDate: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: "Comfortaa-Light",
    color: colors.secondary,
    fontStyle: "italic",
  },
  submitButton: {
    marginTop: 20,
    alignSelf: "center",
    width: "100%",
  },
  loader: {
    marginTop: 20,
    alignSelf: "center",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
  },
  dateText: {
    fontFamily: "Comfortaa-Regular",
    fontSize: 14,
    color: colors.black,
  },
  placeholderText: {
    color: colors.secondary,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  loadingText: {
    marginLeft: 10,
    fontFamily: "Comfortaa-Regular",
    fontSize: 14,
    color: colors.secondary,
  },
  noClientsContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ffc107",
    borderRadius: 5,
    backgroundColor: "#fff3cd",
    alignItems: "center",
  },
  noClientsTitle: {
    fontFamily: "Comfortaa-Bold",
    fontSize: 16,
    color: "#856404",
    textAlign: "center",
    marginBottom: 8,
  },
  noClientsText: {
    fontFamily: "Comfortaa-Regular",
    fontSize: 14,
    color: "#856404",
    textAlign: "center",
    lineHeight: 20,
  },
});
