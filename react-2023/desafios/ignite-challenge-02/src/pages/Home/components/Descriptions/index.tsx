import { Coffee, Package, ShoppingCart, Timer } from "phosphor-react";

import { InfoItem } from "../InfoItem";

import { DescriptionsContainer } from "./styles";

export function Descriptions() {
  return (
    <DescriptionsContainer>
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
    </DescriptionsContainer>
  );
}
