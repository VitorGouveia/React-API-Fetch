import { ReactNode, useId } from "react"

export const Checkbox = (props: { children: ReactNode }) => {
  const id = useId()

  return (
    <label htmlFor={id} className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        className="border-theme-primary-light rounded border"
      />
      {props.children}
    </label>
  )
}
