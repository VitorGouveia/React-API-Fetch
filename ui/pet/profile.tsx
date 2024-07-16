import { AlertCircleIcon, PackageIcon, ScanIcon, ZapIcon } from "lucide-react"

import { Coat, Energy, Pet, Size, Species } from "@/lib/pets/pet"

import { Alert, AlertTitle } from "@/ui/alert"
import { Button } from "@/ui/button"
import { Table, TableBody, TableCell, TableRow } from "@/ui/table"
import { redirect } from "next/navigation"
import { Badge } from "../badge"
import { AdoptionIntentionModal } from "./adoption-intention-modal"

export async function Profile(pet: Pet) {
  return (
    <section className="flex flex-col p-8">
      <div
        className="grid w-full gap-8 rounded-lg border p-8"
        style={{ gridTemplateColumns: "2fr 4fr" }}
      >
        <PreviewImages />

        <Properties {...pet} />
      </div>

      <div className="mx-auto flex w-full max-w-[500px] flex-col items-center gap-8 p-8">
        <h2 className="text-3xl font-bold text-tertiary-foreground">
          Requisitos para Adoção
        </h2>

        {pet.requirements &&
          pet.requirements.map((requirement) => (
            <Alert
              key={requirement}
              className="border-red-300 bg-red-100 text-red-500"
            >
              <AlertCircleIcon className="h-4 w-4" />

              <AlertTitle>{requirement}</AlertTitle>
            </Alert>
          ))}
      </div>
    </section>
  )
}

function PreviewImages() {
  return (
    <aside className="flex w-full flex-col gap-2">
      <img
        src={
          "https://blog-static.petlove.com.br/wp-content/uploads/2023/09/25143323/como-cuidar-de-um-vira-lata-caramelo-petlove.jpg"
        }
        className="aspect-square h-auto w-full overflow-hidden rounded-lg bg-zinc-200 object-cover"
        alt=""
      />
      <div></div>

      <ul className="flex gap-2">
        <li>
          <div className="size-[80px] rounded-lg bg-zinc-100" />
        </li>
        <li>
          <div className="size-[80px] rounded-lg bg-zinc-100" />
        </li>
        <li>
          <div className="size-[80px] rounded-lg bg-zinc-100" />
        </li>
      </ul>
    </aside>
  )
}

function EnergyLevel({ level }: { level: Energy }) {
  if (level === "low") {
    return (
      <div className="flex gap-px">
        <ZapIcon fill="#F15156" fillOpacity={1} strokeWidth={0} />
        <ZapIcon fill="#F15156" fillOpacity={1} strokeWidth={0} />
        <ZapIcon fill="#F15156" fillOpacity={0.2} strokeWidth={0} />
        <ZapIcon fill="#F15156" fillOpacity={0.2} strokeWidth={0} />
        <ZapIcon fill="#F15156" fillOpacity={0.2} strokeWidth={0} />
      </div>
    )
  }

  return (
    <div className="flex gap-px">
      <ZapIcon fill="#F15156" fillOpacity={1} strokeWidth={0} />
      <ZapIcon fill="#F15156" fillOpacity={1} strokeWidth={0} />
      <ZapIcon fill="#F15156" fillOpacity={1} strokeWidth={0} />
      <ZapIcon fill="#F15156" fillOpacity={1} strokeWidth={0} />
      <ZapIcon fill="#F15156" fillOpacity={0.2} strokeWidth={0} />
    </div>
  )
}

