import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
};

export function ActiveLink({ children, activeClassName, ...rest }: ActiveLinkProps) {
  // o asPath retorna para mim exatamente a rota que está sendo acessada
  const { asPath } = useRouter();

  // se o link que está sendo acessado for igual ao que eu estou passando 
  // dentro do href do componente activeLink no componete Header então a classe
  // vai ser activeClassName se não a classe vai estar vazia
  const className = asPath === rest.href
    ? activeClassName
    : ''
  ;
  
  return (
    /*
      utilizando a tag Link do Next fazemos o uso do conceito de SPA do
      React(basicamente estou reaproveitando o core da aplicação, a 
      estrutura da aplicação, mudando só o conteúdo)
    */
    <Link {...rest}>
      {
        /*
          o cloneElement é uma função do React que vai clonar um elemento e
          modificar coisas nele
          eu clonei o elemento children, porém eu vou adicionar como propriedade
          a className

          o cloneElement é utilizado principalmente quando precisamos modificar
          o comportamento de algum componente que recebemos como uma propriedade
          ou como children
        */
      }
      {cloneElement(children, {
        className,
      })}
    </Link>
  );
};