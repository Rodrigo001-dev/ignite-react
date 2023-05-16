import { ReactNode } from "react";

import { ChildrenContainer, InfoItemContainer } from "./styles";

interface InfoItemProps {
  children: ReactNode;
  description: string;
  backgroundIconColor: "purple" | "textBase" | "yellow" | "yellowDark";
}

export function InfoItem({
  children,
  description,
  backgroundIconColor,
}: InfoItemProps) {
  return (
    <InfoItemContainer>
      <ChildrenContainer backgroundColor={backgroundIconColor}>
        {children}
      </ChildrenContainer>

      <span>{description}</span>
    </InfoItemContainer>
  );
}
