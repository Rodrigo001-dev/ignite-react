import styled from "styled-components";

export const CoffeeCartCardContainer = styled.div`
  width: 100%;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid ${(props) => props.theme["gray-300"]};

  > div {
    display: flex;
    align-items: center;
    gap: 1.25rem;

    img {
      width: 4rem;
      height: 4rem;
    }
  }

  > p {
    align-self: flex-start;
    font-weight: 700;
  }
`;

export const Text = styled.span`
  font-size: 1rem;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  margin-bottom: 8px;

  color: ${(props) => props.theme["base-subtitle"]};
`;

export const ActionsContainer = styled.div`
  margin-top: 0.5rem;
  height: 2rem;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  > div {
    height: 100%;
  }
`;

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  color: ${(props) => props.theme["base-text"]};
  font-size: 0.75rem;
  height: 100%;
  border: none;
  background: ${(props) => props.theme["gray-300"]};
  padding: 0 0.5rem;
  border-radius: 6px;

  transition: 0.4s;

  svg {
    color: ${(props) => props.theme["purple-600"]};
  }

  &:hover {
    background: ${(props) => props.theme["gray-400"]};
  }
`;
