import { cloneElement, ReactElement } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface ActiveLinkProps extends LinkProps {
  // o ReactElement precisa ser um componente React, ou seja, quando eu tenho
  // um componente e dentro dele eu posso receber qualquer coisa, como um outro
  // componente ou até somente um texto então o tipo desse elento filho vai ser
  // ReactNode mas quando eu posso receber somente um componente o tipo tem que
  // ser ReactElement
  children: ReactElement;
  shouldMathExactHref?: boolean;
};

export function ActiveLink({ 
  children, 
  shouldMathExactHref = false,
  ...rest 
}: ActiveLinkProps) {
  // o asPath retorna a rota que está ativa
  const { asPath } = useRouter();

  let isActive = false;

  // utilizando o shouldMathExactHref o link vai ficar ativo mesmo se eu estiver
  // em uma categoria dentro de uma rota, por exemplo se eu estiver dentro da
  // pagina de criação de um usuário(/users/create)
  // se o o href precisa ser exatamente a rota ativa(shouldMathExactHref) e
  // a rota ativa é igual ao href do link ou ao as do link então o isActive vai
  // para true
  if (shouldMathExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  };

  // se o href não precisa ser exatamente igual a rota ativa(!shouldMathExactHref)
  // e a rota ativa inicia com o href do link ou o as do link inicia com o rota
  // ativa então o isActive vai para true, ou seja se eu estiver dentro de uma
  // rota /users/create o users é a rota ativa
  if (!shouldMathExactHref && 
    (asPath.startsWith(String(rest.href)) || 
    asPath.startsWith(String(rest.as)))) {
      isActive = true;
  };
  
  return (
    <Link {...rest}>
      {/* eu vou clonar o children e modificar a propriedade color */}
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50'
      })}
    </Link>
  );
};