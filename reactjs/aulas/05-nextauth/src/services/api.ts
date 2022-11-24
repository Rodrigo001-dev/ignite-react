import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';

interface AxiosErrorResponse {
  code?: string;
};

let cookies = parseCookies();

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
      });
    } else { // se foi retornado o status de erro 401 mas o code não é token.expired
      // vai deslogar o usuário
    }
  }
});