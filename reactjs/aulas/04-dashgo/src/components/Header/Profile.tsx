import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      {/* Box é uma div sem estilização nenhuma */}
      <Box mr="4" textAlign="right">
        <Text>Rodrigo Rael</Text>
        <Text color="gray.300" fontSize="small">rodrigorael53@gmail.com</Text>
      </Box>

      <Avatar size="md" name="Rodrigo Rael" src="https://github.com/Rodrigo001-dev.png"/>
    </Flex>
  );
};