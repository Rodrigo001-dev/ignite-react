import { createGlobalStyle } from 'styled-components'

import firaCode from '../assets/fonts/FiraCode-Regular.woff'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'FiraCode';
    src: url(${firaCode} format('woff'));
    font-weight: 400;
    font-style: normal;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    ::-webkit-scrollbar {
      width: 0.45rem;
    }

    ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors['blue-600']};
    }

    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors['blue-400']};
      border-radius: 999px
    }
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors['gray-300']};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font: 400 ${({ theme }) => theme.textSizes['text-m']} 'Nunito', sans-serif;
    line-height: 160%;
  }

  ul {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }
`
