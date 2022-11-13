import { 
  FormControl, 
  FormErrorMessage, 
  FormLabel,
  Input as ChakraInput, 
  InputProps as ChakraInputProps 
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import { forwardRef, ForwardRefRenderFunction } from "react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> 
  = ({ name, label, error = null, ...rest }, ref) => {
    return (
      /*
        o FormControl é um componente para ficar em volta da label e do input
      */
      //  isInvalid indicar se o input está ou não com erro
      //  ele vai estar com erro caso exista algo dentro da variável error
      //  eu utilizei a operação com !! para eu transformar o error em um valor
      //  boleano, ou seja, se tiver um valor presente dentro dela vai virar true
      //  se não vai virar um valor false
      <FormControl isInvalid={!!error}>
        {/* caso o label exista vai apresentar em tela o FormLabel */}
        { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }

        <ChakraInput 
          name={name}
          id={name}
          focusBorderColor="pink.500"
          bgColor="gray.900"
          variant="filled"
          _hover={{
            bgColor: 'gray.900'
          }}
          size="lg"
          ref={ref}
          {...rest}
        />

        {/* se eu tiver algo dentro de error eu vou mostrar o FormErrorMessage */}
        { !!error && (
          <FormErrorMessage>
            {error.message}
          </FormErrorMessage>
        )}
      </FormControl>
    );
};

// o forwardRef vai fazer um encaminhamento da ref, ou seja, ele vai pegar a ref
// que vai ser passada no SignIn e vai encaminhar para o componente chamado
// InputBase
export const Input = forwardRef(InputBase);