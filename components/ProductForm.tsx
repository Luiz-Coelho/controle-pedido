import { Controller, useFormContext } from "react-hook-form";
import { ProductFormData } from "../schemas/productSchema";
import { Pressable, Text, TextInput, View } from "react-native";

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  isEditing: boolean;
}

export function ProductForm({ onSubmit, isEditing }: ProductFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  return (
    <View className="p-4">
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Nome do Produto"
            placeholderTextColor="#aaa"
            value={value}
            onChangeText={onChange}
            className="bg-gray-800 text-white border border-gray-700 p-3 rounded mb-2"
          />
        )}
      />
      {errors.name && (
        <Text className="text-red-500">{errors.name.message}</Text>
      )}
      <Controller
        control={control}
        name="price"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Preço do produto"
            placeholderTextColor="#aaa"
            value={value?.toString()}
            onChangeText={onChange}
            className="bg-gray-800 text-white border border-gray-700 p-3 rounded mb-2"
            keyboardType="numeric"
          />
        )}
      />
      {errors.price && (
        <Text className="text-red-500">{errors.price.message}</Text>
      )}

      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="bg-green-600 p-3 rounded mt-4"
      >
        <Text className="text-white text-center">
          {isEditing ? "Atualizar" : "Salvar"}
        </Text>
      </Pressable>
    </View>
  );
}
