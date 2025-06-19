import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1),
  price: z.coerce
    .number({ invalid_type_error: "Preço inválido." })
    .positive("Preço deve ser positivo.")
    .transform((value) => Math.round(value * 100)),
});

export const orderSchema = z.object({
  customerId: z.number(),
  items: z.array(orderItemSchema).min(1, "Adicione ao menos um item."),
});

export type OrderFormData = z.infer<typeof orderSchema>;
export type OrderItemFormData = OrderFormData["items"][number];
