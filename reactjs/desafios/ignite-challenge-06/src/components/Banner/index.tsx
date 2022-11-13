import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { Airplane } from "./Airplane";

import { Texts } from "./Texts";

export function Banner() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex 
      bgImage="url('/images/bg-banner.png')"
      backgroundRepeat="no-repeat"
      w="100%"
      align="center"
    >
      <Texts />
      { isWideVersion && <Airplane /> }
    </Flex>    
  );
};