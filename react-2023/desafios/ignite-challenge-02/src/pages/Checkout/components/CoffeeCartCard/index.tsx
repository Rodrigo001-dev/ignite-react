import { Trash } from "phosphor-react";

import { useCart } from "../../../../hooks/useCart";

import { CartItem } from "../../../../contexts/CartContext";

import { QuantityInput } from "../../../../components/QuantityInput";

import { formatMoney } from "../../../../utils/formatMoney";

import {
  ActionsContainer,
  CoffeeCartCardContainer,
  RemoveButton,
  Text,
} from "./styles";

interface CoffeeCartCardProps {
  coffee: CartItem;
}

export function CoffeeCartCard({ coffee }: CoffeeCartCardProps) {
  const { changeCartItemQuantity, removeCartItem } = useCart();

  const coffeeTotal = coffee.price * coffee.quantity;

  const formattedPrice = formatMoney(coffeeTotal);

  function handleIncrease() {
    changeCartItemQuantity(coffee.id, "increase");
  }

  function handleDecrease() {
    changeCartItemQuantity(coffee.id, "decrease");
  }

  function handleRemove() {
    removeCartItem(coffee.id);
  }

  return (
    <CoffeeCartCardContainer>
      <div>
        <img src={coffee.image_url} alt="" />
        <div>
          <Text>{coffee.name}</Text>

          <ActionsContainer>
            <QuantityInput
              size="small"
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              quantity={coffee.quantity}
            />
            <RemoveButton onClick={handleRemove}>
              <Trash size={16} />
              REMOVER
            </RemoveButton>
          </ActionsContainer>
        </div>
      </div>

      <p>R$ {formattedPrice}</p>
    </CoffeeCartCardContainer>
  );
}
