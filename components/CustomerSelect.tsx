import { useEffect, useState } from "react";
import { Customer } from "../types/Customer";
import { CustomerService } from "../services/CustomerService";
import { showError } from "../utils/showToast";
import { ComboBox } from "./ComboBox";
import { Text } from "react-native";

type Props = {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  error?: string;
};

export function CustomerSelect({ value, onChange, error }: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const list = await CustomerService.getAll();
        setCustomers(list);
      } catch (error) {
        showError("Erro ao carregar clientes.");
      }
    };

    fetchCustomers();
  }, []);

  const options = customers.map((customer) => ({
    label: customer.name,
    value: customer.id,
  }));

  return (
    <>
      <ComboBox
        options={options}
        value={value}
        onChange={onChange}
        placeholder="Selecione um Cliente"
      />
      {error && <Text className="text-red-500 mt-1">{error}</Text>}
    </>
  );
}
