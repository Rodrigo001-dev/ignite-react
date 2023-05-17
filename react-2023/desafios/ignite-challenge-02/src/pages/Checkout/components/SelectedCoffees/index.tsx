import { DetailsContainer, SelectedCoffeesContainer, Title } from "./styles";

import { useCart } from "../../../../hooks/useCart";

import { CoffeeCartCard } from "../CoffeeCartCard";
import { ConfirmationSection } from "./ConfirmationSection";

export function SelectedCoffees() {
  const { cartItems } = useCart();

  return (
    <SelectedCoffeesContainer>
      <Title>Cafés selecionados</Title>

      <DetailsContainer>
        {cartItems.map((coffee) => (
          <CoffeeCartCard key={coffee.id} coffee={coffee} />
        ))}

        <ConfirmationSection />
      </DetailsContainer>
    </SelectedCoffeesContainer>
  );
}
