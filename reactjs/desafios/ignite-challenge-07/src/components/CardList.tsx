import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const handleViewImage = (url: string): void => {
    setSelectedImageUrl(url);
    onOpen();
  };

  return (
    <>
      <SimpleGrid columns={3} spacing="40px">
        {cards.map(card => (
          <Card data={card} viewImage={handleViewImage} key={card.url} />
        ))}
      </SimpleGrid>

      <ModalViewImage
        imgUrl={selectedImageUrl}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
