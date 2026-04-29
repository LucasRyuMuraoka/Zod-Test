"use client";

import { useEffect } from "react";
import { testarSchemas } from "@/lib/schemas/schema";
import { executarTestesDeFluxo } from "@/lib/schemas/simulacaoFormulario";
import FormularioCadastro from "@/app/cadastro/FormularioCadastro";

export default function Home() {
  useEffect(() => {
    testarSchemas();
    console.log("\n--- ESPAÇO ENTRE EXERCÍCIOS ---\n");
    executarTestesDeFluxo();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        padding: "3rem 1rem",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <main
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {/* CABEÇALHO */}
        <header
          style={{
            backgroundColor: "#ffffff",
            padding: "2.5rem 2rem",
            borderRadius: "16px",
            boxShadow:
              "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
            border: "1px solid #f1f5f9",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              margin: "0 0 0.5rem 0",
              color: "#0f172a",
              fontSize: "2.25rem",
              fontWeight: "800",
              letterSpacing: "-0.02em",
            }}
          >
            Missão Zod Completa 🚀
          </h1>
          <p style={{ margin: 0, color: "#64748b", fontSize: "1.1rem" }}>
            Os testes dos <strong>Exercícios 1 e 2</strong> estão rodando no
            console (F12).
          </p>
        </header>

        {/* LAYOUT DE COLUNAS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* COLUNA DA ESQUERDA: Resumo */}
          <section
            style={{
              backgroundColor: "#ffffff",
              padding: "2rem",
              borderRadius: "16px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
              border: "1px solid #f1f5f9",
            }}
          >
            <h2
              style={{
                color: "#0f172a",
                fontSize: "1.25rem",
                margin: "0 0 1.5rem 0",
                borderBottom: "2px solid #f8fafc",
                paddingBottom: "0.75rem",
              }}
            >
              Exercícios Anteriores
            </h2>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div
                style={{
                  background: "#f8fafc",
                  padding: "1.25rem",
                  borderRadius: "8px",
                  borderLeft: "4px solid #3b82f6",
                }}
              >
                <p style={{ margin: 0, color: "#334155", lineHeight: "1.5" }}>
                  ✅ <strong>M1:</strong> Schemas criados com{" "}
                  <code>.refine()</code> e Regex.
                </p>
              </div>

              <div
                style={{
                  background: "#f8fafc",
                  padding: "1.25rem",
                  borderRadius: "8px",
                  borderLeft: "4px solid #10b981",
                }}
              >
                <p style={{ margin: 0, color: "#334155", lineHeight: "1.5" }}>
                  ✅ <strong>M2:</strong> Validação simulada com{" "}
                  <code>.flatten()</code> e tipagem inferida.
                </p>
              </div>

              <p
                style={{
                  marginTop: "1rem",
                  color: "#94a3b8",
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                Verifique o console do VS Code ou do Navegador para ver os logs
                detalhados.
              </p>
            </div>
          </section>

          {/* COLUNA DA DIREITA: Formulário */}
          <section
            style={{
              backgroundColor: "#ffffff",
              padding: "2rem",
              borderRadius: "16px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
              border: "1px solid #f1f5f9",
            }}
          >
            <h2
              style={{
                color: "#0f172a",
                fontSize: "1.25rem",
                margin: "0 0 0.5rem 0",
              }}
            >
              Exercício 3: Server Action
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: "0.95rem",
                margin: "0 0 2rem 0",
                lineHeight: "1.6",
              }}
            >
              Este formulário envia os dados para uma{" "}
              <strong>Server Action</strong>, valida no servidor e retorna os
              erros.
            </p>

            <FormularioCadastro />
          </section>
        </div>
      </main>
    </div>
  );
}
