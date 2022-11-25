import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

// eu vou utilizar essa função em páginas que eu quero que ela só possam ser
// acessadas por usuários autenticados
export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    // por eu estar pelo lado do servidor no Next, toda vez que eu for utilizar
    // as funções do nookies, eu sempre vou passar como primeiro parâmetro o contexto(ctx)
    // antes, quando eu estava utilizando pelo lado do browser eu passada undefined
    const cookies = parseCookies(ctx);

    // se dentro dos cookies não existe o token
    if (!cookies['nextauth.token']) {
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

    // se não entrar no if eu vou retornar a função original do getServerSideProps
    // async (ctx) => {
    //   return {
    //     props: {}
    //   }
    // }
    return await fn(ctx);
  }
}