import { CreditCard, Money, Bank } from "phosphor-react";
import { useFormContext } from "react-hook-form";

import { PaymentMethodInput } from "../PaymentMethodInput";

import { PaymentMethodOptionsContainer } from "./styles";

export const paymentMethods = {
  credit: {
    title: "Cartão de crédito",
    icon: <CreditCard size={16} />,
  },
  debit: {
    title: "Cartão de débito",
    icon: <Bank size={16} />,
  },
  money: {
    title: "Dinheiro",
    icon: <Money size={16} />,
  },
};

export function PaymentMethodOptions() {
  const { register } = useFormContext();

  return (
    <PaymentMethodOptionsContainer>
      {Object.entries(paymentMethods).map(([key, { title, icon }]) => (
        <PaymentMethodInput
          key={title}
          id={key}
          icon={icon}
          title={title}
          value={key}
          {...register("paymentMethod")}
        />
      ))}
    </PaymentMethodOptionsContainer>
  );
}
