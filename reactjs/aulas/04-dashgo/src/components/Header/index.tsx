import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';

import { Profile } from './Profile';
import { NotificationsNav } from './NotificationsNav';
import { SearchBox } from './SearchBox';
import { Logo } from './Logo';

import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

export function Header() {
  const { onOpen } = useSidebarDrawer();
  // o useBreakpointValue é um hook do Chakra para trabalhar com responsividade
  // isWideVersion = se estamos na versão larga da tela
  const isWideVersion = useBreakpointValue({
    // por padrão eu não vão estar visíveis(no caso os dados do perfil)
    base: false,
    // e quando passar do tamanho lg(large) vão estár visíveis
    lg: true,
  });

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
      {
        /* 
          se a tela não estiver na versão Wide(!isWideVersion), ou seja se o
          isWideVersion for false vai aparecer um IconButton para abriar 
          sidebar
        */
      }
      { !isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        >

        </IconButton>
      ) }

      <Logo />
      
      {/* se a tela estiver na versão larga dela(lg) então eu mostro o SearchBox */}
      { isWideVersion && <SearchBox /> }

      <Flex
        align="center"
        // o ml=auto(margin-left: auto) vai fazer com que todo o conteúdo desse
        // Flex seja jogado totalmente para direita
        ml="auto"
      >
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
};