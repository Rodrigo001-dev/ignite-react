import { 
  Box, 
  Button, 
  Checkbox, 
  Flex, 
  Heading, 
  Icon, 
  Spinner, 
  Table, 
  Tbody, 
  Td, 
  Text, 
  Th, 
  Thead, 
  Tr, 
  useBreakpointValue
} from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useQuery } from 'react-query';

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList() {
  // dentro do useQuery('') como primeiro parâmetro eu passo qual a chave que
  // vou utilizar para armazenar em cache, para caso depois eu precise limpar
  // esse cache, revalidar ele, resetar, excluir ou qualquer coisa assim eu vou
  // ter um nome(chave) para me referir a esses dados e como segundo parâmetro
  // eu passo um método(uma função) que vai me retornar os dados
  // const query = useQuery('users', async () => {
  //   const response = await fetch('http://localhost:3000/api/users');
  //   const data = await response.json();

  //   return data;
  // });

  // dentro do useQuery eu posso obter algumas informações, a primeira dessas
  // informações é o próprio data, a segunda informação é o isLoading que vai
  // dizer se a requisição está em processo de carregamento ou não, outra
  // informação é o error, sse aconteceu um erro ou não dentro da aplicação
  const { data, isLoading, error } = useQuery('users', async () => {
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json();

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
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />

      {/* mx=auto é para ficar centralizado */}
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Usuários</Heading>

            {
              /*
               eu passei o passHref porque por mais que esse Button seja uma tag
               a do HTML, eu não estou passando a tag a em si e sim um Button
              */
            }
            <Link href="/users/create" passHref>
              <Button 
                as="a" 
                size="sm" 
                fontSize="sm" 
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo usuário
              </Button>
            </Link>
          </Flex>

          {
          /* 
            se o isLoading estiver true, ou seja, se estiver carregando eu vou
            mostrar um Spinner no centro da tela
          */
          }
          { isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
            // se não, se ocorreu um erro eu vou mostar uma menssagem de erro
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
            // se não, ou seja, se não estiver com o isLoading true e não tiver
            // dado nenhum erro eu vou mostar a tabela de usuários
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    {/* px={small="4", medium="4", large="6"} */}
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>

                    <Th>Usuário</Th>
                    { isWideVersion && <Th>Data de cadastro</Th> }
                    { isWideVersion && <Th width="8"></Th> }
                  </Tr>
                </Thead>

                <Tbody>
                  {data.map(user => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>

                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Text fontSize="sm" color="gray.300">{user.email}</Text>
                          </Box>
                        </Td>

                        { isWideVersion && <Td>{user.createdAt}</Td> }

                        { isWideVersion && (
                          <Td>
                            <Button 
                              as="a" 
                              size="sm" 
                              fontSize="sm" 
                              colorScheme="purple"
                              leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                            >
                              Editar
                            </Button>
                          </Td>
                        ) }
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>

              <Pagination />
            </>
          ) }
        </Box>
      </Flex>
    </Box>
  );
};