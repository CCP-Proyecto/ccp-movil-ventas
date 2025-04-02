import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

import { authClient } from "@/services/auth/auth-client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { colors } from "@/theme/colors";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //* Esto serviría para verificar si el usuario ya está autenticado
  // const { error, data: session } = authClient.useSession();

  const handleLogin = async () => {
    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) console.error("Error de inicio de sesión:", error);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.logo}>CCP</Text>
        <Text style={styles.subtitle}>COMPRAS FÁCILES, ENVÍOS RÁPIDOS</Text>

        <View style={styles.welcomeSection}>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.welcomeText}>Inicio de sesión</Text>
        </View>

        <View style={styles.form}>
          <Input
            placeholder="Usuario"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button
            onPress={handleLogin}
            title="Iniciar sesión"
          />

          <Button
            onPress={() => {
              /* TODO: Implementar navegación al registro */
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
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
    width: "100%",
    maxWidth: 350,
  },
  logo: {
    fontSize: 48,
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
    alignItems: "center",
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
    alignItems: "center",
  },
});
