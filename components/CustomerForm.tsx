import { Controller, useFormContext } from "react-hook-form";
import { CustomerFormData } from "../schemas/customerSchema";
import { Pressable, Text, TextInput, View } from "react-native";

interface CustomerFormProps {
  onSubmit: (data: CustomerFormData) => void;
  isEditing: boolean;
}

export function CustomerForm({ onSubmit, isEditing }: CustomerFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<CustomerFormData>();

  return (
    <View className="flex-1 p-4">
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Nome"
            placeholderTextColor="#aaa"
            value={value}
            onChangeText={onChange}
            className="bg-gray-800 text-white border border-gray-700 p-3 rounded mb-2"
          />
        )}
      />
      {errors.name && (
        <Text className="text-red-500 mb-2">{errors.name.message}</Text>
      )}

      <Controller
        control={control}
        name="cpfOrCnpj"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="CPF/CNPJ"
            placeholderTextColor="#aaa"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            className="bg-gray-800 text-white border border-gray-700 p-3 rounded mb-2"
          />
        )}
      />
      {errors.cpfOrCnpj && (
        <Text className="text-red-500 mb-2">{errors.cpfOrCnpj.message}</Text>
      )}

      <Controller
        control={control}
        name="cep"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="CEP"
            placeholderTextColor="#aaa"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            className="bg-gray-800 text-white border border-gray-700 p-3 rounded mb-2"
          />
        )}
      />
      {errors.cep && (
        <Text className="text-red-500 mb-2">{errors.cep.message}</Text>
      )}

      <Controller
        control={control}
        name="address"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Endereço"
            placeholderTextColor="#aaa"
            value={value}
            onChangeText={onChange}
            className="bg-gray-800 text-white border border-gray-700 p-3 rounded mb-2"
          />
        )}
      />
      {errors.address && (
        <Text className="text-red-500 mb-2">{errors.address.message}</Text>
      )}

      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="bg-green-600 p-3 rounded mt-4"
      >
        <Text className="text-white text-center font-semibold">
          {isEditing ? "Atualizar" : "Salvar"}
        </Text>
      </Pressable>
    </View>
  );
}
