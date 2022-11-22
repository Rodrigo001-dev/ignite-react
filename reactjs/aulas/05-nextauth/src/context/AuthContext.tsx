import { createContext, ReactNode } from 'react';

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
  // outras informação que eu vou ter dentro do contexto é se o usuário está ou
  // não autenticado
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  async function signIn({ email, password }: SignInCredentials) {
    console.log({ email, password });
  };

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};