// o _document funciona de forma semelhante ao _app mas ele é carregado apenas
// uma unica vez na aplicação
// o _document pode ser comparado com o index.html que tinha na pasta public em
// aplicações React

import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet" />
        </Head>
        <body>
          {
            /* 
              esse Main quer dizer que todo todo o conteudo da aplicação vai ser
              renderizado no Main
            */
          }
          <Main />
          {
            /*
              o NextScript é onde o Next vai colocar os arquivos JS que a
              aplicação precisa para funcionar
            */
          }
          <NextScript />
        </body>
      </Html>
    )
  }
};