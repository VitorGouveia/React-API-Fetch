import { z } from "zod"

export const env = z
  .object({
    JWT_SECRET: z
      .string()
      .min(
        15,
        "O private-key jwt precisa ter no mínimo 15 caracteres por questões de segurança.",
      ),
    SUPABASE_URL: z.string().url(),
    SUPABASE_ANON_KEY: z.string(),
  })
  .parse(process.env)
