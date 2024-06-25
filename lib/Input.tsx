import { ReactNode, useId } from "react"

export const Input = (props: {
  children: ReactNode
  leading?: ReactNode
  placeholder?: string
  name: string
}) => {
  const id = useId()

  return (
    <label htmlFor={id} className="flex flex-col items-start gap-2">
      {props.children}

      <div className="relative w-full">
        {props.leading && (
          <div className="absolute left-[11px] top-1/2 size-4 -translate-y-1/2 text-theme-placeholder">
            {props.leading}
          </div>
        )}

        <input
          id={id}
          name={props.name}
          placeholder={props.placeholder ?? "Digite aqui"}
          className={`text-title w-full rounded border border-theme-primary-light bg-theme-primary-lighter px-3 py-1.5 placeholder:text-theme-placeholder ${props.leading ? "pl-[calc(11px+16px+6px)]" : "pl-3"}`}
        />
      </div>
    </label>
  )
}
