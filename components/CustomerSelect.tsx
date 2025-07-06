import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { CustomerService } from "../services/CustomerService";
import { Customer } from "../types/Customer";
import { showError } from "../utils/showToast";
import { ComboBox } from "./ComboBox";
import { formStyles } from "../styles/formStyles";

type Props = {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  error?: string;
};

export function CustomerSelect({ value, onChange, error }: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    CustomerService.getAll()
      .then(setCustomers)
      .catch(() => showError("Erro ao carregar clientes."));
  }, []);

  const options = customers.map((customer) => ({
    label: customer.name,
    value: customer.id,
  }));

  return (
    <View style={{ zIndex: 1000 }}>
      <ComboBox
        options={options}
        value={value}
        onChange={onChange}
        placeholder="Selecione um Cliente"
      />
      {error && <Text style={formStyles.error}>{error}</Text>}
    </View>
  );
}
