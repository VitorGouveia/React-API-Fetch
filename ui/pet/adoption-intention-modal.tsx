"use client"

import { TextIcon, UserIcon } from "lucide-react"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

import { adoptPetAction } from "@/ui/adoption/adoption-intents/actions"
import { Button } from "@/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Textarea } from "@/ui/textarea"

export function AdoptionIntentionModal() {
  const [open, setOpen] = useState(false)

  const searchParams = useSearchParams()
  const { id: petId } = useParams<{ id: string }>()

  const [step, setStep] = useState<"profile" | "adoption-intention">("profile")
  const MAX_DESCRIPTION_SIZE = 250
  const [description, setDescription] = useState("")
  const [state, action, pending] = useFormState(
    adoptPetAction.bind(null, { petId }),
    { status: "error", errors: {} },
  )

  useEffect(() => {
    const modal = searchParams.get("modal")
    const open = searchParams.get("open")

    setOpen(
      Boolean(
        modal && modal === "adoption-intention" && open && open === "true",
      ),
    )
  }, [searchParams])

  function closeModal() {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("modal")
    params.delete("open")
    setOpen(false)
    window.history.replaceState(null, "", `/pets/${petId}`)
  }

  function modalOpenChange(open: boolean) {
    if (open === false) {
      closeModal()
    } else {
      const params = new URLSearchParams(searchParams.toString())
      params.set("modal", "adoption-intention")
      params.set("open", "true")
      window.history.replaceState(
        null,
        "",
        `/pets/${petId}${params.toString()}`,
      )
      setOpen(open)
    }
  }

  if (!open) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={modalOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Intenção de Adoção</DialogTitle>
          <DialogDescription>
            Preencha algumas informações a serem enviados para o doador do Pet.
          </DialogDescription>
        </DialogHeader>

        {state.status === "success" && (
          <>
            <p>
              Agora o doador do pet vai avaliar se você é o candidato ideal para
              ser o novo dono do {"<nome do pet>"}.
            </p>

            <p>
              A resposta do doador tem limite máximo de 5 dias úteis, caso ele
              não responda até esse tempo você terá que refazer a intenção de
              adoção do pet por essa página.
            </p>

            <p>
              Caso a adoção seja aceita você receberá uma notificação aqui na
              plataforma e também no e-mail, e o doador te irá te chamar no
              whatsapp para discutir os detalhes da documentação.
            </p>

            <DialogClose asChild>
              <Button variant="tertiary">Fechar</Button>
            </DialogClose>
          </>
        )}

        {state.status === "error" && (
          <form
            onSubmit={async (event) => {
              event.preventDefault()
              if (step === "adoption-intention") {
                return action(new FormData(event.currentTarget))
              }
              if (step === "profile") {
                setStep("adoption-intention")
                return
              }
            }}
            className="space-y-4"
          >
            <div
              className={`w-full flex-col gap-8 rounded-lg border p-8 ${step === "profile" ? "flex" : "hidden"}`}
            >
              <header className="flex items-center gap-2">
                <div className="w-max rounded-xl border p-2">
                  <UserIcon />
                </div>
                <div className="flex flex-col gap-px">
                  <strong>Perfil</strong>
                  <p className="text-xs text-zinc-500">
                    Vamos montar seu perfil.
                  </p>
                </div>
              </header>

              <Label className="flex flex-col gap-2">
                Nome
                <Input name="name" placeholder="Fulano Ciclano" />
                {state.errors?.name && (
                  <span className="text-red-500">{state.errors?.name}</span>
                )}
              </Label>

              <Label className="flex flex-col gap-2">
                E-mail
                <Input name="email" placeholder="fulano@gmail.com" />
                {state.errors?.email && (
                  <span className="text-red-500">{state.errors?.email}</span>
                )}
              </Label>

              <Label className="flex flex-col gap-2">
                WhatsApp
                <Input name="phone" placeholder="DDD + Telefone" />
                {state.errors?.phone && (
                  <span className="text-red-500">{state.errors?.phone}</span>
                )}
              </Label>
            </div>

            <div
              className={`w-full flex-col gap-8 rounded-lg border p-8 ${step === "adoption-intention" ? "flex" : "hidden"}`}
            >
              <header className="flex items-center gap-2">
                <div className="w-max rounded-xl border p-2">
                  <TextIcon />
                </div>
                <div className="flex flex-col gap-px">
                  <strong>Adoção</strong>
                  <p className="text-xs text-zinc-500">Dados da adoção</p>
                </div>
              </header>

              <Label className="flex flex-col gap-2">
                Descrição
                <Textarea
                  name="description"
                  className="max-h-32"
                  placeholder="Descreva porque você quer adotar o pet."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
                {state.errors?.description && (
                  <span className="text-red-500">
                    {state.errors?.description}
                  </span>
                )}
              </Label>

              <span
                className={`text-sm ${
                  MAX_DESCRIPTION_SIZE - description.length < 0
                    ? "text-red-400"
                    : "text-muted-foreground"
                }`}
              >
                {MAX_DESCRIPTION_SIZE - description.length} caracteres restantes
              </span>
            </div>

            <DialogFooter>
              <div className="flex gap-2">
                {step === "profile" && (
                  <Button
                    disabled={pending}
                    onClick={closeModal}
                    type="button"
                    variant="ghost"
                  >
                    Deixa Quieto
                  </Button>
                )}

                {step === "adoption-intention" && (
                  <Button
                    disabled={pending}
                    onClick={() => setStep("profile")}
                    type="button"
                    variant="ghost"
                  >
                    Voltar
                  </Button>
                )}

                <SubmitButton />
              </div>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <>
      <Button
        disabled={pending}
        type={"submit"}
        variant="default"
        className="font-bold"
      >
        Vamos Lá
      </Button>
    </>
  )
}
