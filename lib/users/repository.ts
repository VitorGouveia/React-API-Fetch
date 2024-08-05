import { SupabaseClient } from "@supabase/supabase-js"
import consola from "consola"

import { User } from "./user"

type UsersRepository = {
  retrieve(id: string): Promise<User | null>
  save(user: User): Promise<void>
}

export function usersRepository(supabase: SupabaseClient): UsersRepository {
  return {
    async retrieve(id) {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", id)
        .maybeSingle<User>()

      if (error) {
        const failure = new Error(
          `Ocorreu um erro ao buscar o usuário. Id: ${id}`,
          {
            cause: error,
          },
        )
        consola.error(failure)
        throw failure
      }

      return data
    },
    async save(user) {
      const { error } = await supabase.from("users").upsert(user)

      if (error) {
        const failure = new Error(
          `Ocorreu um erro ao salvar o usuário. Id: ${user.id}`,
          {
            cause: error,
          },
        )
        consola.error(failure)
        throw failure
      }
    },
  }
}
