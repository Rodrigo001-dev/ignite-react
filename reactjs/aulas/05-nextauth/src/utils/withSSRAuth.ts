import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
// o decode server básicamente para decodificar um token e pegar o que existe de
// conteúdo dentro dele
import decode from 'jwt-decode';

import { AuthTokenError } from "../services/errors/AuthTokenError";

import { validateUserPermissions } from "./validateUserPermissions";

type WithSSRAuthOptions = {
  permissions?: string[];
  roles?: string[];
};

// eu vou utilizar essa função em páginas que eu quero que ela só possam ser
// acessadas por usuários autenticados
export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: WithSSRAuthOptions) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    // por eu estar pelo lado do servidor no Next, toda vez que eu for utilizar
    // as funções do nookies, eu sempre vou passar como primeiro parâmetro o contexto(ctx)
    // antes, quando eu estava utilizando pelo lado do browser eu passada undefined
    const cookies = parseCookies(ctx);
    const token = cookies['nextauth.token'];

    // se dentro dos cookies não existe o token
    if (!token) {
      return {
        // eu vou redirecionar o usuário para a página de login
        redirect: {
          destination: '/',
          // colocando o permanent como false eu falo que o redirecionamento não é
          // permanente por conta do HTTP code para o browser entender se é um
          // redirecionamento que sempre vai acontecer ou se só aconteceu dessa vez
          // por conta de alguma condição
          permanent: false,
        }
      }
    }

    // se o usuário enviou alguma opção de permissions e roles para serem validadas,
    // ou seja, se o options não for undefined
    if (options) {
      const user = decode<{ permissions: string[], roles: string[] }>(token);
      const { permissions, roles } = options;

      const userHasValidPermissions = validateUserPermissions({
        user,
        permissions,
        roles,
      });

      // se o usuário não tem permissões válidas
      if (!userHasValidPermissions) {
        return {
          // eu vou enviar o usuário que não tem permissões para alguma página
          // que eu sei que todos os usuários tem permissão para acessar 
          redirect: {
            destination: '/dashboard',
            permanent: false,
          },
        }
      }
    }

    try {
      // se não entrar no if eu vou retornar a função original do getServerSideProps
      // async (ctx) => {
      //   return {
      //     props: {}
      //   }
      // }
      return await fn(ctx);
    } catch (error) {
      // se o erro for uma instância de AuthTokenError
      if (error instanceof AuthTokenError) {
        // eu vou destruir os cookies
        destroyCookie(ctx, 'nextauth.token');
        destroyCookie(ctx, 'nextauth.refreshToken');

        // e fazer um redirecionamento para a página Home
        return {
          redirect: {
            destination: '/',
            permanent: false,
          }
        }
      }
    }
  }
}