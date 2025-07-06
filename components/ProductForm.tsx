import { Controller, useFormContext } from "react-hook-form";
import { ProductFormData } from "../schemas/productSchema";
import { Pressable, Text, View } from "react-native";
import { formStyles } from "../styles/formStyles";
import { TextInput } from "react-native-paper";
import CurrencyInput from "react-native-currency-input";

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
    <View style={formStyles.container}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Nome"
            value={value}
            onChangeText={onChange}
            mode="flat"
            error={!!errors.name}
            style={formStyles.input}
          />
        )}
      />
      {errors.name && (
        <Text style={formStyles.error}>{errors.name.message}</Text>
      )}

      <Controller
        control={control}
        name="price"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Preço"
            value={value?.toString()}
            mode="flat"
            keyboardType="numeric"
            error={!!errors.price}
            style={formStyles.input}
            render={(props) => (
              <CurrencyInput
                {...props}
                value={value}
                onChangeValue={(value) => onChange(value)}
                prefix="R$ "
                delimiter="."
                separator=","
                precision={2}
                keyboardType="numeric"
              />
            )}
          />
        )}
      />
      {errors.price && (
        <Text style={formStyles.error}>{errors.price.message}</Text>
      )}

      <Pressable onPress={handleSubmit(onSubmit)} style={formStyles.button}>
        <Text style={formStyles.buttonText}>
          {isEditing ? "Atualizar" : "Salvar"}
        </Text>
      </Pressable>
    </View>
  );
}
