import { AppProps } from 'next/app';

import { Header } from '../components/Header';

import '../styles/global.scss';

// o _app.tsx é um componente sempre vai ficar por volta de todas as páginas, ou
// seja, quando estmaos acessando uma página no Next.js na verdade o que estamos
// acessando é esse componente(MyApp) e esse componente vai mostrar a página
// quando o Next vai acessar a Home por exemplo, na verdadae ele acessa o _app e
// mostra a home no lugar do Component
// se eu quiser que uma coisa repita em todas as páginas, eu vou colocar aqui
// dentro
// toda vez que o usuário troca de tela, o _app é reexecutado, então tudo o que
// tiver aqui dentro de chamada HTTP, um estado, tudo vai ser recriado do zero,
// toda vez que o usuário trocar de tela

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
