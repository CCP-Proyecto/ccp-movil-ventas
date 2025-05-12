import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const WebViewScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: "https://rutas-chi.vercel.app/" }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default WebViewScreen;
