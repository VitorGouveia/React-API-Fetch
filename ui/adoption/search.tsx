import { WandSparklesIcon } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

import { Pet, Species } from "@/lib/pets/pet"

import { Badge } from "@/ui/badge"
import { Button } from "@/ui/button"

import { AutomaticSearchModal } from "./automatic-search-modal"

export async function Search({ pets }: { pets: Pet[] }) {
  return (
    <div className="flex">
      <div className="flex w-full flex-col gap-8 p-8">
        <p className="text-tertiary-foreground">
          Encontramos <strong>324 amigos</strong> na sua cidade.
        </p>

        <ul className="grid w-full grid-cols-4 gap-8">
          {pets.map((pet) => (
            <li key={pet.id} className="w-full">
              <PetCard {...pet} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function AutomaticSearch() {
  async function automaticSearch() {
    "use server"
    redirect("/?modal=automatic-search&open=true")
  }

  return (
    <form action={automaticSearch} className="w-full">
      <Button type="submit" variant="tertiary" className="w-full gap-2">
        Encontrar Pet Ideal
        <WandSparklesIcon size={16} />
      </Button>

      <AutomaticSearchModal />
    </form>
  )
}
