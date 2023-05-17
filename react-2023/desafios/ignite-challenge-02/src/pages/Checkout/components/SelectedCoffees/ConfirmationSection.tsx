import { useCart } from "../../../../hooks/useCart";

import { Button } from "../../../../components/Button";

import { formatMoney } from "../../../../utils/formatMoney";

import { ConfirmationSectionContainer, Title, Text } from "./styles";

const DELIVERY_PRICE = 3.5;

export function ConfirmationSection() {
  const { cartItemsTotal, cartQuantity } = useCart();
  const cartTotal = DELIVERY_PRICE + cartItemsTotal;

  const formattedItemsTotal = formatMoney(cartItemsTotal);
  const formattedCartTotal = formatMoney(cartTotal);
  const formattedDeliveryPrice = formatMoney(DELIVERY_PRICE);

  return (
    <ConfirmationSectionContainer>
      <div>
        <Text>Total de itens</Text>
        <Text>R$ {formattedItemsTotal}</Text>
      </div>
      <div>
        <Text>Entrega</Text>
        <Text>R$ {formattedDeliveryPrice}</Text>
      </div>
      <div>
        <Title>Total</Title>
        <Title>R$ {formattedCartTotal}</Title>
      </div>

      <Button
        text="Confirmar Pedido"
        disabled={cartQuantity <= 0}
        type="submit"
      />
    </ConfirmationSectionContainer>
  );
}
