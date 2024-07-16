import { BookmarkIcon, WandSparklesIcon } from "lucide-react"
import Link from "next/link"

import { Pet, Species } from "@/lib/pets/pet"

import { Badge } from "@/ui/badge"
import { Button } from "@/ui/button"
import { Checkbox } from "@/ui/checkbox"
import { Label } from "@/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select"

import { redirect } from "next/navigation"
import { AutomaticSearchModal } from "./automatic-search-modal"
import { states } from "./brazilian-states-cities"
import { filters, type Filter } from "./filters"
import { Range } from "./filters/range"

export async function Search({ pets }: { pets: Pet[] }) {
  const breeds = pets.reduce((list, pet) => {
    if (!list.includes(pet.breed)) {
      list.push(pet.breed)
    }
    return list
  }, [] as string[])

  console.log(`breeds are: ${breeds}`)

  return (
    <div className="flex">
      <aside className="sticky top-0 flex h-screen w-[274px] flex-col gap-8 bg-primary p-8">
        <AutomaticSearch />
        <AdvancedFilters />
        <footer className="flex w-full gap-2">
          <Button
            variant="ghost"
            className="w-full gap-2 bg-[hsla(0,100%,100%,90%)] text-black hover:bg-[hsla(0,100%,100%,100%)]"
          >
            Pesquisar
          </Button>
          <Save />
        </footer>
      </aside>

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

function Save() {
  // open modal that has checkbox to accept to be notified
  // on e-mail when 'donation-registration' appears
  return (
    <Button
      variant="ghost"
      className="w-max gap-2 bg-[hsla(0,100%,100%,15%)] text-white hover:bg-[hsla(0,100%,100%,25%)] hover:text-white"
    >
      <strong className="sr-only">Salvar Pesquisa</strong>
      <BookmarkIcon size={16} fill="#fff" />
    </Button>
  )
}

async function AdvancedFilters() {
  return (
    <ul className="flex w-full max-w-[210px] flex-col gap-6">
      <li className="flex w-full flex-col gap-1">
        <Label className="text-xl font-semibold text-white">Localização</Label>

        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[80px] shrink-0">
              <SelectValue placeholder="SP" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.value} value={state.value.toLowerCase()}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="select-trigger w-full">
              <SelectValue placeholder="Piricicatubadoleste" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"campos-do-jordao"}>
                Campos do Jordão
              </SelectItem>
              <SelectItem value={"paulinia"}>Paulínia</SelectItem>
              <SelectItem value={"sao-paulo"}>São Paulo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </li>

      {filters.map((filter) => (
        <li key={filter.name}>
          <Filter {...filter} />
        </li>
      ))}
    </ul>
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
      <div className="h-[264px] rounded-t bg-zinc-200" />

      <footer className="flex flex-col gap-1 rounded-b border border-t-0 p-3">
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

// actual wizard shit
type RecordList = {
  [K in Filter["type"]]: (props: {
    filter: Extract<Filter, { type: K }>
  }) => JSX.Element
}

const filterComponents: RecordList = {
  checkbox: ({ filter }) => {
    return (
      <>
        <Label className="text-xl font-semibold text-white">
          {filter.name}
        </Label>

        {filter.values?.map((value) => {
          const id = `${filter.name}-${value.value}-checkbox`
          return (
            <Label
              htmlFor={id}
              key={value.value}
              className="flex items-center gap-1 text-white"
            >
              <Checkbox id={id} name={value.value} />
              {value.name}
            </Label>
          )
        })}
      </>
    )
  },
  // conditional: (filter) => {
  //   return (
  //     <>
  //       <Conditional filter={filter} />
  //     </>
  //   )
  // },
  range: ({ filter }) => {
    return (
      <>
        <Label className="text-xl font-semibold text-white">
          {filter.name}
        </Label>

        <Range />
      </>
    )
  },
}

function Filter(filter: Filter) {
  const Component = filterComponents[filter.type]

  return (
    <div className="flex flex-col gap-1">
      {/* @ts-ignore */}
      <Component filter={filter} />
    </div>
  )
}
