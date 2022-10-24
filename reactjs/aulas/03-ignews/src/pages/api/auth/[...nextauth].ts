// tudo que for executado dentro da pasta api vai ser executado na camada
// backend do Next, no servidor node(camada intermediária)
// tudo que for feito pelo getStaticProps, getServerSideProps ou nas API Routes,
// vão rodar no momento em que o usuário não tem acesso, elas não executam no
// browser, ou seja, dentro desses 3 métodos podemos ter acesso a informações
// mais confidenciais.
// todas as API Routes são executadas utilizando o conceito de serverless, ou
// seja, quando a aplicação Next é envidada para produção as rotas de dentro da
// pasta api não vão formar um servidor(não existe um servidor node que fica 24h
// rodando aguardando as requisições nessas rotas), o que acontece é que toda a
// vez que a rota é chamada vai subir um ambiente isolado e executar essa
// função, a partir do momento que ela devolveu uma resposta aquele ambiente
// isolado da função serverless morre, o serverless tem muito a ver com isso,
// ele não precisa de um servidor executando 24h para aguardar requisições, na
// verdade ele só sobe e desce os ambientes conforme as rotas vão sendo chamadas
// e precisam ser executadas

// na questão de autenticação, na grande maioria das aplicações que estão sendo
// desenvolvidas agora, que não são aplicações de grande porte, não existe
// método mais simples de autenticação que continua seguro do que utilizar um
// token JWT, salvar esse token dentro de um Storage qualquer, recuperar esse
// token, colocar uma data de expiração e trabalhar ele com refresh token.

// a primeira estratégia mais comum de autenticação que é simplesmente um JWT
// salvo no Storage, e esse JWT geralmente tem uma dara de expiração.

// outra forma muito comum que temos dentro do Next é o Next Auth, nós utilizamos
// quando queremos um sistema de autenticação simples e quando precisamos
// login social(GitHub, google, facebook), e também conseguimos utilizar o
// Next Auth quando não queremos se preocupar em ficar armazenando
// credenciais(email, senha) de acesso do usuário dentro do nosso backend, o
// Next Auth é uma autenticação que independe de ter um backend, é possível
// fazer uma autenticação na aplicação utilizando somente as API Routes do Next

// Existem outros modelos de autenticação por exemplo utilizando os serviços
// externos como Cognito(aws), Auth0 que são Providers de autenticação externos,
// ou seja, esses Providers vão se conectar e vão armazenar dados do
// usuário(email, senha), fazer envio de e-mail, é como se fosse um serviço de
// autenticação

// quando eu preciso criar rotas dinâmicas(que recebem parâmetros) como por
// exemplo buscar um usuário pelo id, então como o id é um parâmetro, eu posso
// colcoar [] por volta do parâmetro => [id].tsx, com isso eu vou ter acesso ao
// id do usuário através request.query

// existem rotas que são utilizadas principalmente quando eu estou fazendo
// integração com algum terceiro, quando eu colocar o nome da rota [...nextauth]
// por exmplo(nesse caso esse arquivo está detro da pasta auth), o que vai
// acontecer é que tudo que eu mandar depois de auth(pasta que é uma rota) vai
// ser repassado para uma variável chamada nextauth

import NextAuth, { Account, Profile, User } from 'next-auth';
import GithubProvider from "next-auth/providers/github";

import { query as q } from 'faunadb';

import { fauna } from '../../../services/fauna';

