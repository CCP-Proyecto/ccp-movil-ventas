import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

const SuggestedProductsScreen = () => {
  // Simulación de productos sugeridos
  const suggestedProducts = [
    {
      id: 1,
      name: "Sombrilla UV Pro",
      description: "Protección solar ideal para zonas calurosas.",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Chaqueta térmica",
      description: "Perfecta para regiones frías o temporadas de lluvia.",
      image: "https://via.placeholder.com/100",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>CCP</Text>
      <Text style={styles.tagline}>COMPRAS FÁCILES, ENVÍOS RÁPIDOS</Text>
      <Text style={styles.title}>Recomendaciones para tu cliente:</Text>
      <Text style={styles.subtitle}>
        Estas sugerencias se basan en su ubicación y temporada actual.
      </Text>

      {suggestedProducts.map((product) => (
        <View
          key={product.id}
          style={styles.card}
        >
          <Image
            source={{ uri: product.image }}
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDesc}>{product.description}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Ver más</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#50688C",
    marginTop: 16,
  },
  tagline: {
    fontSize: 12,
    color: "#888",
    marginBottom: 20,
    letterSpacing: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#F4F4F4",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    width: "100%",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  productDesc: {
    fontSize: 13,
    color: "#555",
    marginVertical: 6,
  },
  button: {
    backgroundColor: "#50688C",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default SuggestedProductsScreen;
