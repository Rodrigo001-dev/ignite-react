import Head from 'next/head';

// o Head é um componente React que eu posso colocar em qualquer lugar da minha 
// tela e tudo que eu colocar dentro do Head vai ser anexado ao head do meu
// _document, assim é possível configurar algumas coisas do cabeçalho da
// aplicação por página

import { SubscribeButton } from '../components/SubscribeButton';

import styles from './home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for $9.90 month</span>
          </p>
          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}
