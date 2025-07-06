import { useEffect } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { useForm, Controller, useWatch } from "react-hook-form";
import { OrderItemFormData, orderItemSchema } from "../schemas/orderSchema";
import { ProductSelect } from "./ProductSelect";
import CurrencyInput from "react-native-currency-input";
import { TextInput } from "react-native-paper";
import { formStyles } from "../styles/formStyles";
import { Product } from "../types/Product";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  visible: boolean;
  initialData?: OrderItemFormData;
  onClose: () => void;
  onSave: (data: OrderItemFormData) => void;
  products: Product[];
};

export function OrderItemForm({
  visible,
  initialData,
  onClose,
  onSave,
  products,
}: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<OrderItemFormData>({
    resolver: zodResolver(orderItemSchema),
    defaultValues: initialData ?? {
      productId: undefined,
      quantity: 0,
      price: 0,
    },
  });

  const productId = useWatch({ control, name: "productId" });

  useEffect(() => {
    if (!productId) return;
    const selected = products.find((p) => p.id === productId);
    if (selected) {
      setValue("price", selected.price / 100);
    }
  }, [productId]);

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        price: initialData.price / 100,
      });
    } else {
      reset({ productId: undefined, quantity: 0, price: 0 });
    }
  }, [initialData, visible]);

  const handleSave = (data: OrderItemFormData) => {
    onSave({ ...data, price: data.price / 100 });
    reset();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={formStyles.modalContainer}>
        <View style={formStyles.modalContent}>
          <Controller
            control={control}
            name="productId"
            render={({ field }) => (
              <ProductSelect
                value={field.value}
                onChange={field.onChange}
                error={errors.productId?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="quantity"
            render={({ field }) => (
              <TextInput
                label="Quantidade"
                value={String(field.value)}
                onChangeText={(text) => {
                  const num = Number(text.replace(/\D/g, ""));
                  field.onChange(isNaN(num) ? 0 : num);
                }}
                keyboardType="numeric"
                style={formStyles.input}
              />
            )}
          />
          {errors.quantity && (
            <Text style={formStyles.error}>{errors.quantity.message}</Text>
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

          <Pressable
            style={formStyles.button}
            onPress={handleSubmit(handleSave)}
          >
            <Text style={formStyles.buttonText}>Salvar Item</Text>
          </Pressable>

          <Pressable style={formStyles.removeButton} onPress={onClose}>
            <Text style={formStyles.buttonText}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
