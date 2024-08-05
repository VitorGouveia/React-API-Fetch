import { supabase } from "@/supabase"
import { cva } from "class-variance-authority"
import consola from "consola"
import { BookmarkIcon, Wand2Icon } from "lucide-react"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

import { Badge } from "@/ui/badge"
import { Button } from "@/ui/button"
import { Modal } from "@/ui/components/modal"

import { SearchIntention } from "@/lib/adoption/search-intentions/search-intention"
import { readToken } from "@/lib/auth/jwt"
import { Pet, Species } from "@/lib/pets/pet"

import { searchParamsToObject } from "@/lib/adoption/advanced-filters/search-params"
import { searchIntentionsRepository } from "@/lib/adoption/search-intentions/repository"
import { AutomaticSearchModal } from "@/ui/adoption/automatic-search"
import { SaveSearchForm } from "@/ui/adoption/save-search/save-search-form"
import { searchFiltersSchema } from "@/ui/adoption/save-search/schema"
import { AdvancedFilters } from "@/ui/components/adoption/advanced-filters"
import { openModal } from "./actions"

const sidebarModule = cva(
  "sticky mx-auto w-[calc(100%-16px)] rounded-lg bg-[hsla(0,100%,100%,20%)] p-4 flex gap-2 backdrop-blur-md",
  {
    variants: {
      variant: {
        top: "top-2 mt-2",
        bottom: "bottom-2",
      },
    },
  },
)

export type TypedSearchParams = {
  modal?: string
  [key: string]: string | string[] | undefined
}

async function searchAction(formData: FormData) {
  "use server"

  const map = new Map<string, string>()

  for (const [key, value] of formData.entries()) {
    if (key.includes("$ACTION")) {
      continue
    }

    if (value !== "on") {
      continue
    }

    const [prefix, property] = key.split("-")
    const record = map.get(prefix)

    if (!record) {
      map.set(prefix, property)
    } else {
      map.set(prefix, `${record},${property}`)
    }
  }

  const params = Object.fromEntries(map.entries())

  const searchParams = new URLSearchParams(params)

  const age = {
    min: formData.get("age-min"),
    max: formData.get("age-max"),
  }

  searchParams.set("age", `${age.min}-${age.max}`)

  const location = {
    uf: formData.get("location-uf"),
    state: formData.get("location-state"),
  }

  if (location.uf) {
    searchParams.set("location-uf", location.uf.toString())
  }

  if (location.state) {
    searchParams.set("location-state", location.state.toString())
  }

  return redirect(`/?${searchParams.toString()}`)
}

