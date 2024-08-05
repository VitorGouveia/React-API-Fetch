import { ReactNode } from "react"

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

function ModalRoot({
  children,
  opened,
  name,
}: {
  name: string
  opened: boolean
  children: ReactNode
}) {
  return (
    <Dialog name={name} defaultOpen={opened}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export function Header({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>
  )
}

export function Footer({ children }: { children: ReactNode }) {
  return (
    <DialogFooter className="gap-2">
      <DialogClose asChild>
        <Button variant="ghost-inverted">Deixa Quieto</Button>
      </DialogClose>

      {children}
    </DialogFooter>
  )
}

export function CloseModal() {
  return (
    <DialogFooter className="gap-2 border-t pt-4">
      <DialogClose asChild>
        <Button>Fechar</Button>
      </DialogClose>
    </DialogFooter>
  )
}

export const Modal = {
  Root: ModalRoot,
  Header,
  Footer,
  Close: CloseModal,
}
