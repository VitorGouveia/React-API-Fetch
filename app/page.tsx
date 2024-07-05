import { Button } from "@/ui/button"

import { makeSearch } from "./actions"

async function getData() {
  console.log("running")

  return new Date().toString()
}

export default async function Page() {
  const data = await getData()

  return (
    <main className="flex flex-col gap-2">
      <section>
        <SearchFilters />

        <Divider />

        <div className="flex-1 flex-col">
          <AutomaticSearch />
        </div>

        {data}
      </section>
    </main>
  )
}

function Divider() {
  return <div></div>
}

async function SearchFilters() {
  return (
    <div>
      <Button formAction={makeSearch}>Make search</Button>
    </div>
  )
}

function AutomaticSearch() {
  return <div></div>
}
