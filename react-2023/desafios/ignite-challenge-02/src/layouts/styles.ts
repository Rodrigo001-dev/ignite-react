import styled from "styled-components";

export const LayoutContainer = styled.div`
  max-width: 90rem;
  height: calc(100vh - 10rem);
  margin: auto;
  padding: 2.5rem;

  background: ${(props) => props.theme.background};

  display: flex;
  flex-direction: column;
`;
