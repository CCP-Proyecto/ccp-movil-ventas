import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      {/* Encabezado */}
      <Text className="text-4xl font-semibold text-blue-700">CCP</Text>
      <Text className="text-sm text-gray-500">
        COMPRAS FÁCILES, ENVÍOS RÁPIDOS
      </Text>
      <View className="w-20 h-1 bg-gray-700 my-2"></View>

      {/* Opciones */}
      <View className="mt-10 space-y-4">
        <Pressable
          className="bg-white shadow-md rounded-xl p-5 w-60 items-center"
          onPress={() => router.push("./clientes")}
        >
          <Text className="text-black text-lg">Consultar clientes</Text>
        </Pressable>

        <Pressable
          className="bg-white shadow-md rounded-xl p-5 w-60 items-center"
          onPress={() => router.push("./pedidos")}
        >
          <Text className="text-black text-lg">Creación de pedido</Text>
        </Pressable>

        <Pressable
          className="bg-white shadow-md rounded-xl p-5 w-60 items-center"
          onPress={() => router.push("./recomendacion")}
        >
          <Text className="text-black text-lg">Recomendación IA</Text>
        </Pressable>
      </View>

      {/* Botón de Volver */}
      <Pressable
        className="mt-10 bg-blue-700 px-6 py-2 rounded-full shadow-md"
        onPress={() => router.back()}
      >
        <Text className="text-white text-lg">Volver</Text>
      </Pressable>
    </View>
  );
}
