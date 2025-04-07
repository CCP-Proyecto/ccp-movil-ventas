import React from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Logo } from "@/components";
import { HomeButton } from "@/components";
import { colors } from "@/theme/colors";

export default function Home() {
  const handleCreateOrders = () => {
    router.push("/(app)/createOrder");
  };

  const handleRegisterVisit = () => {
    router.push("/(app)/registerVisit");
  };

  return (
    <View style={styles.container}>
      <Logo />

      <View style={styles.buttonsContainer}>
        <HomeButton
          title="Creación de pedidos"
          onPress={handleCreateOrders}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <HomeButton
          title="Registrar visitas"
          onPress={handleRegisterVisit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    paddingTop: 20,
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
});
