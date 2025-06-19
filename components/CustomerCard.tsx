import { Pressable, Text, View } from "react-native";
import { Customer } from "../types/Customer";
import { Feather } from "@expo/vector-icons";

type Props = {
  customer: Customer;
  onPress: () => void;
  onDelete: () => void;
};

export function CustomerCard({ customer, onPress, onDelete }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-gray-800 rounded-xl p-4 mb-4 border border-gray-700"
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-2">
          <Text className="text-white text-lg font-semibold mb-1">
            {customer.name}
          </Text>
          <Text className="text-gray-300 text-sm">{customer.cpfOrCnpj}</Text>
          <Text className="text-gray-400 text-sm">{customer.cep}</Text>
          <Text className="text-gray-400 text-sm">{customer.address}</Text>
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
