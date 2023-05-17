import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { Router } from "./Router";

import { CartContextProvider } from "./contexts/CartContext";

import { defaultTheme } from "./styles/theme/default";
import { GlobalStyles } from "./styles/global";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CartContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CartContextProvider>
      <GlobalStyles />
    </ThemeProvider>
  );
}
