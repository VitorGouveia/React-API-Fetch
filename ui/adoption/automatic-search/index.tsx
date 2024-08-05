"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select"

import { Button } from "@/ui/button"
import { ReactNode, useId, useState } from "react"
import { states } from "../brazilian-states-cities"
import { automaticSearchAction } from "./actions"

type Step =
  | "location"
  | "pet-history"
  | "house-type"
  | "life-style"
  | "companionship"

export function AutomaticSearchModal() {
  const [step, setStep] = useState<Step>("location")

  const handleNext = () => {
    const steps: Record<Step, Step> = {
      location: "pet-history",
      "pet-history": "house-type",
      "house-type": "life-style",
      "life-style": "companionship",
      companionship: "companionship",
    }

    setStep(steps[step])
  }

  return (
    <form
      action={automaticSearchAction}
      className={
        "flex w-full flex-col gap-8 rounded-lg border bg-[hsla(0,0%,98%)] p-8"
      }
    >
      <div
        className={`flex-col gap-2 ${step === "location" ? "flex" : "hidden"}`}
      >
        <strong>Selecione seu estado e cidade</strong>

        <div className="flex items-center gap-2">
          <Select name="location-uf">
            <SelectTrigger className="w-[80px] shrink-0 border bg-white text-black">
              <SelectValue placeholder="UF" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.value} value={state.value.toLowerCase()}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select name="location-state">
            <SelectTrigger className="select-trigger w-full border bg-white text-black">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"campos-do-jordao"}>
                Campos do Jordão
              </SelectItem>
              <SelectItem value={"paulinia"}>Paulínia</SelectItem>
              <SelectItem value={"sao-paulo"}>São Paulo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div
        className={`flex-col gap-2 ${step === "pet-history" ? "flex" : "hidden"}`}
      >
        <strong>Já teve animais antes? Se sim quais?</strong>

        <div className="grid grid-cols-2 gap-2">
          <CardButton name="pet-history" value="dog">
            Cachorro
          </CardButton>

          <CardButton name="pet-history" value="cat">
            Gato
          </CardButton>

          <CardButton name="pet-history" value="fish">
            Peixe
          </CardButton>

          <CardButton name="pet-history" value="bird">
            Pássaro
          </CardButton>
        </div>
      </div>

      <div
        className={`flex-col gap-2 ${step === "house-type" ? "flex" : "hidden"}`}
      >
        <strong>Tipo do imóvel que mora</strong>

        <div className="grid grid-cols-2 gap-2">
          <CardButton name="house-type" value="house">
            Casa
          </CardButton>

          <CardButton name="house-type" value="apartment">
            Apartamento
          </CardButton>
        </div>
      </div>

      <div
        className={`flex-col gap-2 ${step === "life-style" ? "flex" : "hidden"}`}
      >
        <strong>Estilo de vida</strong>

        <div className="grid grid-cols-2 gap-2">
          <CardButton name="life-style" value="work-home">
            Trabalho Home Office
          </CardButton>

          <CardButton name="life-style" value="study-home">
            Estudo Home Office
          </CardButton>

          <CardButton name="life-style" value="work-outside">
            Trabalho fora de casa
          </CardButton>

          <CardButton name="life-style" value="study-outside">
            Estudo fora de casa
          </CardButton>
        </div>
      </div>

      <div
        className={`flex-col gap-2 ${step === "life-style" ? "flex" : "hidden"}`}
      >
        <strong>Presença de crianças/outros animais</strong>

        <div className="grid grid-cols-2 gap-2">
          <CardButton name="companionship" value="low">
            0
          </CardButton>

          <CardButton name="companionship" value="moderate">
            1-2
          </CardButton>

          <CardButton name="companionship" value="medium">
            2-4
          </CardButton>

          <CardButton name="companionship" value="high">
            4+
          </CardButton>
        </div>
      </div>

      {step === "companionship" ? (
        <Button type="submit" onClick={handleNext} className="w-max">
          Encontrar Pet
        </Button>
      ) : (
        <Button type="button" onClick={handleNext} className="w-max">
          Próximo
        </Button>
      )}

      {/* passo 5: Tempo disponível com o pet => energy (Fica muito fora de casa, fica em casa) */}
      {/* passo 6: perguntar sobre presença de perigo para o animal | independence       | */}
      {/* - Motivação da adoção - Expectativas */}
      {/* passo 3: Prefere alguma das raças abaixo? => breed */}
    </form>
  )
}

function CardButton({
  value,
  name,
  children,
}: {
  value: string
  name: string
  children: ReactNode
}) {
  const id = useId()

  return (
    <>
      <label
        style={{
          background:
            "linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.05) 100%)",
        }}
        htmlFor={id}
        className="button-card flex aspect-square w-full items-center justify-center rounded-lg border border-input bg-white px-3 py-6 transition-colors"
      >
        <strong>{children}</strong>
        <input
          className="button-card-input sr-only"
          id={id}
          type="checkbox"
          name={name}
          value={value}
        />
      </label>
    </>
  )
}
