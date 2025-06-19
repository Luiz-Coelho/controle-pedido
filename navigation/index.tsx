import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerListScreen from "../screens/CustomerListScreen";
import CustomerFormScreen from "../screens/CustomerFormScreen";
import ProductFormScreen from "../screens/ProductFormScreen";
import ProductListScreen from "../screens/ProductListScreen";
import OrderListScreen from "../screens/OrderListScreen";
import OrderFormScreen from "../screens/OrderFormScreen";
import HomeScreen from "../screens/HomeScreen";

export type RootStackParamList = {
  home: undefined;
  customers: undefined;
  customerForm: { customerId?: number };
  products: undefined;
  productForm: { productId?: number };
  orders: undefined;
  orderForm: { orderId?: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{ title: "Início" }}
        />
        <Stack.Screen
          name="orders"
          component={OrderListScreen}
          options={{ title: "Pedidos" }}
        />
        <Stack.Screen
          name="orderForm"
          component={OrderFormScreen}
          options={{ title: "Novo Pedido" }}
        />
        <Stack.Screen
          name="customers"
          component={CustomerListScreen}
          options={{ title: "Clientes" }}
        />
        <Stack.Screen
          name="customerForm"
          component={CustomerFormScreen}
          options={{ title: "Novo Cliente" }}
        />
        <Stack.Screen
          name="productForm"
          component={ProductFormScreen}
          options={{ title: "Novo Produto" }}
        />
        <Stack.Screen
          name="products"
          component={ProductListScreen}
          options={{ title: "Produtos" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
