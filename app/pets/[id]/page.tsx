import { getPet } from "@/queries/get-pets"
import { IdealPetForm } from "./ideal-pet-modal"

export default async function Page({ params }: { params: { id: string } }) {
  const pet = getPet(params.id)

  if (!pet) {
    return <p>not found!</p>
  }

  return (
    <main className="flex flex-col gap-8 p-20">
      <section className="flex items-start gap-8 rounded-2xl border border-theme-primary-light p-8">
        <div className="flex w-[560px] flex-col gap-4">
          <div className="h-[480px] w-[560px] rounded bg-theme-primary-light" />

          <ul className="flex w-full items-center gap-4 overflow-x-auto">
            <li className="size-[90px] shrink-0 rounded bg-theme-primary-base"></li>
            <li className="size-[90px] shrink-0 rounded bg-theme-primary-base"></li>
            <li className="size-[90px] shrink-0 rounded bg-theme-primary-base"></li>
            <li className="size-[90px] shrink-0 rounded bg-theme-primary-base"></li>
            <li className="size-[90px] shrink-0 rounded bg-theme-primary-base"></li>
            <li className="size-[90px] shrink-0 rounded bg-theme-primary-base"></li>
          </ul>
        </div>

        <div className="flex w-1/2 flex-col gap-6">
          <h1>{pet.name}</h1>

          <p>
            O hulk é um cachorro super divertido e brincalhão, adora crianças,
            não morde.
          </p>

          <div className="flex h-[100px] w-full items-center gap-6">
            <div className="flex h-full flex-col justify-between rounded-md border border-theme-primary-light p-6">
              <Stars />
              <h3>Muita Energia</h3>
            </div>

            <div className="flex h-full flex-col justify-between rounded-md border border-theme-primary-light p-6">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V6M19 6V3C19 2.46957 18.7893 1.96086 18.4142 1.58579C18.0391 1.21071 17.5304 1 17 1H14M14 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V14M1 14V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H6"
                  stroke="#F15156"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <h3>Ambiente Amplo</h3>
            </div>

            <div className="flex h-full flex-col justify-between rounded-md border border-theme-primary-light p-6">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-theme-accent-base" />
                <div className="size-3 rounded-full bg-theme-accent-base opacity-20" />
                <div className="size-3 rounded-full bg-theme-accent-base opacity-20" />
              </div>

              <h3>Pequeneninho</h3>
            </div>
          </div>

          <IdealPetForm />

          <DataList />
        </div>
      </section>
    </main>
  )
}

function DataList() {
  return (
    <ul className="flex flex-col">
      <li className="border-theme-primary-light/50 flex items-center gap-2 border-b py-3">
        <p className="w-[200px]">Espécie</p>
        <p>Cachorro</p>
      </li>

      <li className="border-theme-primary-light/50 flex items-center gap-2 border-b py-3">
        <p className="w-[200px]">Porte</p>
        <p>Pequeno</p>
      </li>

      <li className="border-theme-primary-light/50 flex items-center gap-2 border-b py-3">
        <p className="w-[200px]">Sexo</p>
        <p>Masculino</p>
      </li>

      <li className="border-theme-primary-light/50 flex items-center gap-2 border-b py-3">
        <p className="w-[200px]">Independência</p>
        <p>Muito</p>
      </li>

      <li className="border-theme-primary-light/50 flex items-center gap-2 border-b py-3">
        <p className="w-[200px]">Idade</p>
        <p>2 anos</p>
      </li>

      <li className="border-theme-primary-light/50 flex items-center gap-2 border-b py-3">
        <p className="w-[200px]">Informações Adicionais</p>
        <p>Não come feijão</p>
      </li>
    </ul>
  )
}

function Stars() {
  return (
    <div className="flex w-full items-center justify-between">
      <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 1L1 13H10L9 21L19 9H10L11 1Z"
          stroke="#F15156"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 1L1 13H10L9 21L19 9H10L11 1Z"
          stroke="#F15156"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 1L1 13H10L9 21L19 9H10L11 1Z"
          stroke="#F15156"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 1L1 13H10L9 21L19 9H10L11 1Z"
          stroke="#F15156"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path opacity="0.2" d="M10 0L0 12H9L8 20L18 8H9L10 0Z" fill="#52525B" />
      </svg>
    </div>
  )
}
