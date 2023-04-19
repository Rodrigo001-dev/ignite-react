import { memo, useState } from 'react';
import dynamic from 'next/dynamic';

import { AddProductToWishlistProps } from './AddProductToWishlist';
// import { AddProductToWishlist } from './AddProductToWishlist';

// o lazy loading(carregamento preguiçoso) vai carregar uma informação(componente
// , função) somente no momento que for precisar
// basicamente vai fazer a importação somente quando ela for utilizada
const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist)
}, {
  loading: () => <span>Carregando...</span>
});

export interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  };
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button 
        onClick={() => setIsAddingToWishlist(true)}
      >
        Adicionar aos favoritos
      </button>

      { isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      ) }
    </div>
  );
}

// o memo vai evitar que seja criada uma nova versão do componente caso nenhuma
// propriedade do componente tenha sido alterada
// o memo faz uma shallow compare(comparação rasa) que é basicamente verificar
// a igualdade das informações que eu tenho dentro das propriedades
// mas no JavaScript quando comparamos um objeto com outro objeto({} === {})
// sempre vai dar false, pois no caso de objetos e array o JavaScript faz uma
// comparação de igualdade referencial que quando o JavaScript compara se os objetos
// ou arrays estão ocupando a mesma posição na memória

/*
  Nós vamos utilizar o memo em 4 principais situações

  1. Pure Functional Components: componentes apenas para abstrair alguma parte
    visual da aplicação, as funções puras são basicamente funções que dados os
    mesmos parâmetros sempre retornam o mesmo resultado

  2. Renders too often: componentes que renderizam de mais
  
  3. Re-renders with same props: quando o componente renderiza novamente com as
    as mesmas propriedades

  4. Medium to big size: ganhamos muito mais performance quando o componente está
    de um tamanho médio para um tamanho grande
*/
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  // o Object.is faz uma comparação profunda
  return Object.is(prevProps.product, nextProps.product)
});