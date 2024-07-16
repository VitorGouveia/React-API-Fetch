"use server"
import { TypeID } from "typeid-js"
import { z } from "zod"

import { User } from "@/lib/users/user"
import { Email } from "@/lib/value-objects/email"
import { Phone } from "@/lib/value-objects/phone"

import { adoptPet } from "@/lib/adoption/adoption-intentions/adopt-pet.use-case"
import { createToken } from "@/lib/auth/create-token.use-case"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

function mapError(errors: Record<string, string[]>) {
  return Object.entries(errors).reduce(
    (acc, [key, values]) => ({
      ...acc,
      [key]: values[0],
    }),
    {},
  )
}

export type AdoptPetState =
  | {
      status: "success"
      errors: {
        name?: string
        email?: string
        phone?: string
        description?: string
      }
    }
  | {
      status: "error"
      errors: {
        name?: string
        email?: string
        phone?: string
        description?: string
      }
    }

export async function adoptPetAction(
  { petId }: { petId: string },
  _: AdoptPetState,
  formData: FormData,
): Promise<AdoptPetState> {
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
    description: z
      .string()
      .min(10, "A descrição deve conter no mínimo 10 caracteres")
      .max(200, "A descrição deve conter no máximo 200 caracteres"),
  })

  const form = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    description: formData.get("description"),
  })

  if (form.error) {
    console.log()
    return {
      status: "error",
      errors: mapError(form.error.flatten().fieldErrors),
    }
  }

  const user = new User({
    name: form.data.name,
    email: form.data.email,
    role: "basic",
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

  await adoptPet({
    description: form.data.description,
    pet: {
      id: TypeID.fromString(petId, "pet"),
    },
    user: {
      id: user.id,
    },
  })

  return {
    status: "success",
    errors: {},
  }
}
