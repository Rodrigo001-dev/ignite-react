import { ReactNode } from "react";

import { useCan } from "../hooks/useCan";

interface CanProps {
  children: ReactNode;
  permissions?: string[];
  roles?: string[]; 
};

// vai verificar se o usuário pode fazer alguma coisa
export function Can({ children, permissions, roles }: CanProps) {
  const userCanSeeComponent = useCan({ permissions, roles });

  // se o usuário não pode ver o componente
  if (!userCanSeeComponent) {
    return null;
  }
  
  return (
    <>
      {children}
    </>
  );
}