function PetSize({ size }: { size: Size }) {
  if (size === "small") {
    return (
      <div className="flex gap-2">
        <span className={`size-5 rounded-full bg-primary`} />
        <span className={`size-5 rounded-full bg-primary/20`} />
        <span className={`size-5 rounded-full bg-primary/20`} />
      </div>
    )
  }

  if (size === "medium") {
    return (
      <div className="flex gap-2">
        <span className={`size-5 rounded-full bg-primary`} />
        <span className={`size-5 rounded-full bg-primary`} />
        <span className={`size-5 rounded-full bg-primary/20`} />
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <span className={`size-5 rounded-full bg-primary`} />
      <span className={`size-5 rounded-full bg-primary`} />
      <span className={`size-5 rounded-full bg-primary`} />
    </div>
  )
}

async function Properties(pet: Pet) {
  async function adoptionIntention() {
    "use server"
    redirect(`/pets/${pet.id}?modal=adoption-intention&open=true`)
  }

  const speciesNames: Record<Species, string> = {
    dog: "Cachorro",

    cat: "Gato",
    fish: "Peixe",
    bird: "Pássaro",
    other: "Outros",
  }

  const sizesNames: Record<Size, string> = {
    small: "Pequenininho",
    medium: "Médio",
    big: "Grande",
  }

  const coatNames: Record<Coat, string> = {
    short: "Curto",
    curled: "Enrolada",
    long: "Longa",
    smooth: "Lisa",
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <h1 className="text-4xl font-bold text-tertiary-foreground">
        {pet.name}
      </h1>

      <p className="text-tertiary-foreground">
        Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer
        companhia, uma bagunça mas também ama uma soneca.
      </p>

      <ul className="flex h-[96px] gap-2 overflow-x-auto">
        <li className="flex h-full w-[220px] shrink-0 flex-col justify-between gap-3 rounded-lg border px-6 py-4">
          <EnergyLevel level={pet.energy} />

          <strong>
            {pet.energy === "low" ? "Pouca Energia" : "Energético"}
          </strong>
        </li>

        <li className="flex h-full w-[220px] shrink-0 flex-col justify-between gap-3 rounded-lg border px-6 py-4">
          <div className="flex gap-2">
            {pet.ambient === "big" ? (
              <ScanIcon className="text-primary" />
            ) : (
              <PackageIcon className="text-primary" />
            )}
          </div>

          <strong>
            {pet.ambient === "small" ? "Ambiente Pequeno" : "Ambiente Grande"}
          </strong>
        </li>

        <li className="flex h-full w-[220px] shrink-0 flex-col justify-between gap-3 rounded-lg border px-6 py-4">
          <PetSize size={pet.size} />

          <strong>
            {pet.size === "small"
              ? "Pequenininho"
              : pet.size === "medium"
                ? "Médio"
                : "Grande"}
          </strong>
        </li>
      </ul>

      <Table>
        <TableBody className="text-muted-foreground">
          <TableRow>
            <TableCell className="w-[200px]">Idade</TableCell>
            <TableCell>{pet.age}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-[200px]">Espécie</TableCell>
            <TableCell>{speciesNames[pet.species]}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-[200px]">Raça</TableCell>
            <TableCell>{pet.breed}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-[200px]">Tamanho</TableCell>
            <TableCell>{sizesNames[pet.size]}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-[200px]">Sexo</TableCell>
            <TableCell>
              {pet.gender === "male" ? "Masculino" : "Feminino"}
            </TableCell>
          </TableRow>

          {pet.coat && (
            <TableRow>
              <TableCell className="w-[200px]">Pelagem</TableCell>
              <TableCell className="space-x-2">
                {pet.coat.map((coat) => (
                  <Badge key={coat}>{coatNames[coat]}</Badge>
                ))}
              </TableCell>
            </TableRow>
          )}

          <TableRow>
            <TableCell className="w-[200px]">Nível de energia</TableCell>
            <TableCell>{pet.energy === "high" ? "Alto" : "Baixo"}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-[200px]">Nível de independência</TableCell>
            <TableCell>
              {pet.independence === "high" ? "Alto" : "Baixo"}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-[200px]">Ambiente</TableCell>
            <TableCell>
              {pet.ambient === "big" ? "Grande" : "Pequeno"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <form action={adoptionIntention}>
        <Button className="w-[120px] font-bold">Adotar Pet</Button>
      </form>

      <AdoptionIntentionModal />
    </div>
  )
}
