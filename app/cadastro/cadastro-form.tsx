/*"use client";

import { startTransition, useActionState } from "react";
import { cadastroAction, cadastroState } from "../actions/cadastrar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CadastroInput, cadastroSchema } from "@/lib/schemas/cadastro";
import { Form } from "@base-ui/react";

const estadoInicial: cadastroState = { sucess: false };

export function CadastroForm() {
  const [estadoServidor, formAction, isPeding] = useActionState(
    cadastroAction,
    estadoInicial,
  );

  const form = useForm<CadastroInput>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: { name: "", email: "", password: "" },
    mode: "onBlur",
  });

  function onSubmit(data: CadastroInput) {
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));
    startTransition(() => {
      formAction(formData);
    });
  }
  return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormFied />
            </form>
        </Form>
  )
}
*/