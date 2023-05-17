import { CoffeeList } from "./components/CoffeeList";
import { HeroSection } from "./components/HeroSection";

import { HomeContainer, CoffeeSection } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <HeroSection />

      <CoffeeSection>
        <strong>Nossos cafés</strong>

        <CoffeeList />
      </CoffeeSection>
    </HomeContainer>
  );
}
