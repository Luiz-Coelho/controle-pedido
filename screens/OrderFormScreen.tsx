import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActivityIndicator, View } from "react-native";

import { Navigation } from "../types/Navigation";
import { OrderService } from "../services/OrderService";
import { OrderFormData, orderSchema } from "../schemas/orderSchema";
import { showError, showSuccess } from "../utils/showToast";
import { OrderForm } from "../components/OrderForm";
import { Screen } from "../components/Screen";

type RouteParams = { orderId?: number };

export default function OrderFormScreen() {
  const navigation = useNavigation<Navigation>();
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  const [loading, setLoading] = useState<boolean>(!!orderId);

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const result = await OrderService.getById(orderId);
        if (!result) {
          showError("Pedido não encontrado.");
          navigation.goBack();
          return;
        }

        const { order, items } = result;

        form.reset({
          customerId: order.customerId,
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price / 100,
          })),
        });
      } catch (error) {
        showError("Erro ao carregar pedido.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const onSubmit = async (data: OrderFormData) => {
    try {
      if (orderId) {
        await OrderService.update(orderId, {
          customerId: data.customerId,
        });
        showSuccess("Pedido atualizado com sucesso!");
      } else {
        await OrderService.add(data, data.items);
        showSuccess("Pedido criado com sucesso!");
      }

      navigation.goBack();
    } catch (error) {
      showError("Erro ao salvar pedido.");
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
        <OrderForm onSubmit={onSubmit} isEditing={!!orderId} />
      </FormProvider>
    </Screen>
  );
}
