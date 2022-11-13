import { Flex } from "@chakra-ui/react";
import { Airplane } from "./Airplane";

import { Texts } from "./Texts";

export function Banner() {
  return (
    <Flex bgImage="url('/images/bg-banner.png')" w="100%">
      <Texts />
      <Airplane />
    </Flex>    
  );
};