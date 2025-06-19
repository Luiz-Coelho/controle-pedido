import { Pressable, Text, View } from "react-native";
import { Product } from "../types/Product";
import { Feather } from "@expo/vector-icons";

type Props = {
  product: Product;
  onPress: () => void;
  onDelete: () => void;
};

export function ProductCard({ product, onPress, onDelete }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-gray-800 rounded-xl p-4 mb-4 border border-gray-700"
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="text-white text-lg font-semibold mb-1">
            {product.name}
          </Text>
          <Text className="text-gray-300 text-sm">
            Preço: R$ {(product.price / 100).toFixed(2)}
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
