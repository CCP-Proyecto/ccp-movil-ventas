import { Button } from "@/components";
import { t } from "@/i18n";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.permissionCard}>
          <Text style={styles.permissionTitle}>
            {t("recommendations.permissions.title")}
          </Text>
          <Text style={styles.permissionMessage}>
            {t("recommendations.permissions.text")}
          </Text>
          <Button
            title={t("recommendations.permissions.button")}
            onPress={requestPermission}
          />
        </View>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
      >
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={toggleCameraFacing}
          >
            <Ionicons
              name="camera-reverse"
              size={28}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordingButton]}
            onPress={toggleRecording}
          >
            {isRecording ? (
              <View style={styles.stopRecordingIcon} />
            ) : (
              <View style={styles.startRecordingIcon} />
            )}
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  controlsContainer: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    marginRight: 30,
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  recordingButton: {
    backgroundColor: "#ff4136",
  },
  startRecordingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ff4136",
  },
  stopRecordingIcon: {
    width: 22,
    height: 22,
    backgroundColor: "white",
    borderRadius: 3,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  permissionCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
  },
  permissionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  permissionMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
});
