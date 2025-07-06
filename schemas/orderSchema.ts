import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z
    .number({ required_error: "Selecione um produto." })
    .min(1, "Selecione um produto."),
  quantity: z
    .number({ required_error: "Informe a quantidade." })
    .min(1, "A quantidade deve ser maior que zero."),
  price: z.coerce
    .number({ invalid_type_error: "Preço inválido." })
    .positive("O preço deve ser positivo.")
    .transform((value) => Math.round(value * 100)),
});

export const orderSchema = z.object({
  customerId: z
    .number({ required_error: "Selecione um cliente." })
    .min(1, "Selecione um cliente."),
  items: z.array(orderItemSchema).min(1, "Adicione ao menos um item."),
});

export type OrderFormData = z.infer<typeof orderSchema>;
export type OrderItemFormData = OrderFormData["items"][number];

export type OrderFormRawData = {
  customerId?: number;
  items: {
    productId?: number;
    quantity?: number;
    price?: number;
  }[];
};
