import { Box, Stack, Text } from "@chakra-ui/react";

export function Info() {
  return (
    <Stack spacing="10" direction="row">
      <Box>
        <Text fontWeight="semibold" fontSize="5xl" color="yellow.500">
          50
        </Text>
        <Text fontWeight="semibold" fontSize="2xl" color="gray.800">
          países
        </Text>
      </Box>

      <Box>
        <Text fontWeight="semibold" fontSize="5xl" color="yellow.500">
          60
        </Text>
        <Text fontWeight="semibold" fontSize="2xl" color="gray.800">
          línguas
        </Text>
      </Box>

      <Box>
        <Text fontWeight="semibold" fontSize="5xl" color="yellow.500">
          27
        </Text>
        <Text fontWeight="semibold" fontSize="2xl" color="gray.800">
          cidades + 100
        </Text>
      </Box>
    </Stack>
  );
};