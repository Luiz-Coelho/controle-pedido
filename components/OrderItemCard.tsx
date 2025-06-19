import { Controller, useFormContext } from "react-hook-form";
import { OrderItemFormData } from "../schemas/orderSchema";
import { Pressable, Text, TextInput, View } from "react-native";

interface Props {
  index: number;
  onRemove: () => void;
}

export function OrderItemCard({ index, onRemove }: Props) {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<{ items: OrderItemFormData[] }>();

  const item = watch(`items.${index}`);
  const total = (Number(item.price || 0) * Number(item.quantity || 0)).toFixed(
    2
  );

  const fieldError = errors.items?.[index];

  return (
    <View className="bg-gray-800 p-4 rounded-xl mt-4 border border-gray-700">
      <Controller
        control={control}
        name={`items.${index}.productId`}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="ID do produto"
            value={value?.toString()}
            onChangeText={(text) => onChange(Number(text))}
            keyboardType="numeric"
            className="bg-gray-700 text-white p-2 rounded"
            placeholderTextColor="#aaa"
          />
        )}
      />
      {fieldError?.productId && (
        <Text className="text-red-500 mt-1">
          {fieldError.productId.message}
        </Text>
      )}

      <Controller
        control={control}
        name={`items.${index}.quantity`}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Quantidade"
            value={value?.toString()}
            onChangeText={(text) => onChange(Number(text))}
            keyboardType="numeric"
            className="bg-gray-700 text-white p-2 rounded mt-3"
            placeholderTextColor="#aaa"
          />
        )}
      />
      {fieldError?.quantity && (
        <Text className="text-red-500 mt-1">{fieldError.quantity.message}</Text>
      )}

      <Controller
        control={control}
        name={`items.${index}.price`}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Preço (R$)"
            value={value?.toString()}
            onChangeText={(text) => onChange(Number(text))}
            keyboardType="numeric"
            className="bg-gray-700 text-white p-2 rounded mt-3"
            placeholderTextColor="#aaa"
          />
        )}
      />
      {fieldError?.price && (
        <Text className="text-red-500 mt-1">{fieldError.price.message}</Text>
      )}

      <Text className="text-gray-300 mt-3">Total: R$ {total}</Text>

      <Pressable onPress={onRemove} className="bg-red-500 p-2 rounded mt-3">
        <Text className="text-white text-center font-semibold">
          Remover item
        </Text>
      </Pressable>
    </View>
  );
}
