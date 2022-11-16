import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../styles/theme';

import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';

import { makeServer } from '../services/miraje';

// se o ambiente em que a aplicação estiver rodando(process.env.NODE_ENV) for o
// ambiente de desenvolvimento(development) então eu vou chamar a função
// makeServer para inicializar o servidor do miraje
if (process.env.NODE_ENV === 'development') {
  makeServer();
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <Component {...pageProps} />
      </SidebarDrawerProvider>
    </ChakraProvider>
  )
}

export default MyApp
