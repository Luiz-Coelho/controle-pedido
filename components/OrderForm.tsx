import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { ScrollView, View, Text, Pressable } from "react-native";
import { OrderFormData, OrderItemFormData } from "../schemas/orderSchema";
import { CustomerSelect } from "./CustomerSelect";
import { showError } from "../utils/showToast";
import { useRef, useState } from "react";
import { formStyles } from "../styles/formStyles";
import { OrderItemCard } from "./OrderItemCard";
import { OrderItemForm } from "./OrderItemForm";
import { Product } from "../types/Product";

type Props = {
  onSubmit: (data: OrderFormData) => void;
  isEditing: boolean;
  products: Product[];
};

export function OrderForm({ onSubmit, isEditing, products }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useFormContext<OrderFormData>();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "items",
  });

  const scrollViewRef = useRef<ScrollView>(null);

  const handleSaveItem = (data: OrderItemFormData) => {
    if (editingIndex === null) {
      append(data);
    } else {
      update(editingIndex, data);
    }
    setModalVisible(false);
  };

  const handleSubmitWithValidation = () => {
    const { items } = getValues();
    if (items.length === 0) {
      return showError("O pedido deve conter pelo menos um item.");
    }

    handleSubmit(onSubmit)();
  };

  const openNewItemModal = () => {
    setEditingIndex(null);
    setModalVisible(true);
  };

  const openEditItemModal = (index: number) => {
    setEditingIndex(index);
    setModalVisible(true);
  };

  return (
    <View style={formStyles.container}>
      <OrderItemForm
        visible={modalVisible}
        products={products}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveItem}
        initialData={
          editingIndex !== null
            ? {
                ...fields[editingIndex],
                price: fields[editingIndex].price / 100,
              }
            : undefined
        }
      />

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

      <ScrollView
        ref={scrollViewRef}
        style={formStyles.scrollContainer}
        contentContainerStyle={{ gap: 12 }}
        keyboardShouldPersistTaps="handled"
      >
        {fields.map((item, index) => (
          <OrderItemCard
            key={item.id}
            item={item}
            productName={
              products.find((p) => p.id === item.productId)?.name ?? ""
            }
            onEdit={() => openEditItemModal(index)}
            onDelete={() => remove(index)}
          />
        ))}
      </ScrollView>

      <View style={formStyles.buttonsContainer}>
        <Pressable
          style={formStyles.buttonSecondary}
          onPress={openNewItemModal}
        >
          <Text style={formStyles.buttonTextSecondary}>Adicionar Item</Text>
        </Pressable>

        <Pressable
          style={formStyles.button}
          onPress={handleSubmitWithValidation}
        >
          <Text style={formStyles.buttonText}>
            {isEditing ? "Atualizar Pedido" : "Salvar Pedido"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
