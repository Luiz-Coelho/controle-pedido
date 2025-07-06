import { Pressable, Text, View } from "react-native";
import { Product } from "../types/Product";
import { Feather } from "@expo/vector-icons";
import productCardStyles from "../styles/productCardStyles";

type Props = {
  product: Product;
  onPress: () => void;
  onDelete: () => void;
};

export function ProductCard({ product, onPress, onDelete }: Props) {
  return (
    <Pressable onPress={onPress} style={productCardStyles.container}>
      <View style={productCardStyles.content}>
        {/* Área de informações */}
        <View style={productCardStyles.infoArea}>
          <Text style={productCardStyles.name}>{product.name}</Text>
          <Text style={productCardStyles.detail}>
            R$ {(product.price / 100).toFixed(2)}
          </Text>
        </View>

        {/* Botão de deletar */}
        <View style={productCardStyles.actionArea}>
          <Pressable onPress={onDelete} style={productCardStyles.deleteButton}>
            <Feather name="trash-2" size={16} color="#fff" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
