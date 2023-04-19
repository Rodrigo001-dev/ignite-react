import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import ReactCountryFlag from 'react-country-flag';

export function Card() {
  return (
    <Box w="256px" mx={["auto", "0"]}>
      <Image 
        borderTopRadius="4" 
        src="/images/europe.jpg"
        alt="Londres"
        w="100%"
        h="173"
        objectFit="cover"
      />
      <Flex
        justify="space-between"
        align="center"
        p={6}
        border="1px"
        borderColor="yellow.100"
        borderTop="0"
        borderBottomRadius="4"
      >
        <Flex direction="column">
          <Heading 
            as="h3" 
            fontSize="xl" 
            fontWeight="semibold" 
            mb={3} 
            color="gray.800"
          >
            Londres
          </Heading>
          <Text color="gray.200" fontSize="md">Reino Unido</Text>
        </Flex>

        <ReactCountryFlag
          style={{
            fontSize: "2em",
            lineHeight: "2em",
            borderRadius: "50%",
            objectFit: "cover"
          }}
          aria-label="Reino Unido"
          countryCode="GB"
          svg
        />
      </Flex>
    </Box>
  );
};