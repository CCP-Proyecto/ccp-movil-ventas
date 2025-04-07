import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
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

export default function RegisterVisit() {
  const [visitDate, setVisitDate] = useState<Date | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientId, setClientId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isRegisterSent, setIsRegisterSent] = useState(false);

  const handleSubmit = async () => {
    if (!visitDate || !clientName || !clientId) {
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

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Registro de visitas</Text>
        <Text style={styles.subtitle}>Crea un nuevo registro</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha visita</Text>
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
              {formattedDate || "Seleccionar fecha"}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={visitDate || new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cliente</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del cliente"
            value={clientName}
            onChangeText={setClientName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>ID del cliente</Text>
          <TextInput
            style={styles.input}
            placeholder="ID del cliente"
            value={clientId}
            onChangeText={setClientId}
          />
        </View>

        <Button
          title={isLoading ? "Registrando..." : "Registrar"}
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
