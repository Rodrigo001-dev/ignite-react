import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { validateUserPermissions } from "../utils/validateUserPermissions";

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
};

// o useCan é um hook que vai retornar se o usuário pode ou não pode fazer alguma
// coisa
export function useCan({ permissions, roles }: UseCanParams) {
  const { user, isAuthenticated } = useContext(AuthContext);

  // se o usuário não estiver autenticado
  if (!isAuthenticated) {
    // eu retornei false direto porque se eu estou tentando verificar se o usuário
    // tem premimição para alguma coisa e ele nem está autenticado é óbvio que ele
    // não tem permição
    return false;
  }

  const userHasValidPermissions = validateUserPermissions({
    user,
    permissions,
    roles,
  });
  
  return userHasValidPermissions;
}