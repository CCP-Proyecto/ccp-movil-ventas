import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Logo } from "@/components";
import { t } from "@/i18n";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { colors } from "@/theme/colors";

type RouteVisit = {
  id: string;
  cliente: string;
  direccion: string;
  ciudad: string;
  fecha: string;
  hora: string;
  latitud: number;
  longitud: number;
  orden: number;
};

// Datos mock para las visitas en ruta
const visitasRuta: RouteVisit[] = [
  {
    id: "v1",
    cliente: "Supermercado La 14",
    direccion: "Calle 10 #23-15",
    ciudad: "Bogotá",
    fecha: "2025-05-20",
    hora: "09:00",
    latitud: 4.624335,
    longitud: -74.063644,
    orden: 1,
  },
  {
    id: "v2",
    cliente: "Tienda Don Juan",
    direccion: "Carrera 15 #45-20",
    ciudad: "Bogotá",
    fecha: "2025-05-20",
    hora: "11:30",
    latitud: 4.631231,
    longitud: -74.072503,
    orden: 2,
  },
  {
    id: "v3",
    cliente: "Minimarket El Éxito",
    direccion: "Av. Siempre Viva 123",
    ciudad: "Bogotá",
    fecha: "2025-05-20",
    hora: "14:00",
    latitud: 4.645704,
    longitud: -74.058128,
    orden: 3,
  },
  {
    id: "v4",
    cliente: "Almacén Central",
    direccion: "Calle 80 #20-45",
    ciudad: "Bogotá",
    fecha: "2025-05-20",
    hora: "16:30",
    latitud: 4.669234,
    longitud: -74.055223,
    orden: 4,
  },
];

export default function VisitRouteScreen() {
  const [selectedVisit, setSelectedVisit] = useState<string | null>(null);
  const [region, setRegion] = useState({
    latitude: 4.624335,
    longitude: -74.063644,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const routeCoordinates = visitasRuta.map((visit) => ({
    latitude: visit.latitud,
    longitude: visit.longitud,
  }));

  const handleVisitSelect = (visitId: string) => {
    setSelectedVisit(visitId);
    const visit = visitasRuta.find((v) => v.id === visitId);
    if (visit) {
      setRegion({
        latitude: visit.latitud,
        longitude: visit.longitud,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const getMarkerColor = (orden: number) => {
    switch (orden) {
      case 1:
        return colors.primary || "#007bff";
      case visitasRuta.length:
        return "#28a745"; // El último es verde
      default:
        return "#ffc107"; // Intermedios en amarillo
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Logo />
          <Text style={styles.title}>{t("visits.routes.routeTitle")}</Text>
          <Text style={styles.subtitle}>{t("visits.routes.subTitle")}</Text>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}
            showsUserLocation={true}
            onMapReady={() => console.log("Mapa cargado correctamente")}
          >
            {visitasRuta.map((visit) => (
              <Marker
                key={visit.id}
                coordinate={{
                  latitude: visit.latitud,
                  longitude: visit.longitud,
                }}
                title={visit.cliente}
                description={`${visit.hora} - ${visit.direccion}`}
                pinColor={getMarkerColor(visit.orden)}
              >
                <View style={styles.markerContainer}>
                  <View
                    style={[
                      styles.marker,
                      { backgroundColor: getMarkerColor(visit.orden) },
                    ]}
                  >
                    <Text style={styles.markerText}>{visit.orden}</Text>
                  </View>
                </View>
              </Marker>
            ))}
            <Polyline
              coordinates={routeCoordinates}
              strokeColor={colors.primary || "#007bff"}
              strokeWidth={3}
              lineDashPattern={[1]}
            />
          </MapView>
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>
            {t("visits.routes.visitSequence")}
          </Text>

          {visitasRuta
            .sort((a, b) => a.orden - b.orden)
            .map((visit) => (
              <TouchableOpacity
                key={visit.id}
                style={[
                  styles.visitCard,
                  selectedVisit === visit.id && styles.selectedVisitCard,
                ]}
                onPress={() => handleVisitSelect(visit.id)}
              >
                <View
                  style={[
                    styles.visitOrder,
                    { backgroundColor: getMarkerColor(visit.orden) },
                  ]}
                >
                  <Text style={styles.visitOrderText}>{visit.orden}</Text>
                </View>

                <View style={styles.visitInfo}>
                  <Text style={styles.visitClient}>{visit.cliente}</Text>
                  <Text style={styles.visitAddress}>
                    <MaterialIcons
                      name="location-on"
                      size={14}
                      color="#666"
                    />{" "}
                    {visit.direccion}, {visit.ciudad}
                  </Text>
                  <Text style={styles.visitTime}>
                    <MaterialCommunityIcons
                      name="clock-outline"
                      size={14}
                      color="#666"
                    />{" "}
                    {visit.hora}
                  </Text>
                </View>

                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={colors.primary || "#007bff"}
                  style={styles.visitArrow}
                />
              </TouchableOpacity>
            ))}
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <MaterialCommunityIcons
              name="information-outline"
              size={20}
              color={colors.primary}
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>{t("visits.routes.routeInfo")}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#000",
    marginTop: 20,
    fontFamily: "Comfortaa-Bold",
  },
  subtitle: {
    color: "#4a6c8a",
    marginBottom: 16,
    fontFamily: "Comfortaa-Regular",
  },
  mapContainer: {
    height: 250,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  mapOverlayText: {
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    alignItems: "center",
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary || "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  markerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  listContainer: {
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    fontFamily: "Comfortaa-Bold",
  },
  visitCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedVisitCard: {
    backgroundColor: "#e9f0f7",
    borderLeftWidth: 4,
    borderLeftColor: colors.primary || "#007bff",
  },
  visitOrder: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary || "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  visitOrderText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  visitInfo: {
    flex: 1,
  },
  visitClient: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
    fontFamily: "Comfortaa-Bold",
  },
  visitAddress: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
    fontFamily: "Comfortaa-Regular",
  },
  visitTime: {
    fontSize: 13,
    color: "#666",
    fontFamily: "Comfortaa-Regular",
  },
  visitArrow: {
    marginLeft: 8,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: "#f0f8ff",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 3,
    borderLeftColor: colors.primary || "#007bff",
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: "#4a6c8a",
    lineHeight: 18,
    fontFamily: "Comfortaa-Regular",
  },
});
