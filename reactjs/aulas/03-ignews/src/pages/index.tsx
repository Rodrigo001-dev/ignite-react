import Head from 'next/head';

// o Head é um componente React que eu posso colocar em qualquer lugar da minha 
// tela e tudo que eu colocar dentro do Head vai ser anexado ao head do meu
// _document, assim é possível configurar algumas coisas do cabeçalho da
// aplicação por página

export default function Home() {
  return (
    <>
      <Head>
        <title>Início | ig.news</title>
      </Head>
      <h1>Hello World</h1>
    </>
  )
}
