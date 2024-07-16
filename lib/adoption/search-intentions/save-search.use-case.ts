import { TypeId } from "typeid-js"

import { SearchIntention } from "./search-intention"

type saveSearchRequest = {
  user: {
    id: TypeId<"user">
  }
}

export async function saveSearch(
  props: saveSearchRequest,
): Promise<SearchIntention> {
  const searchIntention = new SearchIntention({
    userId: props.user.id,
  })

  return searchIntention
}
