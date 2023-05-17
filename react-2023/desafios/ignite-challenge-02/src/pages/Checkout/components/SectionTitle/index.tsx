import { ReactNode } from "react";

import { SectionTitleContainer, Text, Title } from "./styles";

interface SectionTitleProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
}

export function SectionTitle({ title, subtitle, icon }: SectionTitleProps) {
  return (
    <SectionTitleContainer>
      {icon}
      <div>
        <Title>{title}</Title>
        <Text>{subtitle}</Text>
      </div>
    </SectionTitleContainer>
  );
}
