import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

import { ContentContainer, PaymentMethodContainer } from "./styles";

type PaymentMethodInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: ReactNode;
  title: string;
};

export const PaymentMethodInput = forwardRef<
  HTMLInputElement,
  PaymentMethodInputProps
>(({ id, icon, title, ...props }, ref) => {
  return (
    <PaymentMethodContainer>
      <input id={id} type="radio" {...props} name="paymentMethod" ref={ref} />
      <label htmlFor={id}>
        <ContentContainer>
          {icon}
          {title}
        </ContentContainer>
      </label>
    </PaymentMethodContainer>
  );
});
