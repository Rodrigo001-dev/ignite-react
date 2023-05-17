import styled from "styled-components";

export const CheckoutContainer = styled.form`
  width: 100%;
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

export const SectionBaseStyle = styled.div`
  width: 100%;
  background: ${(props) => props.theme["gray-100"]};
  border-radius: 6px;
  padding: 2.5rem;
`;
