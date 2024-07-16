import { TypeID } from "typeid-js"

import { AdoptionIntention } from "./adoption-intention"

export type adoptPetRequest = {
  description: string
  pet: {
    id: TypeID<"pet">
  }
  user: {
    id: TypeID<"user">
  }
}

export async function adoptPet(
  props: adoptPetRequest,
): Promise<AdoptionIntention> {
  const adoptionIntention = new AdoptionIntention({
    petId: props.pet.id,
    userId: props.user.id,
    description: props.description,
  })

  // check if pet owner is userId

  return adoptionIntention
}
