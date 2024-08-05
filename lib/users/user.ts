import { typeid } from "typeid-js"

import { Email } from "@/lib/value-objects/email"

type UserProps = {
  id?: string

  name: string
  email: string

  role: "donator" | "basic" | "save-search"
}

export class User {
  public readonly id

  public readonly name
  public readonly email

  public readonly role

  constructor(props: UserProps) {
    this.id = props.id ?? typeid("user").toString()
    this.name = props.name
    this.email = Email.create(props.email)
    this.role = props.role
  }
}
