"use client"

import { useState } from "react"

import { useModal } from "@/lib/Modal"
import { Input } from "@/lib/Input"

type Step = "start" | "details" | "end"

const stepModalData: Record<Step, { title: string; description: string }> = {
  start: {
    title: "Encontre o Pet Ideal",
    description:
      "Responda algumas perguntas rápidas e encontre o pet ideal baseado nas suas respostas.",
  },
  details: {
    title: "Precisamos conhecer você",
    description:
      "Preencha algumas informações básicas para que possamos passar isso ao doador.",
  },
  end: {
    title: "Tudo Pronto!",
    description:
      "Suas informações foram salvas e vão ser enviadas ao WhatsApp junto da sua mensagem!",
  },
}

export const IdealPetForm = () => {
  const IdealPet = useModal()
  const [step, setStep] = useState<Step>("start")

  return (
    <>
      <button
        onClick={() => IdealPet.open()}
        className="w-max bg-theme-accent-base font-bold"
      >
        Adotar Pet
      </button>

      <IdealPet.modal
        title={stepModalData[step].title}
        description={stepModalData[step].description}
        onClose={() => setStep("start")}
      >
        {step === "start" && (
          <div className="flex items-center gap-2">
            <button
              className="bg-transparent text-theme-title"
              onClick={() => IdealPet.close()}
            >
              Fechar
            </button>

            <button
              onClick={() => setStep("details")}
              className="bg-theme-accent-base"
            >
              Beleza! Bora Lá
            </button>
          </div>
        )}

        {step === "details" && (
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full items-center gap-4">
              <Input name="name">Nome</Input>
              <Input name="lastname">Sobrenome</Input>
            </div>

            <Input
              leading={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.404 14.596A6.5 6.5 0 1 1 16.5 10a1.25 1.25 0 0 1-2.5 0 4 4 0 1 0-.571 2.06A2.75 2.75 0 0 0 18 10a8 8 0 1 0-2.343 5.657.75.75 0 0 0-1.06-1.06 6.5 6.5 0 0 1-9.193 0ZM10 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
                    clip-rule="evenodd"
                  />
                </svg>
              }
              name="e-mail"
              placeholder="fulano@ciclano.com"
            >
              E-mail
            </Input>

            <button
              onClick={() => setStep("end")}
              className="bg-theme-accent-base"
            >
              Próximo Passo
            </button>
          </div>
        )}

        {step === "end" && (
          <button className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] font-bold">
            Enviar Mensagem
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
            >
              <path
                d="M25.0001 2C12.3181 2 2.00015 12.318 2.00015 25C2.00015 28.96 3.02315 32.854 4.96315 36.29L2.03715 46.73C1.94115 47.073 2.03415 47.441 2.28215 47.696C2.47315 47.893 2.73315 48 3.00015 48C3.08015 48 3.16115 47.99 3.24015 47.971L14.1361 45.272C17.4631 47.058 21.2101 48 25.0001 48C37.6821 48 48.0001 37.682 48.0001 25C48.0001 12.318 37.6821 2 25.0001 2ZM36.5701 33.116C36.0781 34.478 33.7181 35.721 32.5841 35.888C31.5661 36.037 30.2781 36.101 28.8641 35.657C28.0071 35.387 26.9071 35.029 25.4981 34.428C19.5751 31.902 15.7071 26.013 15.4111 25.624C15.1161 25.235 13.0001 22.463 13.0001 19.594C13.0001 16.725 14.5251 15.314 15.0671 14.73C15.6091 14.146 16.2481 14 16.6421 14C17.0361 14 17.4291 14.005 17.7741 14.021C18.1371 14.039 18.6241 13.884 19.1031 15.022C19.5951 16.19 20.7761 19.059 20.9221 19.352C21.0701 19.644 21.1681 19.985 20.9721 20.374C20.7761 20.763 20.6781 21.006 20.3821 21.347C20.0861 21.688 19.7621 22.107 19.4961 22.369C19.2001 22.66 18.8931 22.975 19.2371 23.559C19.5811 24.143 20.7661 26.052 22.5221 27.598C24.7771 29.584 26.6801 30.2 27.2701 30.492C27.8601 30.784 28.2051 30.735 28.5491 30.346C28.8931 29.956 30.0251 28.643 30.4181 28.06C30.8111 27.477 31.2051 27.573 31.7471 27.768C32.2891 27.962 35.1922 29.372 35.7822 29.664C36.3722 29.956 36.7662 30.102 36.9142 30.345C37.0622 30.587 37.0621 31.755 36.5701 33.116Z"
                fill="white"
              />
            </svg>
          </button>
        )}
      </IdealPet.modal>
    </>
  )
}
