import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { MapPin, Clock, CurrencyDollar } from "phosphor-react";

import { InfoWithIcon } from "../../components/InfoWithIcon";

import confirmedOrderIllustration from "../../assets/confirmed-order.svg";

import { OrderConfirmedContainer, OrderDetailsContainer, Text } from "./styles";

import { ConfirmOrderFormData } from "../Checkout";

import { paymentMethods } from "../Checkout/components/CompleteOrderForm/PaymentMethodOptions";

interface LocationType {
  state: ConfirmOrderFormData;
}

export function Success() {
  const colors = useTheme();

  const { state } = useLocation() as unknown as LocationType;

  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, []);

  if (!state) return <></>;

  return (
    <OrderConfirmedContainer className="container">
      <div>
        <h1>Uhu! Pedido confirmado</h1>
        <Text>Agora é só aguardar que logo o café chegará até você</Text>
      </div>

      <section>
        <OrderDetailsContainer>
          <InfoWithIcon
            icon={<MapPin weight="fill" />}
            iconBg={colors["purple-500"]}
            text={
              <Text>
                Entrega em <strong>{state.street}</strong>, {state.number}
                <br />
                {state.district} - {state.city}, {state.uf}
              </Text>
            }
          />
          <InfoWithIcon
            icon={<Clock weight="fill" />}
            iconBg={colors["yellow-500"]}
            text={
              <Text>
                Previsão de entrega
                <br />
                <strong>20 min - 30 min</strong>
              </Text>
            }
          />
          <InfoWithIcon
            icon={<CurrencyDollar weight="fill" />}
            iconBg={colors["yellow-600"]}
            text={
              <Text>
                Pagamento na entrega
                <br />
                <strong>{paymentMethods[state.paymentMethod].title}</strong>
              </Text>
            }
          />
        </OrderDetailsContainer>

        <img src={confirmedOrderIllustration} alt="" />
      </section>
    </OrderConfirmedContainer>
  );
}
