import Link from "next/link"

export default async function NotFound() {
  return (
    <div>
      <p>Pet não encontrado</p>

      <Link href="/">Voltar</Link>
    </div>
  )
}