export function Search({
  pets,
  searchParams,
}: {
  searchParams: TypedSearchParams
  pets: Array<Pet>
}) {
  return (
    <section className="flex">
      <Sidebar>
        <header className={sidebarModule({ variant: "top" })}>
          <AutomaticSearch
            modalName="automatic-search"
            searchParams={searchParams}
          />
        </header>

        <AdvancedFilters pets={pets} />

        <footer className={sidebarModule({ variant: "bottom" })}>
          <SearchButton />
          <Save modalName="save-search" searchParams={searchParams} />
        </footer>
      </Sidebar>

      <div className="flex w-full flex-col gap-8 p-8">
        <p className="text-tertiary-foreground">
          Encontramos <strong>324 amigos</strong> na sua cidade.
        </p>

        <ul className="grid w-full grid-cols-3 gap-8">
          {pets.map((pet) => (
            <li key={pet.id} className="w-full">
              <PetCard {...pet} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Sidebar({ children }: { children: ReactNode }) {
  return (
    <aside className="sticky top-0 flex h-screen w-[350px] shrink-0 flex-col overflow-y-auto bg-primary">
      <form className="relative" action={searchAction}>
        {children}
      </form>
    </aside>
  )
}

function AutomaticSearch({
  modalName,
  searchParams,
}: {
  modalName: string
  searchParams: TypedSearchParams
}) {
  async function action() {
    "use server"
    return openModal(modalName, searchParams)
  }

  return (
    <>
      {/* <form action={action} className="w-full"> */}
      <Button formAction={action} variant="tertiary" className="w-full gap-2">
        Encontrar Pet Ideal
        <Wand2Icon size={16} />
      </Button>
      {/* </form> */}

      <Modal.Root opened={searchParams?.modal === modalName} name={modalName}>
        <Modal.Header
          title="Encontrar o Pet Ideal"
          description="Encontre o seu Pet ideal com algumas perguntas simples."
        />

        <AutomaticSearchModal />
      </Modal.Root>
    </>
  )
}

function SearchButton() {
  return (
    <Button
      variant="ghost"
      type="submit"
      className="w-full gap-2 bg-[hsla(0,100%,100%,90%)] text-black hover:bg-[hsla(0,100%,100%,100%)]"
    >
      Pesquisar
    </Button>
  )
}

async function Save({
  modalName,
  searchParams,
}: {
  modalName: string
  searchParams: TypedSearchParams
}) {
  const cookiesStore = cookies()
  const access_token = cookiesStore.get("@seu-pet:access-token") ?? null

  async function action() {
    "use server"
    if (access_token) {
      const params = searchParamsToObject(searchParams)

      const filters = searchFiltersSchema.safeParse(params)

      if (filters.error) {
        // how to return the error?
        return
      }

      const client = supabase()
      const { user } = readToken(access_token?.value)

      const searchIntention = new SearchIntention({
        ...filters.data,
        userId: user.id,
      })

      try {
        await searchIntentionsRepository(client).save(searchIntention)
      } catch (error) {
        // how to return the error?
        consola.error("Ocorreu um erro ao salvar a pesquisa.", error)
      }
    }

    return openModal(modalName, searchParams)
  }

  return (
    <>
      {/* <form action={action} className="w-max"> */}
      <Button formAction={action} variant="ghost" className="w-max gap-2">
        <strong className="sr-only">Salvar Pesquisa</strong>
        <BookmarkIcon size={16} fill="#fff" />
      </Button>
      {/* </form> */}

      {access_token ? (
        <Modal.Root opened={searchParams?.modal === modalName} name={modalName}>
          <Modal.Header
            title="Sua Pesquisa Foi Salva"
            description="Você será receberá uma notificação na plataforma e no seu e-mail
        cadastrado uma vez que um pet com essas propriedades surgir."
          />

          <Modal.Close />
        </Modal.Root>
      ) : (
        <Modal.Root opened={searchParams?.modal === modalName} name={modalName}>
          <Modal.Header
            title="Sua Pesquisa Foi Salva"
            description="Sua pesquisa foi salva, só precisamos saber como entrar em contato com você quando um pet com essas propriedades surgir"
          />

          <SaveSearchForm />

          <Modal.Footer>
            <Button form={"save-search-logged-out"} type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Modal.Root>
      )}
    </>
  )
}

function PetCard({ id, name, gender, age, species }: Pet) {
  const speciesNames: Record<Species, string> = {
    dog: "Cachorro",

    cat: "Gato",
    fish: "Peixe",
    bird: "Pássaro",
    other: "Outros",
  }

  return (
    <Link className="h-[350px] w-full" href={`/pets/${id}`}>
      <div className="h-[264px] rounded-t-lg bg-zinc-200" />

      <footer className="flex flex-col gap-1 rounded-b-lg border border-t-0 p-3">
        <span className="text-xl font-semibold text-black">{name}</span>

        <div className="flex gap-2">
          <Badge variant="outline">
            {gender === "male" ? "Masculino" : "Feminino"}
          </Badge>
          <Badge variant="outline">
            {age} {age > 1 ? "anos" : "ano"}
          </Badge>
          <Badge variant="outline">{speciesNames[species]}</Badge>
        </div>
      </footer>
    </Link>
  )
}
