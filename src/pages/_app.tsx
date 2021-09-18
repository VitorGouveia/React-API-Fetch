import { FC } from "react"
import type { AppProps } from 'next/app'

import '../styles/global/global.css'
import '../styles/home.css'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default App