import { createContext, ReactNode, useState } from 'react';
import Router from 'next/router';

import { api } from '../services/api';

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  // mesmo eu tendo somente uma página para login, mas por ser que algum momento
  // eu tenha um formulário por exemplo ou alguma outra ação da aplicação que
  // necessite da autenticação do usuário, então por isso que a parte de autenticar
  // o usuário(signIn) vai estar dentro do contexto para que ela possa ser
  // compartilhada com toda a aplicação
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User;
  // outras informação que eu vou ter dentro do contexto é se o usuário está ou
  // não autenticado
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  // para eu saber se o usuário está autenticado ou não é só eu ver se existe
  // alguma coisa dentro da variável user
  const isAuthenticated = !! user;

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password
      });
  
      const { permissions, roles } = response.data;

      setUser({
        email,
        permissions,
        roles
      });

      Router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};