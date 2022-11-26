import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

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

  // se o permissions?.length > 0, ou seja, se o usuário tem alguma permição
  if (permissions?.length > 0) {
    // o método every só vai retornar true caso todas as condições que eu colocar
    // aqui dentro dessa função estiverem satisfeitas
    const hasAllPermissions = permissions.every(permission => {
      // o every vai retornar true caso o usuário tenha todas as permissões que
      // eu estou recebendo dentro do array de permissões
      return user.permissions.includes(permission);
    });

    // se o usuário não estiver todas as permissões
    if (!hasAllPermissions) {
      return false;
    }
  }

  // se o roles?.length > 0, ou seja, se o usuário tem alguam regra
  if (roles?.length > 0) {
    // o método some vai verificar se tem pelo menos alguma condição que eu colocar
    // estiver satisfeita
    const hasAllRoles = roles.some(role => {
      // vai retornar true caso o usuário tenha alguma role dentro do array de
      // roles
      return user.roles.includes(role);
    });

    // se o usuário não estiver todas as regras
    if (!hasAllRoles) {
      return false;
    }
  }

  // se passou de todas as condições que podem acabar retornando false, então ai
  // sim ele tem permissão
  return true;
}