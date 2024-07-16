"use client"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"

import { Dialog, DialogContent } from "@/ui/dialog"

export function ProfileModal({ children }: { children: ReactNode }) {
  const router = useRouter()

  function handleOpenChange() {
    router.back()
  }

  return (
    <Dialog defaultOpen onOpenChange={handleOpenChange}>
      <DialogContent className="h-[90vh] w-full max-w-7xl overflow-y-auto">
        {children}
      </DialogContent>
    </Dialog>
  )
}