export const authOptions = ({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          // no caso do github temos que definier o scope, o escopo nesse caso
          // quer dizer quais informações eu quero ter acesso do usuário
          // o read:user vai conceder acesso para ler informações do
          // perfil do usuário
          scope: 'read:user',
        }
      },
    }),
  ],
  // callbacks são funções que são executadas de forma automática do NextAuth
  // assim que acontece alguma ação 
  callbacks: {
    // o session vai nos permitir modificar os dados que estão dentro do session
    async session({ session }) {
      try {
        // vai buscar se o usuário tem uma inscrição ativa ou não
        const userActiveSubscription = await fauna.query(
          q.Get(
            // união é quando eu quero buscar ou um Match ou o outro
            // intersecção(intersection) é quando eu quero buscar os dois Match
            // Difereça é quando eu quero buscar apenas os itens de um Match
            q.Intersection([
              // nesse Match eu estou buscando os dados do usuário pela ref dele 
              // na collection de subscriptions onde o email bata com o email
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              // nesse Match eu estou dizendo que só vou pegar os dados desse
              // usuário se o status for active(tudo isso graças ao Intersection)
              q.Match(
                q.Index('subscription_by_status'),
                "active"
              )
            ])
          )
        );

        // e no final é retornado o session com os dados modificados
        return {
          ...session,
          activeSubscription: userActiveSubscription
        }
      } catch {
        return {
          ...session,
          activeSubscription: null,
        }
      }
    },
    // sempre que o usuário faz login na aplicação vai ser executada essa função
    // sigIn
    async signIn(params: { user: User, account: Account, profile: Profile }) {
      const { email } = params.user;

      try {
        // nós não podemos buscar informações do banco de dados no Fauna sem um 
        // índice(index)
        // lá no Fauna eu criei um índice(index) para encontrar um usuário por
        // email(user_by_email), ou seja, se eu quiser encontrar um usuário 
        // por nome, eu teria quer criar um index lá no fauna para encontrar 
        // um usuário por nome

        // nós não podemos buscar informações do banco de dados no Fauna sem um
        // índice porque imagine que dentro do banco de dados temos milhares 
        // usuários com id, nome e email, agora imagine que realizamos uma query
        // para buscar um usuário com um email específico, o banco de dados 
        // teria que percorrer cada um dos registros até ele encontrar um que
        // bata com o email específico que eu quero e aí retornar aquele
        // registro, ou seja, se o registro for o 11826, o banco de dados teria
        // que percorrer todos até o 11826 para encontrar esse registro, alguns
        // bancos de dados são previamente otimizados e criam índices internos
        // para eles conseguirem se localizar melhor nisso, mas na grande maioria
        // das vezes não são índices extremamente performáticos, o que nós
        // geralmente fazemos nos banco de dados é criar índice
        // cada vez que criamos um índice por exemplo user_by_email(índice dos
        // usuários pelo campo email) o que o banco de dados vai fazer é
        // vai criar uma outra estrutura de dados onde a chave é o índice(a
        // coluna email nesse caso) e o valor é a referência ou uma cópia dos
        // dados que existem dentro da tabela de usuários, ou seja, quando eu for
        // buscar por usuário que bate com o email que eu quero para o banco de
        // dados é muito facíl ir na estrutura onde a chave é o índice para
        // procurar pela chave(no caso o email), com isso eu não preciso que ele
        // percorra todos os usuários para achar o que eu quero, com o índice é
        // muito mais rápido
        await fauna.query(
          // se
          q.If(
            // não
            q.Not(
              // existe
              q.Exists(
                // Match = Where
                q.Match(
                  // um usuário
                  q.Index('user_by_email'),
                  // que bate com esse email
                  q.Casefold(params.user.email)
                )
              )
            ),
            // eu quero que crie
            q.Create(
              // na Collection de users
              q.Collection('users'),
              // um usuário com esse email
              { data: { email } }
            ),
            // se não, se ele existir
            // vai buscar
            q.Get( //Select
              q.Match(
                // um usuário
                q.Index('user_by_email'),
                // que bate com esse índice(email) aqui
                q.Casefold(params.user.email)
              )
            )
          )
        );

        // return true significa que o login deu certo 
        return true;
      } catch {
        // isso vai evitar que o usuário consiga fazer login na aplicação se ela
        // não conseguiu fazer a integração com o banco de dados
        return false;
      }
    }
  }
});

export default NextAuth(authOptions);