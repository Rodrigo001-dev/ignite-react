import { CurrencyDollar, MapPinLine } from "phosphor-react";
import { useTheme } from "styled-components";

import { SectionTitle } from "../SectionTitle";
import { AddressForm } from "./AddressForm";
import { PaymentMethodOptions } from "./PaymentMethodOptions";

import {
  CompleteOrderFormContainer,
  Title,
  FormSectionContainer,
} from "./styles";

export function CompleteOrderForm() {
  const colors = useTheme();

  return (
    <CompleteOrderFormContainer>
      <Title>Complete seu pedido</Title>

      <FormSectionContainer>
        <SectionTitle
          title="Endereço de Entrega"
          subtitle="Informe o endereço onde deseja receber seu pedido"
          icon={<MapPinLine size={22} color={colors["yellow-600"]} />}
        />

        <AddressForm />
      </FormSectionContainer>

      <FormSectionContainer>
        <SectionTitle
          title="Pagamento"
          subtitle="O pagamento é feito na entrega. Escolha a forma que deseja pagar"
          icon={<CurrencyDollar size={22} color={colors["purple-500"]} />}
        />

        <PaymentMethodOptions />
      </FormSectionContainer>
    </CompleteOrderFormContainer>
  );
}
