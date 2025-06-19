import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { View, Text, Pressable } from "react-native";
import { OrderFormData } from "../schemas/orderSchema";
import { OrderItemField } from "./OrderItemField";
import { CustomerSelect } from "./CustomerSelect";

type Props = {
  onSubmit: (data: OrderFormData) => void;
  isEditing: boolean;
};

export function OrderForm({ onSubmit, isEditing }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<OrderFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const handleAddItem = () => {
    append({
      productId: 0,
      quantity: 1,
      price: 0,
    });
  };

  return (
    <View className="p-4">
      <Controller
        control={control}
        name="customerId"
        render={({ field }) => (
          <CustomerSelect
            value={field.value}
            onChange={field.onChange}
            error={errors.customerId?.message}
          />
        )}
      />

      {fields.map((field, index) => (
        <OrderItemField
          key={field.id}
          control={control}
          index={index}
          onRemove={() => remove(index)}
        />
      ))}

      <Pressable
        className="bg-blue-600 p-3 rounded mt-4"
        onPress={handleAddItem}
      >
        <Text className="text-white text-center font-semibold">
          Adicionar Item
        </Text>
      </Pressable>

      <Pressable
        className="bg-green-600 p-3 rounded mt-4"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white text-center font-semibold">
          {isEditing ? "Atualizar Pedido" : "Salvar Pedido"}
        </Text>
      </Pressable>
    </View>
  );
}
