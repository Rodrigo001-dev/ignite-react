import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  pageNumber: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void; 
};

export function PaginationItem({
  // pelo isCurrent ser opicional, é interessante eu definir um valor padrão/inicial
  // para ele
  isCurrent = false,
  onPageChange,
  pageNumber 
}: PaginationItemProps) {
  // se eu estou na página atual, vai apresentar um Button com essas propriedades
  if (isCurrent) {
    return (
      <Button 
        size="sm" 
        fontSize="xs" 
        width="4" 
        colorScheme="pink" 
        disabled
        _disabled={{
          bg: 'pink.500',
          cursor: 'default',
        }}
      >
        {pageNumber}
      </Button>
    );
  };

  // se não, eu apresento um Button com outras propriedades
  return (
    <Button 
      size="sm" 
      fontSize="xs" 
      width="4" 
      bg="gray.700"
      _hover={{
        bg: 'gray.500'
      }}
      onClick={() => onPageChange(pageNumber)}
    >
      {pageNumber}
    </Button>
  );
};