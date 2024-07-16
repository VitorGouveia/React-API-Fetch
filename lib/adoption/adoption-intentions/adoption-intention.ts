import { typeid, TypeID } from "typeid-js"

type AdoptionIntentionProps = {
  id?: TypeID<"adp_intent">
  petId: TypeID<"pet">
  userId: TypeID<"user">

  description: string

  status?: "pending" | "rejected" | "accepted"
}

export class AdoptionIntention {
  public readonly id
  public readonly petId
  public readonly userId

  public readonly description
  public readonly status

  constructor(props: AdoptionIntentionProps) {
    this.id = props.id ?? typeid("adp_intent")
    this.petId = props.petId
    this.userId = props.userId

    this.description = props.description

    this.status = props.status ?? "pending"
  }
}
