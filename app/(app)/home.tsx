// File: app/(app)/home.tsx

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>CCP</Text>
      <Text style={styles.slogan}>COMPRAS FÁCILES, ENVÍOS RÁPIDOS</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/(app)/clientes")}
        >
          <Text style={styles.cardText}>Consultar clientes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/(app)/pedidos")}
        >
          <Text style={styles.cardText}>Creación de pedidos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/(app)/recomendacion")}
        >
          <Text style={styles.cardText}>Recomendación IA</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 80,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 36,
    fontWeight: "600",
    color: "#567186",
  },
  slogan: {
    fontSize: 12,
    color: "#567186",
    letterSpacing: 1,
    marginTop: 4,
    marginBottom: 50,
  },
  cardContainer: {
    gap: 20,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    width: 220,
    padding: 20,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardText: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
  },
  backButton: {
    marginTop: 40,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: "#567186",
    borderRadius: 15,
  },
  backText: {
    color: "#fff",
    fontSize: 12,
  },
});
