import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { authClient } from "@/services/auth/auth-client";
import { APP_CONFIG } from "@/constants";
import { Logo, Button, Input } from "@/components";
import { colors } from "@/theme/colors";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Contraseña es requerida"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      const { error, data: responseData } = await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          body: {
            app: APP_CONFIG.APP_ID,
          },
        },
      );

      if (responseData) {
        Toast.show({
          type: "success",
          text1: "Inicio de sesión exitoso",
          text2: "Bienvenido de vuelta",
          visibilityTime: 2000,
          onHide: () => {
            router.replace("/(app)/home");
          },
        });
        return;
      }

      if (error) {
        setIsLoading(false);
        Toast.show({
          type: "error",
          text1: "Error de inicio de sesión",
          text2: error.message || "Por favor, verifica tus credenciales",
        });
      }
    } catch (e) {
      setIsLoading(false);
      console.error("Error al conectar con el servidor:", e);
      Toast.show({
        type: "error",
        text1: "Error de conexión",
        text2: "No se pudo conectar con el servidor",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />
        </View>
      )}

      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <View style={styles.centeredContent}>
        <View style={styles.welcomeSection}>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.welcomeText}>
            Inicio de sesión - Fuerza de ventas
          </Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Usuario"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Contraseña"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                secureTextEntry
              />
            )}
          />

          <Button
            onPress={handleSubmit(onSubmit)}
            title="Iniciar sesión"
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
    alignItems: "center",
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 30,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    maxWidth: 350,
    paddingBottom: 50,
  },
  welcomeSection: {
    width: "100%",
    marginBottom: 20,
    alignItems: "flex-start",
  },
  title: {
    fontFamily: "Comfortaa-SemiBold",
    fontSize: 24,
    marginBottom: 5,
    color: colors.black,
  },
  welcomeText: {
    fontFamily: "Comfortaa-Regular",
    color: colors.black,
  },
  form: {
    width: "100%",
    marginTop: 20,
    gap: 15,
    alignItems: "center",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});
