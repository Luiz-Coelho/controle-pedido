import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { CustomerFormData, customerSchema } from "../schemas/customerSchema";
import { ActivityIndicator, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { showError, showSuccess } from "../utils/showToast";
import { CustomerService } from "../services/CustomerService";
import { useEffect, useState } from "react";
import { Navigation } from "../types/Navigation";
import { CustomerForm } from "../components/CustomerForm";
import { Screen } from "../components/Screen";

type RouteParams = { customerId?: number };

export default function CustomerFormScreen() {
  const navigation = useNavigation<Navigation>();
  const route = useRoute();
  const { customerId } = route.params as RouteParams;

  const [loading, setLoading] = useState<boolean>(!!customerId);

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  });

  useEffect(() => {
    if (!customerId) return;

    const fetchCustomer = async () => {
      try {
        const customer = await CustomerService.getById(customerId);
        if (!customer) {
          showError("Cliente não encontrado.");
          navigation.goBack();
          return;
        }

        form.reset({
          name: customer.name,
          cpfOrCnpj: customer.cpfOrCnpj,
          cep: customer.cep,
          address: customer.address,
        });
      } catch (error) {
        showError("Erro ao carregar cliente.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const onSubmit = async (data: CustomerFormData) => {
    try {
      if (customerId) {
        await CustomerService.update(customerId, data);
        showSuccess("Cliente atualizado com sucesso!");
      } else {
        await CustomerService.add(data);
        showSuccess("Cliente cadastrado com sucesso!");
      }
      navigation.goBack();
    } catch (error) {
      showError("Erro ao salvar cliente.");
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
        <CustomerForm onSubmit={onSubmit} isEditing={!!customerId} />
      </FormProvider>
    </Screen>
  );
}
