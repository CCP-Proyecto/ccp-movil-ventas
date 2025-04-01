import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { colors } from "@/theme/colors";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleLogin = () => {
    // Implementar lógica de login
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.logo}>CCP</Text>
        <Text style={styles.subtitle}>COMPRAS FÁCILES, ENVÍOS RÁPIDOS</Text>

        <View style={styles.welcomeSection}>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.welcomeText}>¡Bienvenido inicio de sesión!</Text>
        </View>

        <View style={styles.form}>
          <Input
            placeholder="Usuario"
            value={usuario}
            onChangeText={setUsuario}
          />
          <Input
            placeholder="Contraseña"
            value={contraseña}
            onChangeText={setContraseña}
            secureTextEntry
          />

          <Button
            onPress={handleLogin}
            title="Iniciar sesión"
          />

          <Button
            onPress={() => {
              /* Implementar navegación al registro */
            }}
            title="Regístrate"
            variant="text"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
    width: "100%",
  },
  logo: {
    fontSize: 32,
    textAlign: "center",
    color: colors.primary,
  },
  subtitle: {
    textAlign: "center",
    color: colors.primary,
    fontSize: 12,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingBottom: 10,
    width: "100%",
  },
  welcomeSection: {
    width: "100%",
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.black,
  },
  welcomeText: {
    color: colors.secondary,
  },
  form: {
    width: "100%",
    marginTop: 20,
    gap: 15,
  },
});
