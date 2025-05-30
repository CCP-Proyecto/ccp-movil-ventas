import { useState } from "react";
import { Stack } from "expo-router";
import { authClient } from "@/services/auth/auth-client";
import { Redirect } from "expo-router";
import { colors } from "@/theme/colors";
import { LogoutButton } from "@/components";
import { t } from "@/i18n";

export default function AppLayout() {
  const { data: session } = authClient.useSession();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogoutSuccess = () => {
    setIsLoggedOut(true);
  };

  if (!session || isLoggedOut) {
    return <Redirect href="/(auth)/login-screen" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTitleStyle: {
          fontFamily: "Comfortaa-Bold",
          color: colors.secondary,
          fontSize: 16,
        },
        headerRight: () => (
          <LogoutButton
            onLogoutSuccess={handleLogoutSuccess}
            style={{ marginRight: 15 }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          headerTitle: `${t("common.welcome")}, ${session?.user?.name}`,
          headerShown: true,
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="createOrder"
        options={{
          headerTitle: `${t("menu.createButton")}`,
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="registerVisit"
        options={{
          headerTitle: `${t("menu.registerVisitButton")}`,
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="getClients"
        options={{
          headerTitle: `${t("menu.getClientsButton")}`,
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="visitRoute"
        options={{
          headerTitle: `${t("menu.visitRoute")}`,
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="recomendations"
        options={{
          headerTitle: `${t("menu.recommendationsButton")}`,
          headerShown: true,
        }}
      />
    </Stack>
  );
}
