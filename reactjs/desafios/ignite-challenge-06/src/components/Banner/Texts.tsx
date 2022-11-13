import { Flex, Text } from "@chakra-ui/react";

export function Texts() {
  return (
    <Flex direction="column" pl="36">
      <Text fontWeight="medium" fontSize="4xl" pt="20" pb="5">
        5 Continentes,<br/> 
        infinitas possibilidades.
      </Text>
      <Text fontWeight="regular" fontSize="xl" color="gray.100" pb="16">
        Chegou a hora de tirar do papel a viagem que você<br/>
        sempre sonhou.
      </Text>
    </Flex>
  );
};