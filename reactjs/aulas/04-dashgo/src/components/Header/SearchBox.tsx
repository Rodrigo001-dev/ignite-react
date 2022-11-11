import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
  return (
    /* 
      eu fiz com que o componente Flex(que é uma label) parecesse um input
      porque dentro desse componente eu vou ter um icone e o input em si
      quando eu preciso ter icone e input, a melhor forma é eu fazer com que
      o elemento que está por volta dos dois(Flex) pareça o input para a
      pessoa clicar, eu coloquei como lebel esse componente para que se a
      pessoa clicar no icone o input também vai receber o foco
    */
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: 'gray.400' }}
      />

      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
};