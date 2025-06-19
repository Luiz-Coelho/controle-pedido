import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { ProductService } from "../services/ProductService";
import { showError } from "../utils/showToast";
import { ComboBox } from "./ComboBox";
import { Text } from "react-native";

type Props = {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  error?: string;
};

export function ProductSelect({ value, onChange, error }: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const list = await ProductService.getAll();
        setProducts(list);
      } catch (error) {
        showError("Erro ao carregar produtos.");
      }
    };

    fetchProducts();
  }, []);

  const options = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  return (
    <>
      <ComboBox
        options={options}
        value={value}
        onChange={onChange}
        placeholder="Selecione um Produto"
      />
      {error && <Text className="text-red-500 mt-1">{error}</Text>}
    </>
  );
}
