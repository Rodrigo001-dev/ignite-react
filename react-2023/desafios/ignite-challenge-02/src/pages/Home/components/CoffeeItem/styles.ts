import styled from "styled-components";

export const CoffeeContainer = styled.div`
  background: ${(props) => props.theme["gray-100"]};
  border-radius: 6px 36px 6px 36px;

  max-width: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  img {
    margin-top: -2.5rem;

    width: 7.5rem;
    height: 7.5rem;
  }
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const Tag = styled.span`
  margin-top: 12px;
  margin-bottom: 16px;
  padding: 4px 8px;
  border-radius: 100px;

  color: ${(props) => props.theme["yellow-600"]};
  background: ${(props) => props.theme["yellow-100"]};
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 8px;

  color: ${(props) => props.theme["base-subtitle"]};
`;

export const Description = styled.p`
  font-size: 0.874rem;
  font-weight: 400;
  line-height: 1.8;
  font-family: "Roboto", sans-serif;
  text-align: center;
  color: ${(props) => props.theme["base-label"]};

  margin-bottom: 1.875rem;
`;

export const PriceAndQuantityContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Price = styled.span`
  color: ${(props) => props.theme["base-text"]};

  font-family: "Roboto", sans-serif;
  font-size: 0.874rem;
  font-weight: 400;

  strong {
    font-family: "Baloo 2", cursive;
    font-weight: 800;
    font-size: 1.5rem;
  }
`;

export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
`;

export const CardIconButton = styled.button`
  display: flex;
  padding: 6px 8px;
  border-radius: 6px;

  background: ${(props) => props.theme["purple-600"]};

  transition: background-color 0.3s;

  &:hover {
    cursor: pointer;

    background: ${(props) => props.theme["purple-500"]};
  }
`;
