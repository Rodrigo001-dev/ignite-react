import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';

interface AxiosErrorResponse {
  code?: string;
};

let cookies = parseCookies();
// essa variável identifica se eu estou atualizando o token ou não
let isRefreshing = false;
// todas as requisições que aconteceram que deram falha por causa do token expirado
let failedRequestsQueue = [];

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    // aqui eu configuro os headers defaults, os headers que vão vir configurados
    // desde o primeiro momento que eu inicializar a minha aplicação
    Authorization: `Bearer ${cookies['nextauth.token']}`
  }
});

// eu vou interceptar uma resposta, porque eu preciso esperar uma resposta do
// backend para então fazer algum tipo de regra de negócio
// o use() recebe duas funções como parâmetro, a primeira função é o que fazer
// se a resposta der sucesso
// o segundo parâmetro(segunda função) é o que eu quero fazer se a resposta der
// erro
api.interceptors.response.use(response => {
  // se a resposta der sucesso, literalmente eu não quero fazer nada, por isso
  // eu peguei a resposta que deu sucesso e vou retornar ela do jeito que eu 
  // recebi
  return response;
}, (error: AxiosError<AxiosErrorResponse>) => {
  // se o status do erro for 401
  if (error.response.status === 401) {
    // dentro do backend eu retono um code unico para cada erro
    if (error.response.data?.code === 'token.expired') {
      // renovar o token
      // buscando os cookies novamente e preenchendo dentro da variável cookies
      cookies = parseCookies();

      const { 'nextauth.refreshToken': refreshToken } = cookies;
      // o error.config é básicamente toda a configuração da requisição que eu
      // fiz para o backend, ou seja, dentro do error.config vai ter todas as
      // informações que eu preciso para repetir uma requisição para o backend
      const originalConfig = error.config;

      // se eu ainda não estiver realizando um refresh de token, ou seja, se o
      // isRefreshing for false
      if (!isRefreshing) {
        // quando eu receber a primeira responsta de token inválido, eu vou
        // atualizar o token
        isRefreshing = true;

        api.post('/refresh', {
          refreshToken,
        }).then(response => {
          // dentro da minha resposta eu vou ter o meu novo token
          const { token } = response.data;
  
          // salvando os novos dados dentro dos cookies
          setCookie(undefined, 'nextauth.token', token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/'
          });
  
          setCookie(undefined, 'nextauth.refreshToken', response.data.refreshToken, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/'
          });
  
          api.defaults.headers['Authorization'] = `Bearer ${token}`;

          // se o refresh deu certo, eu vou na minha lista de requisições falhadas
          // e para cada uma delas eu vou pegar a requisição e executar o método
          // onSuccess passando o token atualizado
          failedRequestsQueue.forEach(request => request.onSuccess(token));
          failedRequestsQueue = [];
        }).catch(error => {
          failedRequestsQueue.forEach(request => request.onFailure(error));
        }).finally(() => {
          isRefreshing = false;
        });
      }

      // eu estou retornando uma Promise porque o axios não suporta que eu realize
      // o interceptor com async e usar o await, e com isso a unica forma de fazer
      // com que um código possa ser assíncrono é retornando de dentro do interceptor
      // uma Promise
      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          // onSuccess é o que vai acontecer quando o processo de refresh estiver
          // finalizado
          onSuccess: (token: string) => {
            // trocando o Authorization com o novo token
            originalConfig.headers['Authorization'] = `Bearer ${token}`;

            // fazendo uma chamada a api de novo com o novo token
            resolve(api(originalConfig));
          },
          // onFailure é o que acontece com aquela requisição caso o processo
          // de refreshToken tenha dado errado
          onFailure: (error: AxiosError) => {
            reject(error);
          }
        });
      });
    } else { // se foi retornado o status de erro 401 mas o code não é token.expired
      // vai deslogar o usuário
    }
  }
});