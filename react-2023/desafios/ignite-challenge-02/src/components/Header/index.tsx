import { NavLink } from "react-router-dom";
import { MapPin, ShoppingCart } from "phosphor-react";

import logoCoffee from "../../assets/logo.svg";

import { HeaderContainer } from "./styles";

export function Header() {
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
          <ShoppingCart weight="fill" fill="#C47F17" size={22} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
