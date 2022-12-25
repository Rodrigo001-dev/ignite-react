import { useMemo } from 'react';

import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
}

export function SearchResults({ results }: SearchResultsProps) {
  // o useMemo vai memorizar entre as renderizações do componente o totalPrice
  // para que ele não precise ser recalculado toda vez do zero
  // e o useMemo também server para evitar que uma variável ocupe um novo local
  // na memória quando estamos utilizando essa variável para ser repassada para
  // um componente filho
  /*
    Vamos utilizar o useMemo em 2 situações:
    1. Cálculos pesados
    2. Igualdade referencial (quando repassa aquela informação a um componente filho)
  */
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0)
  }, [results]);
  
  return (
    <div>
      <h2>{totalPrice}</h2>

      {results.map(product => {
        return (
          <ProductItem product={product} />
        );
      })}
    </div>
  );
}