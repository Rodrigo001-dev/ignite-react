import { Box, Center, Flex, Heading, SimpleGrid, Text, useBreakpointValue } from "@chakra-ui/react";

import { Info } from "../../components/Info";

export default function Europa() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  
  return (
    <Box>
      <Box
        bgImage={"url('/images/europe.jpg')"}
        bgPosition='center'
        bgRepeat='no-repeat'
        bgSize='cover'
        height={['150','500']}
      >
        <Box
          h='100%'
          mx='auto'
          px={10}
          position='relative'
        >
          {isWideVersion ? (
            <Heading 
              as='h1'
              fontWeight='600'
              fontSize='5xl'
              position='absolute'
              bottom='60px'
              textTransform='capitalize'
            >
              Europa
            </Heading>
          ) : (
            <Center w='100%' h='100%'>
              <Text
                as='h1'
                fontWeight='600'
                fontSize='1.75rem'
              >
                Europa
              </Text>
            </Center>
          )}
        </Box>
      </Box>

      <Box
        h="100%"
        mx="auto"
        px={["4", "10"]}
      >
        <Flex
          direction={["column", "column", "column", "row"]}
          justify="space-between"
          align="center"
          maxW="1280px"
          mt={["6", "20"]}
          mb={["8", "20"]}
        >
          <Text 
            maxW="600px" 
            fontSize={["sm", "2xl"]} 
            ml={["4", "36"]}
            mb="4"
            color="gray.800" 
          >
            A Europa é, por convenção, um dos seis continentes do mundo. Compreendendo a península ocidental da Eurásia, a Europa geralmente divide-se da Ásia a leste pela divisória de águas dos montes Urais, o rio Ural, o mar Cáspio, o Cáucaso, e o mar Negro a sudeste
          </Text>
          <Info />
        </Flex>

        <Box>
          <Heading
            fontWeight="medium"
            fontSize={["2xl", "4xl"]}
            color="gray.800"
          >
            Cidades +100
          </Heading>

          <SimpleGrid columns={[1, 4]} spacing={[5, 10]} my={["5", "45px"]}>
            <Card />
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};