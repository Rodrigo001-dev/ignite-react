import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { theme } from '../styles/theme';

import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';

import { makeServer } from '../services/miraje';

// se o ambiente em que a aplicação estiver rodando(process.env.NODE_ENV) for o
// ambiente de desenvolvimento(development) então eu vou chamar a função
// makeServer para inicializar o servidor do miraje
if (process.env.NODE_ENV === 'development') {
  makeServer();
};

const queryClient = new QueryClient;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
