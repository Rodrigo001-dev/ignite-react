import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.75rem;

    span {
      display: flex;
      align-items: center;

      width: 8.938rem;
      padding: 8px;
      border-radius: 6px;

      font-family: "Roboto", sans-serif;
      font-weight: 400;

      color: ${(props) => props.theme["purple-600"]};
      background: ${(props) => props.theme["purple-100"]};

      svg {
        margin-right: 8px;
        color: ${(props) => props.theme["purple-500"]};
        fill: ${(props) => props.theme["purple-500"]};
        /* background: ${(props) => props.theme["purple-500"]}; */
      }
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;

      padding: 9px 8px;
      border-radius: 6px;

      color: ${(props) => props.theme["yellow-600"]};
      background: ${(props) => props.theme["yellow-100"]};
    }
  }
`;
