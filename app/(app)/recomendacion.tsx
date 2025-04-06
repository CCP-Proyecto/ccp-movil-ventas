import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function GrabarTiendaScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Botón de volver */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons
          name="chevron-back"
          size={28}
          color="#567186"
        />
      </TouchableOpacity>

      {/* Logo y eslogan */}
      <Text style={styles.logo}>CCP</Text>
      <Text style={styles.slogan}>COMPRAS FÁCILES, ENVÍOS RÁPIDOS</Text>

      {/* Título principal */}
      <Text style={styles.title}>Graba la tienda{"\n"}de tu cliente</Text>

      {/* Contenedor de imagen con botón */}
      <View style={styles.imageCard}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1578916171728-46686eac8d58", // Puedes cambiar el link por una imagen local o la que prefieras
          }}
          style={styles.image}
          resizeMode="cover"
        />

        <TouchableOpacity style={styles.recordButton}>
          <Ionicons
            name="videocam"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  logo: {
    fontSize: 36,
    fontWeight: "600",
    color: "#567186",
    marginTop: 10,
  },
  slogan: {
    fontSize: 12,
    color: "#567186",
    marginVertical: 6,
    letterSpacing: 1,
    borderBottomWidth: 2,
    borderBottomColor: "#567186",
    paddingBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    marginVertical: 30,
    color: "#000",
  },
  imageCard: {
    backgroundColor: "#f2f2f2",
    width: "100%",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  recordButton: {
    marginTop: 15,
    backgroundColor: "#567186",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
