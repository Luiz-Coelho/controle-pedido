import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Product } from "../types/Product";
import { ProductService } from "../services/ProductService";
import { showError, showSuccess } from "../utils/showToast";
import { Navigation } from "../types/Navigation";
import { ProductCard } from "../components/ProductCard";
import { Screen } from "../components/Screen";

export default function ProductListScreen() {
  const navigation = useNavigation<Navigation>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    try {
      const data = await ProductService.getAll();
      setProducts(data);
    } catch {
      showError("Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const handleDelete = async (id: number) => {
    try {
      await ProductService.delete(id);
      showSuccess("Produto excluído com sucesso.");
      fetchProducts();
    } catch {
      showError("Erro ao excluir produto.");
    }
  };

  if (loading) {
    return (
      <Screen>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View className="flex-1 p-4">
        <Pressable
          onPress={() => navigation.navigate("productForm", {})}
          className="bg-blue-600 rounded-xl p-3 mb-4"
        >
          <Text className="text-white text-center font-semibold">
            Novo Produto
          </Text>
        </Pressable>

        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate("productForm", { productId: item.id })
              }
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
      </View>
    </Screen>
  );
}
