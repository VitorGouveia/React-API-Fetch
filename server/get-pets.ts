type Pet = {
  id: string
  name: string
  description: string
  properties: Array<string>
}

const pets: Array<Pet> = [
  {
    id: "1",
    name: "Hulk",
    description:
      "O hulk é um cachorro super divertido e brincalhão, adora crianças, não morde.",
    properties: ["Masculino", "2 anos", "Cachorro"],
  },
  {
    id: "2",
    name: "Hulk",
    description:
      "O hulk é um cachorro super divertido e brincalhão, adora crianças, não morde.",
    properties: ["Masculino", "2 anos", "Cachorro"],
  },
  {
    id: "3",
    name: "Hulk",
    description:
      "O hulk é um cachorro super divertido e brincalhão, adora crianças, não morde.",
    properties: ["Masculino", "2 anos", "Cachorro"],
  },
  {
    id: "7",
    name: "Hulk",
    description:
      "O hulk é um cachorro super divertido e brincalhão, adora crianças, não morde.",
    properties: ["Masculino", "2 anos", "Cachorro"],
  },
  {
    id: "4",
    name: "Hulk",
    description:
      "O hulk é um cachorro super divertido e brincalhão, adora crianças, não morde.",
    properties: ["Masculino", "2 anos", "Cachorro"],
  },
  {
    id: "5",
    name: "Hulk",
    description:
      "O hulk é um cachorro super divertido e brincalhão, adora crianças, não morde.",
    properties: ["Masculino", "2 anos", "Cachorro"],
  },
  {
    id: "6",
    name: "Hulk",
    description:
      "O hulk é um cachorro super divertido e brincalhão, adora crianças, não morde.",
    properties: ["Masculino", "2 anos", "Cachorro"],
  },
]

export const getPet = (id: string) => {
  return pets.find((pet) => pet.id === id) || null
}

export const getPets = () => {
  return pets
}
