import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { theme } from '../styles/theme';

import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';

import { makeServer } from '../services/miraje';
import { queryClient } from '../services/queryClient';

// se o ambiente em que a aplicação estiver rodando(process.env.NODE_ENV) for o
// ambiente de desenvolvimento(development) então eu vou chamar a função
// makeServer para inicializar o servidor do miraje
if (process.env.NODE_ENV === 'development') {
  makeServer();
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
