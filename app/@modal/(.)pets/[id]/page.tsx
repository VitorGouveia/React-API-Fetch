import { supabase } from "@/supabase"

import { Dialog, DialogContent } from "@/ui/dialog"

import { petsRepository } from "@/lib/pets/repository"
import { Profile } from "@/ui/pet/profile"
import { ProfileModal } from "@/ui/pet/profile-modal"

export default async function Page({ params }: { params: { id: string } }) {
  const client = supabase()
  const pet = await petsRepository(client).retrieve(params.id)

  if (!pet) {
    return (
      <Dialog defaultOpen>
        <DialogContent>Pet Not Found</DialogContent>
      </Dialog>
    )
  }

  return (
    <ProfileModal>
      <Profile {...pet} />
    </ProfileModal>
  )
}
