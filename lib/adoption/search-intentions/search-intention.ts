import { typeid, TypeId } from "typeid-js"

type SearchIntentionProps = {
  id?: TypeId<"sch_intent">

  userId: TypeId<"user">
}

export class SearchIntention {
  public readonly id
  public readonly userId

  constructor(props: SearchIntentionProps) {
    this.id = props.id ?? typeid("sch_intent")
    this.userId = props.userId
  }
}
