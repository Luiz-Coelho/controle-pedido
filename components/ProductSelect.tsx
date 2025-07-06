import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ProductService } from "../services/ProductService";
import { Product } from "../types/Product";
import { showError } from "../utils/showToast";
import { ComboBox } from "./ComboBox";
import { formStyles } from "../styles/formStyles";

type Props = {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  error?: string;
};

export function ProductSelect({ value, onChange, error }: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    ProductService.getAll()
      .then(setProducts)
      .catch(() => showError("Erro ao carregar produtos."));
  }, []);

  const options = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  return (
    <View style={{ zIndex: 900 }}>
      <ComboBox
        options={options}
        value={value}
        onChange={onChange}
        placeholder="Selecione um Produto"
      />
      {error && <Text style={formStyles.error}>{error}</Text>}
    </View>
  );
}
