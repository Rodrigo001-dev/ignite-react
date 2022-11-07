import { extendTheme } from '@chakra-ui/react';

// eu vou estender o tema padrão do chakra, eu vou reaproveitar o tema que o
// chakra já tem e vou substituir o que quiser nele
export const theme = extendTheme({
  colors: {
    gray: {
      "900": "#181B23",
      "800": "#1F2029",
      "700": "#353646",
      "600": "#4B4D63",
      "500": "#616480",
      "400": "#797D9A",
      "300": "#9699B0",
      "200": "#B3B5C6",
      "100": "#D1D2DC",
      "50": "#EEEEF2",
    }
  },
  styles: {
    global: {
      body: {
        // backgroundColor
        bg: 'gray.900',
        // cor do texto
        color: 'gray.50'
      }
    }
  },
});