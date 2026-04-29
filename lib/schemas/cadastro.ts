import z from "zod";

export const cadastroSchema = z.object({
    name: z.string().min(2, "Nome muito pequeno").max(50, "Nome muito grande"),
    email: z.string().email("Email Valido").trim().toLowerCase(),
    password: z.string().min(6, "Senha precisa ter pelo menos 6 caracteres").regex(/[A-Z]/, "Precisa ter pelo menos uma letra minuscula").regex(/[0-9]/, "Precisa ter pelo menos um número")
})

export type CadastroInput = z.infer<typeof cadastroSchema>