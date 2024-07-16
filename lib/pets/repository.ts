import { SupabaseClient } from "@supabase/supabase-js"
import consola from "consola"
import { TypeID } from "typeid-js"

import { Pet, SupabasePet } from "./pet"

type PetRepository = {
  list(): Promise<Pet[]>
  retrieve(id: string): Promise<Pet | null>
}

export function petsRepository(supabase: SupabaseClient): PetRepository {
  return {
    async retrieve(id) {
      const { data, error } = await supabase
        .from("pets")
        .select()
        .eq("id", id)
        .maybeSingle<SupabasePet>()

      if (error) {
        const failure = new Error(
          `Ocorreu um erro ao buscar os pet. id: ${id}`,
          {
            cause: error,
          },
        )
        consola.error(failure)
        throw failure
      }

      if (!data) {
        return null
      }

      try {
        const parsedId = TypeID.fromString(data.id, "pet")
        return new Pet({
          ...data,
          id: parsedId,
        })
      } catch (error) {
        consola.error(`Pet possui prefixo de id incorreto. id: '${data.id}'`)
        return null
      }
    },
    async list() {
      const { data, error } = await supabase
        .from("pets")
        .select()
        .order("id", { ascending: false })
        .returns<SupabasePet[]>()

      if (error) {
        const failure = new Error("Ocorreu um erro ao buscar os pets.", {
          cause: error,
        })
        consola.error(failure)
        throw failure
      }

      return data.flatMap((pet) => {
        try {
          const id = TypeID.fromString(pet.id, "pet")
          return new Pet({
            ...pet,
            id,
          })
        } catch (error) {
          consola.error(`Pet possui prefixo de id incorreto. id: '${pet.id}'`)
          return []
        }
      })
    },
  }
}
