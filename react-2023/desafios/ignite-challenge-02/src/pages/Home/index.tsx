import { Coffee, Package, ShoppingCart, Timer } from "phosphor-react";

import { InfoItem } from "./components/InfoItem";
import { CoffeeList } from "./components/CoffeeList";

import {
  HomeContainer,
  SubTitle,
  Info,
  Descriptions,
  HeroContainer,
  CoffeeSection,
} from "./styles";

import Hero from "../../assets/hero-image.svg";

export function Home() {
  return (
    <HomeContainer>
      <HeroContainer>
        <Info>
          <h1>Encontre o café perfeito para qualquer hora do dia</h1>

          <SubTitle>
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
            hora
          </SubTitle>

          <Descriptions>
            <div>
              <InfoItem
                description="Compra simples e segura"
                backgroundIconColor="yellowDark"
              >
                <ShoppingCart weight="fill" fill="white" size={16} />
              </InfoItem>

              <InfoItem
                description="Entrega rápida e rastreada"
                backgroundIconColor="yellow"
              >
                <Timer weight="fill" fill="white" size={16} />
              </InfoItem>
            </div>

            <div>
              <InfoItem
                description="Embalagem mantém o café intacto"
                backgroundIconColor="textBase"
              >
                <Package weight="fill" fill="white" size={16} />
              </InfoItem>

              <InfoItem
                description="O café chega fresquinho até você"
                backgroundIconColor="purple"
              >
                <Coffee weight="fill" fill="white" size={16} />
              </InfoItem>
            </div>
          </Descriptions>
        </Info>

        <img
          src={Hero}
          alt="Imagem de um copo de café com o logo do coffee delivery"
        />
      </HeroContainer>

      <CoffeeSection>
        <strong>Nossos cafés</strong>

        <CoffeeList />
      </CoffeeSection>
    </HomeContainer>
  );
}
