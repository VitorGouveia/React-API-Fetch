import { supabase } from "@/supabase"

import { Search } from "@/ui/adoption/search"

import { petsRepository } from "@/lib/pets/repository"

export default async function Page() {
  const client = supabase()

  const pets = await petsRepository(client).list()

  return (
    <main className="flex flex-col gap-2">
      <section>
        <Search pets={pets} />
      </section>
    </main>
  )
}
