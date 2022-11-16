import { 
  Box, 
  Button, 
  Checkbox, 
  Flex, 
  Heading, 
  Icon, 
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
  const query = useQuery('users', async () => {
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json();

    return data;
  });

  console.log(query);

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
              <Tr>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink" />
                </Td>

                <Td>
                  <Box>
                    <Text fontWeight="bold">Rodrigo Rael</Text>
                    <Text fontSize="sm" color="gray.300">rodrigorael53@gmail.com</Text>
                  </Box>
                </Td>

                { isWideVersion && <Td>04 de Abril, 2022</Td> }

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
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
};