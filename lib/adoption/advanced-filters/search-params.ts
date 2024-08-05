import { TypedSearchParams } from "@/app/components"
import { ReadonlyURLSearchParams } from "next/navigation"

export function searchParamsToObject(params: ReadonlyURLSearchParams | TypedSearchParams) {
  const searchParams = new URLSearchParams(params as any)

  const map = new Map<string, (string | number)[]>()

  for (const [key, value] of searchParams.entries()) {
    if (key === "modal") {
      continue
    }

    if (key === "age") {
      // handle
      const [min, max] = value.split("-")
      map.set(key, [Number(min), Number(max)])
      continue
    }

    const values = value.split(",")
    map.set(key, values)
  }

  return Object.fromEntries(map.entries())
}
