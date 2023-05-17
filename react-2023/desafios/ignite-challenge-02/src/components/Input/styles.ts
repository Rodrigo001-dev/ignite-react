import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  position: relative;
`;

export const InputStyleContainer = styled.div`
  height: 2.625rem;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme["gray-300"]};
  background: ${(props) => props.theme["gray-200"]};
  display: flex;
  align-items: center;
  transition: 0.4s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  &:focus-within {
    border-color: ${(props) => props.theme["yellow-600"]};
  }
`;

export const InputStyled = styled.input`
  flex: 1;
  background: none;
  border: none;
  padding: 0 0.75rem;
  height: 100%;
  font-size: 0.75rem;
  color: ${(props) => props.theme["base-text"]};
  &::placeholder {
    color: ${(props) => props.theme["base-label"]};
  }
`;

export const RightText = styled.p`
  font-size: 0.75rem;
  margin-right: 0.75rem;
  font-style: italic;
  color: ${(props) => props.theme["base-label"]};
`;
