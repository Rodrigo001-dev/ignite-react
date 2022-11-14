import { Flex, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link'

interface SlideItemProps {
  title: string;
  description: string;
  link: string;
  imageSrl: string;
}

export function SlideItem({ title, description, link, imageSrl }: SlideItemProps) {
  return (
    <Link href={`/continents/${link}`}>
      <Flex
        w="100%"
        h="100%"
        align="center"
        justify="center"
        direction="column"
        bgImage={`url(${imageSrl})`}
        bgPosition='center'
        bgRepeat='no-repeat'
        bgSize='cover'
        textAlign='center'
      >
        <Heading 
          fontSize={["2xl", "5xl"]}
          color="gray.50" 
          fontWeight="700"
        >
          {title}
        </Heading>
        <Text 
          fontWeight="bold" 
          color="gray.100" 
          fontSize={["sm","2xl"]}
          mt={["12px", "4"]}
        >
          {description}
        </Text>
      </Flex>
    </Link>
  )
}