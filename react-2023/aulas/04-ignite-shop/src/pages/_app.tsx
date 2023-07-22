import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'

import { Header } from '../components/Header'

import { CartContextProvider } from '../contexts/CartContext'

import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
})

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container className={roboto.className}>
      <CartContextProvider>
        <Header />

        <Component {...pageProps} />
      </CartContextProvider>
    </Container>
  )
}
