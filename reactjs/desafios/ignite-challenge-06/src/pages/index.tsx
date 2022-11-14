import { Box, Flex, Heading, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import { Banner } from "../components/Banner";
import { TravelType } from "../components/TravelType";
import { Slide } from "../components/Slide";

export default function Home() {
  const isWideVersion = useBreakpointValue({
    base: false,
    xl: true,
  });

  return (
    <Box w="100vw">
      <Banner />

      { isWideVersion ? (
        <Stack 
          spacing="40"
          direction="row"
          mt="20"
          mx={["16", "20"]}
        >
          <TravelType imageSrc="/images/icons/cocktail.svg" text="vida noturna" />
          <TravelType imageSrc="/images/icons/surf.svg" text="praia" />
          <TravelType imageSrc="/images/icons/building.svg" text="moderno" />
          <TravelType imageSrc="/images/icons/museum.svg" text="clássico" />
          <TravelType imageSrc="/images/icons/earth.svg" text="e mais..." />
        </Stack>
      ) : (
        <Stack 
          spacing="7"
          direction="column"
          p="12"
          mt="9"
        >
          <Flex>
            <TravelType imageSrc="/images/icons/cocktail.svg" text="vida noturna" />
            <TravelType imageSrc="/images/icons/surf.svg" text="praia" />
          </Flex>

          <Flex>
            <TravelType imageSrc="/images/icons/building.svg" text="moderno" />
            <TravelType imageSrc="/images/icons/museum.svg" text="clássico" />
          </Flex>

          <Flex>
            <TravelType imageSrc="/images/icons/earth.svg" text="e mais..." />
          </Flex>
        </Stack>
      ) }

      <Flex direction="column" align="center">
        <Heading 
          py={['6', '14']}
          fontWeight='normal'
          fontSize={['xl', '4xl']}
          textAlign='center'
          color="gray.800"
          lineHeight={['30px', '3.375rem']}
        >
          Vamos nessa?<br /> 
          Então escolha seu continente
        </Heading>

        <Box w={isWideVersion ? 1240 : 375} h={isWideVersion ? 450 : 250} mb="10">
          <Slide />
        </Box>
      </Flex>
    </Box>
  );
}
