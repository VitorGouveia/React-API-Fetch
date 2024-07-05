"use server"

import { revalidatePath } from "next/cache"

export async function makeSearch() {
  console.log("making search")
  return revalidatePath("/")
}
