import styled from "styled-components";

export const OrderConfirmedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  margin-top: 5rem;

  h1 {
    color: ${(props) => props.theme["yellow-600"]};
  }

  > section {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Text = styled.p`
  font-size: 1rem;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  margin-bottom: 8px;

  color: ${(props) => props.theme["base-text"]};
`;

export const OrderDetailsContainer = styled.div`
  padding: 2.5rem;
  border-radius: 6px 36px 6px 36px;
  background: ${(props) => props.theme["background"]};
  min-width: 32rem;

  border-radius: 7px 37px 7px 37px;
  background: linear-gradient(#fafafa, #fafafa) padding-box,
    linear-gradient(102.89deg, #dbac2c 2.61%, #8047f8 98.76%) border-box;
  border: 1px solid transparent;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
