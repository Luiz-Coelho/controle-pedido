import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { OrderWithTotals } from "../types/Order";
import { Customer } from "../types/Customer";
import { OrderService } from "../services/OrderService";
import { CustomerService } from "../services/CustomerService";
import { showError, showSuccess } from "../utils/showToast";
import { Navigation } from "../types/Navigation";
import { OrderCard } from "../components/OrderCard";
import { Screen } from "../components/Screen";
import { Loading } from "../components/Loading";

export default function OrderListScreen() {
  const navigation = useNavigation<Navigation>();
  const [orders, setOrders] = useState<OrderWithTotals[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const [ordersData, customersData] = await Promise.all([
        OrderService.getAllWithTotals(),
        CustomerService.getAll(),
      ]);
      console.log("Pedidos carregados do banco:", ordersData);
      setOrders(ordersData);
      setCustomers(customersData);
    } catch {
      showError("Erro ao carregar pedidos.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  const handleDelete = async (id: number) => {
    try {
      await OrderService.delete(id);
      showSuccess("Pedido excluído com sucesso.");
      fetchOrders();
    } catch {
      showError("Erro ao excluir pedido.");
    }
  };

  const getCustomerById = (id: number) =>
    customers.find((customer) => customer.id === id);

  if (loading) {
    return <Loading />;
  }

  return (
    <Screen>
      <View className="flex-1 p-4">
        <Pressable
          onPress={() => navigation.navigate("orderForm", {})}
          className="bg-blue-600 rounded-xl p-3 mb-4"
        >
          <Text className="text-white text-center font-semibold">
            Novo Pedido
          </Text>
        </Pressable>

        <FlatList
          data={orders}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <OrderCard
              order={item}
              customer={getCustomerById(item.customerId)}
              onPress={() =>
                navigation.navigate("orderForm", { orderId: item.id })
              }
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
      </View>
    </Screen>
  );
}
