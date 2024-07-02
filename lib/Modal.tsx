import { Dialog, Transition } from "@headlessui/react"
import { Fragment, ReactNode, useMemo, useState } from "react"

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return {
    open,
    close,
    modal: (props: {
      title: string
      description: string
      children: ReactNode
      onClose: () => void
    }) => {
      const handleClose = () => {
        props.onClose()
        close()
      }

      return (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={handleClose}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="relative w-[500px] rounded-md border border-theme-primary-light bg-theme-primary-lighter p-6">
                    <div className="flex flex-col gap-6">
                      <header className="flex flex-col gap-1">
                        <Dialog.Title className="text-left" as="h2">
                          {props.title}
                        </Dialog.Title>

                        <p className="text-left">{props.description}</p>
                      </header>
                      {props.children}
                    </div>

                    <button
                      onClick={handleClose}
                      className="absolute right-6 top-6 rounded-md border border-theme-primary-light bg-theme-primary-lighter p-1 text-theme-title"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                      </svg>
                    </button>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )
    },
  }
}
// <Dialog className="relative z-10" open={isOpen} onClose={close}>
//   <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

//   <div className="fixed inset-0 overflow-y-auto">
//     <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//       <Dialog.Title>Deactivate account</Dialog.Title>
//       <Dialog.Description>
//         This will permanently deactivate your account
//       </Dialog.Description>

//       <p>
//         Are you sure you want to deactivate your account? All of your data
//         will be permanently removed. This action cannot be undone.
//       </p>

//       {props.children}
//       <button onClick={() => close}>Deactivate</button>
//       <button onClick={() => close}>Cancel</button>
//     </Dialog.Panel>
//   </div>
// </Dialog>
