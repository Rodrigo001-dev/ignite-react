import styled from "styled-components";

export const ButtonContainer = styled.button`
  padding: 0.75rem 2.8rem;
  color: ${(props) => props.theme["white"]};
  font-weight: 700;
  background: ${(props) => props.theme["yellow-500"]};
  font-size: 0.75rem;
  border: none;
  border-radius: 6px;
  text-transform: uppercase;
  line-height: 1.3rem;
  margin-top: 0.7rem;

  transition: 0.4s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${(props) => props.theme["yellow-600"]};
  }
`;
