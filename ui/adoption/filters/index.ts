export type FilterTypes = Filter["type"]

export type Filter =
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
// | {
//     type: "conditional"
//     name: string
//     field: string
//     mapper: Record<string, string[]>
//   }

export const filters: Array<Filter> = [
  {
    name: "Idade",
    type: "range",
    min: 1,
    max: 20,
  },
  {
    type: "checkbox",
    name: "Espécie",
    values: [
      {
        name: "Cachorro",
        value: "species-dog",
      },
      {
        name: "Gato",
        value: "gato",
      },
      {
        name: "Peixe",
        value: "fish",
      },
      {
        name: "Outros",
        value: "outros",
      },
    ],
  },
  /* 
    Filtro de raça depende dos tipos dos animais que foram selecionados
    Como o filtro de animais é um checkbox podem haver vários valores
    E apenas os valores que condizem com aquele tipo de animal devem poder ser selecionados
    É necessário fazer pelo front com valores pré-selecionados para ter a maior performance
  */
  // {
  //   name: "Raça",
  //   type: "conditional",
  //   field: "Espécie",
  //   mapper: {
  //     dog: ["golden", "labrador", "salsicha"],
  //     gato: ["siamês", "pretinho", "frajola"],
  //     fish: ["dourado", "baleia"],
  //   },
  // },
  {
    type: "checkbox",
    name: "Porte",
    values: [
      {
        name: "Pequeno",
        value: "small",
      },
      {
        name: "Grande",
        value: "big",
      },
    ],
  },
  {
    name: "Sexo",
    type: "checkbox",
    values: [
      { name: "Masculino", value: "male" },
      { name: "Feminino", value: "female" },
    ],
  },
  // pelagem (só pode existir se tiver pelo)
  // necessidades especiais
  // nível de energia
  // nível de independência
  // ambiente
]
