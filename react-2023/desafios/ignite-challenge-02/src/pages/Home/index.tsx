import { HomeContainer, SubTitle, Info } from "./styles";

import Hero from "../../assets/hero-image.svg";

export function Home() {
  return (
    <HomeContainer>
      <Info>
        <h1>Encontre o café perfeito para qualquer hora do dia</h1>

        <SubTitle>
          Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
          hora
        </SubTitle>
      </Info>

      <img
        src={Hero}
        alt="Imagem de um copo de café com o logo do coffee delivery"
      />
    </HomeContainer>
  );
}
