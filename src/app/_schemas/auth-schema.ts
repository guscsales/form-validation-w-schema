import {z} from "zod";

export const signUpFormSchema = z
  .object({
    name: z.string().min(1, {message: "Campo obigatório"}).max(255),
    // v3 z.string().email
    // v4 como está abaixo
    email: z.email({message: "Email inválido"}).max(255),
    password: z
      .string()
      .min(8, {message: "Senha deve ter pelo menos 8 caracteres"})
      .max(255),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas são diferentes",
    path: ["confirmPassword"],
  });

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
