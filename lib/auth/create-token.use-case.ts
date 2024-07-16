import jwt from "jsonwebtoken"

import { env } from "@/lib/env"

export function createToken<Payload extends Record<string, any>>(
  payload: Payload,
) {
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "24h",
  })

  return token
}
