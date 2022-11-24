import { createContext, ReactNode, useState } from 'react';
import { setCookie } from 'nookies';
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
  
      // quando realizamos a autenticação, as informações do token e do refreshToken
      // nós precisamos manter elas mesmo se o usuário atualizar a página
      const { token, refreshToken, permissions, roles } = response.data;

      // o setCookie vai salvar uma nova informação dentro dos cookies
      // o setCookie recebe três parâmetros, o primeiro parâmetro é o contexto
      // da requisição, esse primeiro parâmetro não vai existir quando a
      // aplicação está rodando pelo browser, que é o caso aqui, toda a
      // autenticação, vai executar somente no browser, porque ela é derivada de
      // uma ação do usuário, por isso o primeiro parâmetro é undefined, toda vez
      // que eu executar pelo lado do browser o primeiro parâmetro vai ser undefined
      // o segundo parâmetro é o nome do cookie, e o terceiro parâmetro é o valor
      // do que eu quero salvar, que no caso é o token
      // no quarto parâmetro eu posso passar algumas informações adicionais
      setCookie(undefined, 'nextauth.token', token, {
        // maxAge é por quanto tempo eu quero armazenar, eu quero manter esse
        // cookie salvo no meu browser
        maxAge: 60 * 60 * 24 * 30, // 30 days
        // o path é uma informação dizendo quais caminhos da minha aplicação vão
        // ter acesso ao cookie, quando eu coloco / eu básicamente digo que
        // qualquer endereço da minha aplicação vai conseguir ter acesso ao cookie
        path: '/'
      });
      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });

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