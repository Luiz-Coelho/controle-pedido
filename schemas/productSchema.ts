import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório."),
  price: z.coerce
    .number({ invalid_type_error: "Preço inválido." })
    .positive("Preço deve ser positivo.")
    .transform((value) => Math.round(value * 100)),
});

export type ProductFormData = z.infer<typeof productSchema>;
