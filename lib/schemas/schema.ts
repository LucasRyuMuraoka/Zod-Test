import { z } from "zod";

export const perfilSchema = z.object({
  nome: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z
    .string()
    .email({ message: "E-mail inválido. Verifique o formato." })
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .max(150, { message: "A bio deve ter no máximo 150 caracteres." })
    .optional(),
  site: z
    .string()
    .url({ message: "URL inválida. Precisa começar com http:// ou https://" })
    .optional()
    .or(z.literal("")),
});

export const enderecoSchema = z.object({
  rua: z
    .string()
    .min(3, { message: "A rua deve ter pelo menos 3 caracteres." }),
  numero: z.string().min(1, { message: "O número é obrigatório." }),
  cidade: z.string().min(2, { message: "A cidade é obrigatória." }),
  estado: z.string().length(2, {
    message: "O estado deve ter exatamente 2 caracteres (ex: SP).",
  }),
  cep: z.string().refine((cep) => /^\d{5}-\d{3}$/.test(cep), {
    message: "CEP inválido. O formato correto é XXXXX-XXX.",
  }),
});

export function testarSchemas() {
  console.log("🚀 --- INICIANDO TESTES DE SCHEMA ---");

  // 1. Teste: Perfil Válido
  const perfilValido = {
    nome: "Lucas Ryu Muraoka",
    email: "lucas@exemplo.com",
    bio: "Desenvolvedor web focando em Next.js e TypeScript.",
    site: "https://github.com/LucasRyu_Sensor",
  };
  const testePerfilValido = perfilSchema.safeParse(perfilValido);
  console.log("✅ Perfil Válido:", testePerfilValido.success);
  // Resultado esperado: true

  // 2. Teste: Perfil Inválido (Nome curto, email incorreto, bio muito longa, site sem http)
  const perfilInvalido = {
    nome: "L",
    email: "lucas.com",
    bio: "Bio muito longa... ".repeat(15),
    site: "meusite.com",
  };
  const testePerfilInvalido = perfilSchema.safeParse(perfilInvalido);
  console.log("❌ Perfil Inválido:", testePerfilInvalido.success);
  if (!testePerfilInvalido.success) {
    console.log("   Erros Perfil:", testePerfilInvalido.error.format());
  }
  // Resultado esperado: false, com mensagens de erro claras para todos os 4 campos.

  // 3. Teste: Endereço Válido
  const enderecoValido = {
    rua: "Avenida Paulista",
    numero: "1000",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01310-100",
  };
  const testeEnderecoValido = enderecoSchema.safeParse(enderecoValido);
  console.log("✅ Endereço Válido:", testeEnderecoValido.success);
  // Resultado esperado: true

  // 4. Teste: Endereço Inválido (CEP sem traço, estado longo, rua curta)
  const enderecoInvalido = {
    rua: "Av",
    numero: "",
    cidade: "S",
    estado: "São Paulo",
    cep: "01310100", // Faltando o traço
  };
  const testeEnderecoInvalido = enderecoSchema.safeParse(enderecoInvalido);
  console.log("❌ Endereço Inválido:", testeEnderecoInvalido.success);
  if (!testeEnderecoInvalido.success) {
    console.log("   Erros Endereço:", testeEnderecoInvalido.error.format());
  }
  // Resultado esperado: false, acusando erro no regex/refine do CEP e nos tamanhos de string.

  console.log("🏁 --- FIM DOS TESTES ---");
}
