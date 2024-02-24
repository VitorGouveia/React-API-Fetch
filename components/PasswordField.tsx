"use client"

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid"

import { useState } from "react"
import { Small } from "./Typography/Small"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export const PasswordField = (props: {
  label: string
  name: string
  placeholder?: string
  error?: string | null
}) => {
  const [visible, setVisible] = useState(false)

  return (
    <Label className="flex w-full flex-col gap-2">
      {props.label}

      <div className="relative w-full">
        <Input
          name={props.name}
          type={visible ? "text" : "password"}
          placeholder={props.placeholder ?? "Digite aqui..."}
        />

        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 transition hover:bg-black/10"
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? (
            <EyeIcon className="size-4" />
          ) : (
            <EyeSlashIcon className="size-4" />
          )}
        </button>
      </div>

      {props.error && <Small className="text-red-500">{props.error}</Small>}
    </Label>
  )
}
