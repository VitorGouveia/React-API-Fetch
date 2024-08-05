import { typeid } from "typeid-js"

import {
  Ambient,
  Coat,
  Energy,
  Gender,
  Independence,
  Size,
  Species,
} from "@/lib/pets/pet"

type SearchIntentionProps = {
  id?: string

  age?: [number, number]
  species?: Array<Species>
  breed?: Array<string>
  size?: Array<Size>
  gender?: Array<Gender>
  coat?: Array<Coat>
  energy?: Array<Energy>
  independence?: Array<Independence>
  ambient?: Array<Ambient>

  userId: string
}

export class SearchIntention {
  public readonly id
  public readonly userId

  readonly age
  readonly species
  readonly breed
  readonly size
  readonly gender
  readonly coat
  readonly energy
  readonly independence
  readonly ambient

  constructor(props: SearchIntentionProps) {
    this.id = props.id ?? typeid("search").toString()
    this.userId = props.userId

    this.age = props.age || null
    this.species = props.species || null
    this.breed = props.breed || null
    this.size = props.size || null
    this.gender = props.gender || null
    this.coat = props.coat || null
    this.energy = props.energy || null
    this.independence = props.independence || null
    this.ambient = props.ambient || null
  }
}
