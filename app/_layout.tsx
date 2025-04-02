import { Stack } from "expo-router";
import { authClient } from "@/services/auth/auth-client";

export default function RootLayout() {
  const { isPending, data: session } = authClient.useSession();

  if (isPending) {
    return null; // TODO: Hacer un loading
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!session ? (
        // Rutas para usuarios no autenticados
        <Stack.Screen name="(auth)" />
      ) : (
        // Rutas para usuarios autenticados
        <Stack.Screen name="(app)" />
      )}
    </Stack>
  );
}
