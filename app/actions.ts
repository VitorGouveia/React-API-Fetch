"use server"

import { redirect } from "next/navigation"

import { TypedSearchParams } from "./components"

export const openModal = (
  modalName: string,
  searchParams: TypedSearchParams,
) => {
  const params = new URLSearchParams(searchParams as unknown as URLSearchParams)

  params.set("modal", modalName)

  return redirect(`/?${params.toString()}`)
}
