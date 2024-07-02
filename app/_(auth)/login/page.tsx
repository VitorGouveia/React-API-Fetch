import { ReactNode, useId } from "react"
import { LockOpenIcon } from "@heroicons/react/20/solid"

import { Button } from "@/_components/ui/button"
import { Input } from "@/_components/ui/input"
import { Label } from "@/_components/ui/label"
import { Title } from "@/_components/title"

const SubmitButton = () => {
  return <Button>Login</Button>
}

const TextField = (props: {
  children: ReactNode
  name: string
  leadingIcon?: ReactNode
  description?: string
  error?: string
}) => {
  const id = useId()

  return (
    <Label htmlFor={id} className="flex flex-col gap-2">
      {props.children}

      <div className="relative">
        <Input id={id} name={props.name} />

        {/* {props.leadingIcon} */}
      </div>

      {props.error ? (
        <span className="text-red-500">{props.error}</span>
      ) : props.description ? (
        <span className="text-zinc-500">{props.description}</span>
      ) : null}
    </Label>
  )
}

export default function Page() {
  return (
    <main className="flex max-w-7xl items-center justify-between">
      <aside className="h-full w-full rounded bg-primary"></aside>

      <form className="flex flex-col gap-12">
        <Title>Boas-vindas!</Title>

        <TextField name="email" description="Seu melhor e-mail">
          E-mail
        </TextField>

        <TextField name="password" leadingIcon={<LockOpenIcon />}>
          Senha
        </TextField>

        <SubmitButton />
      </form>
    </main>
  )
}
