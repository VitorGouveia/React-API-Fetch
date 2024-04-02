"use client"
import { cities, states } from "@/brazilian-states-cities"
import { Checkbox } from "@/lib/Checkbox"
import { useModal } from "@/lib/Modal"
import { Select } from "@/lib/Select"
import { use, useActionState, useEffect, useState } from "react"

type Pet = {
  name: string
  properties: Array<string>
}

const pets: Array<Pet> = [
  { name: "Hulk", properties: ["Masculino", "2 anos", "Cachorro"] },
  { name: "Hulk", properties: ["Masculino", "2 anos", "Cachorro"] },
  { name: "Hulk", properties: ["Masculino", "2 anos", "Cachorro"] },
  { name: "Hulk", properties: ["Masculino", "2 anos", "Cachorro"] },
  { name: "Hulk", properties: ["Masculino", "2 anos", "Cachorro"] },
  { name: "Hulk", properties: ["Masculino", "2 anos", "Cachorro"] },
  { name: "Hulk", properties: ["Masculino", "2 anos", "Cachorro"] },
]

async function getStates<T>() {
  return (await fetch("https://brasilapi.com.br/api/ibge/uf/v1")).json() as T
}

async function getCities<T>(id: string) {
  return (
    await fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${id}`)
  ).json() as T
}

// const Sidebar = () => {
//   const states = await getStates()
//   const [state, setState] = useState("")
//   const [city, setCity] = useState("")

//   const filteredCities = cities.find((city) => city.sigla === state)?.cidades

//   return (
//     <aside className="flex flex-col gap-8 pr-8">
//       <section className="flex flex-col gap-2">
//         <h3>Localização</h3>

//         <div className="flex items-center gap-2">
//           <Select options={states} selected={state} onSelect={setState} />
//           <Select
//             selected={city}
//             onSelect={setCity}
//             options={filteredCities?.map((a) => ({ value: a, name: a })) ?? []}
//           />
//         </div>
//       </section>
//     </aside>
//   )
// }

// export default function Home() {
//   const [states, setStates] = useState<Array<{ sigla: string }>>([])
//   const [cities, setCities] = useState<Array<{ nome: string }>>([])

//   useEffect(() => {
//     async function main() {
//       console.log("running")
//       setStates(await getStates<Array<{ sigla: string }>>())
//     }

//     main()
//   }, [])

//   return (
//     <main className="flex-col gap-8 p-20">
//       {/* <Sidebar /> */}
//       <section className="flex gap-2">
//         {states.map((state) => (
//           <button
//             key={state.sigla}
//             onClick={async () => {
//               const cities = await getCities<Array<{ nome: string }>>(
//                 state.sigla
//               )
//               console.log(`Cities for ${state.sigla}`, cities)
//               setCities(cities)
//             }}
//           >
//             {state.sigla}
//           </button>
//         ))}
//       </section>

//       <p>cities</p>

//       <section className="flex gap-2">
//         {cities.map((city) => (
//           <p key={city.nome}>{city.nome}</p>
//         ))}
//       </section>
//     </main>
//   )
// }

export default function Home() {
  const IdealPetModal = useModal()

  return (
    <main className="flex gap-8 p-20">
      <aside className="border-theme-primary-light flex flex-col gap-8 border-r pr-8">
        <section className="flex flex-col gap-2">
          <h3>Localização</h3>

          <div className="flex w-full gap-2">
            <Select
              selected={"PE"}
              onSelect={() => {}}
              options={[{ name: "PE", value: "PE" }]}
            />
            <Select
              selected={"Recife"}
              onSelect={() => {}}
              options={[{ name: "Recife", value: "Recife" }]}
            />
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h3>Espécie</h3>

          <Checkbox>Cachorro</Checkbox>
          <Checkbox>Peixe</Checkbox>
          <Checkbox>Gato</Checkbox>
        </section>

        <section className="flex flex-col gap-2">
          <h3>Porte</h3>

          <Checkbox>Pequeno</Checkbox>
          <Checkbox>Grande</Checkbox>
        </section>

        <section className="flex flex-col gap-2">
          <h3>Sexo</h3>

          <Checkbox>Masculino</Checkbox>
          <Checkbox>Feminino</Checkbox>
        </section>

        <section className="flex flex-col gap-2">
          <h3>Independência</h3>

          <Checkbox>Muita</Checkbox>
          <Checkbox>Pouca</Checkbox>
        </section>

        <button className="bg-theme-secondary-base">Pesquisar</button>
      </aside>

      <div className="flex w-full flex-col gap-8">
        <button
          onClick={() => IdealPetModal.open()}
          className="bg-theme-accent-base hover:bg-theme-accent-light flex w-max items-center gap-2 transition"
        >
          Encontrar Pet Ideal
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" />
          </svg>
        </button>

        <IdealPetModal.Modal
          title="Encontre o Pet Ideal"
          description="Responda algumas perguntas rápidas e encontre o pet ideal baseado nas suas respostas."
        >
          <div className="flex items-center gap-2">
            <button className="text-theme-title bg-transparent">Fechar</button>
            <button className="bg-theme-accent-base">Beleza! Bora Lá</button>
          </div>
        </IdealPetModal.Modal>

        <ul className="grid w-full grid-cols-4 gap-6">
          {pets.map((pet) => (
            <li
              key={pet.name}
              className="border-theme-primary-light flex w-full flex-col overflow-hidden rounded-md border"
            >
              <div className="h-[300px] w-full bg-gray-500"></div>
              <div className="flex flex-col gap-1 p-3">
                <h3>{pet.name}</h3>

                <ul className="flex items-center gap-1">
                  {pet.properties.map((prop) => (
                    <li
                      key={prop}
                      className="border-theme-primary-light rounded-full border px-3 py-1"
                    >
                      {prop}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
