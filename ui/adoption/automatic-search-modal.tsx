"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog"
import { useRouter } from "next/navigation"

export function AutomaticSearchModal() {
  const [open, setOpen] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const modal = searchParams.get("modal")
    const open = searchParams.get("open")

    setOpen(
      Boolean(modal && modal === "automatic-search" && open && open === "true"),
    )
  }, [searchParams])

  function closeModal() {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("modal")
    params.delete("open")
    router.replace(`/${params.toString()}`)
    setOpen(false)
  }

  function modalOpenChange(open: boolean) {
    if (open === false) {
      closeModal()
    } else {
      const params = new URLSearchParams(searchParams.toString())
      params.set("modal", "automatic-search")
      params.set("open", "true")
      router.replace(`/${params.toString()}`)
    }

    setOpen(open)
  }

  if (!open) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={modalOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pesquisa Automática</DialogTitle>
          <DialogDescription>
            Use a pesquisa automática para encontrar pets compatíveis com você
            em 5 segundos.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
          <Button type="button" variant="default">
            Vamos Lá
          </Button>
          <Button onClick={closeModal} type="button" variant="ghost">
            Deixa Quieto
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
