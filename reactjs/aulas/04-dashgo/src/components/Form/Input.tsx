import { 
  FormControl, 
  FormLabel,
  Input as ChakraInput, 
  InputProps as ChakraInputProps 
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> 
  = ({ name, label, ...rest }, ref) => {
    return (
      /*
        o FormControl é um componente para ficar em volta da label e do input
      */
      <FormControl>
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
      </FormControl>
    );
};

// o forwardRef vai fazer um encaminhamento da ref, ou seja, ele vai pegar a ref
// que vai ser passada no SignIn e vai encaminhar para o componente chamado
// InputBase
export const Input = forwardRef(InputBase);