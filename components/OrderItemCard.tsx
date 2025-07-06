import { View, Text, Pressable } from "react-native";
import { OrderItemFormData } from "../schemas/orderSchema";
import { Feather } from "@expo/vector-icons";
import orderItemCardStyles from "../styles/OrderItemCardStyles";

type Props = {
  item: OrderItemFormData;
  productName?: string;
  onEdit: () => void;
  onDelete: () => void;
};

export function OrderItemCard({ item, productName, onEdit, onDelete }: Props) {
  const total = (item.price ?? 0) * (item.quantity ?? 0);

  return (
    <Pressable onPress={onEdit} style={orderItemCardStyles.container}>
      <View style={orderItemCardStyles.content}>
        <View style={orderItemCardStyles.infoArea}>
          <Text style={orderItemCardStyles.name}>{productName}</Text>
          <Text style={orderItemCardStyles.detail}>
            Quantidade: {item.quantity}
          </Text>
          <Text style={orderItemCardStyles.detail}>
            Unitário: R$ {item.price.toFixed(2)}
          </Text>
          <Text style={orderItemCardStyles.detail}>
            Total: R$ {total.toFixed(2)}
          </Text>
        </View>

        <View style={orderItemCardStyles.actionArea}>
          <Pressable
            onPress={onDelete}
            style={orderItemCardStyles.deleteButton}
          >
            <Feather name="trash-2" size={16} color="#fff" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
