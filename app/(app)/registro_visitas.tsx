import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function RegistroVisitasScreen() {
  const [fechaVisita, setFechaVisita] = useState("");
  const [cliente, setCliente] = useState("");
  const [idCliente, setIdCliente] = useState("");

  const handleRegistro = () => {
    // Aquí puedes enviar los datos al backend o hacer validaciones
    console.log({ fechaVisita, cliente, idCliente });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header CCP */}
      <Text style={styles.logo}>CCP</Text>
      <View style={styles.sloganContainer}>
        <View style={styles.line} />
        <Text style={styles.slogan}>COMPRAS FÁCILES, ENVÍOS RÁPIDOS</Text>
        <View style={styles.line} />
      </View>

      {/* Título */}
      <Text style={styles.titulo}>Registro de visitas</Text>
      <Text style={styles.subtitulo}>Crea un nuevo registro</Text>

      {/* Inputs */}
      <TextInput
        placeholder="Fecha visita"
        value={fechaVisita}
        onChangeText={setFechaVisita}
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Cliente"
        value={cliente}
        onChangeText={setCliente}
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="ID del cliente"
        value={idCliente}
        onChangeText={setIdCliente}
        style={styles.input}
        placeholderTextColor="#999"
      />

      {/* Botón */}
      <TouchableOpacity
        style={styles.boton}
        onPress={handleRegistro}
      >
        <Text style={styles.botonTexto}>Registrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: "#444",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    color: "#000",
  },
  boton: {
    backgroundColor: "#567186",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignSelf: "center",
    marginTop: 20,
    elevation: 4, // sombra para Android
    shadowColor: "#000", // sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
