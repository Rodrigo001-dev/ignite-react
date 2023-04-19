import { 
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack, 
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from 'react-query';

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";

import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('').min(6, 'A senha precisa ter no mínimo 6 caracteres'),
  // o oneOf diz que eu preciso que o password_confirmation seja igual a alguns
  // dos valores que eu passar dentro do oneOf 
  password_confirmation: yup.string().oneOf([
    // ele vai ser nulo assim que ele for renderizaod em tela
    null, yup.ref('password')
    // o campo ref permite referenciar outro campo que está dentro schema
  ], 'As senhas precisam ser iguais'),
});

export default function CreateUser() {
  const router = useRouter();

  // o useMutation é utilizado para realizar operações de criação, atualização
  // e deletar um dado, tudo aquilo que vai criar ou alterar um dado
  // deferente do useQuery que é utilizado para busar um ou mais dados
  // a diferença de utilizar o useMutation para fazer a função da forma tradicional
  // quando eu chamar essa Mutation, essa chamada para a API, assim como no useQuery
  // eu vou conseguir monitorar o estado dessa chamada
  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date(),
      }
    });

    return response.data.user;
  }, {
    // quando cadastramos uma informação nova de usuário é muito importante que
    // seja limpado o cache das páginas que já tem essa informação guardada em cache
    onSuccess: () => {
      // quando o cadastro do usuário der sucesso eu quero inválidar o cache que
      // eu tenho criado anteriormente na listagem de usuários
      queryClient.invalidateQueries('users')
    }
  });

  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema)
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    // o mutateAsync vai executar a função da mutation de forma assíncrona, ou seja,
    // como uma Promise
    await createUser.mutateAsync(values);

    router.push('/users');
  };

  return (
    <Box>
      <Header />

      {/* mx=auto é para ficar centralizado */}
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box 
          as="form" 
          flex="1" 
          borderRadius={8} 
          bg="gray.800" 
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input 
                name="name" 
                label="Nome completo"
                error={errors.name}
                {...register('name')} 
              />
              <Input 
                name="email" 
                type="email" 
                label="E-mail"
                error={errors.email}
                {...register('email')} 
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input 
                name="password" 
                type="password" 
                label="Senha"
                error={errors.password}
                {...register('password')} 
              />
              <Input
                name="password_confirmation" 
                type="password" 
                label="Confirmação da senha"
                error={errors.password_confirmation}
                {...register('password_confirmation')} 
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button 
                type="submit" 
                colorScheme="pink"
                isLoading={isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};