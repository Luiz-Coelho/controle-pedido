import { Pressable, Text, View } from "react-native";
import { OrderWithTotals } from "../types/Order";
import { Customer } from "../types/Customer";
import { Feather } from "@expo/vector-icons";
import orderCardStyles from "../styles/orderCardStyles";

type Props = {
  order: OrderWithTotals;
  customer: Customer | undefined;
  onPress: () => void;
  onDelete: () => void;
};

export function OrderCard({ order, customer, onPress, onDelete }: Props) {
  const date = new Date(order.createdAt).toLocaleDateString("pt-BR");

  return (
    <Pressable onPress={onPress} style={orderCardStyles.container}>
      <View style={orderCardStyles.content}>
        <View style={orderCardStyles.infoArea}>
          <Text style={orderCardStyles.name}>
            {customer?.name ?? "Cliente desconhecido"}
          </Text>
          <View style={orderCardStyles.row}>
            <Text style={orderCardStyles.detail}>{date}</Text>
            <Text style={orderCardStyles.detail}>
              R$ {(order.totalPrice / 100).toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={orderCardStyles.actionArea}>
          <Pressable onPress={onDelete} style={orderCardStyles.deleteButton}>
            <Feather name="trash-2" size={16} color="#fff" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
