import { CoffeeItem } from "../CoffeeItem";

import { Coffees } from "../../../../data/coffees";

import { CoffeesContainer } from "./styles";

export function CoffeeList() {
  return (
    <CoffeesContainer>
      {Coffees.map((coffee) => (
        <CoffeeItem
          key={coffee.id}
          id={coffee.id}
          name={coffee.name}
          description={coffee.description}
          image_url={coffee.image_url}
          tags={coffee.tags}
          price={coffee.price}
        />
      ))}
    </CoffeesContainer>
  );
}
