"use client"

import { useFormState } from "react-dom"

import { TextField } from "@/_components/TextField"
import { SubmitButton } from "@/_components/submit-button"
import { Title } from "@/_components/title"

import { registerSeller } from "./register-seller.action"
import { PasswordField } from "@/_components/PasswordField"

const initialState: { formErrors: Record<string, string | null> } = {
  formErrors: {},
}

export default function Page() {
  const [state, formAction] = useFormState(registerSeller, initialState)

  return (
    <main className="flex w-full flex-col gap-10 p-8">
      <Title>Crie sua Conta</Title>

      <form action={formAction} className="flex flex-col gap-6">
        <TextField
          label="Nome da Empresa"
          name="name"
          error={state.formErrors.name}
        />

        <TextField label="CNPJ" name="cnpj" error={state.formErrors.cnpj} />

        <TextField
          label="Telefone"
          name="phone"
          error={state.formErrors.phone}
        />

        <TextField label="E-mail" name="email" error={state.formErrors.email} />

        <TextField label="Chave Pix" name="pix" error={state.formErrors.pix} />

        <PasswordField
          label="Senha"
          name="password"
          error={state.formErrors.password}
        />
        <PasswordField
          label="Confirmar Senha"
          name="password-confirm"
          error={state.formErrors?.["password-confirm"]}
        />

        <SubmitButton>Criar Minha Conta</SubmitButton>
      </form>
    </main>
  )
}
