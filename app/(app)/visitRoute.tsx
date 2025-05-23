import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Logo } from "@/components";
import { t } from "@/i18n";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { colors } from "@/theme/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { fetchClient } from "@/services";
import Toast from "react-native-toast-message";
import MapViewDirections from "react-native-maps-directions";

type VisitFromAPI = {
  id: string;
  visitDate: string;
  comments: string;
  customerId: string;
  salespersonId: string;
  customer?: {
    id: string;
    name: string;
    address: string;
    phone: string;
  };
};

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
  comments?: string;
};

export default function VisitRouteScreen() {
  const [selectedVisit, setSelectedVisit] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [visitasRuta, setVisitasRuta] = useState<RouteVisit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [region, setRegion] = useState({
    latitude: 4.624335,
    longitude: -74.063644,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const mapDirectionsApiKey = "AIzaSyDr6-xiRlE0uA0Ym3k4kbs0Dgj1u292y3U";

  const salespersonId = "1234567890";
  const minimumDate = new Date();

  const formatDateForAPI = (date: Date): string => {
    return date.toISOString().split("T")[0]; // Formato YYYY-MM-DD
  };

  const loadVisitsForDate = useCallback(
    async (date: Date) => {
      setIsLoading(true);
      setError(null);

      try {
        const formattedDate = formatDateForAPI(date);
        const endpoint = `/api/visit/salesperson/${salespersonId}/date/${formattedDate}`;

        console.log("Cargando visitas desde:", endpoint);

        const { data } = await fetchClient.get(endpoint);

        console.log("Visitas obtenidas de la API:", data);

        if (Array.isArray(data) && data.length > 0) {
          const visitasConPromesas = data.map(
            async (visit: VisitFromAPI, index: number) => {
              try {
                const customerResponse = await fetchClient.get(
                  `/api/customer/${visit.customerId}`,
                );
                const customerData = customerResponse.data;

                console.log(
                  `Datos del cliente ${visit.customerId}:`,
                  customerData,
                );

                const visitDateTime = new Date(visit.visitDate);
                const hora = visitDateTime.toLocaleTimeString("es-CO", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                // Generar coordenadas mock basadas en Bogotá
                // En un escenario real, estas coordenadas vendrían de geocoding de la dirección
                const baseLatitude = 4.624335;
                const baseLongitude = -74.063644;
                const offset = index * 0.01;

                return {
                  id: visit.id.toString(),
                  cliente: customerData.name || `Cliente ${visit.customerId}`,
                  direccion: customerData.address || "Dirección no disponible",
                  ciudad: "Bogotá", // Valor por defecto
                  fecha: formattedDate,
                  hora: hora,
                  latitud: baseLatitude + offset,
                  longitud: baseLongitude + offset * 0.5,
                  orden: index + 1,
                  comments: visit.comments,
                  telefono: customerData.phone || "Teléfono no disponible",
                  tipoId: customerData.idType || "",
                };
              } catch (customerError) {
                console.error(
                  `Error al obtener datos del cliente ${visit.customerId}:`,
                  customerError,
                );

                const visitDateTime = new Date(visit.visitDate);
                const hora = visitDateTime.toLocaleTimeString("es-CO", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                const baseLatitude = 4.624335;
                const baseLongitude = -74.063644;
                const offset = index * 0.01;

                return {
                  id: visit.id.toString(),
                  cliente: `Cliente ${visit.customerId}`,
                  direccion: "Dirección no disponible",
                  ciudad: "Bogotá",
                  fecha: formattedDate,
                  hora: hora,
                  latitud: baseLatitude + offset,
                  longitud: baseLongitude + offset * 0.5,
                  orden: index + 1,
                  comments: visit.comments,
                  telefono: "Teléfono no disponible",
                  tipoId: "",
                };
              }
            },
          );

          const visitasConvertidas = await Promise.all(visitasConPromesas);

          setVisitasRuta(visitasConvertidas);

          // Centrar el mapa en la primera visita
          if (visitasConvertidas.length > 0) {
            setRegion({
              latitude: visitasConvertidas[0].latitud,
              longitude: visitasConvertidas[0].longitud,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            });
          }
        } else {
          setVisitasRuta([]);
        }
      } catch (err: any) {
        console.error("Error al cargar visitas:", err);
        setError(
          err.response?.data?.message ||
            "No se pudieron cargar las visitas. Verifique su conexión.",
        );
        setVisitasRuta([]);

        Toast.show({
          type: "error",
          text1: "Error",
          text2: "No se pudieron cargar las visitas",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [salespersonId],
  );

  useEffect(() => {
    loadVisitsForDate(selectedDate);
  }, [selectedDate, loadVisitsForDate]);

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

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const formattedSelectedDate = selectedDate.toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const renderDateSelector = () => (
    <View style={styles.dateSelectorContainer}>
      <Text style={styles.dateSelectorLabel}>
        {t("visits.routes.selectDate")}
      </Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateSelector}
      >
        <MaterialIcons
          name="calendar-today"
          size={20}
          color={colors.primary}
        />
        <Text style={styles.dateSelectorText}>{formattedSelectedDate}</Text>
        <MaterialIcons
          name="arrow-drop-down"
          size={24}
          color={colors.primary}
        />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="calendar"
          onChange={onDateChange}
          minimumDate={minimumDate}
        />
      )}
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="calendar-clock"
        size={60}
        color={colors.secondary}
      />
      <Text style={styles.emptyTitle}>
        {error ? "Error al cargar visitas" : t("visits.routes.noVisitsPlanned")}
      </Text>
      <Text style={styles.emptySubtitle}>
        {error ||
          `${t("visits.routes.noVisitsPlannedDate")} ${formattedSelectedDate}`}
      </Text>
      {error && (
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => loadVisitsForDate(selectedDate)}
        >
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        size="large"
        color={colors.primary}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Logo />
          <Text style={styles.title}>{t("visits.routes.routeTitle")}</Text>
          <Text style={styles.subtitle}>{t("visits.routes.subTitle")}</Text>
        </View>

        {renderDateSelector()}

        {isLoading ? (
          renderLoadingState()
        ) : visitasRuta.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            <View style={styles.mapContainer}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
                showsUserLocation={true}
                onMapReady={() => console.log("Mapa cargado correctamente")}
                ref={(ref) => {
                  if (ref && visitasRuta.length > 1) {
                    ref.fitToCoordinates(routeCoordinates, {
                      edgePadding: {
                        top: 50,
                        right: 50,
                        bottom: 50,
                        left: 50,
                      },
                      animated: true,
                    });
                  }
                }}
              >
                {visitasRuta.map((visit) => (
                  <Marker
                    key={visit.id}
                    coordinate={{
                      latitude: visit.latitud,
                      longitude: visit.longitud,
                    }}
                    title={visit.cliente}
                    description={`${visit.direccion}, ${visit.ciudad}`}
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

                {visitasRuta.length >= 2 && mapDirectionsApiKey && (
                  <MapViewDirections
                    origin={routeCoordinates[0]}
                    waypoints={
                      routeCoordinates.length > 2
                        ? routeCoordinates.slice(1, -1)
                        : undefined
                    }
                    destination={routeCoordinates[routeCoordinates.length - 1]}
                    apikey={mapDirectionsApiKey}
                    strokeWidth={3}
                    strokeColor={"hotpink"}
                    optimizeWaypoints={true}
                    onError={(errorMessage) => {
                      console.log("Error en la ruta:", errorMessage);
                    }}
                  />
                )}
              </MapView>
            </View>

            <View style={styles.listContainer}>
              <Text style={styles.listTitle}>
                {t("visits.routes.visitSequence")} ({visitasRuta.length})
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
                      {visit.comments && (
                        <Text style={styles.visitComments}>
                          💬 {visit.comments}
                        </Text>
                      )}
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
                <Text style={styles.infoText}>
                  {t("visits.routes.routeInfo")}
                </Text>
              </View>
            </View>
          </>
        )}
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

  dateSelectorContainer: {
    marginBottom: 20,
  },
  dateSelectorLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    fontFamily: "Comfortaa-Bold",
  },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  dateSelectorText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
    fontFamily: "Comfortaa-Regular",
    textTransform: "capitalize",
  },

  // Estados de carga y vacío
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.secondary,
    fontFamily: "Comfortaa-Regular",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Comfortaa-Bold",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.secondary,
    fontFamily: "Comfortaa-Regular",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "600",
    fontFamily: "Comfortaa-Bold",
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
    marginBottom: 2,
  },
  visitComments: {
    fontSize: 12,
    color: "#888",
    fontFamily: "Comfortaa-Light",
    fontStyle: "italic",
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
