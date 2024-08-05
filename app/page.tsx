import { supabase } from "@/supabase"

import { Search, TypedSearchParams } from "./components"

import { petsRepository } from "@/lib/pets/repository"

export default async function Page({
  searchParams,
}: {
  searchParams: TypedSearchParams
}) {
  const client = supabase()

  const pets = await petsRepository(client).list()
  // add search here

  return (
    <main className="flex flex-col gap-2">
      <Search pets={pets} searchParams={searchParams} />
    </main>
  )
}
