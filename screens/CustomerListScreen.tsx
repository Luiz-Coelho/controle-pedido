import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Customer } from "../types/Customer";
import { CustomerService } from "../services/CustomerService";
import { showError, showSuccess } from "../utils/showToast";
import { Navigation } from "../types/Navigation";
import { CustomerCard } from "../components/CustomerCard";
import { Screen } from "../components/Screen";
import { Loading } from "../components/Loading";
import { listScreenStyles } from "../styles/listScreenStyles";

export default function CustomerListScreen() {
  const navigation = useNavigation<Navigation>();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchCustomers() {
    try {
      const data = await CustomerService.getAll();
      setCustomers(data);
    } catch {
      showError("Erro ao carregar clientes.");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchCustomers();
    }, [])
  );

  const handleDelete = async (id: number) => {
    try {
      await CustomerService.delete(id);
      showSuccess("Cliente excluído com sucesso.");
      fetchCustomers();
    } catch {
      showError("Erro ao excluir cliente.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Screen>
      <View style={listScreenStyles.container}>
        <Pressable
          onPress={() => navigation.navigate("customerForm", {})}
          style={listScreenStyles.button}
        >
          <Text style={listScreenStyles.buttonText}>Novo Cliente</Text>
        </Pressable>

        <FlatList
          data={customers}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <CustomerCard
              customer={item}
              onPress={() =>
                navigation.navigate("customerForm", { customerId: item.id })
              }
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
      </View>
    </Screen>
  );
}
