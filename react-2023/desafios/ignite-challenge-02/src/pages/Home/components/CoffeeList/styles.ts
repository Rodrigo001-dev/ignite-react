import styled from "styled-components";

export const CoffeesContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, auto);

  grid-row-gap: 2.5rem;
  grid-column-gap: 2rem;

  justify-content: center;
  align-items: center;

  margin-top: 3.375rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, auto);

    grid-row-gap: 2rem;
    grid-column-gap: 1.5rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, auto);

    grid-row-gap: 1.5rem;
    grid-column-gap: 1rem;
  }

  @media (max-width: 460px) {
    grid-template-columns: repeat(1, auto);
  }
`;
