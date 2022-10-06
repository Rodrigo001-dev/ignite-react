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

import NextAuth from 'next-auth';
import GithubProvider from "next-auth/providers/github";

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
});

export default NextAuth(authOptions);