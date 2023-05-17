import { NavLink } from "react-router-dom";
import { MapPin, ShoppingCart } from "phosphor-react";

import { useCart } from "../../hooks/useCart";

import { HeaderContainer } from "./styles";

import logoCoffee from "../../assets/logo.svg";

export function Header() {
  const { cartQuantity } = useCart();

  return (
    <HeaderContainer>
      <NavLink to="/">
        <img src={logoCoffee} alt="" />
      </NavLink>

      <nav>
        <span>
          <MapPin weight="fill" fill="#8047f8" size={22} />
          Guapiaçu, SP
        </span>

        <NavLink to="/checkout" title="Checkout">
          {cartQuantity >= 1 && (
            <span className="quantity-count">{cartQuantity}</span>
          )}
          <ShoppingCart weight="fill" fill="#C47F17" size={22} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
