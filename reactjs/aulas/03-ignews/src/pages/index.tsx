import { GetServerSideProps } from 'next';

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

// com o getServerSideProps eu vou fazer uma chamada a API utilizando a camada
// de servidor node do Next
// a diferença entre fazer uma chamada aqui utilizando isso e fazer dentro do
// com componente utilizando um useEffect por exemplo é que a chamada vai acontecer
// somente no browser(cliente) depois que a interface já estiver pré-montada e
// isso pode ocasionar 2 problemas, primeiro a página pode ter carregado e a
// chamada pode não ter terminado, isso vai dar uma mudança no layout que fica
// perceptível para o usuário e não é muito legal
// outro problema que isso causa é que se eu for indexar essa página no google,
// quando o google for indexar essa página, e uma informação crucial estiver
// sendo pegada por uma chamda a API dentro do componente, o google não iria
// indexar essa informação, essa informação não estaria disponível nem na
// descrição, nem no conteúdo da página, nem em qualquer lugar
// utilizando o SSR(Server Side Rendering) para fazer chamada a API, quando o
// Next devolver a interface pronta pro browser ela já venha com as informações
// que foram buscadas da API
export const getServerSideProps: GetServerSideProps = async () => {
  // todo o código que eu colocar dentro dessa função, vai ser executado no
  // servidor node que o Next executa junto com a nossa aplicação React
  return {
    // tudo o que eu repassar como uma propriedade(props), eu consigo acessar
    // o essas essas informações através das props do componente
    props: {

    }
  }
};
