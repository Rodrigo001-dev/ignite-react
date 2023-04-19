import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
};

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {/* Box é uma div sem estilização nenhuma */}
      {/* se o showProfileData for true então eu vou mostrar os dados do Profile */}
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Rodrigo Rael</Text>
          <Text color="gray.300" fontSize="small">rodrigorael53@gmail.com</Text>
        </Box>
      )}

      <Avatar size="md" name="Rodrigo Rael" src="https://github.com/Rodrigo001-dev.png"/>
    </Flex>
  );
};