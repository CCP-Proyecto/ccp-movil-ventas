import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#007AFF' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="login" options={{ title: 'Iniciar Sesión' }} />
      <Stack.Screen name="index" options={{ title: 'Menú Principal' }} />
      <Stack.Screen name="clientes" options={{ title: 'Clientes' }} />
      <Stack.Screen name="rutas" options={{ title: 'Rutas' }} />
      <Stack.Screen name="visitas" options={{ title: 'Visitas' }} />
    </Stack>
  );
}
