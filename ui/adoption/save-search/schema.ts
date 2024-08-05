import { z } from "zod"

export const searchFiltersSchema = z
  .object({
    age: z.tuple([z.number(), z.number()]),
    species: z.array(z.enum(["dog", "cat", "fish", "bird", "other"])),
    breed: z.array(z.string()),
    size: z.array(z.enum(["small", "medium", "big"])),
    gender: z.array(z.enum(["male", "female"])),
    coat: z.array(z.enum(["smooth", "curled", "short", "long"])),
    energy: z.array(z.enum(["low", "high"])),
    independence: z.array(z.enum(["low", "high"])),
    ambient: z.array(z.enum(["small", "big"])),
  })
  .partial()
