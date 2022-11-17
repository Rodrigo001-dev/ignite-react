import { useQuery } from "react-query";

import { api } from "../api";

// eu desacoplei a função que faz o fetch dos dados dos usuários do hook que
// conecta essa função com o react-query, ou seja, se em algum momento da
// aplicação eu precisar pegar uma listagem dos usuários fora do react-query
// eu vou ter essa função separada
export async function getUsers() {
  const { data } = await api.get('users');

  // formatando os dados antes de chegar no frontnend
  const users = data.users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    }
  });

  return users;
}

export function useUsers() {
  return useQuery('users', getUsers, {
    // o staleTime diz que essa query durante 5 segundos(1000 * 5) vai ser fresh
    // fresh quer dizer que os dados são recentes, que não vai ser necessário
    // realizar uma chamada para a API, ou seja, eu estou dizendo que durante
    // 5 segundos não vai ser necessário realizar uma chamada para API para
    // atualizar os dados
    staleTime: 1000 * 5, // 5 seconds
  });
};