import { useRouter } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú Principal</Text>
      <Button title="Clientes" onPress={() => router.push('/clientes')} />
      <Button title="Rutas" onPress={() => router.push('/rutas')} />
      <Button title="Visitas" onPress={() => router.push('/visitas')} />
      <Button title="Cerrar Sesión" color="red" onPress={() => router.replace('/login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
