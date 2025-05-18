import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { router } from "expo-router";
import { Logo } from "@/components";
import { HomeButton } from "@/components";
import { colors } from "@/theme/colors";
import { t } from "@/i18n";

export default function Home() {
  const handleCreateOrders = () => {
    router.push("/(app)/createOrder");
  };

  const handleRegisterVisit = () => {
    router.push("/(app)/registerVisit");
  };

  const handleGetVisits = () => {
    router.push("/(app)/getVisits");
  };

  const handleGetDeliveries = () => {
    router.push("/(app)/getDeliveries");
  };

  const handleGetOrders = () => {
    router.push("/(app)/getOrders");
  };

  const handleGetClients = () => {
    router.push("/(app)/getClients");
  };

  const handleRecomendations = () => {
    router.push("/(app)/recomendations");
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Logo />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t("menu.createTitle")}</Text>
          <View style={styles.sectionDivider} />
        </View>

        <View style={styles.buttonsContainer}>
          <HomeButton
            title={t("menu.createButton")}
            onPress={handleCreateOrders}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <HomeButton
            title={t("menu.registerVisitButton")}
            onPress={handleRegisterVisit}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t("menu.consultTitle")}</Text>
          <View style={styles.sectionDivider} />
        </View>

        <View style={styles.buttonsContainer}>
          <HomeButton
            title={t("menu.getVisitsButton")}
            onPress={handleGetVisits}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <HomeButton
            title={t("menu.getDeliveriesButton")}
            onPress={handleGetDeliveries}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <HomeButton
            title={t("menu.getOrdersButton")}
            onPress={handleGetOrders}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <HomeButton
            title={t("menu.getClientsButton")}
            onPress={handleGetClients}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>AI</Text>
          <View style={styles.sectionDivider} />
        </View>

        <View style={styles.buttonsContainer}>
          <HomeButton
            title={t("recommendations.screenTitle")}
            onPress={handleRecomendations}
          />
        </View>

        {/* Espacio adicional al final para evitar que el último botón quede pegado al borde */}
        <View style={{ height: 20 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  sectionContainer: {
    width: "100%",
    marginTop: 30,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontFamily: "Comfortaa-Bold",
    fontSize: 18,
    color: colors.secondary,
    marginRight: 10,
  },
  sectionDivider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.secondary,
    opacity: 0.5,
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
});
