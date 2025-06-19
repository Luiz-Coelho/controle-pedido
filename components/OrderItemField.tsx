import { Control, Controller } from "react-hook-form";
import { OrderFormData } from "../schemas/orderSchema";
import { Pressable, Text, TextInput, View } from "react-native";
import { ProductSelect } from "./ProductSelect";

type Props = {
  control: Control<OrderFormData>;
  index: number;
  onRemove: () => void;
};

export function OrderItemField({ control, index, onRemove }: Props) {
  return (
    <View className="border rounded p-2 mt-3">
      <Text className="font-semibold mb-1">{index + 1}</Text>

      <Controller
        control={control}
        name={`items.${index}.productId`}
        render={({ field }) => (
          <ProductSelect
            value={field.value}
            onChange={field.onChange}
            error=""
          />
        )}
      />

      <Controller
        control={control}
        name={`items.${index}.quantity`}
        render={({ field }) => (
          <TextInput
            value={String(field.value)}
            onChangeText={(text) => field.onChange(Number(text))}
            keyboardType="numeric"
            placeholder="Quantidade"
            placeholderTextColor="#aaa"
            className="bg-gray-800 text-white border border-gray-700 p-3 rounded mt-2"
          />
        )}
      />

      <Controller
        control={control}
        name={`items.${index}.price`}
        render={({ field }) => (
          <TextInput
            value={String(field.value)}
            onChangeText={(text) => field.onChange(Number(text))}
            keyboardType="numeric"
            placeholder="Preço unitário"
            placeholderTextColor="#aaa"
            className="bg-gray-800 text-white border border-gray-700 p-3 rounded mt-2"
          />
        )}
      />

      <Pressable onPress={onRemove} className="bg-red-500 p-2 rounded mt-2">
        <Text className="text-white text-center">Remover item</Text>
      </Pressable>
    </View>
  );
}
