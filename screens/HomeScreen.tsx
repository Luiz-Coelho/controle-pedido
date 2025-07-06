import { ScrollView, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { Navigation } from "../types/Navigation";
import { Screen } from "../components/Screen";
import { homeScreenStyles } from "../styles/homeScreenStyles";

export default function HomeScreen() {
  const navigation = useNavigation<Navigation>();

  return (
    <Screen>
      <ScrollView contentContainerStyle={homeScreenStyles.scroll}>
        <View style={homeScreenStyles.section}>
          <Text style={homeScreenStyles.title}>Pedidos</Text>

          <View style={homeScreenStyles.actions}>
            <Pressable
              onPress={() => navigation.navigate("orderForm", {})}
              style={homeScreenStyles.buttonCyan}
            >
              <FontAwesome5 name="plus" size={14} color="white" />
              <Text style={homeScreenStyles.buttonText}>Novo Pedido</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("orders")}
              style={homeScreenStyles.buttonCyan}
            >
              <MaterialIcons name="list-alt" size={14} color="white" />
              <Text style={homeScreenStyles.buttonText}>Ver Pedidos</Text>
            </Pressable>
          </View>
        </View>

        <View style={homeScreenStyles.section}>
          <Text style={homeScreenStyles.title}>Clientes</Text>

          <View style={homeScreenStyles.actions}>
            <Pressable
              onPress={() => navigation.navigate("customerForm", {})}
              style={homeScreenStyles.buttonYellow}
            >
              <FontAwesome5 name="user-plus" size={14} color="white" />
              <Text style={homeScreenStyles.buttonText}>Novo Cliente</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("customers")}
              style={homeScreenStyles.buttonYellow}
            >
              <FontAwesome5 name="users" size={14} color="white" />
              <Text style={homeScreenStyles.buttonText}>Ver Clientes</Text>
            </Pressable>
          </View>
        </View>

        <View style={homeScreenStyles.sectionLast}>
          <Text style={homeScreenStyles.title}>Produtos</Text>

          <View style={homeScreenStyles.actions}>
            <Pressable
              onPress={() => navigation.navigate("productForm", {})}
              style={homeScreenStyles.buttonPurple}
            >
              <MaterialCommunityIcons name="cube" size={14} color="white" />
              <Text style={homeScreenStyles.buttonText}>Novo Produto</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("products")}
              style={homeScreenStyles.buttonPurple}
            >
              <MaterialCommunityIcons
                name="cube-outline"
                size={14}
                color="white"
              />
              <Text style={homeScreenStyles.buttonText}>Ver Produtos</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
