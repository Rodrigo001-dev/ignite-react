import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';

import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormImageProps {
  image: FileList;
  title: string;
  description: string;
  url: string;
}

interface FormAddImageProps {
  closeModal: () => void;
}

const regex = new RegExp(/\.(jpeg|jpg|png|gif)$/i);

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      required: 'Arquivo obrigatório',
      validate: {
        lessThan10MB: file =>
          file[0].size < 10000000 || 'O arquivo deve ser menor que 10MB',
        acceptedFormats: file =>
          regex.test(file[0].name) ||
          'Somente são aceitos arquivos PNG, JPEG e GIF',
      },
    },
    title: {
      required: 'Título obrigatório',
      minLenght: { value: 2, message: 'Mínimo de 2 caracteres' },
      maxLenght: { value: 20, message: 'Máximo de 20 caracteres' },
    },
    description: {
      required: 'Descrição obrigatória',
      maxLenght: { value: 65, message: 'Máximo de 65 caracteres' },
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (formData: FormImageProps) => api.post('/api/images', formData),
    {
      onSuccess: () => queryClient.invalidateQueries('images'),
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: FormImageProps): Promise<void> => {
    try {
      if (!imageUrl) {
        toast({
          status: 'error',
          title: 'Imagem não encontrada',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const response = await mutation.mutateAsync({
        ...data,
        url: imageUrl,
      });

      if (response.status === 201) {
        toast({
          status: 'success',
          title: 'Imagem cadastrada',
          description: 'Sua imagem foi cadastrada com sucesso.',
          duration: 3000,
        });
      }
    } catch {
      toast({
        status: 'error',
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao tentar cadastrar a sua imagem.',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      reset();
      closeModal();
      setImageUrl('');
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          error={errors.image}
          {...register('image', formValidations.image)}
        />

        <TextInput
          placeholder="Título da imagem..."
          error={errors.title}
          {...register('title', formValidations.title)}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          error={errors.description}
          {...register('description', formValidations.description)}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
