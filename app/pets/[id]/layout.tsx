import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  return {
    title: `Pet ${params.id} | SeuPet`,
    description: "Adote já o pet.",
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex flex-col gap-2">
      {children}
      {/* <footer>footer</footer> */}
    </main>
  )
}
