import {
  ambientNames,
  coatNames,
  energyNames,
  genderNames,
  independenceNames,
  Pet,
  sizesNames,
  speciesNames,
} from "@/lib/pets/pet"

import { Checkbox } from "@/ui/checkbox"
import { Label } from "@/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select"

import { states } from "../../../adoption/brazilian-states-cities"
import { Range } from "./range"

type Filter =
  | {
      name: string
      type: "checkbox"
      values: Array<{ name: string; value: string }>
    }
  | {
      type: "range"
      name: string
      min: number
      max: number
    }

export async function AdvancedFilters({ pets }: { pets: Array<Pet> }) {
  const species = pets.reduce(
    (list, pet) => {
      if (!list.find((item) => item.value === `species-${pet.species}`)) {
        list.push({
          name: speciesNames[pet.species],
          value: `species-${pet.species}`,
        })
      }

      return list
    },
    [] as Array<{ name: string; value: string }>,
  )

  const breeds = pets.reduce(
    (list, pet) => {
      if (!list.find((item) => item.name === pet.breed)) {
        list.push({
          name: pet.breed,
          value: `breed-${pet.breed}`,
        })
      }
      return list
    },
    [] as Array<{ name: string; value: string }>,
  )

  return (
    <ul className="flex w-full flex-col gap-6 p-6">
      <li className="flex w-full flex-col gap-1">
        <Label className="text-xl font-semibold text-white">Localização</Label>

        <div className="flex items-center gap-2">
          <Select name="location-uf">
            <SelectTrigger className="w-[80px] shrink-0">
              <SelectValue placeholder="UF" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.value} value={state.value.toLowerCase()}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select name="location-state">
            <SelectTrigger className="select-trigger w-full">
              <SelectValue placeholder="Estado" />
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

      <li className="flex flex-col gap-1">
        <Filter type="range" name="Idade" min={1} max={20} />
      </li>

      <li className="flex flex-col gap-1">
        <Filter type="checkbox" name="Espécie" values={species} />
      </li>

      <li className="flex flex-col gap-1">
        <Filter type="checkbox" name="Raça" values={breeds} />
      </li>

      <li className="flex flex-col gap-1">
        <Filter
          type="checkbox"
          name="Tamanho"
          values={[
            {
              name: sizesNames["small"],
              value: "size-small",
            },
            {
              name: sizesNames["medium"],
              value: "size-medium",
            },
            {
              name: sizesNames["big"],
              value: "size-big",
            },
          ]}
        />
      </li>

      <li className="flex flex-col gap-1">
        <Filter
          type="checkbox"
          name="Sexo"
          values={[
            {
              name: genderNames["male"],
              value: "gender-male",
            },
            {
              name: genderNames["female"],
              value: "gender-female",
            },
          ]}
        />
      </li>

      <li className="flex flex-col gap-1">
        <Filter
          type="checkbox"
          name="Pelagem"
          values={[
            {
              name: coatNames["short"],
              value: "coat-short",
            },
            {
              name: coatNames["long"],
              value: "coat-long",
            },
            {
              name: coatNames["smooth"],
              value: "coat-smooth",
            },
            {
              name: coatNames["curled"],
              value: "coat-curled",
            },
          ]}
        />
      </li>

      <li className="flex flex-col gap-1">
        <Filter
          type="checkbox"
          name="Nível de Energia"
          values={[
            {
              name: energyNames["low"],
              value: "energy-low",
            },
            {
              name: energyNames["high"],
              value: "energy-high",
            },
          ]}
        />
      </li>

      <li className="flex flex-col gap-1">
        <Filter
          type="checkbox"
          name="Nível de Independência"
          values={[
            {
              name: independenceNames["low"],
              value: "independence-low",
            },
            {
              name: independenceNames["high"],
              value: "independence-high",
            },
          ]}
        />
      </li>

      <li className="flex flex-col gap-1">
        <Filter
          type="checkbox"
          name="Ambiente"
          values={[
            {
              name: ambientNames["small"],
              value: "ambient-small",
            },
            {
              name: ambientNames["big"],
              value: "ambient-big",
            },
          ]}
        />
      </li>
    </ul>
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

  // @ts-ignore
  return <Component filter={filter} />
}
