import { ReactNode, useRef, useState } from "react"

export const useModal = () => {
  const [open, setOpen] = useState(false)

  const ref = useRef<HTMLDialogElement>(null)

  const openModal = () => {
    setOpen(true)
    ref.current?.showModal()
  }

  const closeModal = () => {
    setOpen(false)
    ref.current?.close()
  }

  return {
    open: openModal,
    close: closeModal,
    Modal: (props: {
      title: string
      description: string
      children: ReactNode
    }) => {
      return (
        <dialog
          ref={ref}
          className="border-theme-primary-light w-[500px] rounded-md border p-6"
        >
          <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-1">
              <h2>{props.title}</h2>
              <p>{props.description}</p>
            </header>
            {props.children}
          </div>

          <button
            onClick={closeModal}
            className="border-theme-primary-light bg-theme-primary-lighter text-theme-title absolute right-6 top-6 rounded-md border p-1"
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
        </dialog>
      )
    },
  }
}
