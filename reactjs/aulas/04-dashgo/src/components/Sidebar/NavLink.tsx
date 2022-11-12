import { ElementType } from "react";
import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";

import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
  // o ElementType é quando eu passo a referência do componente(RiDashboardLine)
  // e não a declaração do componente(<RiDashboardLine />)
  icon: ElementType;
  children: string;
  href: string;
};

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    // o passHref vai pegar o href e passar de forma forçada como um atributo do
    // primeiro elemento renderizado dentro do Link, eu só preciso parras esse
    // passHref somente quando dentro do Link eu não tenho a tag a do HTML
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" alignItems="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  );
};