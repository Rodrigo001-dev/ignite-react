import { Button, Flex, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '../components/Form/Input';

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  // o react-hook-form utiliza do conceito de uncontrolled components que é uma
  // forma mais performática de salvar as informações de inputs por exemplo
  // porque da forma padrão com os controlled components que dessa forma
  // controlamos o estado de inputs através de estados dentro do React, cada vez
  // que o usuário digitar alguma coisa é salvo no estado
  // utilizando o conceito de uncontrolled components é uma forma de conseguir
  // acessar o valor do input só no momento em que for preciso, ou seja, não é
  // armazenado o valor do input dentro de uma variável no estado, nós acessamos
  // o valor do input no momento em que for necessário, isso é feito através de
  // refs dentro do React
  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(values);
  };

  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        // se eu passar somente a handleSignIn eu não vou conseguir ter acesso
        // aos dados digitados dentro dos Inputs para isso eu tenho que passar
        // a função handleSubmit e colocar ela por volta da função handleSignIn
        onSubmit={handleSubmit(handleSignIn)}
      >
        {
          /*
           o Stack serve para quando for criar uma pilha de elementos que precisam
           de um espaçamento entre eles
          */
        }
        <Stack spacing="4">
          <Input
            name="email" 
            type="email" 
            label="E-mail"
            // utilizando o conceito de uncontrolled components eu preciso sempre
            // passar a ref para o input mas por padrão o react-hook-form cria
            // essas referências de forma automática por isso eu passo somente
            // o register com o nome do campo
            {...register('email')}
          />
          <Input
            name="password" 
            type="password" 
            label="Senha"
            {...register('password')}
          />
        </Stack>

        <Button 
          type="submit" 
          mt="6" 
          colorScheme="pink"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
