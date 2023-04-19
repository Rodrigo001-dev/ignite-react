import { Text } from "@chakra-ui/react";

export function Logo() {
  return (
    <Text 
      // essa é uma das formas de se trabalhar com responsividade no Chakra
      // nesse caso a font vai ficar no tamanho de 2xl quando o usuário estiver
      // em uma tela do tamanho do mobile e a partir disso, ou seja, para todos
      // os outros dispositivos vai ficar 3xl
      fontSize={["2xl", "3xl"]}
      fontWeight="bold" 
      letterSpacing="tight" 
      w="64"
    >
      dashgo
      <Text as="span" ml="1" color="pink.500">.</Text>
    </Text>
  );
};