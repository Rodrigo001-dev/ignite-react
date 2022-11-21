import { Box, Button, Stack, Text } from "@chakra-ui/react";

import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

// quantas páginas eu quero mostrar ao lado da página atual, tanto para direita
// quanto para esquerda
// ou seja, se a página ataul for a 5 vai ficar assim: ... 4 5 6 ...
const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  // eu estou regando um array assim: ...new Array() porque é uma forma de
  // conseguir gerar um array em branco
  // eu estou criando um arrau que vai de to - from, por exemplo se eu quero que
  // ele vai de 2 até 5, ele vai criar um array de 3 posições(5 - 2)
  return [...new Array(to - from)]
    // eu vou percorrer esse arrai porque ele gerou um array em branco
    // como primeira posição do map eu coloquei _ porque o valor do array não
    // importa pois o valor está em branco
    .map((_, index) => {
      // para cada posição do array ele vai pegar o index e vai somar o from + index + 1
      return from + index + 1;
    })
    // eu vou filtrar esse array se a página é maior que 0, porque se eu passar
    // no número from um número negativo, ou algum calculo acontecer de dar um
    // número negativo eu quero que as páginas que são menores que o número 1(page > 0)
    // não apareçam
    .filter(page => page > 0)
};

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  // o Math.floor é para arredondar a divisão para cima
  // a ultima página(lastPage) que eu tenho é o numero total de registros(totalCountOfRegisters)
  // / por quantos registros eu tenho por página(registersPerPage)
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

  // eu vou carregar quais as páginas que devem ser exibidas antes da página atual
  // se a página atual for maior que 1(currentPage > 1), ou seja, se a página atual
  // não for a página 1
  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)  
    : []
  ;
  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []
  ;

  return (
    <Stack
      // eu quero que quando estiver no mobile o direction seja column e a partir
      // disso, ou seja, qualquer tamanho maior que o mobile seja row
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">

        {/* primeira página */}
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem pageNumber={1} />
            {/* se eu estou com mais de 2 páginas de distância da primeira página */}
            {currentPage > (2 + siblingsCount) && (
              <Text color="gray.300" width="8" textAlign="center">...</Text>
            )}
          </>
        )}

        {/* páginas anteriores */}
        {
          /* 
            se previousPages.length > 0, ou seja, se eu tiver páginas para anteriores
            para mostrar então eu vou percorrer as minhas previousPages e para
            cada página eu vou mostrar um <PaginationItem /> com o número da página
            em si
          */
        }
        {previousPages.length > 0 && previousPages.map(page => {
          return <PaginationItem key={page} pageNumber={page} />
        })}

        <PaginationItem pageNumber={currentPage} isCurrent />

        {/* próximas páginas */}
        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem key={page} pageNumber={page} />
        })}

        {/* ultima página */}
        {(currentPage + siblingsCount) < lastPage && (
          <>
            {(currentPage + 1 + siblingsCount) < lastPage && (
              <Text color="gray.300" width="8" textAlign="center">...</Text>
            )}
            <PaginationItem pageNumber={lastPage} />
          </>
        )}

      </Stack>
    </Stack>
  );
};