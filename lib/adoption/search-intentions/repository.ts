import { SupabaseClient } from "@supabase/supabase-js"
import consola from "consola"

import { SearchIntention } from "./search-intention"

type SearchIntentionsRepository = {
  save(searchIntention: SearchIntention): Promise<void>
}

export function searchIntentionsRepository(supabase: SupabaseClient): SearchIntentionsRepository {
  return {
    async save(searchIntention) {
      const { error } = await supabase
        .from("search-intentions")
        .upsert({
          ...searchIntention,
          id: searchIntention.id.toString(),
          userId: searchIntention.userId.toString(),
        })

      if (error) {
        const failure = new Error(
          `Ocorreu um erro ao salvar uma pesquisa.`,
          {
            cause: error,
          },
        )
        consola.error(failure)
        throw failure
      }
    }
  }
}
