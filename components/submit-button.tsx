"use client"

import { ReactNode } from "react"
import { useFormStatus } from "react-dom"

import { Button } from "./ui/button"

export const SubmitButton = (props: { children: ReactNode }) => {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className="bg-primary uppercase"
      aria-disabled={pending}
      disabled={pending}
    >
      {props.children}
    </Button>
  )
}
