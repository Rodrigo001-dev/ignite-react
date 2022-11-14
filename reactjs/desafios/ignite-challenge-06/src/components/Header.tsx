import { Center, Image, Link as ChakraLink, Icon } from "@chakra-ui/react";

export function Header() {
  return (
    <Center
      as="header"
      w="100%"
      h="24"
      mx="auto"
    >
      <Image src="/images/logo.svg" alt="WorldTrip" />
    </Center>
  );
};