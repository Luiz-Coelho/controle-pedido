import { Controller, useFormContext, useWatch } from "react-hook-form";
import { CustomerFormData } from "../schemas/customerSchema";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { SegmentedButtons, TextInput } from "react-native-paper";
import MaskInput from "react-native-mask-input";
import { getCepMask, getDocumentMask } from "../utils/masks";
import { formStyles } from "../styles/formStyles";
import { theme } from "../styles/theme";

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

  const documentType = useWatch({ control, name: "documentType" });

  const documentMask = getDocumentMask(documentType);

  const cepMask = getCepMask();

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
        name="documentType"
        render={({ field }) => (
          <SegmentedButtons
            value={field.value}
            onValueChange={field.onChange}
            buttons={[
              { value: "cpf", label: "CPF" },
              { value: "cnpj", label: "CNPJ" },
            ]}
            style={formStyles.segmented}
            theme={{
              colors: {
                primary: theme.colors.primary,
                onSurface: theme.colors.text,
                surface: theme.colors.background,
                secondaryContainer: theme.colors.primary,
                onSecondaryContainer: theme.colors.textMuted,
              },
            }}
          />
        )}
      />
      {errors.documentType && (
        <Text style={formStyles.error}>{errors.documentType.message}</Text>
      )}

      {documentType && (
        <Controller
          control={control}
          name="document"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={documentType === "cpf" ? "CPF" : "CNPJ"}
              value={value}
              mode="flat"
              keyboardType="numeric"
              error={!!errors.document}
              style={formStyles.input}
              render={(props) => (
                <MaskInput
                  {...props}
                  value={value}
                  onChangeText={(masked, unmasked) => onChange(unmasked)}
                  mask={documentMask}
                  style={[props.style, formStyles.maskInput]}
                />
              )}
            />
          )}
        />
      )}
      {errors.document && (
        <Text style={formStyles.error}>{errors.document.message}</Text>
      )}

      <Controller
        control={control}
        name="cep"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="CEP"
            value={value}
            mode="flat"
            keyboardType="numeric"
            error={!!errors.cep}
            style={formStyles.input}
            render={(props) => (
              <MaskInput
                {...props}
                value={value}
                onChangeText={(masked, unmasked) => onChange(unmasked)}
                mask={cepMask}
                style={[props.style, formStyles.maskInput]}
              />
            )}
          />
        )}
      />
      {errors.cep && <Text style={formStyles.error}>{errors.cep.message}</Text>}

      <Controller
        control={control}
        name="address"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Endereço"
            value={value}
            onChangeText={onChange}
            mode="flat"
            error={!!errors.address}
            style={formStyles.input}
          />
        )}
      />
      {errors.address && (
        <Text style={formStyles.error}>{errors.address.message}</Text>
      )}

      <Pressable onPress={handleSubmit(onSubmit)} style={formStyles.button}>
        <Text style={formStyles.buttonText}>
          {isEditing ? "Atualizar" : "Salvar"}
        </Text>
      </Pressable>
    </View>
  );
}
