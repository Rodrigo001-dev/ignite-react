import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* variaveis para as cores */
  :root {
    --background: #F0F2F5;
    --shape: #FFFFFF;

    --green: #33cc95;
    --red: #E52E4D;

    --blue: #5429CC;
    --blue-light: #6933FF;

    --text-title: #363F5F;
    --text-body: #969CB3;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* font-size: 16px(desktop) => tamanho de fonte padrão  */
  html {
    /*
      a fonte vai ser diminuida poque em dispositivos menores faz sentido que a
      fonte fique menor
    */
    @media (max-width: 1080px) {
      /*
        está sendo utilizado percentual porque se o usuário estiver com a
        configuração de aumentar a fonte por exemplo e se estiver em 15px
        a fonte não vai mudar(não vai funcionar) mas se estiver em 93.75% a fonte
        vai mudar(vai funcionar)
      */
      font-size: 93.75%; // 15px
    }

    @media (max-width: 720px) {
      font-size: 87.5%; // 14px
    }
  }

  body {
    background: var(--background);
    /*
     esse webkit é só um hack para todos os browsers que utilizam a engine do
     chrome para as fontes ficarem mais detalhadas, mais nítidas
    */
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  /* tudo que estiver dasabilitado na aplicação */
  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;