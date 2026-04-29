"use server";

import { perfilSchema } from "@/lib/schemas/schema";

export type State = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

export async function cadastrarPerfil(prevState: any, formData: FormData): Promise<State> {
  // Simula um delay de rede
  await new Promise((res) => setTimeout(res, 1000));

  // 1. Converte FormData em objeto simples
  const rawData = Object.fromEntries(formData);

  // 2. Valida com o schema da Missão 2
  const result = perfilSchema.safeParse(rawData);

  // 3. Lógica de retorno
  if (!result.success) {
    return {
      success: false,
      message: "Erro de validação.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  // 4. Sucesso: Simula salvamento
  console.log("💾 [SERVER]: Salvando no banco de dados...", result.data);
  
  return {
    success: true,
    message: "Usuário criado com sucesso!",
    errors: {},
  };
}