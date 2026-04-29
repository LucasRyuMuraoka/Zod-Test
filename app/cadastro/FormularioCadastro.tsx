"use client";

import { useState } from "react";
import { cadastrarPerfil, State } from "@/app/actions/actions";

export default function FormularioCadastro() {
  const [state, setState] = useState<State>({});
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const result = await cadastrarPerfil(null, formData);

    setState(result);
    setIsPending(false);
  }

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #cbd5e1", 
    borderRadius: "6px",
    fontSize: "1rem",
    color: "#334155",
    backgroundColor: "#ffffff",
    outlineColor: "#3b82f6",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
    >
      <div>
        <label style={{ fontWeight: "500", color: "#475569", marginBottom: "4px", display: "inline-block" }}>
          Nome:
        </label>
        <input name="nome" style={inputStyle} placeholder="Digite seu nome" />
        {state.errors?.nome && (
          <span style={{ color: "#ef4444", fontSize: "13px", marginTop: "4px", display: "block" }}>
            {state.errors.nome[0]}
          </span>
        )}
      </div>

      <div>
        <label style={{ fontWeight: "500", color: "#475569", marginBottom: "4px", display: "inline-block" }}>
          E-mail (opcional):
        </label>
        <input name="email" style={inputStyle} placeholder="exemplo@email.com" />
        {state.errors?.email && (
          <span style={{ color: "#ef4444", fontSize: "13px", marginTop: "4px", display: "block" }}>
            {state.errors.email[0]}
          </span>
        )}
      </div>

      <div>
        <label style={{ fontWeight: "500", color: "#475569", marginBottom: "4px", display: "inline-block" }}>
          Bio (máx 150):
        </label>
        <textarea name="bio" rows={3} style={{ ...inputStyle, resize: "vertical" }} placeholder="Fale um pouco sobre você..." />
        {state.errors?.bio && (
          <span style={{ color: "#ef4444", fontSize: "13px", marginTop: "4px", display: "block" }}>
            {state.errors.bio[0]}
          </span>
        )}
      </div>

      <div>
        <label style={{ fontWeight: "500", color: "#475569", marginBottom: "4px", display: "inline-block" }}>
          Site:
        </label>
        <input
          name="site"
          placeholder="https://seu-site.com"
          style={inputStyle}
        />
        {state.errors?.site && (
          <span style={{ color: "#ef4444", fontSize: "13px", marginTop: "4px", display: "block" }}>
            {state.errors.site[0]}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        style={{
          padding: "12px",
          cursor: isPending ? "not-allowed" : "pointer",
          backgroundColor: isPending ? "#94a3b8" : "#3b82f6", 
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontWeight: "600",
          fontSize: "1rem",
          marginTop: "0.5rem",
          transition: "background-color 0.2s"
        }}
      >
        {isPending ? "Enviando..." : "Cadastrar Perfil"}
      </button>

      {state.success && (
        <div style={{ backgroundColor: "#dcfce7", padding: "12px", borderRadius: "6px", border: "1px solid #bbf7d0" }}>
          <p style={{ color: "#166534", fontWeight: "600", margin: 0, textAlign: "center" }}>
            {state.message}
          </p>
        </div>
      )}
    </form>
  );
}