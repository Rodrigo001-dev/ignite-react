import { ElementType } from "react";
import { Icon, Link, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";

interface NavLinkProps extends ChakraLinkProps {
  // o ElementType é quando eu passo a referência do componente(RiDashboardLine)
  // e não a declaração do componente(<RiDashboardLine />)
  icon: ElementType;
  children: string;
};

export function NavLink({ icon, children, ...rest }: NavLinkProps) {
  return (
    <Link display="flex" alignItems="center" {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">{children}</Text>
    </Link>
  );
};