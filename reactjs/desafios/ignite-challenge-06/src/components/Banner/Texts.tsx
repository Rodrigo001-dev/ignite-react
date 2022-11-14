import { Flex, Text } from "@chakra-ui/react";

export function Texts() {
  return (
    <Flex direction="column" pl={["4", "16", "36"]}>
      <Text 
        fontWeight="medium" 
        fontSize={["xl", "4xl"]} 
        pt={["7", "20"]} 
        pb={["2" ,"5"]}
      >
        6 Continentes,<br/> 
        infinitas possibilidades.
      </Text>
      <Text 
        fontWeight="regular" 
        fontSize={["sm", "xl"]} 
        color="gray.100"
        pb={["7", "16"]}
      >
        Chegou a hora de tirar do papel a viagem que você<br/>
        sempre sonhou.
      </Text>
    </Flex>
  );
};