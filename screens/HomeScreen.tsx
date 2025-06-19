import { ScrollView, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../types/Navigation";
import {
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Screen } from "../components/Screen";

export default function HomeScreen() {
  const navigation = useNavigation<Navigation>();

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 24 }}>
        <View className="p-4 rounded-xl">
          <Text className="text-white text-xl font-bold mb-4">Pedidos</Text>

          <View className="gap-3">
            <Pressable
              onPress={() => navigation.navigate("orderForm", {})}
              className="bg-cyan-500 rounded-lg p-3 flex-row items-center gap-4"
            >
              <FontAwesome5 name="plus" size={14} color="white" />
              <Text className="ml-2 text-white font-semibold text-base">
                Novo Pedido
              </Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("orders")}
              className="mt-4 bg-cyan-500 rounded-lg p-3 flex-row items-center gap-4"
            >
              <MaterialIcons name="list-alt" size={14} color="white" />
              <Text className="ml-2 text-white font-semibold text-base">
                Ver Pedidos
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="p-4 rounded-xl">
          <Text className="text-white text-xl font-bold mb-4">Clientes</Text>

          <View className="gap-3">
            <Pressable
              onPress={() => navigation.navigate("customerForm", {})}
              className="bg-yellow-600 rounded-lg p-3 flex-row items-center gap-4"
            >
              <FontAwesome5 name="user-plus" size={14} color="white" />
              <Text className="ml-2 text-white font-semibold text-base">
                Novo Cliente
              </Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("customers")}
              className="mt-4 bg-yellow-600 rounded-lg p-3 flex-row items-center gap-4"
            >
              <FontAwesome5 name="users" size={14} color="white" />
              <Text className="ml-2 text-white font-semibold text-base">
                Ver Clientes
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="p-4 rounded-xl mb-6">
          <Text className="text-white text-xl font-bold mb-4">Produtos</Text>

          <View className="gap-3">
            <Pressable
              onPress={() => navigation.navigate("productForm", {})}
              className="bg-purple-600 rounded-lg p-3 flex-row items-center gap-4"
            >
              <MaterialCommunityIcons name="cube" size={14} color="white" />
              <Text className="ml-2 text-white font-semibold text-base">
                Novo Produto
              </Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("products")}
              className="mt-4 bg-purple-600 rounded-lg p-3 flex-row items-center gap-4"
            >
              <MaterialCommunityIcons
                name="cube-outline"
                size={14}
                color="white"
              />
              <Text className="ml-2 text-white font-semibold text-base">
                Ver Produtos
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
