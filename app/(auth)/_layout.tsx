import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login-screen"
        options={{ headerShown: false, animation: "flip" }}
      />
    </Stack>
  );
}
