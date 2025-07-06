import { Pressable, Text, View } from "react-native";
import { Customer } from "../types/Customer";
import { Feather } from "@expo/vector-icons";
import customerCardStyles from "../styles/customerCardStyles";
import { formatCep, formatDocument } from "../utils/masks";

type Props = {
  customer: Customer;
  onPress: () => void;
  onDelete: () => void;
};

export function CustomerCard({ customer, onPress, onDelete }: Props) {
  return (
    <Pressable onPress={onPress} style={customerCardStyles.container}>
      <View style={customerCardStyles.content}>
        {/* Informações (80%) */}
        <View style={customerCardStyles.infoArea}>
          <Text style={customerCardStyles.name}>{customer.name}</Text>

          <View style={customerCardStyles.row}>
            <Text style={customerCardStyles.detail}>
              {formatDocument(customer.document, customer.documentType)}
            </Text>
          </View>

          <Text style={customerCardStyles.detail}>
            {customer.address} - {formatCep(customer.cep)}
          </Text>
        </View>

        {/* Botão (20%) */}
        <View style={customerCardStyles.actionArea}>
          <Pressable onPress={onDelete} style={customerCardStyles.deleteButton}>
            <Feather name="trash-2" size={16} color="#fff" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
