"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { ReadonlyURLSearchParams } from "next/navigation"
import { z } from "zod"

import { Email } from "@/lib/value-objects/email"
import { Phone } from "@/lib/value-objects/phone"

import { openModal } from "@/app/actions"
import { TypedSearchParams } from "@/app/components"
import { searchParamsToObject } from "@/lib/adoption/advanced-filters/search-params"
import { searchIntentionsRepository } from "@/lib/adoption/search-intentions/repository"
import { SearchIntention } from "@/lib/adoption/search-intentions/search-intention"
import { createToken } from "@/lib/auth/jwt"
import { usersRepository } from "@/lib/users/repository"
import { User } from "@/lib/users/user"
import { supabase } from "@/supabase"
import { searchFiltersSchema } from "./schema"

function mapError(errors: Record<string, string[]>) {
  return Object.entries(errors).reduce(
    (acc, [key, values]) => ({
      ...acc,
      [key]: values[0],
    }),
    {},
  )
}

export type SaveSearchState =
  | {
      status: "success"
      errors: {
        name?: string
        email?: string
        phone?: string
        general?: string
      }
    }
  | {
      status: "error"
      errors: {
        name?: string
        email?: string
        phone?: string
        general?: string
      }
    }

export async function saveSearch(
  config: { searchParams: ReadonlyURLSearchParams },
  _: SaveSearchState,
  formData: FormData,
): Promise<SaveSearchState> {
  const schema = z.object({
    name: z
      .string()
      .min(5, "Seu nome deve conter no mínimo 5 caracteres")
      .max(50, "Seu nome pode conter no máximo 50 caracteres"),
    email: z
      .string()
      .email("E-mail inválido")
      .min(5, "O e-mail deve conter no mínimo 5 caracteres")
      .max(50, "O e-mail deve conter no máximo 50 caracteres")
      .refine((email) => {
        try {
          return Email.create(email)
        } catch (error) {
          return false
        }
      }, "E-mail inválido"),
    phone: z
      .string()
      .min(10, "O número de WhatsApp deve conter 11 caracteres")
      .max(15, "O número de WhatsApp deve conter no máximo 15 caracteres")
      .refine((phone) => {
        try {
          return Phone.create(phone)
        } catch (error) {
          return false
        }
      }),
  })

  const form = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    description: formData.get("description"),
  })

  if (form.error) {
    return {
      status: "error",
      errors: mapError(form.error.flatten().fieldErrors),
    }
  }

  const user = new User({
    name: form.data.name,
    email: form.data.email,
    role: "save-search",
  })

  const access_token = createToken({
    user: {
      id: user.id.toString(),
    },
  })

  const cookieStore = cookies()
  cookieStore.set("@seu-pet:access-token", access_token, {
    httpOnly: true,
  })
  revalidatePath("/", "layout")

  const params = searchParamsToObject(config.searchParams)

  const filters = searchFiltersSchema.safeParse(params)

  if (filters.error) {
    return {
      status: "error",
      errors: {
        general: "Ocorreu um erro ao realizar a busca. Código 0001",
      },
    }
  }

  const searchIntention = new SearchIntention({
    ...filters.data,
    userId: user.id,
  })

  // persist domain events
  const client = supabase()
  try {
    await usersRepository(client).save(user)
    await searchIntentionsRepository(client).save(searchIntention)
  } catch (error) {
    return {
      status: "error",
      errors: {
        general: "Ocorreu um erro ao salvar a pesquisa. Código 0002",
      },
    }
  }

  return openModal(
    "search-saved",
    new URLSearchParams(config.searchParams) as unknown as TypedSearchParams,
  )
}
