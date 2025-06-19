import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  cpfOrCnpj: z
    .string()
    .min(1, "CPF/CNPJ é obrigatório")
    .regex(
      /^\d{11}$|^\d{14}$/,
      "Um CPF deve possuir exatamente 11 digitos e um CNPJ 14 digitos"
    ),
  cep: z
    .string()
    .min(1, "CEP é obrigatório")
    .regex(/^\d{8}$/, "O CEP deve conter exatamente 8 dígitos"),
  address: z.string().min(1, "Endereço é obrigatório"),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
