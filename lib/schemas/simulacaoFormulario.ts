import { z } from "zod";
import { perfilSchema } from "./schema"; // Importando o schema criado anteriormente

// Opcional, mas boa prática: extrair o tipo inferido pelo Zod para usar na aplicação
type DadosPerfil = z.infer<typeof perfilSchema>;

/**
 * Função que simula o recebimento de dados de um formulário e faz a validação
 */
export function submeterFormularioPerfil(dadosBrutos: unknown) {
  console.log("⏳ Processando formulário...");

  // 1. Usa safeParse para não quebrar a aplicação caso haja erro
  const resultado = perfilSchema.safeParse(dadosBrutos);

  // 2. Fluxo Condicional: Sucesso vs Erro
  if (resultado.success) {
    // Aqui, resultado.data já está 100% tipado como 'DadosPerfil'
    console.log("✅ Sucesso: Usuário criado com sucesso!");
    console.log("📦 Dados tipados prontos para o banco de dados:", resultado.data);
  } else {
    // Extrai os erros organizados de forma limpa usando .flatten()
    const errosPorCampo = resultado.error.flatten().fieldErrors;
    
    console.log("❌ Falha na validação. Verifique os campos:");
    
    // Mostrando cada erro ao lado do campo correspondente
    if (errosPorCampo.nome) console.log(`   - Nome: ${errosPorCampo.nome.join(", ")}`);
    if (errosPorCampo.email) console.log(`   - E-mail: ${errosPorCampo.email.join(", ")}`);
    if (errosPorCampo.bio) console.log(`   - Bio: ${errosPorCampo.bio.join(", ")}`);
    if (errosPorCampo.site) console.log(`   - Site: ${errosPorCampo.site.join(", ")}`);
  }
  
  console.log("-".repeat(40)); // Apenas um separador visual no console
}

// --- CENÁRIOS DE TESTE ---
export function executarTestesDeFluxo() {
  console.log("🚀 --- INICIANDO SIMULAÇÃO DE FLUXOS ---");

  // Cenário 1: Dados totalmente válidos
  console.log("\n➡️ CENÁRIO 1: Dados 100% Válidos");
  const dadosValidos = {
    nome: "Lucas Ryu Muraoka",
    email: "lucas@empresa.com.br",
    bio: "Desenvolvedor de software com foco em TypeScript e Next.js.",
    site: "https://meuportfolio.dev"
  };
  submeterFormularioPerfil(dadosValidos);

  // Cenário 2: Dados com APENAS UM campo errado (Site inválido)
  console.log("\n➡️ CENÁRIO 2: Apenas 1 erro (Site sem http)");
  const dadosUmErro = {
    nome: "Carlos Silva",
    email: "carlos@exemplo.com",
    bio: "Desenvolvedor Backend.",
    site: "www.carlos.com" // Erro: precisa do protocolo http:// ou https://
  };
  submeterFormularioPerfil(dadosUmErro);

  // Cenário 3: Dados com MÚLTIPLOS erros
  console.log("\n➡️ CENÁRIO 3: Múltiplos erros simultâneos");
  const dadosVariosErros = {
    nome: "A", // Erro: muito curto
    email: "email-invalido", // Erro: formato errado
    bio: "Bio muito longa".repeat(15), // Erro: passou de 150 caracteres
    site: "site-invalido" // Erro: formato url incorreto
  };
  submeterFormularioPerfil(dadosVariosErros);

  console.log("🏁 --- FIM DA SIMULAÇÃO ---");
}