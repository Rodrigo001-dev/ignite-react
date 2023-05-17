import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../hooks/useCart";

import { CompleteOrderForm } from "./components/CompleteOrderForm";
import { SelectedCoffees } from "./components/SelectedCoffees";

import { CheckoutContainer } from "./styles";

enum PaymentMethods {
  credit = "credit",
  debit = "debit",
  money = "money",
}

export interface ConfirmOrderFormData {
  cep: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  uf: string;
  paymentMethod: PaymentMethods;
}

export function Checkout() {
  const navigate = useNavigate();
  const { cleanCart } = useCart();

  const confirmOrderForm = useForm<ConfirmOrderFormData>();

  const { handleSubmit } = confirmOrderForm;

  function handleConfirmOrder(data: ConfirmOrderFormData) {
    navigate("/success", {
      state: data,
    });

    cleanCart();
  }

  return (
    <FormProvider {...confirmOrderForm}>
      <CheckoutContainer onSubmit={handleSubmit(handleConfirmOrder)}>
        <CompleteOrderForm />
        <SelectedCoffees />
      </CheckoutContainer>
    </FormProvider>
  );
}
