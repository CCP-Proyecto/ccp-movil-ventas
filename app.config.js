import "dotenv/config";

export default {
  expo: {
    name: "ccp-movil-ventas",
    slug: "ccp-movil-ventas",
    version: "0.2.4",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "ccp-sales",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_API_KEY,
        },
      },
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.anonymous.ccpmovilventas",
      permissions: ["INTERNET"],
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      [
        "expo-font",
        {
          fonts: [
            "./assets/fonts/Comfortaa-Light.ttf",
            "./assets/fonts/Comfortaa-Regular.ttf",
            "./assets/fonts/Comfortaa-Medium.ttf",
            "./assets/fonts/Comfortaa-SemiBold.ttf",
            "./assets/fonts/Comfortaa-Bold.ttf",
          ],
        },
      ],
      "expo-localization",
      "expo-camera",
      "expo-location",
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
