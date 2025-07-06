import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Navigation } from "../types/Navigation";
import { OrderService } from "../services/OrderService";
import { OrderFormData, orderSchema } from "../schemas/orderSchema";
import { showError, showSuccess } from "../utils/showToast";
import { OrderForm } from "../components/OrderForm";
import { Screen } from "../components/Screen";
import { Order } from "../types/Order";
import { Product } from "../types/Product";
import { ProductService } from "../services/ProductService";
import { Loading } from "../components/Loading";

type RouteParams = { orderId?: number };

export default function OrderFormScreen() {
  const navigation = useNavigation<Navigation>();
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  const [loading, setLoading] = useState<boolean>(!!orderId);
  const [order, setOrder] = useState<Order | null>(null);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await ProductService.getAll();
        setProducts(result);
      } catch {
        showError("Erro ao carregar produtos.");
      }
    };

    fetchProducts();
  }, []);

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

        setOrder(order);

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
      if (orderId && order) {
        await OrderService.update(orderId, {
          customerId: data.customerId,
          createdAt: order.createdAt,
          updatedAt: Date.now(),
        });
        showSuccess("Pedido atualizado com sucesso!");
      } else {
        await OrderService.add(
          {
            customerId: data.customerId,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
          data.items
        );
        showSuccess("Pedido criado com sucesso!");
      }

      navigation.goBack();
    } catch (error) {
      showError("Erro ao salvar pedido.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Screen>
      <FormProvider {...form}>
        <OrderForm
          onSubmit={onSubmit}
          isEditing={!!orderId}
          products={products}
        />
      </FormProvider>
    </Screen>
  );
}
