import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'

import { globalStyles } from '../styles/global'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
})

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  )
}
