import { z } from "zod";

export const customerSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    documentType: z.enum(["cpf", "cnpj"], {
      required_error: "Selecione o tipo de documento.",
    }),
    document: z.string().min(1, "Documento é obrigatório"),
    cep: z
      .string()
      .min(1, "CEP é obrigatório")
      .regex(/^\d{8}$/, "O CEP deve conter exatamente 8 dígitos"),
    address: z.string().min(1, "Endereço é obrigatório"),
  })
  .superRefine((data, ctx) => {
    const { documentType, document } = data;

    if (documentType === "cpf" && !/^\d{11}$/.test(document)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["document"],
        message: "CPF deve ter 11 dígitos numéricos.",
      });
    }

    if (documentType === "cnpj" && !/^\d{14}$/.test(document)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["document"],
        message: "CNPJ deve ter 14 dígitos numéricos.",
      });
    }
  });

export type CustomerFormData = z.infer<typeof customerSchema>;
