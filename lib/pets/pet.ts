import { TypeID, typeid } from "typeid-js"

export type Species = "dog" | "cat" | "fish" | "bird" | "other"
export type Size = "small" | "medium" | "big"
export type Gender = "male" | "female"
export type Coat = "smooth" | "curled" | "short" | "long"
export type Energy = "low" | "high"
export type Independence = "low" | "high"
export type Ambient = "small" | "big"

export const speciesNames: Record<Species, string> = {
  dog: "Cachorro",
  cat: "Gato",
  fish: "Peixe",
  bird: "Pássaro",
  other: "Outros",
}

export const sizesNames: Record<Size, string> = {
  small: "Pequenininho",
  medium: "Médio",
  big: "Grande",
}

export const genderNames: Record<Gender, string> = {
  male: "Masculino",
  female: "Feminino",
}

export const coatNames: Record<Coat, string> = {
  short: "Curto",
  smooth: "Liso",
  curled: "Enrolado",
  long: "Longo",
}

export const energyNames: Record<Energy, string> = {
  low: "Baixo",
  high: "Alto",
}

export const independenceNames: Record<Independence, string> = {
  low: "Baixo",
  high: "Alto",
}

export const ambientNames: Record<Ambient, string> = {
  small: "Pequeno",
  big: "Grande",
}

export type SupabasePet = {
  id: string

  name: string
  cep: string

  age: number
  species: Species
  breed: string
  size: Size
  gender: Gender
  coat: Array<Coat> | null
  requirements: Array<string> | null
  energy: Energy
  independence: Independence
  ambient: Ambient
}

export type SearchablePetProps = {
  // Properties
  age: number
  species: Species
  breed: string
  size: Size
  gender: Gender
  coat: Array<Coat> | null
  requirements: Array<string> | null
  energy: Energy
  independence: Independence
  ambient: Ambient
}

export type PetProps = {
  id?: TypeID<"pet">
  
  name: string
  cep: string

  created_at?: Date
} & SearchablePetProps

export class Pet {
  readonly id

  readonly age
  readonly species
  readonly breed
  readonly size
  readonly gender
  readonly coat
  readonly requirements
  readonly energy
  readonly independence
  readonly ambient

  readonly name
  readonly cep
  readonly created_at

  constructor(props: PetProps) {
    this.id = props?.id?.toString() || typeid("pet").toString()

    this.age = props.age
    this.species = props.species
    this.breed = props.breed
    this.size = props.size
    this.gender = props.gender
    this.coat = props.coat
    this.requirements = props.requirements
    this.energy = props.energy
    this.independence = props.independence
    this.ambient = props.ambient

    this.name = props.name
    this.cep = props.cep

    this.created_at = props.created_at || new Date()
  }
}
