import { Center, Image, Link as ChakraLink, Icon } from "@chakra-ui/react";
import Link from 'next/link'
import { FiChevronLeft } from "react-icons/fi";

interface HeaderProps {
  hasBackLink?: boolean;
};

export function Header({ hasBackLink }: HeaderProps) {
  return (
    <Center
      as="header"
      w="100%"
      h="24"
      mx="auto"
    >
       {hasBackLink && (
        <Link href='/'>
          <ChakraLink position='absolute' left={['16px', '40px']}>
            <Icon as={FiChevronLeft} fontSize={["1rem", "2rem"]}/>
          </ChakraLink>
        </Link>
      )}
      <Image src="/images/logo.svg" alt="WorldTrip" />
    </Center>
  );
};