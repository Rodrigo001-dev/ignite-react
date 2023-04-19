import { useMemo } from 'react';
import { List, ListRowRenderer } from 'react-virtualized';

import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>;
  onAddToWishlist: (id: number) => void;
}

export function SearchResults({ totalPrice, results, onAddToWishlist }: SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    );
  }
  
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
  // const totalPrice = useMemo(() => {
  //   return results.reduce((total, product) => {
  //     return total + product.price;
  //   }, 0)
  // }, [results]);
  
  return (
    <div>
      <h2>{totalPrice}</h2>

      <List 
        height={300}
        rowHeight={30}
        width={900}
        // overscanRowCount é o numero de quantos itens que eu quero que a minha
        // aplicação deixe pré-carregado tanto para cima quanto para baixo, para
        // que quando a pessao for dar o scroll o item já vai estar ali
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />

      {/* {results.map(product => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishlist={onAddToWishlist}
          />
        );
      })} */}
    </div>
  );
}