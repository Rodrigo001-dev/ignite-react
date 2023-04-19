import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { useRouter } from "next/router";

interface SidebarDrawerProviderProps {
  children: ReactNode;
};

type SidebarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {
  // eu poderia criar toda a funcionalidade para abrir a sidebar e para fechar
  // mas o chakra dá tudo isso pronto por meio do hook useDisclosure
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    // toda vez que trocar a rota da aplicação, toda vez que o caminho da rota
    // mudar eu vou fechar a sidebar
    disclosure.onClose();
  }, [router.asPath]); // eu vou executar esse useEffect toda vez que o caminho da rota mudar

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
};

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);