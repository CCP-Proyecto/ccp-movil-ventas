import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Button } from "@/components";
import { colors } from "@/theme/colors";
import Toast from "react-native-toast-message";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Logo } from "@/components";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { t } from "@/i18n";

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

export default function RegisterVisit() {
  const [visitDate, setVisitDate] = useState<Date | null>(null);
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isRegisterSent, setIsRegisterSent] = useState(false);

  const handleSubmit = async () => {
    if (!visitDate || !selectedClient) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Todos los campos son obligatorios",
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Toast.show({
        type: "success",
        text1: "Registro exitoso",
        text2: "La visita ha sido registrada correctamente",
      });

      setIsRegisterSent(true);
      router.replace("/(app)/home");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo registrar la visita. Inténtalo de nuevo.",
      });
      console.error("Error al registrar visita:", error);
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

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{t("visits.screenTitle")}</Text>
        <Text style={styles.subtitle}>{t("visits.subTitle")}</Text>

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
              value={minimumDate}
              mode="date"
              display="calendar"
              minimumDate={minimumDate}
              onChange={onDateChange}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("visits.visitClient")}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedClient?.nombre || ""}
              onValueChange={(itemValue) => {
                const cliente = clientesIniciales.find(
                  (c) => c.nombre === itemValue,
                );
                setSelectedClient(cliente || null);
              }}
              style={styles.picker}
            >
              <Picker.Item
                label={`${t("visits.visitClientPlaceholder")}`}
                value=""
              />
              {clientesIniciales.map((cliente, index) => (
                <Picker.Item
                  key={index}
                  label={cliente.nombre}
                  value={cliente.nombre}
                />
              ))}
            </Picker>
          </View>

          {selectedClient && (
            <View style={styles.clientDetailsContainer}>
              <Text style={styles.clientDetail}>
                📍 {selectedClient.direccion}, {selectedClient.ciudad}
              </Text>
              <Text style={styles.clientDetail}>
                📞 {selectedClient.telefono}
              </Text>
            </View>
          )}
        </View>

        <Button
          title={
            isLoading ? `${t("visits.buttonLoading")}` : `${t("visits.button")}`
          }
          onPress={handleSubmit}
          style={styles.submitButton}
          disabled={isLoading || isRegisterSent}
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
  input: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    padding: 10,
    fontFamily: "Comfortaa-Regular",
    fontSize: 14,
    color: colors.black,
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
  clientDetailsContainer: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#F2F6FA",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  clientDetail: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: "Comfortaa-Regular",
    color: colors.secondary,
  },
  datePicker: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    padding: 10,
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
});
