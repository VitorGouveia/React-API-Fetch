import { ReactNode } from "react"
import { cn } from "@/lib/utils"

export const Small = (props: { className?: string; children: ReactNode }) => {
  return (
    <small className={cn("text-sm font-medium leading-none", props.className)}>
      {props.children}
    </small>
  )
}
