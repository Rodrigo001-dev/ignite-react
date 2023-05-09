import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme["yellow-600"]};
  }

  body {
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme["base-subtitle"]};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Baloo 2', cursive;
    font-weight: 700;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
  html {
    font-size: 87.5%;
  }
}
`;
