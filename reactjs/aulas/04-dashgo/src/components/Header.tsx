import { Flex, Icon, Input, HStack, Text, Box, Avatar } from '@chakra-ui/react';
import { RiNotificationLine, RiSearchLine, RiUserAddLine } from 'react-icons/ri';

export function Header() {
  return (
    <Flex 
      as="header" 
      w="100%" 
      maxWidth={1480} 
      h="20" 
      mx="auto" 
      mt="4" 
      px="6"
      align="center"
    >
      <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
        dashgo
        <Text as="span" ml="1" color="pink.500">.</Text>
      </Text>

      {
        /* 
          eu fiz com que o componente Flex(que é uma label) parecesse um input
          porque dentro desse componente eu vou ter um icone e o input em si
          quando eu preciso ter icone e input, a melhor forma é eu fazer com que
          o elemento que está por volta dos dois(Flex) pareça o input para a
          pessoa clicar, eu coloquei como lebel esse componente para que se a
          pessoa clicar no icone o input também vai receber o foco
        */
      }
      <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxWidth={400}
        alignSelf="center"
        color="gray.200"
        position="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <Input 
          color="gray.50"
          variant="unstyled"
          px="4"
          mr="4"
          placeholder="Buscar na plataforma"
          _placeholder={{ color: 'gray.400' }}
        />

        <Icon as={RiSearchLine} fontSize="20" />
      </Flex>

      <Flex
        align="center"
        // o ml=auto(margin-left: auto) vai fazer com que todo o conteúdo desse
        // Flex seja jogado totalmente para direita
        ml="auto"
      >
        {/* HStack = HorizontalStack / VStack = VerticalStack */}
        <HStack 
          spacing="8"
          mx="8"
          pr="8"
          py="1"
          color="gray.300"
          borderRightWidth={1}
          borderColor="gray.700"
        >
          <Icon as={RiNotificationLine} fontSize="20" />
          <Icon as={RiUserAddLine} fontSize="20" />
        </HStack>

        <Flex align="center">
          {/* Box é uma div sem estilização nenhuma */}
          <Box mr="4" textAlign="right">
            <Text>Rodrigo Rael</Text>
            <Text color="gray.300" fontSize="small">rodrigorael53@gmail.com</Text>
          </Box>

          <Avatar size="md" name="Rodrigo Rael" src="https://github.com/Rodrigo001-dev.png"/>
        </Flex>
      </Flex>
    </Flex>
  );
};