"use server"

export async function automaticSearchAction(formData: FormData) {
  const map = new Map<string, string[]>()

  for (const [key, value] of formData.entries()) {
    if (key.includes("$ACTION")) {
      continue
    }

    const record = map.get(key)

    if (!record) {
      map.set(key, [value.toString()])
      continue
    }

    map.set(key, [...record, value.toString()])
  }

  const location = {
    uf: formData.get("location-uf"),
    state: formData.get("location-state"),
  }

  const params = Object.fromEntries(map.entries())

  // {
  /* pet-history: species */
  /* house-type: size, ambient */
  /* life-style: independence, energy */
  /* companionship: independence, energy */
  // }
}
