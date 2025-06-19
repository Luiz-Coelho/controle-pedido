import { useNavigation, useRoute } from "@react-navigation/native";
import { Navigation } from "../types/Navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ProductFormData, productSchema } from "../schemas/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductService } from "../services/ProductService";
import { showError, showSuccess } from "../utils/showToast";
import { ActivityIndicator, View } from "react-native";
import { ProductForm } from "../components/ProductForm";
import { Screen } from "../components/Screen";

type RouteParams = { productId?: number };

export default function ProductFormScreen() {
  const navigation = useNavigation<Navigation>();
  const route = useRoute();
  const { productId } = route.params as RouteParams;

  const [loading, setLoading] = useState<boolean>(!!productId);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const product = await ProductService.getById(productId);
        if (!product) {
          showError("Produto não encontrado.");
          navigation.goBack();
          return;
        }

        form.reset({
          name: product.name,
          price: product.price / 100,
        });
      } catch (error) {
        console.log(error);
        showError("Erro ao carregar produto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (productId) {
        await ProductService.update(productId, data);
        showSuccess("Produto atualizado com sucesso!");
      } else {
        await ProductService.add(data);
        showSuccess("Produto cadastrado com sucesso!");
      }
      navigation.goBack();
    } catch (error) {
      console.log(error);
      showError("Erro ao salvar produto.");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-950">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Screen>
      <FormProvider {...form}>
        <ProductForm onSubmit={onSubmit} isEditing={!!productId} />
      </FormProvider>
    </Screen>
  );
}
