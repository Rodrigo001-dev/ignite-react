import { ShoppingCart } from "phosphor-react";

import { QuantityInput } from "../../../../components/QuantityInput";

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
  name: string;
  description: string;
  image_url: string;
  tags: string[];
  price: number;
}

export function CoffeeItem({
  name,
  price,
  image_url,
  description,
  tags,
}: CoffeeItemProps) {
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
          R${" "}
          <strong>
            {price.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </strong>
        </Price>

        <QuantityContainer>
          <QuantityInput
            quantity={0}
            onDecrease={() => {}}
            onIncrease={() => {}}
          />

          <CardIconButton>
            <ShoppingCart weight="fill" fill="white" size={22} />
          </CardIconButton>
        </QuantityContainer>
      </PriceAndQuantityContainer>
    </CoffeeContainer>
  );
}
