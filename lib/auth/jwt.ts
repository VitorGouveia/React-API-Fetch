import consola from "consola"
import jwt from "jsonwebtoken"

import { env } from "@/lib/env"

type Payload = {
  user: {
    id: string
  }
}

export function createToken(payload: Payload): string {
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "24h",
  })

  return token
}

export function readToken(token: string) {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as Payload

    return payload
  } catch (error) {
    consola.error(
      `Ocorreu um erro ao ler o token jwt. Mensagem: ${(error as Error).message}`,
    )

    throw new Error(
      `Ocorreu um erro ao ler o token jwt. Mensagem: ${(error as Error).message}`,
      {
        cause: error,
      },
    )
  }
}
