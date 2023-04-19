import { Box, Flex, Image, Text, useBreakpointValue } from "@chakra-ui/react";

interface TravelTypeProps {
  imageSrc?: string;
  text: string;
};

export function TravelType({ imageSrc, text }: TravelTypeProps) {
  return (
    <Flex 
      direction="column"
      w={["sm", "md", "lg"]}
      maxW={1160}
      align="center" 
      justify="center"
    >
      <Image src={imageSrc} alt="" w="20" h="20" pb="6" />
      <Text fontWeight="semibold" fontSize="2xl" color="gray.800">
        {text}
      </Text>
    </Flex>
  );
};