import { Pressable, Text, View } from "react-native";
import { OrderWithTotals } from "../types/Order";
import { Customer } from "../types/Customer";
import { Feather } from "@expo/vector-icons";

type Props = {
  order: OrderWithTotals;
  customer: Customer | undefined;
  onPress: () => void;
  onDelete: () => void;
};

export function OrderCard({ order, customer, onPress, onDelete }: Props) {
  const date = new Date(order.createdAt).toLocaleDateString("pt-BR");

  return (
    <Pressable
      onPress={onPress}
      className="bg-gray-800 rounded-xl p-4 mb-4 border border-gray-700"
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-2">
          <Text className="text-white text-lg font-semibold mb-1">
            {customer?.name ?? "Cliente desconhecido"}
          </Text>
          <Text className="text-gray-300 text-sm">Data: {date}</Text>
          <Text className="text-gray-300 text-sm">
            Total de itens: {order.totalItems}
          </Text>
          <Text className="text-gray-300 text-sm">
            Valor total: R$ {(order.totalPrice / 100).toFixed(2)}
          </Text>
        </View>

        <Pressable
          onPress={onDelete}
          className="bg-red-600 p-2 rounded-lg ml-2"
        >
          <Feather name="trash-2" size={16} color="#fff" />
        </Pressable>
      </View>
    </Pressable>
  );
}
