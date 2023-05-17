import { ReactNode } from "react";

import { InfoWithIconContainer, IconContainer } from "./styles";

interface BenefitItemProps {
  icon: ReactNode;
  text: string | ReactNode;
  iconBg: string;
}

export function InfoWithIcon({ icon, text, iconBg }: BenefitItemProps) {
  return (
    <InfoWithIconContainer>
      <IconContainer iconBg={iconBg}>{icon}</IconContainer>
      {typeof text === "string" ? <p>{text}</p> : text}
    </InfoWithIconContainer>
  );
}
