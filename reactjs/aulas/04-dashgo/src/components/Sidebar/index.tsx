import { 
  Box, 
  Drawer, 
  DrawerBody, 
  DrawerCloseButton, 
  DrawerContent, 
  DrawerHeader, 
  DrawerOverlay, 
  useBreakpointValue 
} from "@chakra-ui/react";

import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";

import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer();

  const isDrawerSidebar = useBreakpointValue({
    // por padrão eu vou ter que clicar em um button para a sidebar aparecer
    base: true,
    // a partir do tamanho lg(large) eu não vou precisar de um button para ela
    // aparecer
    lg: false,
  });

  // se for uma siebar do tipo Drawer, que é aquela que aparece por um click de
  // um button
  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        {/* o DrawerOverlay vai deixar a tela mais escura para a sidebar receber o foco */}
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>

            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  };

  return (
    <Box as="aside" w="64" mr="8">
      <SidebarNav />
    </Box>
  );
};