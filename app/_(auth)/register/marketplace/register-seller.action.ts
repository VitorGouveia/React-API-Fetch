"use server"

export const registerSeller = async (
  prevState: { formErrors: {} },
  formData: FormData
) => {
  return {
    formErrors: {
      name: "O nome está errado",
      password: "Senha incorreta",
    },
  }
}
