"use client"

import { useSearchParams } from "next/navigation"
import { useFormState } from "react-dom"

import { Input } from "@/ui/input"
import { Label } from "@/ui/label"

import { SaveSearchState, saveSearch } from "./actions"

const initialState: SaveSearchState = {
  status: "error",
  errors: {},
}

function TextField({
  name,
  type = "text",
  label,
  error,
  placeholder,
}: {
  label: string
  name: string
  placeholder: string
  type?: "email" | "text"
  error?: string
}) {
  return (
    <Label className="flex flex-col gap-2">
      {label}

      <Input type={type} name={name} placeholder={placeholder} />

      {error && <span className="text-red-500">{error}</span>}
    </Label>
  )
}

export function SaveSearchForm() {
  const searchParams = useSearchParams()

  const [state, action] = useFormState(
    saveSearch.bind(null, { searchParams }),
    initialState,
  )

  return (
    <form
      id="save-search-logged-out"
      action={action}
      className={
        "flex w-full flex-col gap-8 rounded-lg border bg-[hsla(0,0%,99%)] p-8"
      }
    >
      <TextField
        label="Nome"
        name="name"
        placeholder="Fulano Ciclano"
        error={state.errors?.name}
      />

      <TextField
        label="E-mail"
        name="email"
        placeholder="fulano@gmail.com"
        error={state.errors?.email}
        type="email"
      />

      <TextField
        label="WhatsApp"
        name="phone"
        placeholder="DDD + Telefone"
        error={state.errors?.phone}
      />
    </form>
  )
}
