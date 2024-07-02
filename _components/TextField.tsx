import { Small } from "./Typography/Small"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export const TextField = (props: {
  name: string
  error?: string | null
  placeholder?: string
  label: string
}) => {
  return (
    <Label className="flex w-full flex-col gap-2">
      {props.label}

      <Input
        name={props.name}
        placeholder={props.placeholder ?? "Digite aqui..."}
      />

      {props.error && <Small className="text-red-500">{props.error}</Small>}
    </Label>
  )
}
