import { createContext, ReactNode, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';

import { api } from '../services/apiClient';

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
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  // outras informação que eu vou ter dentro do contexto é se o usuário está ou
  // não autenticado
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

// A API Broadcast Channel permite a comunicação básica entre contextos de 
// navegação (ou seja, janelas , guias , quadros ou iframes ) e trabalhadores
// na mesma origem(domínio)
let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, 'nextauth.token');
  destroyCookie(undefined, 'nextauth.refreshToken');

  authChannel.postMessage('signOut');

  Router.push('/');
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  // para eu saber se o usuário está autenticado ou não é só eu ver se existe
  // alguma coisa dentro da variável user
  const isAuthenticated = !! user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;
        default:
          break;
      }
    }
  }, []);

  // toda vez que o usuário acessar a aplicação pela primeira vez(apenas na primeira
  // vez), carregar a informação do estado do usuário(user) novamente
  // esse useEffect é para resolver o problema de se o usuário der um reload na página(F5)
  // porque sem esse useEffect, quando o usuário fizesse um reload da página
  // o estado de user iria estár vazio
  useEffect(() => {
    // eu buscar o token, fazer uma requisição para o backend(api de autenticação)
    // e guardar as informações do usuário

    // o parseCookies vai me devolder uma lista de todos os cookies que eu tenho
    // salvo
    // por conta do . entre o nextauth e o token(nextauth.token) eu tive que colocar
    // '' por volta e renomear para token
    const { 'nextauth.token': token } = parseCookies();

    // se eu tiver um token salvo no storage
    if (token) {
      api.get('/me').then(response => {
        const { email, permissions, roles } = response.data;

        setUser({ email, permissions, roles });
      })
      // so vai cair no catch se acontecer um erro nessa chamada a api, e não for
      // um erro de refreshToken
      .catch(() => {
        signOut();
      })
    };
  }, []);

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

      // é importate que quando eu faça o login, eu também atualize a informação
      // do header de autorização porque se eu não fizer isso e redirecionar o
      // usuário para a tela de dashboard e fazer uma requisição naquela página
      // vai dar erro, porque não vai ter o token para poder enviar nos headers
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};