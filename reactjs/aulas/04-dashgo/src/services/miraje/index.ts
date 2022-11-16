import { createServer, Model } from 'miragejs';

type User = {
  // eu estou definido os nomes dos campos como se fossem colunas no meu banco
  // de dados
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    // declarando os model, informando qual tipo de dado eu tenho dentro do miraje
    models: {
      // pode existir momentos em que eu precise utilizar do User sem informar
      // todos os campos e é para isso que serve o Partial
      // o Partial<User> quer dizer que os usuários que eu vou salvar dentro do
      // miraje precisam conter os campos que tem dentro do type User mas talvez
      // não conter todos os campos
      user: Model.extend<Partial<User>>({})
    },
    
    routes() {
      // estou setando o caminho que a aplicação vai precisar acessar para
      // conseguir chamar as rotas do miraje, ou seja, para conseguir acessar
      // um recurso do miraje eu preciso passar por exemplo /api/users
      this.namespace = 'api';
      // passando isso this.timing = 750 vai fazer com que toda chamada que eu 
      // faça para API do miraje demore 750 milissegundos(ms) para acontecer, 
      // ou seja, ela vai ficar com um delay, isso é muito importante quando
      // queremos testar os carregamentos
      this.timing = 750; // 750ms

      // passando somente o this.get('/users'); o mirage vai entender
      // automáticamente que quando eu chamar a rota users com o método get ele
      // deve retornar a lista completa de usuários que eu tenho dentro da
      // aplicação 
      this.get('/users');
      // ou seja se eu criar o this.post('/users'); o miraje automáticamente
      // vai criar a estrutura necessária para eu conseguir criar um usuário sem
      // eu precisar vazer qualquer coisa, ou seja, se eu chamar a rota users com
      // o método post passando os campos dentro do tipo User ele vai criar
      // um usuário para mim de forma totalmente automátizada
      this.post('/users');

      // utilizando o miraje no Next, o conceito de API routes do Next também
      // utilza os caminhos das rotas com o começo de /api, então umas das
      // alternativas é resetar o namespace no final, ou seja, ele vai utilizar
      // o namespace api para as rotas e quando ele terminar de definir as rotas
      // do miraje vai voltar o namespace para como ele tava originalmente('')
      // para não prejudicar as rotas de api que tem dentro do Next
      this.namespace = '';
      // quando estamos no Next além de definir o namespace = '' é importante
      // chamar o método chamado this.passthrough(), ele vai fazer com que todas
      // as chamadas que sejam enviadas para o endereço api passem pelo miraje e
      // se elas não forem detectadas pelas rotas do miraje elas vão passar
      // adiante para a rota original delas que no caso são as API routes
      this.passthrough()
    }
  });


  return server;
};