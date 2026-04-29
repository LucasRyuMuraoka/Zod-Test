import { cadastroSchema } from "@/lib/schemas/cadastro";

export type cadastroState = {
    sucess: boolean;
    message?: string;
    erros?: {
        nome?: string[];
        email?: string[];
        senha?: string[]; 
    }
}
export async function cadastroAction(
    _prevState: cadastroState,
    formData: FormData
): Promise<cadastroState> {
    const dados = Object.fromEntries(formData)
    const resultado = cadastroSchema.safeParse(dados)

    if(!resultado.success){
        return{
            sucess: false,
            message: "Dados incorretos",
            erros: resultado.error.flatten().fieldErrors,
        }
    }
    return {
        sucess: true,
        message: "Cadastro realizado com Sucesso"
    }
}