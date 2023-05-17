import { useState } from "react";
import { ShoppingCart } from "phosphor-react";

import { useCart } from "../../../../hooks/useCart";

import { QuantityInput } from "../../../../components/QuantityInput";

import { formatMoney } from "../../../../utils/formatMoney";

import {
  CardIconButton,
  CoffeeContainer,
  Description,
  Price,
  PriceAndQuantityContainer,
  QuantityContainer,
  Tag,
  TagContainer,
  Title,
} from "./styles";

interface CoffeeItemProps {
  id: string;
  name: string;
  description: string;
  image_url: string;
  tags: string[];
  price: number;
}

export function CoffeeItem({
  id,
  name,
  price,
  image_url,
  description,
  tags,
}: CoffeeItemProps) {
  const { addCoffeeToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  function handleIncrease() {
    setQuantity((oldQuantity) => oldQuantity + 1);
  }

  function handleDecrease() {
    setQuantity((oldQuantity) => oldQuantity - 1);
  }

  function handleAddToCart() {
    const coffee = {
      id,
      name,
      price,
      image_url,
      description,
      tags,
    };

    const coffeeToAdd = {
      ...coffee,
      quantity,
    };

    addCoffeeToCart(coffeeToAdd);
  }

  return (
    <CoffeeContainer>
      <img src={image_url} alt="" />

      <TagContainer>
        {tags.map((tag, index) => (
          <Tag key={`${tag}-${index}`}>{tag}</Tag>
        ))}
      </TagContainer>

      <Title>{name}</Title>
      <Description>{description}</Description>

      <PriceAndQuantityContainer>
        <Price>
          R$ <strong>{formatMoney(price)}</strong>
        </Price>

        <QuantityContainer>
          <QuantityInput
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            quantity={quantity}
          />

          <CardIconButton onClick={handleAddToCart}>
            <ShoppingCart weight="fill" fill="white" size={22} />
          </CardIconButton>
        </QuantityContainer>
      </PriceAndQuantityContainer>
    </CoffeeContainer>
  );
}
